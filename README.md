# Actions Terminal on Fail

Ever wanted to jump onto an interactive terminal to poke around and see why a build fail? This is for you then 🤞

Interactive terminal access to GitHub Actions runners via browser using WebRTC for direct P2P connection when an action fails.

<img width="3802" height="2019" alt="image" src="https://github.com/user-attachments/assets/8bd1417a-63dc-4d36-8e48-f749f849505f" />


## Usage in GitHub Actions

### Setup

1. Create an One Time Password (otp) secret and add to the repos Actions secrets as `TERMINAL_OTP_SECRET`. Use `python3 -c "import secrets, base64; print(base64.b32encode(secrets.token_bytes(20)).decode())"` then add this to your Password Manager to allow you to generate OTP's using it.
2. Create a workflow which will fail and add `lawrencegripper/actions-term-on-fail`. 

```yaml
permissions:
  id-token: write  # Required for OIDC authentication

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      # Add the action early - it uses post-job hook to run only on failure (optionally pin to sha with @sha)
      - uses: lawrencegripper/actions-term-on-fail@v0.1
        with:
          otp-secret: ${{ secrets.TERMINAL_OTP_SECRET }}
          timeout: '30'  # Optional: minutes to wait (default: 30)
      
      # Your build steps... simulate a failure
      - run: exit 1 
```

### Usage

1. Go to https://actions-term.gripdev.xyz/
2. Login with your GitHub username and accept prompt to enable notifications then leave the tab running 
3. You'll be notified when an action fails and get a terminal.
4. Click on the session and use the terminal 🚀

You can only access failed workflows **initiate** by you (actor must match). For example, if a push by your GitHub user triggers the workflow, or you use a `workflow_dispatch` trigger, then it will show up. Runs triggered by other users will not show for you.


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

## Security

1. OIDC from the Action and OAuth from the browser ensure you only see Actions which you triggered (`actor` must be your GitHub user)
2. The terminal connection is formed peer to peer so no session data is seen by the signaling server. (Note: You can also self-host your own signaling server instance too)
3. One Time Password secret is not known by the signaling server


### Authentication

| Component | Auth Method | Validates |
|-----------|-------------|-----------|
| **Runner → Server** | GitHub Actions OIDC Token | Server validates JWT signature against GitHub's JWKS, verifies issuer (`token.actions.githubusercontent.com`), and checks audience claim |
| **Browser → Server** | GitHub OAuth | User authenticates via GitHub OAuth to prove identity |
| **Browser → Runner** | TOTP (Time-based OTP) | Runner validates OTP code directly over encrypted P2P channel |

### Why use a One-Time-Password (OTP) when connecting?

The OTP verification happens **directly between the browser and the runner** over the encrypted WebRTC data channel. The aim is that:

- **Server cannot intercept**: The OTP secret is only known to the workflow (via GitHub Secrets) and the user. The server never sees the OTP code or secret.
- **Server cannot inject commands**: All terminal I/O flows directly between browser and runner. The server only helps to establish that connection setup.


### Components

1. **Client (TypeScript)** - Runs as GitHub Action responsible for providing peer information to signaling server then validating OTP from WebUI
2. **Server (Go)** - HTTP server for session discovery and WebRTC signaling only (no terminal data proxying)
3. **Web UI** - Confirm user identify then show available sessions. Uses signaling server to establish peer to peer (WebRTC) connection to client and provide terminal (via `ghostty-web`)


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

Then add this to your authenticator app (Google Authenticator, 1Password, etc.)

### Required Permissions

The `id-token: write` permission is required for the action to create an OIDC token. This is used to prove to the signaling server the identity, repo and actor for which the action is running.

## Development

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, make targets, and environment variables.

> Note: This is a personal project. No SLA or guarantees provided.