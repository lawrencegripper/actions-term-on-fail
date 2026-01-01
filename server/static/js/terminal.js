// Terminal module - handles WebRTC connection and terminal rendering
import { init, Terminal, FitAddon } from '/vendor/ghostty/ghostty-web.js';

// Terminal font settings
const TERMINAL_FONT_SIZE = 12;
const CHAR_WIDTH = TERMINAL_FONT_SIZE * 0.8;
const LINE_HEIGHT = TERMINAL_FONT_SIZE * 1.2;
const TERMINAL_HEADER_HEIGHT = 41;

// WebRTC configuration
const rtcConfig = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ]
};

// Terminal state
let term = null;
let fitAddon = null;
let peerConnection = null;
let dataChannel = null;

// Calculate terminal dimensions based on pixel dimensions
function calculateTerminalDimensions(width, height) {
  const cols = Math.floor(width / CHAR_WIDTH);
  const rows = Math.floor(height / LINE_HEIGHT);
  return { cols, rows };
}

// Initialize ghostty WASM
export async function initTerminal() {
  await init();
}

// Connect to a session via WebRTC
export async function connectToSession(runId, otpCode, sessionName, callbacks) {
  const { onStatus, onConnected, onOtpFailed, onTerminalOpen, onTerminalData, onClose } = callbacks;
  
  onStatus?.('connecting', 'Connecting to runner...');

  try {
    // Fetch the runner's WebRTC offer and ICE candidates
    const webrtcResp = await fetch(`/api/client/webrtc?runId=${runId}`);
    if (!webrtcResp.ok) {
      throw new Error(`Failed to get WebRTC details: ${webrtcResp.status}`);
    }
    const webrtcDetails = await webrtcResp.json();
    console.log('Got WebRTC details:', webrtcDetails);

    // Create WebRTC peer connection
    peerConnection = new RTCPeerConnection(rtcConfig);

    // Collect our ICE candidates
    const localIceCandidates = [];
    let iceGatheringComplete = false;

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        localIceCandidates.push({
          candidate: event.candidate.candidate,
          mid: event.candidate.sdpMid,
        });
      }
    };

    peerConnection.onicegatheringstatechange = () => {
      if (peerConnection.iceGatheringState === 'complete') {
        iceGatheringComplete = true;
      }
    };

    peerConnection.onconnectionstatechange = () => {
      console.log('Connection state:', peerConnection.connectionState);
      if (peerConnection.connectionState === 'connected') {
        onStatus?.('connected', 'Connected!');
      } else if (peerConnection.connectionState === 'failed') {
        onStatus?.('error', 'Connection failed');
      }
    };

    // Handle incoming data channel from runner
    peerConnection.ondatachannel = (event) => {
      console.log('Received data channel:', event.channel.label);
      dataChannel = event.channel;
      setupDataChannel(dataChannel, otpCode, runId, sessionName, callbacks);
    };

    // Set the runner's offer as remote description
    const offer = webrtcDetails.offer;
    await peerConnection.setRemoteDescription({ type: offer.type || 'offer', sdp: offer.sdp });
    console.log('Set remote description (offer)');

    // Add the runner's ICE candidates
    const runnerIceCandidates = webrtcDetails.ice || [];
    for (const ice of runnerIceCandidates) {
      try {
        await peerConnection.addIceCandidate({ candidate: ice.candidate, sdpMid: ice.mid });
      } catch (e) {
        console.warn('Failed to add runner ICE candidate:', e);
      }
    }
    console.log(`Added ${runnerIceCandidates.length} runner ICE candidates`);

    // Create answer
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    console.log('Created and set local description (answer)');

    // Wait for ICE gathering to complete (with timeout)
    const startTime = Date.now();
    while (!iceGatheringComplete && Date.now() - startTime < 5000) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    console.log(`Gathered ${localIceCandidates.length} local ICE candidates`);

    // Send answer and ICE candidates to server
    const answerResp = await fetch('/api/client/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        runId: runId,
        answer: { type: 'answer', sdp: answer.sdp },
        ice: localIceCandidates,
      }),
    });

    if (!answerResp.ok) {
      throw new Error(`Failed to send answer: ${answerResp.status}`);
    }
    console.log('Sent answer to runner');

  } catch (err) {
    console.error('Connection failed:', err);
    onStatus?.('error', 'Connection failed: ' + err.message);
    cleanup();
  }
}

