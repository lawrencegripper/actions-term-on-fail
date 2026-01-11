// Main Vue application
import { createApp, ref, onMounted, onUnmounted } from 'vue';
import * as terminal from './terminal.js';
import * as notifications from './notifications.js';

// Import components
import LoginView from './components/LoginView.js';
import StatusBanner from './components/StatusBanner.js';
import SessionList from './components/SessionList.js';
import OtpModal from './components/OtpModal.js';
import TerminalPanel from './components/TerminalPanel.js';

const App = {
  components: {
    LoginView,
    StatusBanner,
    SessionList,
    OtpModal,
    TerminalPanel
  },

  template: '#app-template',

  setup() {
    // State
    const isLoading = ref(true);
    const isAuthenticated = ref(false);
    const sessions = ref([]);
    const sseConnected = ref(false);
    const statusMessage = ref(null);
    const statusType = ref('');
    const showOtpModal = ref(false);
    const terminalOpen = ref(false);
    const terminalSessionName = ref('Terminal');
    const pendingSession = ref(null);

    let sessionsEventSource = null;
    let flashTimeout = null;

    // Auth & Sessions
    async function checkAuth() {
      try {
        const resp = await fetch('/api/client/sessions');
        if (resp.ok) {
          isAuthenticated.value = true;
          sessions.value = await resp.json() || [];
          return true;
        }
      } catch (e) { }
      isAuthenticated.value = false;
      return false;
    }

    async function loadSessions() {
      try {
        const resp = await fetch('/api/client/sessions');
        sessions.value = await resp.json() || [];
      } catch (e) {
        console.error('Failed to load sessions:', e);
      }
    }

    // Status management
    function showStatus(type, message) {
      statusType.value = type;
      statusMessage.value = message;
    }

    function hideStatus() {
      statusMessage.value = null;
      statusType.value = '';
    }

    // OTP flow
    function promptOtp(session) {
      if (terminalOpen.value) {
        closeTerminal();
      }
      pendingSession.value = {
        runId: session.runId,
        repoName: session.repo || 'Terminal'
      };
      showOtpModal.value = true;
    }

    function cancelOtp() {
      showOtpModal.value = false;
      pendingSession.value = null;
    }

    async function submitOtp(code) {
      if (!pendingSession.value) return;

      showOtpModal.value = false;
      const { runId, repoName } = pendingSession.value;
      pendingSession.value = null;

      await connectWithOtp(runId, code, repoName);
    }

    async function connectWithOtp(runId, code, sessionName) {
      const callbacks = {
        onStatus: (status, message) => showStatus(status, message),
        onOtpFailed: (runId, message) => {
          // Don't re-show OTP modal - the runner will disconnect after a bad OTP
          showStatus('error', message || 'OTP verification failed');
        },
        onTerminalOpen: async (initialData, name) => {
          terminalSessionName.value = name || 'Terminal';
          terminalOpen.value = true;
          hideStatus();
          await terminal.openTerminal(
            document.getElementById('terminal'),
            initialData,
            name
          );
        },
        onTerminalData: (data) => terminal.writeToTerminal(data),
        onClose: () => {
          closeTerminal();
        }
      };

      await terminal.connectToSession(runId, code, sessionName, callbacks);
    }

    function closeTerminal() {
      terminalOpen.value = false;
      terminal.closeTerminal();
      hideStatus();
    }

    // SSE subscription
    function subscribeToSessions() {
      if (sessionsEventSource) {
        sessionsEventSource.close();
      }

      sessionsEventSource = new EventSource('/api/client/sessions/subscribe');

      sessionsEventSource.onopen = () => {
        console.log('Sessions SSE connected');
        sseConnected.value = true;
      };

      sessionsEventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'new-session') {
            loadSessions();
            showFlashNotification(data.session);
            notifications.showNewSessionNotification(data.session, promptOtp);
          } else if (data.type === 'removed-session') {
            loadSessions();
          }
        } catch (e) {
          console.error('Failed to parse SSE message:', e);
        }
      };

      sessionsEventSource.onerror = async () => {
        console.error('Sessions SSE error');
        showStatus('error', 'Error connecting to the signaling server. Retrying...');
        sseConnected.value = false;

        // Check if we're still authenticated
        try {
          const resp = await fetch('/api/client/sessions');
          if (!resp.ok) {
            console.error('SSE reconnect auth check failed:', resp.status, resp.statusText);
            showStatus('error', 'Error authenticating to server. Try reloading the page.');            
          }
        } catch (e) {
            console.error('SSE reconnect communication error:', e);
            showStatus('error', 'Error communicating to server. Try reloading the page.');            
        }

        setTimeout(() => {
          if (isAuthenticated.value) subscribeToSessions();
        }, 5000);
      };
    }

    function showFlashNotification(session) {
      statusType.value = 'new-session';
      statusMessage.value = { type: 'new-session', session };

      if (flashTimeout) clearTimeout(flashTimeout);
      flashTimeout = setTimeout(() => {
        if (statusType.value === 'new-session') hideStatus();
      }, 5000);
    }

    function onNewSessionClick() {
      if (statusMessage.value?.session) {
        const session = statusMessage.value.session;
        hideStatus();
        promptOtp(session);
      }
    }

    // Notifications
    async function showNotificationBanner() {
      if (!notifications.shouldShowNotificationBanner()) return;
      statusType.value = 'notification-prompt';
      statusMessage.value = { type: 'notification-prompt' };
    }

    async function enableNotifications() {
      const granted = await notifications.requestNotificationPermission();
      if (granted) {
        statusType.value = 'connected';
        statusMessage.value = { type: 'notification-enabled' };
        setTimeout(hideStatus, 2000);
      } else {
        hideStatus();
      }
    }

    // Lifecycle
    onMounted(async () => {
      await terminal.initTerminal();
      terminal.setupResizeHandler();

      const authed = await checkAuth();
      isLoading.value = false;

      if (authed) {
        showNotificationBanner();
        subscribeToSessions();
      }
    });

    onUnmounted(() => {
      sessionsEventSource?.close();
    });

    return {
      isLoading,
      isAuthenticated,
      sessions,
      sseConnected,
      statusMessage,
      statusType,
      showOtpModal,
      terminalOpen,
      terminalSessionName,
      promptOtp,
      cancelOtp,
      submitOtp,
      closeTerminal,
      onNewSessionClick,
      enableNotifications
    };
  }
};

export async function initApp() {
  const app = createApp(App);
  app.mount('#vue-app');
}
