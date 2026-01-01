// Main application module - orchestrates the terminal UI with HTMX patterns
import * as terminal from './terminal.js';
import * as notifications from './notifications.js';

// App state
let pendingSession = null;
let sessionsEventSource = null;
let flashTimeout = null;

// DOM elements (initialized on DOMContentLoaded)
let elements = {};

// Initialize the application
export async function initApp() {
  // Initialize terminal WASM
  await terminal.initTerminal();
  terminal.setupResizeHandler();
  
  // Cache DOM elements
  elements = {
    loginView: document.getElementById('login-view'),
    app: document.getElementById('app'),
    status: document.getElementById('status'),
    sessionsList: document.getElementById('sessions-list'),
    otpModal: document.getElementById('otp-modal'),
    otpInput: document.getElementById('otp-input'),
    otpError: document.getElementById('otp-error'),
    otpSubmit: document.getElementById('otp-submit'),
    terminalContainer: document.getElementById('terminal-container'),
    terminalElement: document.getElementById('terminal'),
    terminalSessionName: document.getElementById('terminal-session-name'),
    terminalStatus: document.getElementById('terminal-status'),
    sseIndicator: document.getElementById('sse-indicator'),
  };
  
  // Setup event listeners
  setupEventListeners();
  
  // Check authentication
  const isAuthenticated = await checkAuth();
  if (isAuthenticated) {
    showNotificationPermissionBanner();
    subscribeToSessions();
  }
}

// Check authentication status
async function checkAuth() {
  try {
    const resp = await fetch('/api/client/sessions');
    if (resp.ok) {
      elements.loginView.style.display = 'none';
      elements.app.style.display = 'block';
      loadSessions();
      return true;
    }
  } catch (e) { }
  elements.loginView.style.display = 'flex';
  return false;
}

// Load sessions from API - using HTMX-style fetch pattern
async function loadSessions() {
  const resp = await fetch('/api/client/sessions');
  const sessions = await resp.json();
  
  if (!sessions || sessions.length === 0) {
    elements.sessionsList.innerHTML = renderEmptyState();
    return;
  }
  
  elements.sessionsList.innerHTML = sessions.map(s => renderSessionItem(s)).join('');
}

// Render templates
function renderEmptyState() {
  return `
    <div class="empty-state">
      <svg class="empty-state-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
      <div class="empty-state-title">No active sessions</div>
      <div class="empty-state-text">Start a workflow with the action to see it here.</div>
    </div>`;
}

function renderSessionItem(session) {
  return `
    <div class="session-item" data-run-id="${session.runId}" data-repo="${session.repo || 'Unknown'}">
      <div class="session-icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
          <path d="M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25Zm1.75-.25a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25Z"/>
        </svg>
      </div>
      <div class="session-info">
        <div class="session-name">${session.repo || 'Unknown Repo'}</div>
        <div class="session-meta">Run #${session.runId || 'N/A'} • ${new Date(session.createdAt).toLocaleTimeString()}</div>
      </div>
      <span class="session-badge">Online</span>
      <svg class="session-arrow" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path fill-rule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"/>
      </svg>
    </div>`;
}

// Setup event listeners
function setupEventListeners() {
  // Session item clicks (event delegation)
  elements.sessionsList.addEventListener('click', (e) => {
    const sessionItem = e.target.closest('.session-item');
    if (sessionItem) {
      const runId = sessionItem.dataset.runId;
      const repo = sessionItem.dataset.repo;
      promptOTPAndConnect(runId, repo);
    }
  });
  
  // OTP input handling
  elements.otpInput.addEventListener('input', (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    e.target.value = value;
    elements.otpSubmit.disabled = value.length !== 6;
  });
  
  elements.otpInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.value.length === 6) {
      submitOTP();
    }
  });
  
  // Status banner click handler for new session flash
  elements.status.addEventListener('click', (e) => {
    const status = e.currentTarget;
    if (status.classList.contains('new-session')) {
      const runId = status.dataset.runId;
      const repo = status.dataset.repo;
      status.style.display = 'none';
      if (runId) {
        promptOTPAndConnect(runId, repo);
      }
    }
  });
}

// OTP Modal functions
function promptOTPAndConnect(runId, repoName) {
  pendingSession = { runId, repoName: repoName || 'Terminal' };

  // Reset modal state
  elements.otpInput.value = '';
  elements.otpError.style.display = 'none';
  elements.otpSubmit.disabled = true;
  elements.otpModal.classList.add('active');
  elements.otpInput.focus();
}

// Export for global access (used by onclick handlers in HTML)
window.cancelOTP = function() {
  elements.otpModal.classList.remove('active');
  pendingSession = null;
};

window.submitOTP = submitOTP;
async function submitOTP() {
  const otpCode = elements.otpInput.value;
  if (otpCode.length !== 6 || !pendingSession) return;

  elements.otpModal.classList.remove('active');

  // Connect with OTP
  await connectWithOTP(pendingSession.runId, otpCode, pendingSession.repoName);
  pendingSession = null;
}

