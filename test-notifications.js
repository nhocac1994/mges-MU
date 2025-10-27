// Demo script để test browser notifications
// Chạy trong browser console để test

// Test notification permission
console.log('Notification support:', 'Notification' in window);
console.log('Current permission:', Notification.permission);

// Test notification
if ('Notification' in window && Notification.permission === 'granted') {
  const testNotification = new Notification('🎮 Test Event Notification', {
    body: 'Chaos Castle sẽ bắt đầu trong 5 phút!',
    icon: '/icon.jpg',
    badge: '/icon.jpg',
    tag: 'test-event',
    requireInteraction: true
  });
  
  // Auto close after 5 seconds
  setTimeout(() => {
    testNotification.close();
  }, 5000);
  
  console.log('Test notification sent!');
} else {
  console.log('Cannot send notification. Permission:', Notification.permission);
}

// Request permission
if ('Notification' in window && Notification.permission === 'default') {
  Notification.requestPermission().then((permission) => {
    console.log('Permission result:', permission);
  });
}
