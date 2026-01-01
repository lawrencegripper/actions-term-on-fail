// Notifications module - handles browser notifications
let notificationPermission = false;

export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    notificationPermission = true;
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    notificationPermission = permission === 'granted';
    return notificationPermission;
  }

  return false;
}

export function showNewSessionNotification(session, onClickHandler) {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  const notification = new Notification('New Terminal Session', {
    body: `${session.repo || 'Unknown Repo'} - Run #${session.runId || 'N/A'}`,
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%233fb950" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M6 8l3 3-3 3M11 14h4"/></svg>',
    tag: `session-${session.runId}`,
    requireInteraction: false,
  });

  notification.onclick = () => {
    window.focus();
    notification.close();
    onClickHandler?.(session);
  };

  // Auto-close after 10 seconds
  setTimeout(() => notification.close(), 10000);
}

export function shouldShowNotificationBanner() {
  if (!('Notification' in window)) {
    return false;
  }
  return Notification.permission !== 'granted' && Notification.permission !== 'denied';
}