// Connect to session
async function connectWithOTP(runId, otpCode, sessionName) {
  const callbacks = {
    onStatus: (status, message) => {
      elements.status.style.display = 'flex';
      elements.status.className = `status-banner ${status}`;
      elements.status.textContent = message;
    },
    onOtpFailed: (runId, message) => {
      pendingSession = { runId };
      elements.otpError.textContent = message;
      elements.otpError.style.display = 'block';
      elements.otpInput.value = '';
      elements.otpSubmit.disabled = true;
      elements.otpModal.classList.add('active');
      elements.otpInput.focus();
    },
    onTerminalOpen: async (initialData, name) => {
      // Update terminal header
      elements.terminalSessionName.textContent = name || 'Terminal';
      elements.terminalStatus.textContent = '';
      
      // Open terminal UI
      elements.terminalContainer.classList.add('open');
      elements.app.classList.add('terminal-open');
      
      await terminal.openTerminal(elements.terminalElement, initialData, name, (data) => {
        // Optional: handle input if needed
      });
      
      elements.status.style.display = 'none';
    },
    onTerminalData: (data) => {
      terminal.writeToTerminal(data);
    },
    onClose: () => {
      terminal.writeCloseMessage();
    }
  };

  await terminal.connectToSession(runId, otpCode, sessionName, callbacks);
}

// Close terminal (global for onclick handler)
window.closeTerminal = function() {
  elements.terminalContainer.classList.remove('open');
  elements.app.classList.remove('terminal-open');
  terminal.closeTerminal();
  elements.status.style.display = 'none';
};

// SSE subscription for session updates
function subscribeToSessions() {
  if (sessionsEventSource) {
    sessionsEventSource.close();
  }

  sessionsEventSource = new EventSource('/api/client/sessions/subscribe');

  sessionsEventSource.onopen = () => {
    console.log('Sessions SSE connected');
    setSseIndicator(true);
  };

  sessionsEventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log('Sessions SSE message:', data);

      if (data.type === 'new-session') {
        // Reload the sessions list
        loadSessions();
        
        // Show in-page flash notification
        showFlashNotification(data.session);
        
        // Show browser notification
        notifications.showNewSessionNotification(data.session, (session) => {
          if (session.runId) {
            promptOTPAndConnect(session.runId, session.repo || 'Unknown');
          }
        });
      }
    } catch (e) {
      console.error('Failed to parse SSE message:', e);
    }
  };

  sessionsEventSource.onerror = (err) => {
    console.error('Sessions SSE error:', err);
    setSseIndicator(false);
    // Reconnect after a delay
    setTimeout(() => {
      if (elements.app.style.display !== 'none') {
        subscribeToSessions();
      }
    }, 5000);
  };
}

function setSseIndicator(connected) {
  if (connected) {
    elements.sseIndicator.classList.add('connected');
  } else {
    elements.sseIndicator.classList.remove('connected');
  }
}

function showFlashNotification(session) {
  // Store session info for click handler
  elements.status.dataset.runId = session.runId || '';
  elements.status.dataset.repo = session.repo || 'Unknown';
  
  elements.status.className = 'status-banner new-session';
  elements.status.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25Zm1.75-.25a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25Z"/>
    </svg>
    New session: ${session.repo || 'Unknown'} #${session.runId || 'N/A'} — Click to connect
  `;
  elements.status.style.display = 'flex';
  
  // Clear any existing timeout
  if (flashTimeout) {
    clearTimeout(flashTimeout);
  }
  
  // Auto-hide after 5 seconds
  flashTimeout = setTimeout(() => {
    if (elements.status.classList.contains('new-session')) {
      elements.status.style.display = 'none';
    }
  }, 5000);
}

// Notification permission banner
function showNotificationPermissionBanner() {
  if (!notifications.shouldShowNotificationBanner()) {
    return;
  }

  elements.status.className = 'status-banner notification-prompt';
  elements.status.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 16a2 2 0 0 0 1.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 0 0 8 16ZM8 1.5A3.5 3.5 0 0 0 4.5 5v2.947c0 .346-.102.683-.294.97l-1.703 2.556a.018.018 0 0 0-.003.01l.001.006c0 .002.002.004.004.006l.006.004.007.001h10.964l.007-.001.006-.004.004-.006.001-.007a.017.017 0 0 0-.003-.01l-1.703-2.554a1.745 1.745 0 0 1-.294-.97V5A3.5 3.5 0 0 0 8 1.5Z"/>
    </svg>
    Enable notifications to be alerted when a new session is available
  `;
  elements.status.style.display = 'flex';
  elements.status.onclick = async () => {
    const granted = await notifications.requestNotificationPermission();
    if (granted) {
      elements.status.className = 'status-banner connected';
      elements.status.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/>
        </svg>
        Notifications enabled!
      `;
      setTimeout(() => {
        elements.status.style.display = 'none';
        elements.status.onclick = null;
      }, 2000);
    } else {
      elements.status.style.display = 'none';
      elements.status.onclick = null;
    }
  };
}
