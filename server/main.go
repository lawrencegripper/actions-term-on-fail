package main

import (
	"context"
	"crypto/rand"
	"embed"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"io/fs"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/lestrrat-go/jwx/v2/jwk"
	jwtx "github.com/lestrrat-go/jwx/v2/jwt"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
)

//go:embed static/*
var staticFiles embed.FS

const githubOIDCIssuer = "https://token.actions.githubusercontent.com"
const githubJWKSURL = "https://token.actions.githubusercontent.com/.well-known/jwks"

var oidcExpectedAudience string

// Session represents a registered action runner
type Session struct {
	Actor     string          `json:"actor"`
	Repo      string          `json:"repo,omitempty"`
	RunID     string          `json:"runId,omitempty"`
	CreatedAt time.Time       `json:"createdAt"`
	ICE       json.RawMessage `json:"ice,omitempty"`
	Offer     json.RawMessage `json:"offer,omitempty"`
}

// SSE client for signaling
type SSEClient struct {
	Messages chan []byte
	Done     chan struct{}
}

var (
	runIdToSessions            = make(map[string]*Session) // runId -> session
	runIdToSessionsMu          sync.RWMutex
	runIdRunnerSseClient       = make(map[string]*SSEClient) // runId -> SSE client (runner)
	runIdRunnerSseClientsMu    sync.RWMutex
	actorToBrowserSseClients   = make(map[string][]*SSEClient) // actor -> list of browser SSE clients
	actorToBrowserSseClientsMu sync.RWMutex
	jwtSecret                  []byte
	oauthConfig                *oauth2.Config
	jwkCache                   *jwk.Cache
)

func init() {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		b := make([]byte, 32)
		if _, err := rand.Read(b); err != nil {
			log.Fatalf("Failed to generate random JWT secret: %v", err)
		}
		secret = hex.EncodeToString(b)
		log.Println("Generated random JWT secret (set JWT_SECRET in production)")
	}
	jwtSecret = []byte(secret)

	// GitHub OAuth config
	oauthConfig = &oauth2.Config{
		ClientID:     os.Getenv("GITHUB_CLIENT_ID"),
		ClientSecret: os.Getenv("GITHUB_CLIENT_SECRET"),
		Endpoint:     github.Endpoint,
		RedirectURL:  os.Getenv("GITHUB_REDIRECT_URI"),
		Scopes:       []string{"read:user"},
	}

	// Initialize expected OIDC audience
	oidcExpectedAudience = os.Getenv("OIDC_EXPECTED_AUDIENCE")
	if oidcExpectedAudience == "" {
		oidcExpectedAudience = "http://localhost:7373"
	}
	log.Printf("OIDC audience validation enabled: %s", oidcExpectedAudience)

	// Initialize JWKS cache for GitHub Actions OIDC
	jwkCache = jwk.NewCache(context.Background())
	if err := jwkCache.Register(githubJWKSURL, jwk.WithMinRefreshInterval(15*time.Minute)); err != nil {
		log.Fatalf("Failed to register JWKS cache: %v", err)
	}
}

