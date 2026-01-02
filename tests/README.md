# Integration Tests

This directory contains integration tests for the action-term-on-fail development server.

## Overview

These tests validate the full development-mode server functionality using Playwright, including:

1. **Session handling**: Sessions are created, managed, and terminated correctly
2. **Authentication**: Dev mode authentication flow works properly  
3. **API endpoints**: All server API endpoints respond correctly
4. **UI rendering**: Complete Vue.js UI renders and functions correctly
5. **User interactions**: OTP modal, terminal panel, and full user flows
6. **Security**: Session isolation and access control are enforced

## Running the Tests

### Prerequisites

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

### Run Tests

```bash
# Run all tests
npm test

# Run with UI mode
npm run test:ui

# Run specific test file
npm test tests/api.spec.ts

# Debug mode
npm run test:debug
```

## Test Structure

- **`api.spec.ts`**: API integration tests that validate server endpoints, authentication, session management, and WebRTC signaling
- **`ui.spec.ts`**: Full UI rendering tests that validate Vue.js application, login page, sessions list, OTP modal, terminal panel, and complete user flows

## How It Works

The tests use Playwright's `webServer` feature to automatically start the development server before running tests. The server runs in DEV_MODE with mock authentication enabled.

### Dev Mode Features Used in Tests

- **Mock Authentication**: Uses `/auth/github?user=USERNAME` to bypass GitHub OAuth
- **Mock OIDC Tokens**: Uses `dev:actor:repo:runId` format for runner authentication
- **Mock OTP**: Dev mode accepts `000000` as a valid OTP code for testing

## Test Coverage

The current test suite covers:

### API Tests (api.spec.ts)
- ✅ Static file serving
- ✅ Dev mode authentication
- ✅ Session API endpoints
- ✅ Runner registration with OIDC tokens
- ✅ WebRTC offer/answer exchange
- ✅ Session isolation between users
- ✅ Access control and authorization
- ✅ ICE candidate exchange

### UI Tests (ui.spec.ts)
- ✅ Vue.js application rendering
- ✅ Login page UI and interactions
- ✅ Authenticated UI with sessions list
- ✅ Empty state display
- ✅ SSE connection indicator
- ✅ Session item rendering and clicks
- ✅ OTP modal display and interactions
- ✅ OTP validation (valid/invalid codes)
- ✅ Terminal panel opening and closing
- ✅ Session isolation in UI
- ✅ Complete user flows from login to terminal

## Limitations

Tests run sequentially (`workers: 1`) because they share a single server instance and session state. This ensures test isolation but limits parallel execution speed.

## Adding New Tests

To add new test cases:

1. Create a new test file in this directory with `.spec.ts` extension
2. Import Playwright test utilities: `import { test, expect } from '@playwright/test';`
3. Use the test structure pattern from existing tests
4. Run tests to verify

## Continuous Integration

These tests are designed to run in CI environments and will:
- Automatically start the development server
- Run tests in headless Chrome
- Generate HTML reports on failures
- Support retries for flaky tests (when enabled)
