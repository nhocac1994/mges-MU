// Debug Service Worker
// Run this in browser console to debug service worker issues

console.log('🔍 Service Worker Debug Tool');

// Check if service worker is supported
if ('serviceWorker' in navigator) {
  console.log('✅ Service Worker is supported');
  
  // Check current service worker
  navigator.serviceWorker.getRegistration().then(registration => {
    if (registration) {
      console.log('📱 Current Service Worker:', registration);
      console.log('🔗 Scope:', registration.scope);
      console.log('📊 State:', registration.active?.state);
      
      // Check if service worker is controlling the page
      if (navigator.serviceWorker.controller) {
        console.log('🎮 Service Worker is controlling the page');
      } else {
        console.log('⚠️ Service Worker is not controlling the page');
      }
    } else {
      console.log('❌ No Service Worker registered');
    }
  });
  
  // Check notifications permission
  if ('Notification' in window) {
    console.log('🔔 Notification permission:', Notification.permission);
  } else {
    console.log('❌ Notifications not supported');
  }
  
  // Check PWA installability
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('📱 PWA install prompt available');
  });
  
  // Check if app is installed
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('📱 App is running in standalone mode (installed)');
  } else {
    console.log('🌐 App is running in browser mode');
  }
  
} else {
  console.log('❌ Service Worker is not supported');
}

// Test notification
function testNotification() {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('🧪 Test Notification', {
      body: 'Service Worker test notification',
      icon: '/icon.jpg',
      tag: 'test'
    });
    console.log('✅ Test notification sent');
  } else {
    console.log('❌ Cannot send test notification - permission not granted');
  }
}

// Register test notification function globally
window.testNotification = testNotification;

console.log('💡 Run testNotification() to test notifications');