func main() {
	// Serve embedded static files
	staticFS, err := fs.Sub(staticFiles, "static")
	if err != nil {
		log.Fatal("Failed to create sub filesystem: ", err)
	}
	http.Handle("/", http.FileServer(http.FS(staticFS)))

	// API endpoints - Client (authenticated via JWT cookie)
	http.HandleFunc("/api/client/sessions", handleClientSessions)
	http.HandleFunc("/api/client/sessions/subscribe", handleClientSubscribe)
	http.HandleFunc("/api/client/webrtc", handleClientGetWebRTCDetails)
	http.HandleFunc("/api/client/answer", handleClientSendWebRTCAnswer)

	// API endpoints - Runner (authenticated via OIDC token)
	http.HandleFunc("/api/runner/register", handleRunnerRegister)
	http.HandleFunc("/api/runner/signal", handleRunnerSubscribe)

	// Auth endpoints
	http.HandleFunc("/auth/github", handleGitHubAuth)
	http.HandleFunc("/auth/github/callback", handleGitHubCallback)

	port := os.Getenv("PORT")
	if port == "" {
		port = "7373"
	}

	log.Printf("Server starting on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

// handleRunnerRegister - Action runner registers itself with OIDC token
func handleRunnerRegister(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "POST only", http.StatusMethodNotAllowed)
		return
	}

	// Get OIDC token from Authorization header
	oidcToken := extractBearerToken(r)
	if oidcToken == "" {
		http.Error(w, "Authorization header with Bearer token required", http.StatusUnauthorized)
		return
	}

	var req struct {
		ICE   json.RawMessage `json:"ice"`
		Offer json.RawMessage `json:"offer"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Validate OIDC token and extract claims
	actor, repo, runID, err := validateGitHubOIDCToken(r.Context(), oidcToken)
	if err != nil {
		log.Printf("OIDC validation failed: %v", err)
		http.Error(w, "invalid OIDC token: "+err.Error(), http.StatusUnauthorized)
		return
	}

	sess := &Session{
		Actor:     actor,
		Repo:      repo,
		RunID:     runID,
		CreatedAt: time.Now(),
		ICE:       req.ICE,
		Offer:     req.Offer,
	}

	runIdToSessionsMu.Lock()
	runIdToSessions[sess.RunID] = sess
	runIdToSessionsMu.Unlock()

	log.Printf("Registered run: actor %s (repo: %s, run: %s)", actor, repo, runID)
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(map[string]string{"status": "ok"}); err != nil {
		log.Printf("Failed to encode response: %v", err)
	}
}

// extractBearerToken extracts the token from Authorization: Bearer <token> header
func extractBearerToken(r *http.Request) string {
	auth := r.Header.Get("Authorization")
	if len(auth) > 7 && auth[:7] == "Bearer " {
		return auth[7:]
	}
	return ""
}

// validateGitHubOIDCToken validates a GitHub Actions OIDC token and returns claims
func validateGitHubOIDCToken(ctx context.Context, tokenStr string) (actor, repo, runID string, err error) {
	// Dev mode with mock token format: "dev:actor:repo:runId"
	if isDevModeToken(tokenStr) {
		return validateDevModeToken(tokenStr, actor, repo, runID)
	}

	if tokenStr == "" {
		return "", "", "", fmt.Errorf("empty token")
	}

	// Fetch JWKS
	keySet, err := jwkCache.Get(ctx, githubJWKSURL)
	if err != nil {
		return "", "", "", fmt.Errorf("failed to fetch JWKS: %w", err)
	}

	// Parse and validate token with clock skew tolerance
	parseOpts := []jwtx.ParseOption{
		jwtx.WithKeySet(keySet),
		jwtx.WithIssuer(githubOIDCIssuer),
		jwtx.WithValidate(true),
		jwtx.WithAcceptableSkew(2 * time.Minute),
		jwtx.WithAudience(oidcExpectedAudience),
	}
	token, err := jwtx.Parse([]byte(tokenStr), parseOpts...)
	if err != nil {
		return "", "", "", fmt.Errorf("token validation failed: %w", err)
	}

	// Extract claims
	claims := token.PrivateClaims()

	if a, ok := claims["actor"].(string); ok {
		actor = a
	}
	if r, ok := claims["repository"].(string); ok {
		repo = r
	}
	if rid, ok := claims["run_id"].(string); ok {
		runID = rid
	}

	if actor == "" {
		return "", "", "", fmt.Errorf("actor claim missing from token")
	}

	return actor, repo, runID, nil
}

// handleRunnerSubscribe - SSE endpoint for receiving signaling messages
func handleRunnerSubscribe(w http.ResponseWriter, r *http.Request) {
	// Get OIDC token from Authorization header (for runner clients)
	oidcToken := extractBearerToken(r)

	var actor, runId string

	if oidcToken != "" {
		// Runner client - validate OIDC token
		var err error
		actor, _, runId, err = validateGitHubOIDCToken(r.Context(), oidcToken)
		if err != nil {
			log.Printf("SSE OIDC validation failed: %v", err)
			http.Error(w, "invalid OIDC token: "+err.Error(), http.StatusUnauthorized)
			return
		}
	} else {
		http.Error(w, "Authorization header required", http.StatusBadRequest)
		return
	}

	// Set SSE headers
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	flusher, ok := w.(http.Flusher)
	if !ok {
		log.Printf("SSE not supported error")
		http.Error(w, "SSE not supported", http.StatusInternalServerError)
		return
	}

	client := &SSEClient{
		Messages: make(chan []byte, 100),
		Done:     make(chan struct{}),
	}

	runIdRunnerSseClientsMu.Lock()
	runIdRunnerSseClient[runId] = client
	log.Printf("SSE: Runner connected for actor %s (total clients: %d)", actor, len(runIdRunnerSseClient))
	runIdRunnerSseClientsMu.Unlock()

	// Notify browser subscribers about new session
	sess, ok := runIdToSessions[runId]
	if ok {
		notifyNewSession(sess)
	}

	// Cleanup on disconnect
	defer func() {
		runIdRunnerSseClientsMu.Lock()
		delete(runIdRunnerSseClient, runId)
		log.Printf("SSE: Runner disconnected for actor %s (remaining clients: %d)", actor, len(runIdRunnerSseClient))
		runIdRunnerSseClientsMu.Unlock()

		runIdToSessionsMu.Lock()
		sess, ok := runIdToSessions[runId]
		if ok {
			delete(runIdToSessions, runId)
		}
		runIdToSessionsMu.Unlock()

		if sess != nil {
			notifySessionDeleted(sess)
		}

		close(client.Done)
	}()

	// Send keepalive ping and messages
	ticker := time.NewTicker(30 * time.Second)
	defer ticker.Stop()

	log.Printf("SSE: Starting event loop for actor %s", actor)
	for {
		select {
		case <-r.Context().Done():
			log.Printf("SSE: Context done for actor %s (reason: %v)", actor, r.Context().Err())
			return
		case <-ticker.C:
			log.Printf("SSE: Sending keepalive ping to actor %s", actor)
			_, _ = fmt.Fprintf(w, ": keepalive\n\n")
			flusher.Flush()
		case msg := <-client.Messages:
			log.Printf("SSE: Sending message to actor %s (size: %d bytes): %s", actor, len(msg), string(msg))
			_, _ = fmt.Fprintf(w, "data: %s\n\n", msg)
			flusher.Flush()
			log.Printf("SSE: Message sent and flushed to actor %s", actor)
		}
	}
}

func handleClientGetWebRTCDetails(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Get user from JWT cookie
	username, err := usernameFromCookieOrError(r)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	runID := r.URL.Query().Get("runId")
	if runID == "" {
		http.Error(w, "missing runId parameter", http.StatusBadRequest)
		return
	}

	runIdToSessionsMu.RLock()
	sess, ok := runIdToSessions[runID]
	runIdToSessionsMu.RUnlock()

	if !ok {
		http.Error(w, "session not found", http.StatusNotFound)
		return
	}

	// Verify the user owns this session
	if sess.Actor != username {
		http.Error(w, "unauthorized: session belongs to different user", http.StatusForbidden)
		return
	}

	// Return the ICE candidates and offer
	resp := map[string]interface{}{
		"ice":   sess.ICE,
		"offer": sess.Offer,
		"runId": sess.RunID,
	}
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		log.Printf("Failed to encode WebRTC details response: %v", err)
	}
}

func handleClientSendWebRTCAnswer(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "POST only", http.StatusMethodNotAllowed)
		return
	}

	// Get user from JWT cookie
	username, err := usernameFromCookieOrError(r)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	var req struct {
		RunID  string          `json:"runId"`
		Answer json.RawMessage `json:"answer"`
		ICE    json.RawMessage `json:"ice"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	runIdToSessionsMu.RLock()
	sess, ok := runIdToSessions[req.RunID]
	runIdToSessionsMu.RUnlock()

	if !ok {
		http.Error(w, "session not found", http.StatusNotFound)
		return
	}

	// Verify the user owns this session
	if sess.Actor != username {
		http.Error(w, "unauthorized: session belongs to different user", http.StatusForbidden)
		return
	}

	// Forward answer and ICE candidates to the runner via SSE
	runIdRunnerSseClientsMu.RLock()
	client, ok := runIdRunnerSseClient[sess.RunID]
	runIdRunnerSseClientsMu.RUnlock()

	if !ok {
		http.Error(w, "runner not connected", http.StatusServiceUnavailable)
		return
	}

	// Send answer message
	answerMsg, _ := json.Marshal(map[string]interface{}{
		"type":   "answer",
		"answer": req.Answer,
	})
	select {
	case client.Messages <- answerMsg:
	default:
		log.Printf("Failed to send answer to runner %s: channel full", sess.Actor)
	}

	// Send ICE candidates
	var iceCandidates []struct {
		Candidate string `json:"candidate"`
		Mid       string `json:"mid"`
	}
	if err := json.Unmarshal(req.ICE, &iceCandidates); err == nil {
		for _, ice := range iceCandidates {
			iceMsg, _ := json.Marshal(map[string]interface{}{
				"type":      "candidate",
				"candidate": ice.Candidate,
				"mid":       ice.Mid,
			})
			select {
			case client.Messages <- iceMsg:
			default:
				log.Printf("Failed to send ICE candidate to runner %s: channel full", sess.Actor)
			}
		}
	}

	log.Printf("Forwarded answer and %d ICE candidates to runner %s", len(iceCandidates), sess.Actor)
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(map[string]string{"status": "ok"}); err != nil {
		log.Printf("Failed to encode response: %v", err)
	}
}

// handleClientSessions - Get sessions for authenticated user
func handleClientSessions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Get user from JWT cookie
	username, err := usernameFromCookieOrError(r)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	runIdToSessionsMu.Lock()
	var userSessions []*Session
	for _, sess := range runIdToSessions {
		if sess.Actor == username {
			userSessions = append(userSessions, sess)
		}
	}
	runIdToSessionsMu.Unlock()

	// Check which sessions have runners connected (SSE)
	runIdRunnerSseClientsMu.RLock()
	var activeSessions []*Session
	for _, sess := range userSessions {
		if _, ok := runIdRunnerSseClient[sess.RunID]; ok {
			activeSessions = append(activeSessions, sess)
		}
	}
	runIdRunnerSseClientsMu.RUnlock()

	if err := json.NewEncoder(w).Encode(activeSessions); err != nil {
		log.Printf("Failed to encode sessions response: %v", err)
	}
}

