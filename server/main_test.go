package main

import (
	"testing"
	"time"
)

// TestOTPAttemptTracker_BasicRateLimit tests basic rate limiting functionality
func TestOTPAttemptTracker_BasicRateLimit(t *testing.T) {
	tracker := newOTPAttemptTracker()
	runID := "test-run-123"

	// First 5 attempts should succeed
	for i := 1; i <= 5; i++ {
		if !tracker.RecordAttempt(runID) {
			t.Errorf("Attempt %d should succeed but was rate limited", i)
		}
	}

	// 6th attempt should fail (rate limit exceeded)
	if tracker.RecordAttempt(runID) {
		t.Error("6th attempt should be rate limited but succeeded")
	}

	// Further attempts should continue to fail
	if tracker.RecordAttempt(runID) {
		t.Error("7th attempt should be rate limited but succeeded")
	}
}

// TestOTPAttemptTracker_MultipleRunIDs tests that rate limiting is per runID
func TestOTPAttemptTracker_MultipleRunIDs(t *testing.T) {
	tracker := newOTPAttemptTracker()
	runID1 := "test-run-1"
	runID2 := "test-run-2"

	// Use up attempts for runID1
	for i := 0; i < 5; i++ {
		tracker.RecordAttempt(runID1)
	}

	// runID1 should be rate limited
	if tracker.RecordAttempt(runID1) {
		t.Error("runID1 should be rate limited")
	}

	// runID2 should still work
	if !tracker.RecordAttempt(runID2) {
		t.Error("runID2 should not be rate limited")
	}
}

// TestOTPAttemptTracker_Cleanup tests that old entries are cleaned up
func TestOTPAttemptTracker_Cleanup(t *testing.T) {
	tracker := newOTPAttemptTracker()
	runID := "test-run-cleanup"

	// Record an attempt and manually set old timestamp
	tracker.RecordAttempt(runID)
	
	// Manually set the first attempt time to 11 minutes ago
	tracker.mu.Lock()
	tracker.firstAttempt[runID] = time.Now().Add(-11 * time.Minute)
	tracker.mu.Unlock()

	// Next attempt should trigger cleanup and reset the counter
	if !tracker.RecordAttempt(runID) {
		t.Error("After cleanup, first attempt should succeed")
	}

	// Verify the entry was cleaned up and recreated
	tracker.mu.RLock()
	attempts := tracker.attempts[runID]
	tracker.mu.RUnlock()

	if attempts != 1 {
		t.Errorf("After cleanup, attempt count should be 1, got %d", attempts)
	}
}

// TestOTPAttemptTracker_EdgeCase tests edge case with exactly max attempts
func TestOTPAttemptTracker_EdgeCase(t *testing.T) {
	tracker := newOTPAttemptTracker()
	runID := "test-run-edge"

	// Record exactly 5 attempts (the max)
	for i := 0; i < 5; i++ {
		if !tracker.RecordAttempt(runID) {
			t.Errorf("Attempt %d should succeed", i+1)
		}
	}

	// Verify count is exactly 5
	tracker.mu.RLock()
	count := tracker.attempts[runID]
	tracker.mu.RUnlock()

	if count != 5 {
		t.Errorf("Expected exactly 5 attempts, got %d", count)
	}

	// Next attempt should fail
	if tracker.RecordAttempt(runID) {
		t.Error("Attempt after max should fail")
	}
}
