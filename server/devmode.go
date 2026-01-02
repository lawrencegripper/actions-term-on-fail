package main

import (
	"fmt"
	"log"
	"os"
)

var isDevMode = os.Getenv("DEV_MODE") == "true"

func isDevModeToken(tokenStr string) bool {
	return len(tokenStr) >= 4 && tokenStr[:4] == "dev:"
}

func validateDevModeToken(tokenStr string, actor string, repo string, runID string) (string, string, string, error) {
	if !isDevMode {
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
