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
 * Test setup starts 4 clients:
 * - 2 clients for user "alice" (run IDs 1001, 1002)
 * - 1 client for user "bob" (run ID 2001)
 * - 1 client for user "charlie" (run ID 3001)
 * 
 * The test is designed to be resilient to implementation changes -
 * it tests the user experience, not internal implementation details.
 */

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

test.describe('Session Isolation', () => {
  test('each user only sees their own sessions with correct run IDs', async ({ page }) => {
    const app = new AppHelper(page);

    await test.step('Alice sees only her 2 sessions with correct run IDs', async () => {
      await app.login('alice');
      await app.waitForAppReady();
      await app.waitForSessionCount(2);
      
      const sessionCount = await app.getSessionCount();
      expect(sessionCount).toBe(2);
      
      const runIds = await app.getSessionRunIds();
      expect(runIds).toHaveLength(2);
      expect(runIds.sort()).toEqual(['1001', '1002']);
    });

    await test.step('Bob sees only his 1 session with correct run ID', async () => {
      await page.context().clearCookies();
      await app.login('bob');
      await app.waitForAppReady();
      await app.waitForSessionCount(1);
      
      const sessionCount = await app.getSessionCount();
      expect(sessionCount).toBe(1);
      
      const runIds = await app.getSessionRunIds();
      expect(runIds).toEqual(['2001']);
    });

    await test.step('Charlie sees only his 1 session with correct run ID', async () => {
      await page.context().clearCookies();
      await app.login('charlie');
      await app.waitForAppReady();
      await app.waitForSessionCount(1);
      
      const sessionCount = await app.getSessionCount();
      expect(sessionCount).toBe(1);
      
      const runIds = await app.getSessionRunIds();
      expect(runIds).toEqual(['3001']);
    });

    await test.step('Unknown user sees no sessions', async () => {
      await page.context().clearCookies();
      await app.login('unknownuser');
      await app.waitForAppReady();
      
      // Wait a moment and verify no sessions appear
      await page.waitForTimeout(2000);
      const sessionCount = await app.getSessionCount();
      expect(sessionCount).toBe(0);
      
      const runIds = await app.getSessionRunIds();
      expect(runIds).toEqual([]);
    });
  });
});

test.describe('Terminal End-to-End Flow', () => {
  test('complete user flow: login → session → terminal → execute command', async ({ page }) => {
    const app = new AppHelper(page);
    const terminal = new TerminalHelper(page);

    await test.step('Login as alice', async () => {
      await app.login('alice');
      await app.waitForAppReady();
    });

    await test.step('Wait for sessions (alice has 2)', async () => {
      await app.waitForSessionCount(2);
    });

    await test.step('Select first session and enter OTP', async () => {
      await app.selectFirstSession();
      await app.enterOtp(generateOTP());
    });

    await test.step('Verify terminal is open', async () => {
      await terminal.waitForTerminalReady();
    });

    await test.step('Execute echo command and verify output', async () => {
      const testId = `e2e-${Date.now()}`;
      await terminal.executeAndExpect(`echo "${testId}"`, testId);
      
      const output = await terminal.getTerminalText();
      expect(output).toContain(testId);
    });

    await test.step('Execute pwd command', async () => {
      await terminal.executeCommand('pwd');
      await terminal.waitForOutput('/');
      
      const isConnected = await terminal.isConnected();
      expect(isConnected).toBe(true);
    });

    await test.step('Close terminal', async () => {
      await app.closeTerminal();
      
      const terminalContainer = page.locator('#terminal-container.open');
      await expect(terminalContainer).not.toBeVisible({ timeout: 5000 });
    });

    await test.step('Verify one session remains after closing', async () => {
      // After closing terminal, one of alice's sessions should be gone
      // The other session should still be visible
      await app.waitForSessionCount(1);
    });
  });
});