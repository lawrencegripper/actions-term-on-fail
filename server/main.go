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
	SessionID string    `json:"sessionId"`
	Actor     string    `json:"actor"`
	Repo      string    `json:"repo,omitempty"`
	RunID     string    `json:"runId,omitempty"`
	CreatedAt time.Time `json:"createdAt"`
}

// SignalMessage represents a WebRTC signaling message
type SignalMessage struct {
	Type      string `json:"type"`      // offer, answer, candidate
	SessionID string `json:"sessionId"` // runner session ID
	BrowserID string `json:"browserId"` // browser connection ID
	From      string `json:"from,omitempty"` // "browser" or "runner"
	SDP       string `json:"sdp,omitempty"`
	Candidate string `json:"candidate,omitempty"`
	Mid       string `json:"mid,omitempty"`
}

// SSE client for signaling
type SSEClient struct {
	SessionID string
	Messages  chan []byte
	Done      chan struct{}
}

var (
	sessions       = make(map[string]*Session) // sessionId -> session
	sessionsMu     sync.RWMutex
	sseClients     = make(map[string]*SSEClient) // sessionId -> SSE client (runner)
	browserClients = make(map[string]*SSEClient) // browserId -> SSE client (browser)
	sseClientsMu   sync.RWMutex
	jwtSecret      []byte
	oauthConfig    *oauth2.Config
	jwkCache       *jwk.Cache
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
	http.HandleFunc("/api/sessions/register", handleRegister)
	http.HandleFunc("/api/sessions/heartbeat", handleHeartbeat)
	http.HandleFunc("/api/signal", handleSignal)
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

	var req struct {
		SessionID string `json:"sessionId"`
		OIDCToken string `json:"oidcToken"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if req.SessionID == "" {
		http.Error(w, "sessionId required", http.StatusBadRequest)
		return
	}

	// Validate OIDC token and extract claims
	actor, repo, runID, err := validateGitHubOIDCToken(r.Context(), req.OIDCToken)
	if err != nil {
		log.Printf("OIDC validation failed: %v", err)
		http.Error(w, "invalid OIDC token: "+err.Error(), http.StatusUnauthorized)
		return
	}

	sess := &Session{
		SessionID: req.SessionID,
		Actor:     actor,
		Repo:      repo,
		RunID:     runID,
		CreatedAt: time.Now(),
	}

	sessionsMu.Lock()
	sessions[sess.SessionID] = sess
	sessionsMu.Unlock()

	log.Printf("Registered session: %s for actor %s (repo: %s, run: %s)", sess.SessionID, actor, repo, runID)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
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

// handleHeartbeat - Keep session alive
func handleHeartbeat(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "POST only", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		SessionID string `json:"sessionId"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	sessionsMu.Lock()
	if sess, ok := sessions[req.SessionID]; ok {
		sess.CreatedAt = time.Now() // Refresh
	}
	sessionsMu.Unlock()

	w.WriteHeader(http.StatusOK)
}

// handleSignal - Relay WebRTC signaling messages between browser and runner
func handleSignal(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "POST only", http.StatusMethodNotAllowed)
		return
	}

	var msg SignalMessage
	if err := json.NewDecoder(r.Body).Decode(&msg); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	log.Printf("Signal: %s from session=%s browser=%s", msg.Type, msg.SessionID, msg.BrowserID)

	data, _ := json.Marshal(msg)

	sseClientsMu.RLock()
	defer sseClientsMu.RUnlock()

	// Route message to appropriate client
	// Determine direction by checking if a runner is subscribed for this session
	// and if this message should go TO the runner (offer) or FROM the runner (answer)
	
	sseClientsMu.RLock()
	runnerClient, runnerOk := sseClients[msg.SessionID]
	browserClient, browserOk := browserClients[msg.BrowserID]
	sseClientsMu.RUnlock()

	if msg.Type == "offer" || msg.From == "browser" {
		// Send to runner
		if runnerOk {
			select {
			case runnerClient.Messages <- data:
			default:
				log.Printf("Runner message queue full for session %s", msg.SessionID)
			}
		} else {
			log.Printf("No runner connected for session %s", msg.SessionID)
			http.Error(w, "runner not connected", http.StatusNotFound)
			return
		}
	} else if msg.Type == "answer" || msg.From == "runner" {
		// Send to browser
		if browserOk {
			select {
			case browserClient.Messages <- data:
			default:
				log.Printf("Browser message queue full for %s", msg.BrowserID)
			}
		} else {
			log.Printf("No browser connected for %s", msg.BrowserID)
		}
	}

	w.WriteHeader(http.StatusOK)
}

// handleSignalSubscribe - SSE endpoint for receiving signaling messages
func handleSignalSubscribe(w http.ResponseWriter, r *http.Request) {
	sessionID := r.URL.Query().Get("sessionId")
	browserID := r.URL.Query().Get("browserId")

	if sessionID == "" && browserID == "" {
		http.Error(w, "sessionId or browserId required", http.StatusBadRequest)
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
		SessionID: sessionID,
		Messages:  make(chan []byte, 100),
		Done:      make(chan struct{}),
	}

	// Register client
	sseClientsMu.Lock()
	if sessionID != "" {
		// Runner client
		sseClients[sessionID] = client
		log.Printf("Runner connected for session %s", sessionID)
	} else {
		// Browser client
		browserClients[browserID] = client
		log.Printf("Browser connected: %s", browserID)
	}
	sseClientsMu.Unlock()

	// Cleanup on disconnect
	defer func() {
		sseClientsMu.Lock()
		if sessionID != "" {
			delete(sseClients, sessionID)
			log.Printf("Runner disconnected for session %s", sessionID)
		} else {
			delete(browserClients, browserID)
			log.Printf("Browser disconnected: %s", browserID)
		}
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

// handleSessions - Get sessions for authenticated user
func handleSessions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Get user from JWT cookie
	cookie, err := r.Cookie("token")
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	claims := &jwt.MapClaims{}
	token, err := jwt.ParseWithClaims(cookie.Value, claims, func(t *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})
	if err != nil || !token.Valid {
		http.Error(w, "invalid token", http.StatusUnauthorized)
		return
	}

	username := (*claims)["username"].(string)

	// Clean old sessions and filter by user
	sessionsMu.Lock()
	now := time.Now()
	var userSessions []*Session
	for id, sess := range sessions {
		if now.Sub(sess.CreatedAt) > 30*time.Minute {
			delete(sessions, id)
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
		if _, ok := sseClients[sess.SessionID]; ok {
			activeSessions = append(activeSessions, sess)
		}
	}
	sseClientsMu.RUnlock()

	json.NewEncoder(w).Encode(activeSessions)
}

// handleGitHubAuth - Redirect to GitHub OAuth
func handleGitHubAuth(w http.ResponseWriter, r *http.Request) {
	if oauthConfig.ClientID == "" {
		handleDevAuth(w, r)
		return
	}
	url := oauthConfig.AuthCodeURL("state", oauth2.AccessTypeOffline)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

// handleGitHubCallback - OAuth callback
func handleGitHubCallback(w http.ResponseWriter, r *http.Request) {
	if oauthConfig.ClientID == "" {
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
<h2>🖥️ Dev Login</h2>
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
