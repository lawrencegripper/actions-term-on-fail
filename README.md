# Action Terminal on Fail

Ever wanted to jump onto an interactive terminal to poke around and see why a build fail? This is for you then 🤞

Interactive terminal access to GitHub Actions runners via browser using WebRTC for direct P2P connection when an action fails.

## Architecture

```
┌─────────────────┐                              ┌─────────────────┐
│  GitHub Runner  │◄────────────────────────────►│    Browser      │
│  (TypeScript)   │      Direct P2P (WebRTC)     │  (ghostty-web)  │
│                 │      + OTP Verification      │                 │
└────────┬────────┘                              └────────┬────────┘
         │                                                │
         │ Register session                               │ Get sessions
         │ (OIDC Token Auth)                              │ (GitHub OAuth)
         ▼                                                ▼
         └──────────────►┌─────────────────┐◄─────────────┘
                         │     Server      │
                         │   (Go - Auth    │
                         │   & Discovery)  │
                         └─────────────────┘

STUN (Google): Used only for ICE candidate discovery, no data relay
```

## Security Model

This solution implements a **zero-trust signaling server**. You can also self-host their own signaling server instance. 

### Authentication

| Component | Auth Method | Validates |
|-----------|-------------|-----------|
| **Runner → Server** | GitHub Actions OIDC Token | Server validates JWT signature against GitHub's JWKS, verifies issuer (`token.actions.githubusercontent.com`), and checks audience claim |
| **Browser → Server** | GitHub OAuth | User authenticates via GitHub OAuth to prove identity |
| **Browser → Runner** | TOTP (Time-based OTP) | Runner validates OTP code directly over encrypted P2P channel |

### Why use a One-Time-Password (OTP) when connecting?

The OTP verification happens **directly between the browser and the runner** over the encrypted WebRTC data channel. This is a critical security feature:

- **Server cannot intercept**: The OTP secret is only known to the workflow (via GitHub Secrets) and the user. The server never sees the OTP code or secret.
- **Server cannot inject commands**: All terminal I/O flows directly between browser and runner. The server only facilitates initial connection setup (ICE candidates exchange).


### Components

1. **Client (TypeScript)** - Runs as GitHub Action responsible for providing peer information to signaling server then validating OTP from WebUI
2. **Server (Go)** - HTTP server for session discovery and WebRTC signaling only (no terminal data proxying)
3. **Web UI** - Confirm user identify then show available sessions. Uses signaling server to establish peer to peer (WebRTC) connection to client and provide terminal (via `ghostty-web`)

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
          otp-secret: ${{ secrets.TERMINAL_OTP_SECRET }}
          timeout: '30'  # Optional: minutes to wait (default: 30)
      
      # Your build steps...
      - run: npm ci
      - run: npm test
```

### Inputs

| Input | Description |
|-------|-------------|
| `otp-secret` | Base32-encoded TOTP secret (store in GitHub Secrets) |
| `timeout` | Minutes to wait for connection (default: 30) |
| `server-url` | Signaling server (default: `https://actions-term.gripdev.xyz`) |

### Generating an OTP Secret

Generate a Base32 secret and add it to your GitHub repository secrets:

```bash
# Generate a random secret
python3 -c "import secrets, base64; print(base64.b32encode(secrets.token_bytes(20)).decode())"
```

Then add this to your authenticator app (Google Authenticator, 1Password, etc.) using:
- **Issuer**: ActionTerminal
- **Account**: Terminal
- **Algorithm**: SHA1
- **Digits**: 6
- **Period**: 30 seconds

**How it works:** The action registers during setup but only starts the terminal in the **post-job hook** if the workflow fails. No need for `if: failure()` - just add it early in your workflow.

### Required Permissions

The `id-token: write` permission is required for the action to authenticate with the server using GitHub's OIDC tokens. This ensures only the workflow actor can access their terminal session.

## Development

`make run-devmode`

### Environment Variables

#### Server
| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_SECRET` | Secret for signing session JWTs | Auto-generated |
| `GITHUB_CLIENT_ID` | GitHub OAuth App Client ID | Required for production |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth App Secret | Required for production |
| `GITHUB_REDIRECT_URI` | OAuth callback URL | Required for production |
| `OIDC_EXPECTED_AUDIENCE` | Expected audience in OIDC tokens | `http://localhost:7373` |
| `DEV_MODE` | Enable dev mode (mock auth) | `false` |
| `PORT` | Server port | `7373` |

#### Client
| Variable | Description |
|----------|-------------|
| `SERVER_URL` | Signaling server URL |
| `OTP_SECRET` | Base32-encoded TOTP secret |
| `DEV_MODE` | Accept mock OIDC tokens |


## License

MIT
