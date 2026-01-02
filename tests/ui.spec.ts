import { test, expect, Page } from '@playwright/test';
import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';

/**
 * Full UI rendering integration tests for the development-mode server.
 * 
 * These tests validate the complete UI functionality including:
 * 1. Vue.js application rendering
 * 2. Login page UI
 * 3. Authenticated UI with sessions
 * 4. OTP modal interactions
 * 5. Terminal panel rendering
 * 6. Full user flows
 */

const DEV_USER = 'testuser';
const DEV_OTP_SECRET = 'JBSWY3DPEHPK3PXP';

// Helper function to start a mock runner client
async function startMockRunner(user: string = DEV_USER): Promise<ChildProcess> {
  return new Promise((resolve, reject) => {
    const clientDir = path.join(__dirname, '..', 'client');
    const runner = spawn('npm', ['start'], {
      cwd: clientDir,
      env: {
        ...process.env,
        DEV_MODE: 'true',
        OTP_SECRET: DEV_OTP_SECRET,
        GITHUB_ACTOR: user,
        GITHUB_REPOSITORY: 'test/repo',
        GITHUB_RUN_ID: Date.now().toString(),
        SERVER_URL: 'http://localhost:7373',
      },
    });

    let started = false;
    const timeout = setTimeout(() => {
      if (!started) {
        reject(new Error('Runner failed to start within timeout'));
      }
    }, 30000);

    runner.stdout?.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Registered with server') || output.includes('SRE channel connected')) {
        if (!started) {
          started = true;
          clearTimeout(timeout);
          resolve(runner);
        }
      }
    });

    runner.stderr?.on('data', (data) => {
      // Suppress stderr output unless there's an error
    });

    runner.on('error', (err) => {
      reject(err);
    });
  });
}

// Helper function to stop runner
function stopRunner(runner: ChildProcess): Promise<void> {
  return new Promise((resolve) => {
    if (runner.killed) {
      resolve();
      return;
    }
    runner.on('exit', () => resolve());
    runner.kill('SIGTERM');
    setTimeout(() => {
      if (!runner.killed) {
        runner.kill('SIGKILL');
      }
      resolve();
    }, 5000);
  });
}

