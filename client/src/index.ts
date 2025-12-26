import { createLibp2p } from 'libp2p';
import { webRTC } from '@libp2p/webrtc';
import { noise } from '@chainsafe/libp2p-noise';
import { yamux } from '@chainsafe/libp2p-yamux';
import * as pty from 'node-pty';

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:8080';
const SHELL = process.env.SHELL || '/bin/bash';

// Google's public STUN servers
const rtcConfig = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ]
};

// Get GitHub Actions OIDC token or dev token
async function getOIDCToken(): Promise<string> {
  // Dev mode: use mock token
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
      'OIDC token not available. Ensure the workflow has "id-token: write" permission. ' +
      'For local dev, set DEV_MODE=true'
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

async function main() {
  console.log('Starting terminal client...');

  // Get OIDC token for authentication
  let oidcToken: string;
  try {
    oidcToken = await getOIDCToken();
    console.log('Obtained OIDC token from GitHub Actions');
  } catch (err) {
    console.error('Failed to get OIDC token:', err);
    process.exit(1);
  }

  // Create libp2p node with WebRTC
  const node = await createLibp2p({
    transports: [webRTC({ rtcConfiguration: rtcConfig })],
    connectionEncrypters: [noise()],
    streamMuxers: [yamux()],
  });

  await node.start();
  const peerId = node.peerId.toString();
  const multiaddrs = node.getMultiaddrs().map(ma => ma.toString());

  console.log('Node started with peer ID:', peerId);
  console.log('Multiaddrs:', multiaddrs);

  // Register with server using OIDC token
  const registerPayload = {
    peerId,
    multiaddrs,
    oidcToken,
  };

  try {
    const resp = await fetch(`${SERVER_URL}/api/sessions/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerPayload),
    });
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Registration failed: ${resp.status} - ${text}`);
    }
    console.log('Registered with server (OIDC validated)');
  } catch (err) {
    console.error('Failed to register:', err);
    process.exit(1);
  }

  // Handle terminal protocol
  node.handle('/terminal/1.0.0', async ({ stream }) => {
    console.log('New terminal connection');

    // Spawn PTY
    const shell = pty.spawn(SHELL, [], {
      name: 'xterm-256color',
      cols: 80,
      rows: 24,
      cwd: process.env.GITHUB_WORKSPACE || process.cwd(),
      env: process.env as Record<string, string>,
    });

    console.log('Shell spawned, PID:', shell.pid);

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    // PTY -> Stream (async generator)
    const ptyToStream = async function* () {
      const queue: Uint8Array[] = [];
      let resolve: (() => void) | null = null;
      let closed = false;

      shell.onData(data => {
        queue.push(encoder.encode(data));
        if (resolve) {
          resolve();
          resolve = null;
        }
      });

      shell.onExit(() => {
        closed = true;
        if (resolve) resolve();
      });

      while (!closed) {
        if (queue.length > 0) {
          yield queue.shift()!;
        } else {
          await new Promise<void>(r => { resolve = r; });
        }
      }
      // Flush remaining
      while (queue.length > 0) {
        yield queue.shift()!;
      }
    };

    // Start piping PTY output to stream
    stream.sink(ptyToStream()).catch(() => {});

    // Stream -> PTY
    try {
      for await (const chunk of stream.source) {
        const text = decoder.decode(chunk.subarray());
        shell.write(text);
      }
    } catch (err) {
      console.log('Stream ended');
    }

    shell.kill();
  });

  // Heartbeat
  const heartbeat = async () => {
    try {
      await fetch(`${SERVER_URL}/api/sessions/heartbeat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ peerId }),
      });
    } catch (err) {
      console.error('Heartbeat failed:', err);
    }
  };

  setInterval(heartbeat, 60000);

  console.log('Ready for connections. Press Ctrl+C to exit.');
  console.log(`Connect at: ${SERVER_URL}`);

  // Keep alive
  await new Promise(() => {});
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
