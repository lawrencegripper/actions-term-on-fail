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
	PeerID     string    `json:"peerId"`
	Multiaddrs []string  `json:"multiaddrs"`
	Actor      string    `json:"actor"`
	Repo       string    `json:"repo,omitempty"`
	RunID      string    `json:"runId,omitempty"`
	CreatedAt  time.Time `json:"createdAt"`
}

var (
	sessions    = make(map[string]*Session) // peerId -> session
	sessionsMu  sync.RWMutex
	jwtSecret   []byte
	oauthConfig *oauth2.Config
	jwkCache    *jwk.Cache
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
	http.HandleFunc("/auth/github", handleGitHubAuth)
	http.HandleFunc("/auth/github/callback", handleGitHubCallback)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
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
		PeerID     string   `json:"peerId"`
		Multiaddrs []string `json:"multiaddrs"`
		OIDCToken  string   `json:"oidcToken"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if req.PeerID == "" {
		http.Error(w, "peerId required", http.StatusBadRequest)
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
		PeerID:     req.PeerID,
		Multiaddrs: req.Multiaddrs,
		Actor:      actor,
		Repo:       repo,
		RunID:      runID,
		CreatedAt:  time.Now(),
	}

	sessionsMu.Lock()
	sessions[sess.PeerID] = sess
	sessionsMu.Unlock()

	log.Printf("Registered session: %s for actor %s (repo: %s, run: %s)", sess.PeerID, actor, repo, runID)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

// validateGitHubOIDCToken validates a GitHub Actions OIDC token and returns claims
func validateGitHubOIDCToken(ctx context.Context, tokenStr string) (actor, repo, runID string, err error) {
	// Dev mode: skip OIDC validation
	if os.Getenv("DEV_MODE") == "true" && tokenStr == "" {
		return "", "", "", fmt.Errorf("dev mode requires actor in devToken format")
	}

	// Dev mode with mock token format: "dev:actor:repo:runId"
	if os.Getenv("DEV_MODE") == "true" && len(tokenStr) > 4 && tokenStr[:4] == "dev:" {
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
		PeerID string `json:"peerId"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	sessionsMu.Lock()
	if sess, ok := sessions[req.PeerID]; ok {
		sess.CreatedAt = time.Now() // Refresh
	}
	sessionsMu.Unlock()

	w.WriteHeader(http.StatusOK)
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

	json.NewEncoder(w).Encode(userSessions)
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
		io.WriteString(w, `<form action="/auth/github/callback" method="get">
			<input name="user" placeholder="GitHub username" required>
			<button type="submit">Login (Dev Mode)</button>
		</form>`)
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