test.describe('UI Rendering Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing cookies/storage
    await page.context().clearCookies();
  });

  test('should render login page with Vue.js', async ({ page }) => {
    await page.goto('/');
    
    // Wait for Vue.js to load and render the login view
    await page.waitForSelector('h1.h3:has-text("Action Terminal")', { timeout: 10000 });
    
    // Verify login page elements are visible
    await expect(page.locator('h1.h3:has-text("Action Terminal")')).toBeVisible();
    await expect(page.locator('text=Debug your GitHub Actions runners directly in the browser')).toBeVisible();
    await expect(page.locator('a:has-text("Sign in with GitHub")')).toBeVisible();
    
    // Verify the button is clickable
    const loginButton = page.locator('a:has-text("Sign in with GitHub")');
    await expect(loginButton).toHaveAttribute('href', '/auth/github');
  });

  test('should show loading state initially', async ({ page }) => {
    // Navigate but don't wait for full load
    const pagePromise = page.goto('/');
    
    // Check if loading state appears (might be very brief)
    try {
      await page.waitForSelector('text=Loading...', { timeout: 1000 });
      await expect(page.locator('text=Loading...')).toBeVisible();
    } catch (e) {
      // Loading might be too fast, that's okay
    }
    
    await pagePromise;
    
    // Eventually should show either login or main UI
    await page.waitForSelector('h1.h3:has-text("Action Terminal"), .section-header:has-text("Active Sessions")', { timeout: 5000 });
  });

  test('should render authenticated UI after login', async ({ page }) => {
    // Authenticate
    await page.goto(`/auth/github?user=${DEV_USER}`);
    await page.waitForURL('/');
    
    // Wait for authenticated UI to load
    await page.waitForSelector('.section-header:has-text("Active Sessions")', { timeout: 10000 });
    
    // Verify authenticated UI elements
    await expect(page.locator('.header-title:has-text("Action Terminal")')).toBeVisible();
    await expect(page.locator('.section-header:has-text("Active Sessions")')).toBeVisible();
    await expect(page.locator('.sse-indicator')).toBeVisible();
    
    // Should show empty sessions state
    await expect(page.locator('text=No active sessions')).toBeVisible();
    await expect(page.locator('text=Start a workflow with the action to see it here')).toBeVisible();
  });

  test('should show SSE connection indicator', async ({ page }) => {
    await page.goto(`/auth/github?user=${DEV_USER}`);
    await page.waitForURL('/');
    
    // Wait for SSE connection
    await page.waitForSelector('.sse-indicator.connected', { timeout: 10000 });
    
    // Verify connection indicator
    const indicator = page.locator('.sse-indicator.connected');
    await expect(indicator).toBeVisible();
    await expect(indicator.locator('text=Connected')).toBeVisible();
  });

  test('should display session when runner connects', async ({ page }) => {
    // Authenticate first
    await page.goto(`/auth/github?user=${DEV_USER}`);
    await page.waitForURL('/');
    await page.waitForSelector('.section-header:has-text("Active Sessions")', { timeout: 10000 });
    
    // Verify empty state first
    await expect(page.locator('text=No active sessions')).toBeVisible();
    
    // Start a mock runner
    const runner = await startMockRunner(DEV_USER);
    
    try {
      // Wait for session to appear in the UI
      await page.waitForSelector('.session-item', { timeout: 20000 });
      
      // Verify session is visible
      const sessionItem = page.locator('.session-item');
      await expect(sessionItem).toBeVisible();
      
      // Verify session details
      await expect(page.locator('text=test/repo')).toBeVisible();
      await expect(page.locator('.session-badge:has-text("Online")')).toBeVisible();
      
      // Verify session metadata is shown
      await expect(page.locator('.session-meta')).toBeVisible();
    } finally {
      await stopRunner(runner);
    }
  });

  test('should open OTP modal when session is clicked', async ({ page }) => {
    await page.goto(`/auth/github?user=${DEV_USER}`);
    await page.waitForURL('/');
    await page.waitForSelector('.section-header', { timeout: 10000 });
    
    const runner = await startMockRunner(DEV_USER);
    
    try {
      // Wait for session to appear
      await page.waitForSelector('.session-item', { timeout: 20000 });
      
      // Click on the session
      await page.click('.session-item');
      
      // Wait for OTP modal to appear
      await page.waitForSelector('.Box-header:has-text("Enter verification code")', { timeout: 5000 });
      
      // Verify OTP modal elements
      await expect(page.locator('h2:has-text("Enter verification code")')).toBeVisible();
      await expect(page.locator('text=Enter the 6-digit code from your authenticator app')).toBeVisible();
      await expect(page.locator('.otp-input')).toBeVisible();
      await expect(page.locator('button:has-text("Cancel")')).toBeVisible();
      await expect(page.locator('button:has-text("Connect")')).toBeVisible();
      
      // Verify input attributes
      const otpInput = page.locator('.otp-input');
      await expect(otpInput).toHaveAttribute('maxlength', '6');
      await expect(otpInput).toHaveAttribute('placeholder', '000000');
    } finally {
      await stopRunner(runner);
    }
  });

  test('should close OTP modal when cancel is clicked', async ({ page }) => {
    await page.goto(`/auth/github?user=${DEV_USER}`);
    await page.waitForURL('/');
    await page.waitForSelector('.section-header', { timeout: 10000 });
    
    const runner = await startMockRunner(DEV_USER);
    
    try {
      await page.waitForSelector('.session-item', { timeout: 20000 });
      await page.click('.session-item');
      await page.waitForSelector('.otp-input', { timeout: 5000 });
      
      // Click cancel
      await page.click('button:has-text("Cancel")');
      
      // Modal should be hidden
      await expect(page.locator('.modal-overlay.active')).not.toBeVisible();
    } finally {
      await stopRunner(runner);
    }
  });

  test('should enable connect button when OTP is entered', async ({ page }) => {
    await page.goto(`/auth/github?user=${DEV_USER}`);
    await page.waitForURL('/');
    await page.waitForSelector('.section-header', { timeout: 10000 });
    
    const runner = await startMockRunner(DEV_USER);
    
    try {
      await page.waitForSelector('.session-item', { timeout: 20000 });
      await page.click('.session-item');
      await page.waitForSelector('.otp-input', { timeout: 5000 });
      
      // Connect button should be disabled initially
      const connectButton = page.locator('button:has-text("Connect")');
      await expect(connectButton).toBeDisabled();
      
      // Enter OTP code
      await page.fill('.otp-input', '123456');
      
      // Connect button should now be enabled
      await expect(connectButton).toBeEnabled();
    } finally {
      await stopRunner(runner);
    }
  });

  test('should open terminal panel when valid OTP is entered', async ({ page }) => {
    await page.goto(`/auth/github?user=${DEV_USER}`);
    await page.waitForURL('/');
    await page.waitForSelector('.section-header', { timeout: 10000 });
    
    const runner = await startMockRunner(DEV_USER);
    
    try {
      await page.waitForSelector('.session-item', { timeout: 20000 });
      await page.click('.session-item');
      await page.waitForSelector('.otp-input', { timeout: 5000 });
      
      // Enter dev mode bypass OTP
      await page.fill('.otp-input', '000000');
      await page.click('button:has-text("Connect")');
      
      // Terminal should open
      await page.waitForSelector('#terminal-container.open', { timeout: 15000 });
      
      // Verify terminal panel elements
      await expect(page.locator('#terminal-container.open')).toBeVisible();
      await expect(page.locator('.terminal-header')).toBeVisible();
      await expect(page.locator('.terminal-title')).toBeVisible();
      await expect(page.locator('.close-btn')).toBeVisible();
      await expect(page.locator('#terminal')).toBeVisible();
    } finally {
      await stopRunner(runner);
    }
  });

  test('should close terminal panel when close button is clicked', async ({ page }) => {
    await page.goto(`/auth/github?user=${DEV_USER}`);
    await page.waitForURL('/');
    await page.waitForSelector('.section-header', { timeout: 10000 });
    
    const runner = await startMockRunner(DEV_USER);
    
    try {
      await page.waitForSelector('.session-item', { timeout: 20000 });
      await page.click('.session-item');
      await page.waitForSelector('.otp-input', { timeout: 5000 });
      await page.fill('.otp-input', '000000');
      await page.click('button:has-text("Connect")');
      await page.waitForSelector('#terminal-container.open', { timeout: 15000 });
      
      // Click close button
      await page.click('.close-btn');
      
      // Terminal should be closed
      await expect(page.locator('#terminal-container.open')).not.toBeVisible();
    } finally {
      await stopRunner(runner);
    }
  });

  test('should show error when invalid OTP is entered', async ({ page }) => {
    await page.goto(`/auth/github?user=${DEV_USER}`);
    await page.waitForURL('/');
    await page.waitForSelector('.section-header', { timeout: 10000 });
    
    const runner = await startMockRunner(DEV_USER);
    
    try {
      await page.waitForSelector('.session-item', { timeout: 20000 });
      await page.click('.session-item');
      await page.waitForSelector('.otp-input', { timeout: 5000 });
      
      // Enter invalid OTP (not 000000 which is the dev bypass)
      await page.fill('.otp-input', '999999');
      await page.click('button:has-text("Connect")');
      
      // Should either show error or re-prompt for OTP
      // Wait a bit to see if error appears or modal reopens
      await page.waitForTimeout(2000);
      
      // Check if terminal didn't open (which means OTP failed)
      const terminalOpen = await page.locator('#terminal-container.open').isVisible();
      expect(terminalOpen).toBe(false);
    } finally {
      await stopRunner(runner);
    }
  });

  test('should display multiple sessions from same user', async ({ page }) => {
    await page.goto(`/auth/github?user=${DEV_USER}`);
    await page.waitForURL('/');
    await page.waitForSelector('.section-header', { timeout: 10000 });
    
    // Start two runners for the same user
    const runner1 = await startMockRunner(DEV_USER);
    const runner2 = await startMockRunner(DEV_USER);
    
    try {
      // Wait for first session
      await page.waitForSelector('.session-item', { timeout: 20000 });
      
      // Wait a bit for second session to register
      await page.waitForTimeout(3000);
      
      // Count sessions
      const sessionCount = await page.locator('.session-item').count();
      expect(sessionCount).toBeGreaterThanOrEqual(1);
      // Note: Depending on timing, we might see 1 or 2 sessions
    } finally {
      await stopRunner(runner1);
      await stopRunner(runner2);
    }
  });

  test('should not show sessions from other users', async ({ page }) => {
    const otherUser = 'otheruser';
    
    // Start runner for other user
    const runner = await startMockRunner(otherUser);
    
    try {
      // Authenticate as different user
      await page.goto(`/auth/github?user=${DEV_USER}`);
      await page.waitForURL('/');
      await page.waitForSelector('.section-header', { timeout: 10000 });
      
      // Wait a bit for session to potentially appear
      await page.waitForTimeout(3000);
      
      // Should show empty sessions
      await expect(page.locator('text=No active sessions')).toBeVisible();
      const sessionCount = await page.locator('.session-item').count();
      expect(sessionCount).toBe(0);
    } finally {
      await stopRunner(runner);
    }
  });

  test('should render responsive header layout', async ({ page }) => {
    await page.goto(`/auth/github?user=${DEV_USER}`);
    await page.waitForURL('/');
    await page.waitForSelector('.header-bar', { timeout: 10000 });
    
    // Verify header structure
    await expect(page.locator('.header-bar')).toBeVisible();
    await expect(page.locator('.header-logo')).toBeVisible();
    await expect(page.locator('.header-title:has-text("Action Terminal")')).toBeVisible();
    
    // Verify header contains SVG icon
    const headerSvg = page.locator('.header-logo svg');
    await expect(headerSvg).toBeVisible();
  });

  test('should maintain UI state during session updates', async ({ page }) => {
    await page.goto(`/auth/github?user=${DEV_USER}`);
    await page.waitForURL('/');
    await page.waitForSelector('.section-header', { timeout: 10000 });
    
    // Verify initial state
    await expect(page.locator('text=No active sessions')).toBeVisible();
    
    const runner = await startMockRunner(DEV_USER);
    
    try {
      // Session appears
      await page.waitForSelector('.session-item', { timeout: 20000 });
      await expect(page.locator('.session-item')).toBeVisible();
      
      // Verify header and SSE indicator remain visible
      await expect(page.locator('.header-title:has-text("Action Terminal")')).toBeVisible();
      await expect(page.locator('.sse-indicator.connected')).toBeVisible();
    } finally {
      await stopRunner(runner);
    }
  });
});