// handleClientSubscribe - SSE endpoint for browser clients to receive session updates
func handleClientSubscribe(w http.ResponseWriter, r *http.Request) {
	// Get user from JWT cookie
	username, err := usernameFromCookieOrError(r)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	// Set SSE headers
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "SSE not supported", http.StatusInternalServerError)
		return
	}

	client := &SSEClient{
		Messages: make(chan []byte, 100),
		Done:     make(chan struct{}),
	}

	// Register client for this user
	actorToBrowserSseClientsMu.Lock()
	actorToBrowserSseClients[username] = append(actorToBrowserSseClients[username], client)
	log.Printf("Sessions SSE: Browser connected for user %s (total subscribers: %d)", username, len(actorToBrowserSseClients[username]))
	actorToBrowserSseClientsMu.Unlock()

	// Cleanup on disconnect
	defer func() {
		actorToBrowserSseClientsMu.Lock()
		clients := actorToBrowserSseClients[username]
		for i, c := range clients {
			if c == client {
				actorToBrowserSseClients[username] = append(clients[:i], clients[i+1:]...)
				break
			}
		}
		if len(actorToBrowserSseClients[username]) == 0 {
			delete(actorToBrowserSseClients, username)
		}
		log.Printf("Sessions SSE: Browser disconnected for user %s", username)
		actorToBrowserSseClientsMu.Unlock()
		close(client.Done)
	}()

	// Send keepalive ping and messages
	ticker := time.NewTicker(30 * time.Second)
	defer ticker.Stop()

	log.Printf("Sessions SSE: Starting event loop for user %s", username)
	for {
		select {
		case <-r.Context().Done():
			return
		case <-ticker.C:
			_, _ = fmt.Fprintf(w, ": keepalive\n\n")
			flusher.Flush()
		case msg := <-client.Messages:
			_, _ = fmt.Fprintf(w, "data: %s\n\n", msg)
			flusher.Flush()
		}
	}
}