function setupDataChannel(dc, otpCode, runId, sessionName, callbacks) {
  const { onStatus, onOtpFailed, onTerminalOpen, onTerminalData, onClose } = callbacks;
  
  dc.onopen = () => {
    console.log('Data channel opened');
    onStatus?.('connecting', 'Verifying OTP...');

    // Calculate terminal dimensions based on expected terminal container size
    const terminalHeight = (window.innerHeight * 0.6667) - TERMINAL_HEADER_HEIGHT;
    const terminalWidth = window.innerWidth;
    const { cols, rows } = calculateTerminalDimensions(terminalWidth, terminalHeight);
    
    console.log(`Sending setup with dimensions: ${cols}x${rows}`);
    // Security: OTP code intentionally not logged to prevent exposure
    dc.send(JSON.stringify({ type: 'setup', code: otpCode, cols, rows }));
  };

  let otpVerified = false;
  let messageBuffer = '';

  dc.onmessage = (event) => {
    const text = event.data;

    if (!otpVerified) {
      messageBuffer += text;
      const newlineIdx = messageBuffer.indexOf('\n');
      if (newlineIdx !== -1) {
        const line = messageBuffer.slice(0, newlineIdx);
        messageBuffer = messageBuffer.slice(newlineIdx + 1);

        try {
          const msg = JSON.parse(line);
          if (msg.type === 'setup-complete') {
            if (msg.success) {
              otpVerified = true;
              onStatus?.('connected', 'Connected!');
              onTerminalOpen?.(messageBuffer, sessionName);
              messageBuffer = '';
            } else {
              throw new Error(msg.message || 'OTP verification failed');
            }
          }
        } catch (err) {
          if (err.message.includes('OTP')) {
            onStatus?.('error', 'OTP verification failed');
            onOtpFailed?.(runId, err.message);
            cleanup();
          }
        }
      }
      return;
    }

    // Terminal data
    onTerminalData?.(text);
  };

  dc.onclose = () => {
    console.log('Data channel closed');
    onClose?.();
  };
}

// Open the terminal UI
export function openTerminal(terminalElement, initialData, sessionName, onInput) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      // Calculate dimensions based on actual element size
      const rect = terminalElement.getBoundingClientRect();
      const { cols, rows } = calculateTerminalDimensions(rect.width, rect.height);
      
      console.log(`Terminal dimensions: ${cols}x${rows} (${rect.width}x${rect.height}px)`);

      term = new Terminal({
        fontSize: TERMINAL_FONT_SIZE,
        columns: cols,
        rows: rows,
        theme: {
          background: '#161b22',
          foreground: '#c9d1d9',
        },
      });

      // Load FitAddon for proper resizing
      fitAddon = new FitAddon();
      term.loadAddon(fitAddon);

      await term.open(terminalElement);
      
      // Fit terminal to container
      fitAddon.fit();

      // Handle terminal input
      term.onData(data => {
        if (dataChannel && dataChannel.readyState === 'open') {
          dataChannel.send(data);
          onInput?.(data);
        }
      });

      // Write any initial data
      if (initialData) {
        term.write(initialData);
      }

      term.focus();

      // Send an Enter key to initialize the terminal
      term.write('\r');
      
      resolve(term);
    }, 350); // Wait for CSS transition (300ms + buffer)
  });
}

// Write data to terminal
export function writeToTerminal(data) {
  if (term) {
    term.write(data);
  }
}

// Close terminal connection message
export function writeCloseMessage() {
  if (term) {
    term.write('\r\n[Connection closed]\r\n');
  }
}

// Cleanup connections
export function cleanup() {
  if (dataChannel) {
    dataChannel.close();
    dataChannel = null;
  }
  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }
}

// Close and dispose terminal
export function closeTerminal() {
  cleanup();
  if (term) {
    term.dispose();
    term = null;
  }
  fitAddon = null;
}

// Handle window resize
export function setupResizeHandler() {
  window.addEventListener('resize', () => {
    if (fitAddon) {
      fitAddon.fit();
    }
  });
}