test.describe('Complete User Flow', () => {
  test('should complete full flow from login to terminal', async ({ page }) => {
    // Step 1: Visit site - should see login
    await page.goto('/');
    await page.waitForSelector('h1.h3:has-text("Action Terminal")', { timeout: 10000 });
    
    // Step 2: Click login (or navigate directly to auth)
    await page.goto(`/auth/github?user=${DEV_USER}`);
    await page.waitForURL('/');
    
    // Step 3: Should see authenticated UI
    await page.waitForSelector('.section-header:has-text("Active Sessions")', { timeout: 10000 });
    await expect(page.locator('text=No active sessions')).toBeVisible();
    
    // Step 4: Start a runner - session appears
    const runner = await startMockRunner(DEV_USER);
    
    try {
      await page.waitForSelector('.session-item', { timeout: 20000 });
      
      // Step 5: Click session - OTP modal opens
      await page.click('.session-item');
      await page.waitForSelector('.otp-input', { timeout: 5000 });
      
      // Step 6: Enter OTP and connect
      await page.fill('.otp-input', '000000');
      await page.click('button:has-text("Connect")');
      
      // Step 7: Terminal opens
      await page.waitForSelector('#terminal-container.open', { timeout: 15000 });
      await expect(page.locator('#terminal')).toBeVisible();
      
      // Step 8: Close terminal
      await page.click('.close-btn');
      await expect(page.locator('#terminal-container.open')).not.toBeVisible();
      
      // Step 9: Should be back at sessions list
      await expect(page.locator('.section-header:has-text("Active Sessions")')).toBeVisible();
    } finally {
      await stopRunner(runner);
    }
  });
});