// notifyNewSession sends a new session notification to all browser subscribers for the actor
func notifyNewSession(sess *Session) {
	actorToBrowserSseClientsMu.RLock()
	clients, ok := actorToBrowserSseClients[sess.Actor]
	actorToBrowserSseClientsMu.RUnlock()

	if !ok {
		return
	}

	if len(clients) == 0 {
		return
	}

	msg, err := json.Marshal(map[string]interface{}{
		"type":    "new-session",
		"session": sess,
	})
	if err != nil {
		log.Printf("Failed to marshal session notification: %v", err)
		return
	}

	log.Printf("Notifying %d browser subscribers about new session for actor %s", len(clients), sess.Actor)
	for _, client := range clients {
		select {
		case client.Messages <- msg:
		default:
			log.Printf("Failed to send session notification: channel full")
		}
	}
}

// notifySessionDeleted sends a session removal notification to all browser subscribers for the actor
func notifySessionDeleted(sess *Session) {
	actorToBrowserSseClientsMu.RLock()
	clients, ok := actorToBrowserSseClients[sess.Actor]
	actorToBrowserSseClientsMu.RUnlock()

	if !ok {
		return
	}

	if len(clients) == 0 {
		return
	}

	msg, err := json.Marshal(map[string]interface{}{
		"type":  "removed-session",
		"runId": sess.RunID,
	})
	if err != nil {
		log.Printf("Failed to marshal session removal notification: %v", err)
		return
	}

	log.Printf("Notifying %d browser subscribers about removed session for actor %s", len(clients), sess.Actor)
	for _, client := range clients {
		select {
		case client.Messages <- msg:
		default:
			log.Printf("Failed to send session removal notification: channel full")
		}
	}
}

