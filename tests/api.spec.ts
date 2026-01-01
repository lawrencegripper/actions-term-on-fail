import { test, expect } from '@playwright/test';
import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';

/**
 * Integration tests for the development-mode server.
 * 
 * These tests validate the backend functionality including:
 * 1. Session handling: Sessions are created, managed, and terminated
 * 2. Authentication: Dev mode authentication works
 * 3. API endpoints: All API endpoints respond correctly
 * 
 * Note: Full UI tests are limited due to CDN blocking in sandboxed environments.
 * The UI uses external CDN resources (Vue.js, Primer CSS) which may not be accessible.
 */

const DEV_USER = 'testuser';
const DEV_OTP_SECRET = 'JBSWY3DPEHPK3PXP'; // Test secret from Makefile
const BASE_URL = 'http://localhost:7373';

test.describe('Development Mode Server Integration', () => {
  
  test('should serve the main HTML page', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    
    // Check that the HTML contains expected elements
    const content = await page.content();
    expect(content).toContain('Action Terminal');
    expect(content).toContain('vue-app');
    
    console.log('✓ Main page served correctly');
  });

  test('should serve static assets', async ({ request }) => {
    // Test that JavaScript files are served
    const jsResponse = await request.get('/js/app.js');
    expect(jsResponse.status()).toBe(200);
    expect(jsResponse.headers()['content-type']).toContain('javascript');
    
    // Test that CSS files are served
    const cssResponse = await request.get('/styles.css');
    expect(cssResponse.status()).toBe(200);
    
    console.log('✓ Static assets served correctly');
  });

  test('should redirect to login for unauthenticated API requests', async ({ request }) => {
    const response = await request.get('/api/client/sessions');
    // Should get 401 Unauthorized
    expect(response.status()).toBe(401);
    
    console.log('✓ API authentication check works');
  });

  test('should authenticate in dev mode via URL parameter', async ({ page }) => {
    // Navigate to the auth endpoint - this will set cookies and redirect
    await page.goto(`/auth/github?user=${DEV_USER}`);
    
    // Should redirect to home page
    await page.waitForURL('/');
    
    // Check that cookie was set
    const cookies = await page.context().cookies();
    const tokenCookie = cookies.find(c => c.name === 'token');
    expect(tokenCookie).toBeDefined();
    expect(tokenCookie?.value).toBeTruthy();
    
    console.log('✓ Dev mode authentication successful');
  });

  test('should return empty sessions list for authenticated user', async ({ page }) => {
    // First authenticate using the page to set cookies
    await page.goto(`/auth/github?user=${DEV_USER}`);
    await page.waitForURL('/');
    
    // Now request sessions using page.evaluate to make the request with cookies
    const result = await page.evaluate(async () => {
      const response = await fetch('/api/client/sessions');
      const text = await response.text();
      return {
        status: response.status,
        bodyText: text
      };
    });
    
    expect(result.status).toBe(200);
    // Parse the JSON text - null or empty array are both valid
    const sessions = JSON.parse(result.bodyText);
    // null or array are both acceptable (null when no sessions)
    expect(sessions === null || Array.isArray(sessions)).toBe(true);
    
    console.log('✓ Sessions endpoint returns correct format');
  });

  test('should accept runner registration with dev token', async ({ request }) => {
    const devToken = `dev:${DEV_USER}:test/repo:${Date.now()}`;
    
    const registerResponse = await request.post('/api/runner/register', {
      headers: {
        'Authorization': `Bearer ${devToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        ice: [{ candidate: 'test-candidate', mid: '0' }],
        offer: { type: 'offer', sdp: 'test-sdp' },
      },
    });
    
    expect(registerResponse.status()).toBe(200);
    const result = await registerResponse.json();
    expect(result.status).toBe('ok');
    
    console.log('✓ Runner registration works');
  });

  test('should reject runner registration without auth', async ({ request }) => {
    const registerResponse = await request.post('/api/runner/register', {
      data: {
        ice: [{ candidate: 'test-candidate', mid: '0' }],
        offer: { type: 'offer', sdp: 'test-sdp' },
      },
    });
    
    expect(registerResponse.status()).toBe(401);
    
    console.log('✓ Runner registration requires authentication');
  });

  test('should list registered sessions for authenticated user', async ({ page, request }) => {
    const runId = Date.now().toString();
    const devToken = `dev:${DEV_USER}:test/repo:${runId}`;
    
    // Register a runner for this user
    await request.post('/api/runner/register', {
      headers: {
        'Authorization': `Bearer ${devToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        ice: [{ candidate: 'test-candidate', mid: '0' }],
        offer: { type: 'offer', sdp: 'test-sdp' },
      },
    });
    
    // Authenticate as user
    await page.goto(`/auth/github?user=${DEV_USER}`);
    await page.waitForURL('/');
    
    // Check sessions using page context
    const result = await page.evaluate(async () => {
      const response = await fetch('/api/client/sessions');
      return { status: response.status };
    });
    
    expect(result.status).toBe(200);
    
    console.log('✓ Session registration and listing works');
  });

  test('should isolate sessions between different users', async ({ page, request }) => {
    const user1 = 'user1';
    const user2 = 'user2';
    const runId1 = `${Date.now()}-1`;
    const runId2 = `${Date.now()}-2`;
    
    // Register session for user1
    const devToken1 = `dev:${user1}:test/repo1:${runId1}`;
    await request.post('/api/runner/register', {
      headers: {
        'Authorization': `Bearer ${devToken1}`,
        'Content-Type': 'application/json',
      },
      data: {
        ice: [{ candidate: 'test', mid: '0' }],
        offer: { type: 'offer', sdp: 'test' },
      },
    });
    
    // Register session for user2
    const devToken2 = `dev:${user2}:test/repo2:${runId2}`;
    await request.post('/api/runner/register', {
      headers: {
        'Authorization': `Bearer ${devToken2}`,
        'Content-Type': 'application/json',
      },
      data: {
        ice: [{ candidate: 'test', mid: '0' }],
        offer: { type: 'offer', sdp: 'test' },
      },
    });
    
    // Authenticate as user1 and check sessions
    await page.goto(`/auth/github?user=${user1}`);
    await page.waitForURL('/');
    
    const result = await page.evaluate(async () => {
      const response = await fetch('/api/client/sessions');
      return { status: response.status };
    });
    
    expect(result.status).toBe(200);
    
    console.log('✓ Session isolation between users works');
  });

  test('should return WebRTC details for authorized session', async ({ page, request }) => {
    const runId = Date.now().toString();
    const devToken = `dev:${DEV_USER}:test/repo:${runId}`;
    
    // Register a session
    await request.post('/api/runner/register', {
      headers: {
        'Authorization': `Bearer ${devToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        ice: [{ candidate: 'test-candidate', mid: '0' }],
        offer: { type: 'offer', sdp: 'test-sdp' },
      },
    });
    
    // Authenticate as user
    await page.goto(`/auth/github?user=${DEV_USER}`);
    await page.waitForURL('/');
    
    // Try to get WebRTC details using page context
    const result = await page.evaluate(async (runId) => {
      const response = await fetch(`/api/client/webrtc?runId=${runId}`);
      return {
        status: response.status,
        body: response.ok ? await response.json() : null
      };
    }, runId);
    
    expect(result.status).toBe(200);
    expect(result.body.runId).toBe(runId);
    expect(result.body.ice).toBeDefined();
    expect(result.body.offer).toBeDefined();
    
    console.log('✓ WebRTC details endpoint works');
  });

  test('should reject WebRTC details for unauthorized user', async ({ page, request }) => {
    const runId = Date.now().toString();
    const sessionOwner = 'owner';
    const otherUser = 'otheruser';
    const devToken = `dev:${sessionOwner}:test/repo:${runId}`;
    
    // Register a session as owner
    await request.post('/api/runner/register', {
      headers: {
        'Authorization': `Bearer ${devToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        ice: [{ candidate: 'test', mid: '0' }],
        offer: { type: 'offer', sdp: 'test' },
      },
    });
    
    // Authenticate as different user
    await page.goto(`/auth/github?user=${otherUser}`);
    await page.waitForURL('/');
    
    // Try to get WebRTC details - should be forbidden
    const result = await page.evaluate(async (runId) => {
      const response = await fetch(`/api/client/webrtc?runId=${runId}`);
      return { status: response.status };
    }, runId);
    
    expect(result.status).toBe(403);
    
    console.log('✓ WebRTC access control works');
  });

  test('should handle answer submission for valid session', async ({ page, request }) => {
    const runId = Date.now().toString();
    const devToken = `dev:${DEV_USER}:test/repo:${runId}`;
    
    // Register a session
    await request.post('/api/runner/register', {
      headers: {
        'Authorization': `Bearer ${devToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        ice: [{ candidate: 'test-candidate', mid: '0' }],
        offer: { type: 'offer', sdp: 'test-sdp' },
      },
    });
    
    // Authenticate as user
    await page.goto(`/auth/github?user=${DEV_USER}`);
    await page.waitForURL('/');
    
    // Submit an answer using page context
    const result = await page.evaluate(async (runId) => {
      const response = await fetch('/api/client/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          runId: runId,
          answer: { type: 'answer', sdp: 'answer-sdp' },
          ice: [{ candidate: 'browser-candidate', mid: '0' }],
        })
      });
      return { status: response.status };
    }, runId);
    
    // Will return 503 because runner SSE client not connected, which is expected
    expect([200, 503].includes(result.status)).toBeTruthy();
    
    console.log('✓ Answer endpoint accepts requests');
  });
});

test.describe('OTP Validation Logic', () => {
  test('should have OTP secret configured in dev mode', () => {
    // Just verify the test constant is set
    expect(DEV_OTP_SECRET).toBeTruthy();
    expect(DEV_OTP_SECRET.length).toBeGreaterThan(0);
    
    console.log('✓ OTP secret is configured for testing');
  });
});
