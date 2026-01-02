import { test, expect } from '@playwright/test';
import { TerminalHelper, AppHelper } from './helpers/terminal';
import * as OTPAuth from 'otpauth';
import * as fs from 'fs';
import * as path from 'path';

/**
 * End-to-end test for the Action Terminal application.
 * 
 * This test validates the complete user flow:
 * 1. User logs in via GitHub (dev mode)
 * 2. A terminal session appears when a runner connects
 * 3. User enters OTP to access the terminal
 * 4. User can execute commands and see output
 * 
 * The test is designed to be resilient to implementation changes -
 * it tests the user experience, not internal implementation details.
 */

// Dev mode test user - must match what the client uses in DEV_MODE
const TEST_USER = process.env.USER || 'testuser';

// Load OTP secret from .env.devmode file (single source of truth)
function loadOtpSecret(): string {
  const envPath = path.resolve(__dirname, '../..', '.env.devmode');
  const content = fs.readFileSync(envPath, 'utf-8');
  const match = content.match(/^OTP_SECRET=(.+)$/m);
  if (!match) {
    throw new Error('OTP_SECRET not found in .env.devmode');
  }
  return match[1].trim();
}

const OTP_SECRET = loadOtpSecret();

// Generate a valid OTP code from the secret
function generateOTP(): string {
  const totp = new OTPAuth.TOTP({
    issuer: 'ActionTerminal',
    label: 'Terminal',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(OTP_SECRET),
  });
  return totp.generate();
}

test.describe('Terminal End-to-End Flow', () => {
  test('complete user flow: login → session → terminal → execute command', async ({ page }) => {
    const app = new AppHelper(page);
    const terminal = new TerminalHelper(page);

    await test.step('Login to the application', async () => {
      await app.login(TEST_USER);
      await app.waitForAppReady();
    });

    await test.step('Wait for session as client is started', async () => {
      await app.waitForSession();
    });

    await test.step('Select session and enter OTP', async () => {
      await app.selectFirstSession();
      await app.enterOtp(generateOTP());
    });

    await test.step('Verify terminal is open', async () => {
      await terminal.waitForTerminalReady();
    });

    await test.step('Execute echo command and verify output', async () => {
      // Use a unique identifier to verify our specific command output
      const testId = `e2e-${Date.now()}`;
      
      // Execute echo command and wait for the output to appear
      await terminal.executeAndExpect(`echo "${testId}"`, testId);
      
      // Verify the terminal captured the output
      const output = await terminal.getTerminalText();
      expect(output).toContain(testId);
    });

    await test.step('Execute pwd command', async () => {
      // pwd should output a path starting with /
      await terminal.executeCommand('pwd');
      await terminal.waitForOutput('/');
      
      // Terminal should still be connected after command
      const isConnected = await terminal.isConnected();
      expect(isConnected).toBe(true);
    });

    await test.step('Close terminal', async () => {
      await app.closeTerminal();
      
      // Terminal container should no longer be visible or should be closed
      const terminalContainer = page.locator('#terminal-container.open');
      await expect(terminalContainer).not.toBeVisible({ timeout: 5000 });
    });

    await test.step('Validate session is no longer present', async () => {
        // Session list should show no sessions
        const sessionItems = page.locator('.session-item');
        await expect(sessionItems).toHaveCount(0, { timeout: 10_000 });
    })
  });
});

test.describe('Login Flow', () => {
  test('shows login page when not authenticated', async ({ page }) => {
    await page.goto('/');
    
    // Should see the login prompt
    await expect(page.locator('text=Sign in with GitHub')).toBeVisible({ timeout: 10_000 });
  });

  test('redirects to main page after login', async ({ page }) => {
    const app = new AppHelper(page);
    
    await app.login(TEST_USER);
    await app.waitForAppReady();
    
    // Should be on the main page with session list visible
    await expect(page.getByText('Active Sessions', { exact: true })).toBeVisible();
  });
});