func jwtKeyFunc(token *jwt.Token) (interface{}, error) {
	return jwtSecret, nil
}

func usernameFromCookieOrError(r *http.Request) (string, error) {
	cookie, err := r.Cookie("token")
	if err != nil {
		return "", fmt.Errorf("unauthorized missing cookie: %w", err)
	}

	claims := &jwt.MapClaims{}
	token, err := jwt.ParseWithClaims(cookie.Value, claims, jwtKeyFunc, jwt.WithValidMethods([]string{jwt.SigningMethodHS256.Alg()}))
	if err != nil || !token.Valid {
		return "", fmt.Errorf("invalid token: %w", err)
	}

	username := (*claims)["username"].(string)
	return username, nil
}

const oauthStateCookieName = "oauth_state"

// generateOAuthState creates a random state token and stores it in a cookie
func generateOAuthState(w http.ResponseWriter) (string, error) {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	state := hex.EncodeToString(b)

	// Store state in a secure, HttpOnly cookie
	http.SetCookie(w, &http.Cookie{
		Name:     oauthStateCookieName,
		Value:    state,
		Path:     "/",
		HttpOnly: true,
		Secure:   !isDevMode,
		SameSite: http.SameSiteLaxMode, // Lax needed for OAuth redirects
		MaxAge:   600,                  // 10 minutes
	})

	return state, nil
}

