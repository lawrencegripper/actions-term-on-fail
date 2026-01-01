// src/index.ts
import * as pty from "node-pty";
import * as OTPAuth from "otpauth";
import * as nodeDataChannel from "node-datachannel";
var SERVER_URL = process.env.SERVER_URL || "http://localhost:7373";
var SHELL = process.env.SHELL || "/bin/bash";
var OTP_SECRET = process.env.OTP_SECRET || "";
function createTOTP(secret) {
  return new OTPAuth.TOTP({
    issuer: "ActionTerminal",
    label: "Terminal",
    algorithm: "SHA256",
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(secret)
  });
}
function validateOTP(secret, code) {
  try {
    const totp = createTOTP(secret);
    const delta = totp.validate({ token: code, window: 0 });
    return delta !== null;
  } catch (err) {
    console.error("OTP validation error:", err);
    return false;
  }
}
async function getOIDCToken() {
  if (process.env.DEV_MODE === "true") {
    const actor = process.env.GITHUB_ACTOR || process.env.USER || "devuser";
    const repo = process.env.GITHUB_REPOSITORY || "dev/repo";
    const runId = process.env.GITHUB_RUN_ID || "0";
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
  url.searchParams.set("audience", SERVER_URL);
  const resp = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${requestToken}`,
      Accept: "application/json"
    }
  });
  if (!resp.ok) {
    throw new Error(`Failed to get OIDC token: ${resp.status} ${await resp.text()}`);
  }
  const data = await resp.json();
  return data.value;
}
var EventSource = class {
  constructor(url, authHeader) {
    this.url = url;
    this.authHeader = authHeader;
    this.connect();
  }
  controller = null;
  onopen = null;
  onerror = null;
  onmessage = null;
  async connect() {
    this.controller = new AbortController();
    try {
      const headers = {
        "Accept": "text/event-stream",
        "Authorization": this.authHeader
      };
      const resp = await fetch(this.url, {
        headers,
        signal: this.controller.signal
      });
      if (!resp.ok || !resp.body) {
        throw new Error(`SSE connection failed: ${resp.status}`);
      }
      this.onopen?.();
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done)
          break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            this.onmessage?.({ data });
          }
        }
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        this.onerror?.(err);
        setTimeout(() => this.connect(), 5e3);
      }
    }
  }
  close() {
    this.controller?.abort();
  }
};
async function main() {
  console.log(`Starting terminal client, connecting to server: ${SERVER_URL}`);
  if (!OTP_SECRET && process.env.DEV_MODE !== "true") {
    console.error("OTP_SECRET is required for secure terminal access");
    process.exit(1);
  }
  if (OTP_SECRET) {
    try {
      createTOTP(OTP_SECRET);
      console.log("OTP secret configured - browser must provide valid code");
    } catch (err) {
      console.error("Invalid OTP secret:", err);
      process.exit(1);
    }
  }
  let oidcToken;
  try {
    oidcToken = await getOIDCToken();
    console.log("Obtained OIDC token");
  } catch (err) {
    console.error("Failed to get OIDC token:", err);
    process.exit(1);
  }
  const pc = new nodeDataChannel.PeerConnection("runnerClient", {
    iceServers: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"]
  });
  const iceCandidates = [];
  pc.onLocalCandidate((candidate, mid) => {
    iceCandidates.push({ candidate, mid });
  });
  let offer = null;
  pc.onLocalDescription((sdp, type) => {
    offer = { sdp, type };
  });
  const dc = pc.createDataChannel("terminal");
  dc.onOpen(() => {
    console.log("Local data channel opened");
  });
  await new Promise((resolve) => setTimeout(resolve, 1e4));
  if (iceCandidates.length === 0) {
    console.error("No ICE candidates gathered after 10 seconds");
    process.exit(1);
  }
  if (!offer) {
    console.error("No local description (offer) generated");
    process.exit(1);
  }
  console.log(`Gathered ICE candidates ${iceCandidates.length}`);
  try {
    const body = JSON.stringify({ ice: iceCandidates, offer });
    const resp = await fetch(`${SERVER_URL}/api/runner/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + oidcToken },
      body
    });
    if (!resp.ok) {
      throw new Error(`Registration failed: ${resp.status} - ${await resp.text()}`);
    }
    console.log("Registered with server");
  } catch (err) {
    console.error("Failed to register:", err);
    process.exit(1);
  }
  let shell = null;
  console.log("Connecting to signaling channel...");
  const eventSource = new EventSource(`${SERVER_URL}/api/runner/signal`, "Bearer " + oidcToken);
  eventSource.onopen = () => {
    console.log("SRE channel connected");
    console.log("Waiting for server to signal browser ICE Candidates. Press Ctrl+C to exit.");
    console.log(`Connect at: ${SERVER_URL}`);
  };
  eventSource.onerror = (err) => {
    console.error("SRE channel error:", err);
  };
  pc.onStateChange((state) => {
    console.log("Connection state:", state);
    if (state === "closed") {
      console.log("Connection closed, exiting");
      if (shell) {
        shell.kill();
      }
      eventSource.close();
      process.exit(0);
    }
  });
  let dcOpen = false;
  let otpVerified = false;
  let otpAttempts = 0;
  const MAX_OTP_ATTEMPTS = 3;
  dc.onOpen(() => {
    console.log("Data channel opened, waiting for OTP verification");
    dcOpen = true;
  });
  dc.onMessage((data) => {
    const text = typeof data === "string" ? data : new TextDecoder().decode(data);
    if (!otpVerified) {
      try {
        const msg = JSON.parse(text);
        if (msg.type === "setup" && msg.code) {
          if (otpAttempts >= MAX_OTP_ATTEMPTS) {
            console.log("Security: Max OTP attempts exceeded, closing connection");
            dc.sendMessage(JSON.stringify({ type: "setup-complete", success: false, message: "Maximum OTP attempts exceeded" }) + "\n");
            setTimeout(() => {
              dc.close();
            }, 100);
            return;
          }
          otpAttempts++;
          console.log(`OTP verification attempt ${otpAttempts}/${MAX_OTP_ATTEMPTS}`);
          const isDevBypass = process.env.DEV_MODE === "true" && msg.code === "000000";
          const isValid = isDevBypass || validateOTP(OTP_SECRET, msg.code);
          if (isValid) {
            console.log("OTP verified successfully");
            otpVerified = true;
            const cols = msg.cols && msg.cols > 0 ? msg.cols : 80;
            const rows = msg.rows && msg.rows > 0 ? msg.rows : 24;
            shell = pty.spawn(SHELL, [], {
              name: "xterm-256color",
              cols,
              rows,
              cwd: process.env.GITHUB_WORKSPACE || process.cwd(),
              env: process.env
            });
            console.log(`PTY started with dimensions ${cols}x${rows}, PID:`, shell.pid);
            shell.onData((shellData) => {
              if (dcOpen && otpVerified) {
                try {
                  dc.sendMessage(shellData);
                } catch (e) {
                  console.log(e);
                }
              }
            });
            dc.sendMessage(JSON.stringify({ type: "setup-complete", success: true }) + "\n");
          } else {
            console.log(`Security: OTP verification failed (attempt ${otpAttempts}/${MAX_OTP_ATTEMPTS})`);
            const remainingAttempts = MAX_OTP_ATTEMPTS - otpAttempts;
            const message = remainingAttempts > 0 ? `Invalid OTP code. ${remainingAttempts} attempt(s) remaining.` : "Invalid OTP code. No attempts remaining.";
            dc.sendMessage(JSON.stringify({ type: "setup-complete", success: false, message }) + "\n");
            if (otpAttempts >= MAX_OTP_ATTEMPTS) {
              setTimeout(() => {
                dc.close();
              }, 100);
            }
          }
        }
      } catch (e) {
        console.log("Received non-JSON message before OTP verification, ignoring");
      }
      return;
    }
    if (shell) {
      shell.write(text);
    }
  });
  dc.onClosed(() => {
    console.log("Data channel closed");
    dcOpen = false;
    if (shell) {
      shell.kill();
    }
  });
  let remoteDescriptionSet = false;
  eventSource.onmessage = async (event) => {
    try {
      const msg = JSON.parse(event.data);
      if (msg.type === "answer" && msg.answer) {
        console.log("Setting remote description (answer)");
        pc.setRemoteDescription(msg.answer.sdp, msg.answer.type);
        remoteDescriptionSet = true;
      } else if (msg.type === "candidate" && msg.candidate && msg.mid) {
        if (remoteDescriptionSet) {
          pc.addRemoteCandidate(msg.candidate, msg.mid);
        } else {
          console.log("Queuing ICE candidate (remote description not set yet)");
          pc.addRemoteCandidate(msg.candidate, msg.mid);
        }
      }
    } catch (err) {
      console.error("Error handling signal:", err);
    }
  };
  await new Promise(() => {
  });
}
main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
