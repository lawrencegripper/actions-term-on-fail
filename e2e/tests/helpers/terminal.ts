import { Page, Locator, expect } from '@playwright/test';

/**
 * Helper class for interacting with the terminal in e2e tests.
 * Abstracts terminal operations to keep tests clean and resilient to implementation changes.
 * 
 * In dev mode, the terminal captures all output to a hidden DOM element (#e2e-terminal-output)
 * which allows tests to verify command output without reading from the canvas.
 */
export class TerminalHelper {
  private page: Page;
  private terminalContainer: Locator;
  private testOutputContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.terminalContainer = page.locator('#terminal');
    this.testOutputContainer = page.locator('#e2e-terminal-output');
  }

  /**
   * Wait for the terminal to be visible and ready
   */
  async waitForTerminalReady(): Promise<void> {
    await expect(this.terminalContainer).toBeVisible({ timeout: 15_000 });
    // Wait a moment for the terminal to initialize
    await this.page.waitForTimeout(1000);
  }

  /**
   * Type a command into the terminal
   */
  async typeCommand(command: string): Promise<void> {
    // Focus the terminal and type the command
    await this.terminalContainer.click();
    await this.page.keyboard.type(command, { delay: 50 });
  }

  /**
   * Execute a command (type + press Enter)
   */
  async executeCommand(command: string): Promise<void> {
    await this.typeCommand(command);
    await this.page.keyboard.press('Enter');
  }

  /**
   * Wait for specific text to appear in the terminal output.
   * Uses the hidden e2e-terminal-output DOM element populated in dev mode.
   */
  async waitForOutput(expectedText: string, timeout: number = 10_000): Promise<void> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      const terminalText = await this.getTerminalText();
      
      if (terminalText.includes(expectedText)) {
        return;
      }
      
      await this.page.waitForTimeout(200);
    }
    
    // Get final output for error message
    const finalOutput = await this.getTerminalText();
    throw new Error(`Timeout waiting for terminal output: "${expectedText}"\nActual output: "${finalOutput}"`);
  }

  /**
   * Execute a command and wait for expected output
   */
  async executeAndExpect(command: string, expectedOutput: string): Promise<void> {
    await this.executeCommand(command);
    await this.waitForOutput(expectedOutput);
  }

  /**
   * Get the current text content of the terminal from the hidden test output element.
   * This element is populated in dev mode by the terminal.js module.
   */
  async getTerminalText(): Promise<string> {
    // In dev mode, terminal output is captured in a hidden DOM element
    const hasTestOutput = await this.testOutputContainer.count() > 0;
    
    if (hasTestOutput) {
      // Get the full output from the data attribute
      const fullOutput = await this.testOutputContainer.getAttribute('data-full-output');
      return fullOutput || '';
    }
    
    // Fallback: try to get text from terminal container (may not work with canvas)
    return await this.terminalContainer.textContent() || '';
  }

  /**
   * Clear the captured terminal output (useful between tests)
   */
  async clearOutput(): Promise<void> {
    await this.page.evaluate(() => {
      const container = document.getElementById('e2e-terminal-output');
      if (container) {
        container.innerHTML = '';
        container.setAttribute('data-full-output', '');
      }
    });
  }

  /**
   * Check if terminal is connected (no error messages visible)
   */
  async isConnected(): Promise<boolean> {
    const text = await this.getTerminalText();
    return !text.includes('[Connection closed]');
  }
}

/**
 * Helper class for the main app page interactions
 */
export class AppHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Login via dev mode authentication.
   */
  async login(username: string): Promise<void> {
    await this.page.goto(`/auth/github?user=${username}`);
    
    // After login, should redirect to main page
    await expect(this.page).toHaveURL('/');
  }

  /**
   * Wait for the session list to show at least one session
   */
  async waitForSession(): Promise<void> {
    const sessionItem = this.page.locator('.session-item').first();
    await expect(sessionItem).toBeVisible({ timeout: 30_000 });
  }

  /**
   * Wait for a specific number of sessions to appear
   */
  async waitForSessionCount(count: number): Promise<void> {
    const sessionItems = this.page.locator('.session-item');
    await expect(sessionItems).toHaveCount(count, { timeout: 30_000 });
  }

  /**
   * Get the count of visible sessions
   */
  async getSessionCount(): Promise<number> {
    return await this.page.locator('.session-item').count();
  }

  /**
   * Get all session run IDs displayed in the session list
   */
  async getSessionRunIds(): Promise<string[]> {
    const metaElements = this.page.locator('.session-meta');
    const count = await metaElements.count();
    const runIds: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const text = await metaElements.nth(i).textContent() || '';
      // Extract run ID from "Run #1234 • timestamp" format
      const match = text.match(/Run #(\d+)/);
      if (match) {
        runIds.push(match[1]);
      }
    }
    
    return runIds;
  }

  /**
   * Click on the first available session
   */
  async selectFirstSession(): Promise<void> {
    await this.page.locator('.session-item').first().click();
  }

  /**
   * Select a session by index (0-based)
   */
  async selectSessionByIndex(index: number): Promise<void> {
    await this.page.locator('.session-item').nth(index).click();
  }

  /**
   * Enter OTP code in the modal and submit
   */
  async enterOtp(code: string): Promise<void> {
    const otpInput = this.page.locator('.otp-input');
    await expect(otpInput).toBeVisible();
    await otpInput.fill(code);
    await this.page.locator('button:has-text("Connect")').click();
  }

  /**
   * Close the terminal panel
   */
  async closeTerminal(): Promise<void> {
    await this.page.locator('.close-btn').click();
  }

  /**
   * Check if the SSE connection indicator shows connected
   */
  async isConnected(): Promise<boolean> {
    const indicator = this.page.locator('.sse-indicator.connected');
    return await indicator.isVisible();
  }

  /**
   * Wait for the app to fully load (past loading state)
   */
  async waitForAppReady(): Promise<void> {
    // Wait for loading to disappear and either login or session list to appear
    await expect(this.page.locator('text=Loading...')).not.toBeVisible({ timeout: 10_000 });
  }
}
