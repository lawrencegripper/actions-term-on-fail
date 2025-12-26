import * as pty from 'node-pty';
import * as OTPAuth from 'otpauth';
import nodeDataChannel from 'node-datachannel';

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:7373';
const SHELL = process.env.SHELL || '/bin/bash';
const OTP_SECRET = process.env.OTP_SECRET || '';

// Create TOTP instance for validation
function createTOTP(secret: string): OTPAuth.TOTP {
  return new OTPAuth.TOTP({
    issuer: 'ActionTerminal',
    label: 'Terminal',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(secret),
  });
}

// Validate OTP code against secret
function validateOTP(secret: string, code: string): boolean {
  try {
    const totp = createTOTP(secret);
    const delta = totp.validate({ token: code, window: 1 });
    return delta !== null;
  } catch (err) {
    console.error('OTP validation error:', err);
    return false;
  }
}

// Get GitHub Actions OIDC token or dev token
async function getOIDCToken(): Promise<string> {
  if (process.env.DEV_MODE === 'true') {
    const actor = process.env.GITHUB_ACTOR || process.env.USER || 'devuser';
    const repo = process.env.GITHUB_REPOSITORY || 'dev/repo';
    const runId = process.env.GITHUB_RUN_ID || '0';
    console.log(`DEV MODE: Using mock token for actor=${actor}`);
    return `dev:${actor}:${repo}:${runId}`;
  }

  const requestURL = process.env.ACTIONS_ID_TOKEN_REQUEST_URL;
  const requestToken = process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN;

  if (!requestURL || !requestToken) {
    throw new Error(
      'OIDC token not available. Ensure the workflow has "id-token: write" permission.'
    );
  }

  const url = new URL(requestURL);
  url.searchParams.set('audience', SERVER_URL);

  const resp = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${requestToken}`,
      Accept: 'application/json',
    },
  });

  if (!resp.ok) {
    throw new Error(`Failed to get OIDC token: ${resp.status} ${await resp.text()}`);
  }

  const data = await resp.json() as { value: string };
  return data.value;
}

interface SignalMessage {
  type: 'offer' | 'answer' | 'candidate';
  sessionId: string;
  browserId: string;
  from?: 'browser' | 'runner';
  sdp?: string;
  candidate?: string;
  mid?: string;
}

// Polyfill EventSource for Node.js
class EventSource {
  private controller: AbortController | null = null;
  public onopen: (() => void) | null = null;
  public onerror: ((err: any) => void) | null = null;
  public onmessage: ((event: { data: string }) => void) | null = null;

  constructor(private url: string) {
    this.connect();
  }

  private async connect() {
    this.controller = new AbortController();
    try {
      const resp = await fetch(this.url, {
        headers: { 'Accept': 'text/event-stream' },
        signal: this.controller.signal,
      });

      if (!resp.ok || !resp.body) {
        throw new Error(`SSE connection failed: ${resp.status}`);
      }

      this.onopen?.();

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            this.onmessage?.({ data });
          }
        }
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        this.onerror?.(err);
        // Reconnect after delay
        setTimeout(() => this.connect(), 5000);
      }
    }
  }

  close() {
    this.controller?.abort();
  }
}

async function main() {
  console.log('Starting terminal client...');

  // Validate OTP secret
  if (!OTP_SECRET && process.env.DEV_MODE !== 'true') {
    console.error('OTP_SECRET is required for secure terminal access');
    process.exit(1);
  }

  if (OTP_SECRET) {
    try {
      createTOTP(OTP_SECRET);
      console.log('OTP secret configured - browser must provide valid code');
    } catch (err) {
      console.error('Invalid OTP secret:', err);
      process.exit(1);
    }
  }

  // Get OIDC token
  let oidcToken: string;
  try {
    oidcToken = await getOIDCToken();
    console.log('Obtained OIDC token');
  } catch (err) {
    console.error('Failed to get OIDC token:', err);
    process.exit(1);
  }

  // Generate a unique session ID
  const sessionId = Math.random().toString(36).substring(2, 15);
  
  // Register with server
  try {
    const resp = await fetch(`${SERVER_URL}/api/sessions/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, oidcToken }),
    });
    if (!resp.ok) {
      throw new Error(`Registration failed: ${resp.status} - ${await resp.text()}`);
    }
    console.log('Registered with server, session:', sessionId);
  } catch (err) {
    console.error('Failed to register:', err);
    process.exit(1);
  }

  // Map to track active connections by browserId
  const connections = new Map<string, {
    pc: nodeDataChannel.PeerConnection;
    dc?: nodeDataChannel.DataChannel;
    pty?: pty.IPty;
    otpVerified: boolean;
  }>();

  // Send signaling message to server
  async function sendSignal(msg: SignalMessage) {
    try {
      await fetch(`${SERVER_URL}/api/signal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg),
      });
    } catch (err) {
      console.error('Failed to send signal:', err);
    }
  }

  // Handle incoming signaling messages via SSE
  console.log('Connecting to signaling channel...');
  const eventSource = new EventSource(`${SERVER_URL}/api/signal/subscribe?sessionId=${sessionId}`);
  
  eventSource.onopen = () => {
    console.log('Signaling channel connected');
    console.log('Ready for connections. Press Ctrl+C to exit.');
    console.log(`Connect at: ${SERVER_URL}`);
  };

  eventSource.onerror = (err) => {
    console.error('Signaling channel error:', err);
  };

  eventSource.onmessage = async (event) => {
    try {
      const msg: SignalMessage = JSON.parse(event.data);
      console.log('Received signal:', msg.type, 'from browser:', msg.browserId);

      if (msg.type === 'offer' && msg.sdp) {
        // New connection request from browser
        const pc = new nodeDataChannel.PeerConnection(sessionId, {
          iceServers: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'],
        });

        const connState = {
          pc,
          dc: undefined as nodeDataChannel.DataChannel | undefined,
          pty: undefined as pty.IPty | undefined,
          otpVerified: !OTP_SECRET && process.env.DEV_MODE === 'true',
        };
        connections.set(msg.browserId, connState);

        pc.onLocalCandidate((candidate, mid) => {
          console.log('Sending ICE candidate');
          sendSignal({
            type: 'candidate',
            sessionId,
            browserId: msg.browserId,
            from: 'runner',
            candidate,
            mid,
          });
        });

        pc.onStateChange((state) => {
          console.log('Connection state:', state);
          if (state === 'closed' || state === 'failed') {
            if (connState.pty) {
              connState.pty.kill();
            }
            connections.delete(msg.browserId);
          }
        });

        pc.onDataChannel((dc) => {
          console.log('Data channel opened:', dc.getLabel());
          connState.dc = dc;

          let otpBuffer = '';

          dc.onMessage((data) => {
            const text = typeof data === 'string' ? data : new TextDecoder().decode(data as Uint8Array);

            // OTP verification phase
            if (!connState.otpVerified) {
              otpBuffer += text;
              try {
                const parsed = JSON.parse(otpBuffer.trim());
                if (parsed.type === 'otp-response' && parsed.code) {
                  if (validateOTP(OTP_SECRET, parsed.code)) {
                    connState.otpVerified = true;
                    console.log('OTP verified successfully');
                    dc.sendMessage(JSON.stringify({ type: 'otp-result', success: true }) + '\n');
                    
                    // Start PTY
                    const shell = pty.spawn(SHELL, [], {
                      name: 'xterm-256color',
                      cols: 80,
                      rows: 24,
                      cwd: process.env.GITHUB_WORKSPACE || process.cwd(),
                      env: process.env as Record<string, string>,
                    });
                    connState.pty = shell;
                    console.log('PTY started, PID:', shell.pid);

                    shell.onData((shellData) => {
                      try {
                        dc.sendMessage(shellData);
                      } catch {}
                    });

                    shell.onExit(() => {
                      console.log('Shell exited');
                      pc.close();
                      connections.delete(msg.browserId);
                    });
                  } else {
                    console.log('OTP verification failed');
                    dc.sendMessage(JSON.stringify({ type: 'otp-result', success: false, message: 'Invalid OTP code' }) + '\n');
                    setTimeout(() => pc.close(), 1000);
                  }
                  otpBuffer = '';
                }
              } catch {
                // Incomplete JSON, wait for more data
                if (otpBuffer.length > 1024) {
                  otpBuffer = '';
                  dc.sendMessage(JSON.stringify({ type: 'otp-result', success: false, message: 'Invalid request' }) + '\n');
                }
              }
              return;
            }

            // Terminal data - write to PTY
            if (connState.pty) {
              connState.pty.write(text);
            }
          });

          dc.onClosed(() => {
            console.log('Data channel closed');
            if (connState.pty) {
              connState.pty.kill();
            }
            connections.delete(msg.browserId);
          });
        });

        // Set remote description (offer) and generate answer
        pc.setRemoteDescription(msg.sdp, 'offer');
        
        pc.onLocalDescription((sdp, type) => {
          console.log('Sending SDP answer');
          sendSignal({
            type: 'answer',
            sessionId,
            browserId: msg.browserId,
            from: 'runner',
            sdp,
          });
        });

      } else if (msg.type === 'candidate' && msg.candidate) {
        const conn = connections.get(msg.browserId);
        if (conn) {
          console.log('Adding ICE candidate');
          conn.pc.addRemoteCandidate(msg.candidate, msg.mid || '0');
        }
      }
    } catch (err) {
      console.error('Error handling signal:', err);
    }
  };

  // Heartbeat
  setInterval(async () => {
    try {
      await fetch(`${SERVER_URL}/api/sessions/heartbeat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });
    } catch {}
  }, 60000);

  // Keep alive
  await new Promise(() => {});
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
