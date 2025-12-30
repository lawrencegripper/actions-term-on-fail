import * as pty from 'node-pty';
import * as OTPAuth from 'otpauth';
import * as nodeDataChannel from 'node-datachannel';

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
  type: string;
  answer?: { type: string; sdp: string };
  candidate?: string;
  mid?: string;
}

// Polyfill EventSource for Node.js
class EventSource {
  private controller: AbortController | null = null;
  public onopen: (() => void) | null = null;
  public onerror: ((err: any) => void) | null = null;
  public onmessage: ((event: { data: string }) => void) | null = null;

  constructor(private url: string, private authHeader: string) {
    this.connect();
  }

  private async connect() {
    this.controller = new AbortController();
    try {
      const headers: Record<string, string> = {
        'Accept': 'text/event-stream',
        'Authorization': this.authHeader,
      };
      const resp = await fetch(this.url, {
        headers: headers,
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

  const pc = new nodeDataChannel.PeerConnection("runnerClient", {
    iceServers: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'],
  });

  const iceCandidates: Array<any> = [];

  pc.onLocalCandidate((candidate: string, mid: string) => {
    iceCandidates.push({ candidate, mid });
  });

  let offer: { sdp: string; type: string } | null = null;
  pc.onLocalDescription((sdp, type) => {
    offer = { sdp, type }
  })

  // Create a data channel to trigger offer generation
  const dc = pc.createDataChannel("terminal");
  dc.onOpen(() => {
    console.log('Local data channel opened');
  });

  // Wait for ICE candidates to be gathered
  await new Promise(resolve => setTimeout(resolve, 10000));

  if (iceCandidates.length === 0) {
    console.error('No ICE candidates gathered after 10 seconds');
    process.exit(1);
  }

  if (!offer) {
    console.error('No local description (offer) generated');
    process.exit(1);
  }

  console.log(`Gathered ICE candidates ${iceCandidates.length}`);

  // Register with server
  try {
    const body = JSON.stringify({ ice: iceCandidates, offer: offer })
    const resp = await fetch(`${SERVER_URL}/api/sessions/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + oidcToken },
      body: body,
    });
    if (!resp.ok) {
      throw new Error(`Registration failed: ${resp.status} - ${await resp.text()}`);
    }
    console.log('Registered with server');
  } catch (err) {
    console.error('Failed to register:', err);
    process.exit(1);
  }

  const shell = pty.spawn(SHELL, [], {
    name: 'xterm-256color',
    cols: 80,
    rows: 24,
    cwd: process.env.GITHUB_WORKSPACE || process.cwd(),
    env: process.env as Record<string, string>,
  });

  console.log('PTY started, PID:', shell.pid);

  // Handle incoming signaling messages via SSE
  console.log('Connecting to signaling channel...');
  const eventSource = new EventSource(`${SERVER_URL}/api/signal/subscribe`, 'Bearer ' + oidcToken);

  eventSource.onopen = () => {
    console.log('SRE channel connected');
    console.log('Waiting for server to signal browser ICE Candidates. Press Ctrl+C to exit.');
    console.log(`Connect at: ${SERVER_URL}`);
  };

  eventSource.onerror = (err) => {
    console.error('SRE channel error:', err);
  };

  // Set up data channel handler before receiving answer
  pc.onStateChange((state) => {
    console.log('Connection state:', state);
    if (state === 'closed') {
      console.log('Connection closed, exiting');
      shell.kill();
      eventSource.close();
      process.exit(0);
    }
  });

  // Track if data channel is open and buffer shell data until it is
  let dcOpen = false;
  let otpVerified = false;
  let shellBuffer: string[] = [];

  // The data channel we created will be used
  dc.onOpen(() => {
    console.log('Data channel opened, waiting for OTP verification');
    dcOpen = true;
    // Don't flush buffer yet - wait for OTP verification
  });

  dc.onMessage((data) => {
    const text = typeof data === 'string' ? data : new TextDecoder().decode(data as Uint8Array);
    
    if (!otpVerified) {
      // Expecting OTP message
      try {
        const msg = JSON.parse(text);
        if (msg.type === 'otp-response' && msg.code) {
          console.log('Received OTP code, validating...');
          
          // In dev mode, accept "000000" as a valid code for testing
          const isDevBypass = process.env.DEV_MODE === 'true' && msg.code === '000000';
          // In dev mode without OTP_SECRET, accept any code
          const isValid = isDevBypass || !OTP_SECRET || validateOTP(OTP_SECRET, msg.code);
          
          if (isValid) {
            console.log('OTP verified successfully');
            otpVerified = true;
            
            // Send success response
            dc.sendMessage(JSON.stringify({ type: 'otp-result', success: true }) + '\n');
            
            // Now flush any buffered shell data
            console.log(`Flushing ${shellBuffer.length} buffered shell messages`);
            for (const shellData of shellBuffer) {
              try {
                dc.sendMessage(shellData);
              } catch (e) {
                console.log('Error sending buffered data:', e);
              }
            }
            shellBuffer = [];
          } else {
            console.log('OTP verification failed - invalid code');
            dc.sendMessage(JSON.stringify({ type: 'otp-result', success: false, message: 'Invalid OTP code' }) + '\n');
            // Close the connection after a brief delay to allow message to be sent
            setTimeout(() => {
              dc.close();
            }, 100);
          }
        }
      } catch (e) {
        console.log('Received non-JSON message before OTP verification, ignoring');
      }
      return;
    }
    
    // OTP verified - forward terminal data to PTY
    shell.write(text);
  });

  shell.onData((shellData) => {
    if (dcOpen && otpVerified) {
      try {
        dc.sendMessage(shellData);
      } catch (e) {
        console.log(e)
      }
    } else {
      // Buffer the data until the channel is open and OTP verified
      shellBuffer.push(shellData);
    }
  });

  dc.onClosed(() => {
    console.log('Data channel closed');
    dcOpen = false;
    shell.kill();
  });

  let remoteDescriptionSet = false;

  eventSource.onmessage = async (event) => {
    try {
      const msg: SignalMessage = JSON.parse(event.data);
      if (msg.type === 'answer' && msg.answer) {
        // Set the browser's answer as remote description
        console.log('Setting remote description (answer)');
        pc.setRemoteDescription(msg.answer.sdp, msg.answer.type);
        remoteDescriptionSet = true;
      } else if (msg.type === 'candidate' && msg.candidate && msg.mid) {
        // Add browser's ICE candidate
        if (remoteDescriptionSet) {
          pc.addRemoteCandidate(msg.candidate, msg.mid);
        } else {
          console.log('Queuing ICE candidate (remote description not set yet)');
          // In a production app, you'd queue these and add them after setRemoteDescription
          // For simplicity, we'll just try to add it anyway as node-datachannel may handle this
          pc.addRemoteCandidate(msg.candidate, msg.mid);
        }
      }

    } catch (err) {
      console.error('Error handling signal:', err);
    }
  };

  // Keep alive
  await new Promise(() => { });
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
