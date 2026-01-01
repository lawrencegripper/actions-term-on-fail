package main

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
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

const githubOIDCIssuer = "https://token.actions.githubusercontent.com"
const githubJWKSURL = "https://token.actions.githubusercontent.com/.well-known/jwks"

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
	actorToSessions = make(map[string]*Session) // actor -> session
	runIdToSessions = make(map[string]*Session) // runId -> session
	sessionsMu      sync.RWMutex
	sseClients      = make(map[string]*SSEClient) // actor -> SSE client (runner)
	sseClientsMu    sync.RWMutex
	jwtSecret       []byte
	oauthConfig     *oauth2.Config
	jwkCache        *jwk.Cache
)

func init() {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		b := make([]byte, 32)
		rand.Read(b)
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

	// Initialize JWKS cache for GitHub Actions OIDC
	jwkCache = jwk.NewCache(context.Background())
	jwkCache.Register(githubJWKSURL, jwk.WithMinRefreshInterval(15*time.Minute))
}

func main() {
	// Serve static files
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/", fs)

	// API endpoints
	http.HandleFunc("/api/sessions", handleSessions)
	http.HandleFunc("/api/session/webrtc", handleSessionGetWebRTCDetails)
	http.HandleFunc("/api/session/answer", handleSessionSendAnswer)
	http.HandleFunc("/api/sessions/register", handleRegister)
	http.HandleFunc("/api/signal/subscribe", handleSignalSubscribe)
	http.HandleFunc("/auth/github", handleGitHubAuth)
	http.HandleFunc("/auth/github/callback", handleGitHubCallback)

	port := os.Getenv("PORT")
	if port == "" {
		port = "7373"
	}

	log.Printf("Server starting on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

// handleRegister - Action runner registers itself with OIDC token
func handleRegister(w http.ResponseWriter, r *http.Request) {
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

	sessionsMu.Lock()
	actorToSessions[sess.Actor] = sess
	runIdToSessions[sess.RunID] = sess
	sessionsMu.Unlock()

	log.Printf("Registered run: actor %s (repo: %s, run: %s)", actor, repo, runID)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
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
	if len(tokenStr) >= 4 && tokenStr[:4] == "dev:" {
		if os.Getenv("DEV_MODE") != "true" {
			return "", "", "", fmt.Errorf("dev tokens only accepted in DEV_MODE")
		}
		parts := splitN(tokenStr[4:], ":", 3)
		if len(parts) >= 1 {
			actor = parts[0]
		}
		if len(parts) >= 2 {
			repo = parts[1]
		}
		if len(parts) >= 3 {
			runID = parts[2]
		}
		if actor == "" {
			return "", "", "", fmt.Errorf("dev token missing actor")
		}
		log.Printf("DEV MODE: Accepting mock token for actor=%s", actor)
		return actor, repo, runID, nil
	}

	if tokenStr == "" {
		return "", "", "", fmt.Errorf("empty token")
	}

	// Fetch JWKS
	keySet, err := jwkCache.Get(ctx, githubJWKSURL)
	if err != nil {
		return "", "", "", fmt.Errorf("failed to fetch JWKS: %w", err)
	}

	// Parse and validate token
	token, err := jwtx.Parse([]byte(tokenStr),
		jwtx.WithKeySet(keySet),
		jwtx.WithIssuer(githubOIDCIssuer),
		jwtx.WithValidate(true),
	)
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

func splitN(s, sep string, n int) []string {
	result := make([]string, 0, n)
	for i := 0; i < n-1; i++ {
		idx := indexOf(s, sep)
		if idx < 0 {
			break
		}
		result = append(result, s[:idx])
		s = s[idx+len(sep):]
	}
	result = append(result, s)
	return result
}

func indexOf(s, sep string) int {
	for i := 0; i <= len(s)-len(sep); i++ {
		if s[i:i+len(sep)] == sep {
			return i
		}
	}
	return -1
}

// handleSignalSubscribe - SSE endpoint for receiving signaling messages
func handleSignalSubscribe(w http.ResponseWriter, r *http.Request) {
	// Get OIDC token from Authorization header (for runner clients)
	oidcToken := extractBearerToken(r)

	var actor string

	if oidcToken != "" {
		// Runner client - validate OIDC token
		var err error
		actor, _, _, err = validateGitHubOIDCToken(r.Context(), oidcToken)
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
		http.Error(w, "SSE not supported", http.StatusInternalServerError)
		return
	}

	client := &SSEClient{
		Messages: make(chan []byte, 100),
		Done:     make(chan struct{}),
	}

	// Register client
	sseClientsMu.Lock()
	// Runner client - keyed by actor
	sseClients[actor] = client
	log.Printf("Runner connected for actor %s", actor)
	sseClientsMu.Unlock()

	// Cleanup on disconnect
	defer func() {
		sseClientsMu.Lock()
		delete(sseClients, actor)
		log.Printf("Runner disconnected for actor %s", actor)

		sseClientsMu.Unlock()
		close(client.Done)
	}()

	// Send keepalive ping and messages
	ticker := time.NewTicker(30 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-r.Context().Done():
			return
		case <-ticker.C:
			fmt.Fprintf(w, ": keepalive\n\n")
			flusher.Flush()
		case msg := <-client.Messages:
			fmt.Fprintf(w, "data: %s\n\n", msg)
			flusher.Flush()
		}
	}
}

func handleSessionGetWebRTCDetails(w http.ResponseWriter, r *http.Request) {
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

	sessionsMu.RLock()
	sess, ok := runIdToSessions[runID]
	sessionsMu.RUnlock()

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
	json.NewEncoder(w).Encode(resp)
}

func handleSessionSendAnswer(w http.ResponseWriter, r *http.Request) {
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

	sessionsMu.RLock()
	sess, ok := runIdToSessions[req.RunID]
	sessionsMu.RUnlock()

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
	sseClientsMu.RLock()
	client, ok := sseClients[sess.Actor]
	sseClientsMu.RUnlock()

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
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

// handleSessions - Get sessions for authenticated user
func handleSessions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Get user from JWT cookie
	username, err := usernameFromCookieOrError(r)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	// Clean old sessions and filter by user
	sessionsMu.Lock()
	now := time.Now()
	var userSessions []*Session
	for id, sess := range actorToSessions {
		if now.Sub(sess.CreatedAt) > 30*time.Minute {
			delete(actorToSessions, id)
			continue
		}
		if sess.Actor == username {
			userSessions = append(userSessions, sess)
		}
	}
	sessionsMu.Unlock()

	// Check which sessions have runners connected (SSE)
	sseClientsMu.RLock()
	var activeSessions []*Session
	for _, sess := range userSessions {
		if _, ok := sseClients[sess.Actor]; ok {
			activeSessions = append(activeSessions, sess)
		}
	}
	sseClientsMu.RUnlock()

	json.NewEncoder(w).Encode(activeSessions)
}

func usernameFromCookieOrError(r *http.Request) (string, error) {
	cookie, err := r.Cookie("token")
	if err != nil {
		return "", fmt.Errorf("unauthorized missing cookie: %w", err)
	}

	claims := &jwt.MapClaims{}
	token, err := jwt.ParseWithClaims(cookie.Value, claims, func(t *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})
	if err != nil || !token.Valid {
		return "", fmt.Errorf("invalid token: %w", err)
	}

	username := (*claims)["username"].(string)
	return username, nil
}

// handleGitHubAuth - Redirect to GitHub OAuth
func handleGitHubAuth(w http.ResponseWriter, r *http.Request) {
	if os.Getenv("DEV_MODE") == "true" {
		handleDevAuth(w, r)
		return
	}
	url := oauthConfig.AuthCodeURL("state", oauth2.AccessTypeOffline)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

// handleGitHubCallback - OAuth callback
func handleGitHubCallback(w http.ResponseWriter, r *http.Request) {
	if os.Getenv("DEV_MODE") == "true" {
		handleDevAuth(w, r)
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
	defer resp.Body.Close()

	var user struct {
		Login string `json:"login"`
	}
	json.NewDecoder(resp.Body).Decode(&user)

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
		io.WriteString(w, `<!DOCTYPE html>
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
</form></body></html>`)
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
		MaxAge:   86400,
	})
}
