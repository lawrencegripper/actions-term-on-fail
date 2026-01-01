package main

import (
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
)

// setupDevMode sets the DEV_MODE environment variable and global isDevMode flag for testing
// Returns a cleanup function that should be deferred
func setupDevMode(devMode string) func() {
	originalDevMode := os.Getenv("DEV_MODE")
	originalIsDevMode := isDevMode

	if devMode != "" {
		os.Setenv("DEV_MODE", devMode)
	} else {
		os.Unsetenv("DEV_MODE")
	}

	// Update the global isDevMode variable to reflect the test environment
	isDevMode = os.Getenv("DEV_MODE") == "true"

	return func() {
		if originalDevMode != "" {
			os.Setenv("DEV_MODE", originalDevMode)
		} else {
			os.Unsetenv("DEV_MODE")
		}
		isDevMode = originalIsDevMode
	}
}

// TestSetAuthCookieSecurityAttributes verifies that authentication cookies
// have proper security attributes set to prevent common web vulnerabilities
func TestSetAuthCookieSecurityAttributes(t *testing.T) {
	tests := []struct {
		name           string
		devMode        string
		expectSecure   bool
		description    string
	}{
		{
			name:         "Production mode sets Secure flag",
			devMode:      "false",
			expectSecure: true,
			description:  "In production, Secure flag ensures cookies only transmitted over HTTPS",
		},
		{
			name:         "Dev mode without Secure flag",
			devMode:      "true",
			expectSecure: false,
			description:  "In dev mode, Secure flag disabled to allow HTTP testing",
		},
		{
			name:         "Unset dev mode defaults to production",
			devMode:      "",
			expectSecure: true,
			description:  "When DEV_MODE not set, default to secure production settings",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Set up environment and restore on cleanup
			cleanup := setupDevMode(tt.devMode)
			defer cleanup()

			// Create a test response recorder
			w := httptest.NewRecorder()

			// Call the function
			setAuthCookie(w, "testuser")

			// Get the response
			resp := w.Result()
			cookies := resp.Cookies()

			// Verify we got exactly one cookie
			if len(cookies) != 1 {
				t.Fatalf("Expected 1 cookie, got %d", len(cookies))
			}

			cookie := cookies[0]

			// Test 1: Cookie name
			if cookie.Name != "token" {
				t.Errorf("Expected cookie name 'token', got '%s'", cookie.Name)
			}

			// Test 2: HttpOnly flag (must always be true for security)
			if !cookie.HttpOnly {
				t.Error("SECURITY: HttpOnly flag not set - cookie vulnerable to XSS attacks")
			}

			// Test 3: Secure flag (context-dependent)
			if cookie.Secure != tt.expectSecure {
				t.Errorf("SECURITY: Expected Secure flag to be %v in %s, got %v - %s",
					tt.expectSecure, tt.name, cookie.Secure, tt.description)
			}

			// Test 4: SameSite attribute (must be set for CSRF protection)
			if cookie.SameSite != http.SameSiteStrictMode {
				t.Errorf("SECURITY: Expected SameSite to be Strict, got %v - cookie vulnerable to CSRF attacks",
					cookie.SameSite)
			}

			// Test 5: Path is set
			if cookie.Path != "/" {
				t.Errorf("Expected cookie path '/', got '%s'", cookie.Path)
			}

			// Test 6: MaxAge is set
			if cookie.MaxAge != 86400 {
				t.Errorf("Expected MaxAge 86400 seconds (24 hours), got %d", cookie.MaxAge)
			}

			// Test 7: Cookie value is not empty (JWT token)
			if cookie.Value == "" {
				t.Error("Cookie value (JWT token) is empty")
			}
		})
	}
}

// TestSetAuthCookieValueFormat verifies the JWT token format and structure
func TestSetAuthCookieValueFormat(t *testing.T) {
	// Ensure dev mode for testing
	cleanup := setupDevMode("true")
	defer cleanup()

	w := httptest.NewRecorder()
	testUsername := "securitytestuser"

	setAuthCookie(w, testUsername)

	resp := w.Result()
	cookies := resp.Cookies()

	if len(cookies) != 1 {
		t.Fatalf("Expected 1 cookie, got %d", len(cookies))
	}

	cookie := cookies[0]

	// Verify the cookie value appears to be a JWT (has three parts separated by dots)
	parts := 0
	for _, c := range cookie.Value {
		if c == '.' {
			parts++
		}
	}

	if parts != 2 {
		t.Errorf("Cookie value doesn't appear to be a valid JWT format (expected 2 dots, got %d)", parts)
	}

	// Verify cookie value is not empty and has substantial length
	// JWT format: base64(header).base64(payload).base64(signature)
	// Minimum would be header (~36) + payload (~40) + signature (~43) + 2 dots = ~121 chars
	// We use 100 as a conservative threshold to allow for minimal payloads
	if len(cookie.Value) < 100 {
		t.Errorf("Cookie value suspiciously short for a JWT token: %d characters (expected at least 100)", len(cookie.Value))
	}
}

// TestCookieSecurityAttributesCombination verifies all security attributes work together
func TestCookieSecurityAttributesCombination(t *testing.T) {
	// Test in production mode
	cleanup := setupDevMode("false")
	defer cleanup()

	w := httptest.NewRecorder()
	setAuthCookie(w, "produser")

	resp := w.Result()
	cookies := resp.Cookies()

	if len(cookies) != 1 {
		t.Fatalf("Expected 1 cookie, got %d", len(cookies))
	}

	cookie := cookies[0]

	// Verify all security attributes are properly set for production
	securityChecks := []struct {
		name      string
		condition bool
		message   string
	}{
		{
			name:      "HttpOnly",
			condition: cookie.HttpOnly,
			message:   "HttpOnly flag must be set to prevent XSS attacks",
		},
		{
			name:      "Secure",
			condition: cookie.Secure,
			message:   "Secure flag must be set in production to prevent MITM attacks",
		},
		{
			name:      "SameSite",
			condition: cookie.SameSite == http.SameSiteStrictMode,
			message:   "SameSite must be Strict to prevent CSRF attacks",
		},
		{
			name:      "Path",
			condition: cookie.Path == "/",
			message:   "Path should be set to root",
		},
		{
			name:      "MaxAge",
			condition: cookie.MaxAge == 86400,
			message:   "MaxAge should be 24 hours (86400 seconds)",
		},
	}

	allPassed := true
	for _, check := range securityChecks {
		if !check.condition {
			t.Errorf("SECURITY FAILURE [%s]: %s", check.name, check.message)
			allPassed = false
		}
	}

	if allPassed {
		t.Log("All cookie security attributes properly configured")
	}
}
