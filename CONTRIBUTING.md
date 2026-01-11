# Contributing

## Use Make Targets

**It's best to use the provided `make` targets instead of running commands directly.**

These handle setting things up for different scenarios nicely for you.

## Make Targets Reference

### Building

| Target | Description |
|--------|-------------|
| `make build` | Build everything (server + client) |
| `make build-server` | Build Go server only |
| `make build-client` | Build TypeScript client only |
| `make clean` | Remove all build artifacts |

### Running

| Target | Description |
|--------|-------------|
| `make run-devmode` | Start dev server + mock clients (recommended for development) |
| `make run-server` | Start Go server only |
| `make run-client` | Start a single client |
| `make stop-server` | Stop the running server |

### Code Quality

| Target | Description |
|--------|-------------|
| `make lint` | Run all linters (Go + JS/TS) |
| `make lint-go` | Lint Go code with golangci-lint |
| `make lint-js` | Lint TypeScript client and static JS (also checks dist is up-to-date) |
| `make fmt` | Format Go code |

### Testing

| Target | Description |
|--------|-------------|
| `make smoketest` | Run e2e tests (starts services, runs tests) |
| `make run-e2e-services` | Start services for manual e2e testing |

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
make smoketest
```

The tests use a real TOTP secret from `.env.devmode` to generate valid OTP codes.

## Linting

Before committing changes, always run:

```bash
make lint
```

The `lint-js` target will fail with exit code 7 if the `client/dist/` folder is out of date. If this happens, rebuild the client and commit the updated dist files:

```bash
make build-client
```

## Project Structure

- `server/` - Go backend server
- `client/` - TypeScript GitHub Action client (runs on the Actions runner)
- `e2e/` - Playwright end-to-end tests
- `server/static/` - Frontend JavaScript (Vue.js, vanilla JS modules)

## Environment Variables

### Server

| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_SECRET` | Secret for signing session JWTs | Auto-generated |
| `GITHUB_CLIENT_ID` | GitHub OAuth App Client ID | Required for production |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth App Secret | Required for production |
| `GITHUB_REDIRECT_URI` | OAuth callback URL | Required for production |
| `OIDC_EXPECTED_AUDIENCE` | Expected audience in OIDC tokens | `http://localhost:7373` |
| `DEV_MODE` | Enable dev mode (mock auth) | `false` |
| `PORT` | Server port | `7373` |

### Client

| Variable | Description |
|----------|-------------|
| `SERVER_URL` | Signaling server URL |
| `OTP_SECRET` | Base32-encoded TOTP secret |
| `DEV_MODE` | Accept mock OIDC tokens |

## WebRTC Connection

The terminal uses WebRTC data channels for communication between the browser and the GitHub Actions runner. The signaling is done through the Go server.

Key files:
- `server/static/js/terminal.js` - Browser-side WebRTC and terminal handling
- `client/src/index.ts` - Runner-side WebRTC setup
