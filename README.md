# Action Terminal on Fail

Interactive terminal access to GitHub Actions runners via browser using libp2p for direct P2P connection.

## Architecture

```
┌─────────────────┐                              ┌─────────────────┐
│  GitHub Runner  │◄────────────────────────────►│    Browser      │
│  (TypeScript)   │      Direct P2P (WebRTC)     │  (ghostty-web)  │
└────────┬────────┘                              └────────┬────────┘
         │                                                │
         │ Register session                               │ Get sessions
         │ (POST peer info)                               │ (GitHub OAuth)
         ▼                                                ▼
         └──────────────►┌─────────────────┐◄─────────────┘
                         │     Server      │
                         │   (Go - Auth    │
                         │   & Discovery)  │
                         └─────────────────┘

STUN (Google): Used only for ICE candidate discovery, no data relay
```

1. **Client (TypeScript)** - Runs as GitHub Action, creates libp2p node with WebRTC, registers peer info with server
2. **Server (Go)** - HTTP server for GitHub OAuth and session discovery only (no proxying)
3. **Web UI** - GitHub login, session list, direct libp2p connection via js-libp2p, ghostty-web terminal

## Quick Start

```bash
# Start server
cd server && go run .

# In another terminal, simulate an action client
cd client && npm install && npm start
```

## Usage in GitHub Actions

```yaml
permissions:
  id-token: write  # Required for OIDC authentication

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      # Add the action early - it uses post-job hook to run only on failure
      - uses: your-org/action-term-on-fail@v1
        with:
          server-url: https://your-server.com
          timeout: '30'  # Optional: minutes to wait (default: 30)
      
      # Your build steps...
      - run: npm ci
      - run: npm test
```

**How it works:** The action registers during setup but only starts the terminal in the **post-job hook** if the workflow fails. No need for `if: failure()` - just add it early in your workflow.

The `id-token: write` permission is required for the action to authenticate with the server using GitHub's OIDC tokens. This ensures only the workflow actor can access their terminal session.

## Development

### Prerequisites
- Go 1.21+
- Node.js 20+
- Docker & Docker Compose (for integration tests)

### Run Integration Test
```bash
docker compose up --build --abort-on-container-exit
```

## How It Works

1. Action starts → Requests OIDC token from GitHub Actions
2. Action creates libp2p node with WebRTC transport
3. Action POSTs `{peerId, multiaddrs, oidcToken}` to server
4. Server validates OIDC token signature via GitHub's JWKS, extracts `actor` claim
5. User logs in with GitHub OAuth at server
6. User sees their active sessions (matched by GitHub actor from OIDC token)
7. User clicks session → Browser creates libp2p node, dials runner directly via WebRTC
8. Terminal I/O flows directly: Browser ↔ libp2p WebRTC ↔ PTY on runner

## License

MIT