// validateOAuthState checks if the state from query matches the cookie and clears it
func validateOAuthState(w http.ResponseWriter, r *http.Request, state string) bool {
	cookie, err := r.Cookie(oauthStateCookieName)
	if err != nil {
		return false
	}

	// Clear the cookie regardless of validation result
	http.SetCookie(w, &http.Cookie{
		Name:     oauthStateCookieName,
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		Secure:   !isDevMode,
		SameSite: http.SameSiteLaxMode,
		MaxAge:   -1, // Delete cookie
	})

	return cookie.Value == state
}

// handleGitHubAuth - Redirect to GitHub OAuth
func handleGitHubAuth(w http.ResponseWriter, r *http.Request) {
	if isDevMode {
		handleDevAuth(w, r)
		return
	}

	state, err := generateOAuthState(w)
	if err != nil {
		http.Error(w, "failed to generate state", http.StatusInternalServerError)
		return
	}

	url := oauthConfig.AuthCodeURL(state, oauth2.AccessTypeOffline)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

// handleGitHubCallback - OAuth callback
func handleGitHubCallback(w http.ResponseWriter, r *http.Request) {
	if isDevMode {
		handleDevAuth(w, r)
		return
	}

	// Validate state parameter to prevent CSRF
	state := r.URL.Query().Get("state")
	if state == "" || !validateOAuthState(w, r, state) {
		http.Error(w, "invalid state parameter", http.StatusBadRequest)
		return
	}

	code := r.URL.Query().Get("code")
	if code == "" {
		http.Error(w, "missing code", http.StatusBadRequest)
		return
	}

	token, err := oauthConfig.Exchange(context.Background(), code)
	if err != nil {
		http.Error(w, "token exchange failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Get user info
	client := oauthConfig.Client(context.Background(), token)
	resp, err := client.Get("https://api.github.com/user")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer func() { _ = resp.Body.Close() }()

	var user struct {
		Login string `json:"login"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
		http.Error(w, "failed to decode user info: "+err.Error(), http.StatusInternalServerError)
		return
	}

	setAuthCookie(w, user.Login)
	http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
}

// handleDevAuth - Dev mode auth (no GitHub)
func handleDevAuth(w http.ResponseWriter, r *http.Request) {
	username := r.URL.Query().Get("user")
	if username == "" {
		username = os.Getenv("DEV_USER")
	}
	if username == "" {
		w.Header().Set("Content-Type", "text/html")
		if _, err := io.WriteString(w, `<!DOCTYPE html>
<html><head><title>Dev Login</title>
<style>body{font-family:system-ui;background:#0d1117;color:#c9d1d9;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0}
form{background:#161b22;padding:30px;border-radius:8px;border:1px solid #30363d}
input{padding:10px;margin:10px 0;width:100%;box-sizing:border-box;background:#0d1117;border:1px solid #30363d;color:#c9d1d9;border-radius:4px}
button{padding:10px 20px;background:#238636;color:white;border:none;border-radius:4px;cursor:pointer;width:100%}
button:hover{background:#2ea043}</style></head>
<body><form action="/auth/github/callback" method="get">
<h2> DEVMODE: Mock Login</h2>
<input name="user" placeholder="GitHub username" required>
<button type="submit">Login</button>
</form></body></html>`); err != nil {
			log.Printf("Failed to write dev login form: %v", err)
		}
		return
	}

	setAuthCookie(w, username)
	http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
}

func setAuthCookie(w http.ResponseWriter, username string) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(24 * time.Hour).Unix(),
	})
	tokenStr, _ := token.SignedString(jwtSecret)

	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    tokenStr,
		Path:     "/",
		HttpOnly: true,
		Secure:   !isDevMode,
		SameSite: http.SameSiteStrictMode,
		MaxAge:   86400,
	})
}
