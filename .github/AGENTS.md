# Agent Instructions

This file contains useful information for AI agents working on this codebase.

## Development Mode

### Running the dev server

```bash
make run-devmode
```

This starts:
- The Go server on `http://localhost:7373`
- Two mock terminal clients that simulate GitHub Actions runners

### Authentication in dev mode

1. **Login URL**: Navigate to `http://localhost:7373/auth/github?user=<username>` to authenticate as any user (e.g., `lawrencegripper`, `alice`, `bob`)

2. **OTP Code**: Use `000000` (six zeros) as the OTP code in dev mode. This bypasses the normal TOTP validation.

### E2E Testing

The e2e tests use Playwright and are located in `e2e/tests/`. To run them:

```bash
make e2e
```

The tests use a real TOTP secret from `.env.devmode` to generate valid OTP codes.

## Project Structure

- `server/` - Go backend server
- `client/` - TypeScript GitHub Action client (runs on the Actions runner)
- `e2e/` - Playwright end-to-end tests
- `server/static/` - Frontend JavaScript (Vue.js, vanilla JS modules)

## WebRTC Connection

The terminal uses WebRTC data channels for communication between the browser and the GitHub Actions runner. The signaling is done through the Go server.

Key files:
- `server/static/js/terminal.js` - Browser-side WebRTC and terminal handling
- `client/src/index.ts` - Runner-side WebRTC setup
