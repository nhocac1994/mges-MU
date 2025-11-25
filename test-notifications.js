// Test notification functionality
// Add this to browser console to test notifications

// Check if notifications are supported
if ('Notification' in window) {
  console.log('✅ Notifications are supported');
  
  // Check current permission
  console.log('Current permission:', Notification.permission);
  
  // Request permission
  Notification.requestPermission().then((permission) => {
    console.log('Permission result:', permission);
    
    if (permission === 'granted') {
      // Test notification
      new Notification('🎮 Test Notification', {
        body: 'Thông báo test từ MuDauTruongSS1.Net',
        icon: '/icon.jpg',
        tag: 'test-notification'
      });
      console.log('✅ Test notification sent!');
    } else {
      console.log('❌ Permission denied');
    }
  });
} else {
  console.log('❌ Notifications are not supported');
}