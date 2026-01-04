// Service Worker for Background Notifications
// This file will handle notifications even when the app is closed

const CACHE_NAME = 'mu-online-v2';
const urlsToCache = [
  '/',
  '/rankings',
  '/download',
  '/login',
  '/register',
  '/icon.jpg',
  '/Panael-mu.JPEG'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Service Worker: Cache failed', error);
      })
  );
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control of all clients immediately
  self.clients.claim();
});

// Fetch event - Network First Strategy (ưu tiên network, chỉ dùng cache khi offline)
self.addEventListener('fetch', (event) => {
  // Chỉ xử lý GET requests (Cache API không hỗ trợ POST/PUT/DELETE)
  if (event.request.method !== 'GET') {
    // Với các request không phải GET, chỉ fetch trực tiếp từ network
    event.respondWith(fetch(event.request));
    return;
  }

  // Skip cache cho các request HTML và API để luôn lấy version mới
  if (event.request.headers.get('accept')?.includes('text/html') ||
      event.request.url.includes('/api/') ||
      event.request.url.includes('/_next/')) {
    // Network first cho HTML và API - KHÔNG cache
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          return response;
        })
        .catch(() => {
          // Fallback to cache chỉ khi offline
          return caches.match(event.request);
        })
    );
  } else {
    // Cache first cho static assets (images, CSS, JS, etc) - CHỈ GET requests
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request).then((fetchResponse) => {
            // Cache response mới (chỉ GET requests)
            if (fetchResponse.ok && event.request.method === 'GET') {
              const responseToCache = fetchResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            return fetchResponse;
          });
        })
    );
  }
});

// Background sync for notifications
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Push event for notifications - Nhận push messages từ server C#
self.addEventListener('push', (event) => {
  console.log('Push event received:', event);
  
  let notificationData = {
    title: '🎮 Thông báo từ server',
    body: 'Bạn có thông báo mới',
    icon: '/icon.jpg',
    badge: '/icon.jpg',
    tag: 'server-notification',
    url: '/',
    requireInteraction: true,
  };

  if (event.data) {
    try {
      const data = event.data.json();
      notificationData = {
        title: data.title || notificationData.title,
        body: data.body || data.message || notificationData.body,
        icon: data.icon || notificationData.icon,
        badge: data.badge || notificationData.badge,
        tag: data.tag || notificationData.tag,
        url: data.url || notificationData.url,
        requireInteraction: data.requireInteraction !== false,
      };
    } catch (error) {
      // Nếu không phải JSON, thử parse text
      const text = event.data.text();
      if (text) {
        notificationData.body = text;
      }
    }
  }
  
  const options = {
    body: notificationData.body,
    icon: notificationData.icon,
    badge: notificationData.badge,
    tag: notificationData.tag,
    requireInteraction: notificationData.requireInteraction,
    data: {
      url: notificationData.url,
    },
    actions: [
      {
        action: 'open',
        title: 'Mở Game',
        icon: '/icon.jpg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(notificationData.title, options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';

  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
        // Tìm tab đã mở
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        // Mở tab mới nếu chưa có
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
    );
  }
});

// Background sync function - Check events và notifications
async function doBackgroundSync() {
  try {
    // Check for upcoming events
    const eventResponse = await fetch('/api/events/check');
    const eventResult = await eventResponse.json();
    
    if (eventResult.success && eventResult.events) {
      const events = eventResult.events;
      
      // Gửi thông báo cho từng sự kiện
      for (const event of events) {
        if (event.shouldNotify) {
          await self.registration.showNotification(event.title || '🎮 Sự kiện sắp diễn ra!', {
            body: event.message || event.description || 'Sự kiện game sắp bắt đầu!',
            icon: '/icon.jpg',
            badge: '/icon.jpg',
            tag: `event-${event.id || Date.now()}`,
            requireInteraction: event.requireInteraction !== false,
            data: {
              url: event.url || '/',
              eventId: event.id
            },
            actions: [
              {
                action: 'open',
                title: 'Xem chi tiết',
                icon: '/icon.jpg'
              }
            ]
          });
        }
      }
    }

    // Check for notifications từ notification.txt
    const notifResponse = await fetch('/api/notifications/list');
    const notifResult = await notifResponse.json();
    
    if (notifResult.success && notifResult.notifications) {
      for (const notification of notifResult.notifications) {
        if (notification.shouldSend) {
          await self.registration.showNotification(notification.title, {
            body: notification.message,
            icon: '/icon.jpg',
            badge: '/icon.jpg',
            tag: `notification-${notification.id || Date.now()}`,
            requireInteraction: true,
            data: {
              url: '/',
              notificationId: notification.id
            },
            actions: [
              {
                action: 'open',
                title: 'Xem',
                icon: '/icon.jpg'
              }
            ]
          });
        }
      }
    }
  } catch (error) {
    console.log('Background sync failed:', error);
  }
}

// Check events và notifications định kỳ (mỗi phút)
// Chỉ chạy khi service worker active
if (self.registration) {
  // Check ngay khi service worker activate
  doBackgroundSync();
  
  // Check định kỳ mỗi phút
  setInterval(() => {
    doBackgroundSync();
  }, 60000); // 60 giây = 1 phút
}

// Periodic background sync (if supported)
if ('serviceWorker' in navigator && 'periodicSync' in window.ServiceWorkerRegistration.prototype) {
  self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'event-check') {
      event.waitUntil(doBackgroundSync());
    }
  });
}
