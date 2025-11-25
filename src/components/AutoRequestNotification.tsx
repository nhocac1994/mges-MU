'use client';

import { useEffect, useState } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { usePushSubscription } from '@/hooks/usePushSubscription';
import { useConfig } from '@/contexts/ConfigContext';

/**
 * Component tự động yêu cầu notification permission khi vào website
 * Chỉ hiển thị một lần và lưu vào localStorage
 * Tự động subscribe push notification sau khi permission được granted
 * Hiển thị notification chào mừng khi đã đăng ký thông báo
 */
export default function AutoRequestNotification() {
  const { isSupported, permission, requestPermission, updatePermissionStatus, showNotification } = useNotifications();
  const { isSubscribed, subscribe, checkSubscription } = usePushSubscription();
  const { config, loading: configLoading } = useConfig();
  const [hasRequested, setHasRequested] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Cập nhật permission status
    updatePermissionStatus();
    
    // Kiểm tra subscription hiện tại
    if (isSupported && 'serviceWorker' in navigator) {
      checkSubscription();
    }
  }, [mounted, isSupported, checkSubscription, updatePermissionStatus]);

  // Hiển thị notification chào mừng khi đã đăng ký thông báo
  useEffect(() => {
    if (!mounted || !isSupported || configLoading) return;
    
    const currentPermission = typeof window !== 'undefined' && 'Notification' in window 
      ? Notification.permission 
      : 'default';
    
    // Chỉ hiển thị nếu:
    // 1. Permission đã granted
    // 2. Đã subscribe
    // 3. Config đã load xong
    // 4. Chưa hiển thị welcome notification trong session này
    if (currentPermission === 'granted' && isSubscribed && !configLoading && config) {
      const welcomeShown = sessionStorage.getItem('welcome-notification-shown');
      
      if (!welcomeShown) {
        // Đợi một chút để đảm bảo config đã load hoàn toàn
        setTimeout(() => {
          // Lấy tên game từ config, ưu tiên nameGame từ server
          const gameName = config?.nameGame || config?.serverName || 'MuDauTruongSS1';
          
          showNotification({
            title: `🎉 Chào mừng bạn đến với ${gameName}!`,
            body: 'Bạn sẽ nhận thông báo về các sự kiện quan trọng trong game!',
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            tag: 'welcome-notification',
            requireInteraction: false
          });
          
          // Đánh dấu đã hiển thị trong session này
          sessionStorage.setItem('welcome-notification-shown', 'true');
        }, 2000); // Đợi 2 giây sau khi config đã load
      }
    }
  }, [mounted, isSupported, isSubscribed, config, configLoading, showNotification]);

  useEffect(() => {
    if (!mounted || !isSupported) return;

    // Kiểm tra permission hiện tại từ browser
    const currentPermission = typeof window !== 'undefined' && 'Notification' in window 
      ? Notification.permission 
      : 'default';

    // Kiểm tra xem đã request permission chưa
    const requested = localStorage.getItem('notification-permission-requested');
    if (requested === 'true') {
      setHasRequested(true);
      
      // Nếu permission đã granted nhưng chưa subscribe, tự động subscribe (chỉ log khi thực sự subscribe)
      if (currentPermission === 'granted' && 'serviceWorker' in navigator && 'PushManager' in window && !isSubscribed) {
        setTimeout(async () => {
          try {
            const subscribed = await subscribe();
            // Chỉ log khi thành công, không log "đang subscribe"
            
            // Hiển thị notification chào mừng sau khi subscribe thành công
            if (subscribed) {
              setTimeout(() => {
                // Đợi config load xong nếu chưa
                if (!configLoading && config) {
                  const gameName = config?.nameGame || config?.serverName || 'MuDauTruongSS1';
                  showNotification({
                    title: `🎉 Chào mừng bạn đến với ${gameName}!`,
                    body: 'Bạn sẽ nhận thông báo về các sự kiện quan trọng trong game!',
                    icon: '/favicon.ico',
                    badge: '/favicon.ico',
                    tag: 'welcome-notification',
                    requireInteraction: false
                  });
                }
              }, 2000); // Đợi 2 giây để config load
            }
          } catch (error) {

          }
        }, 1000);
      }
      return;
    }

    // Chỉ request nếu:
    // 1. Browser hỗ trợ notifications
    // 2. Permission chưa được cấp (default)
    // 3. Chưa request trước đó
    // 4. Service worker đã ready (nếu có)
    if (currentPermission === 'default' && !hasRequested) {
      // Đợi service worker ready (nếu có) và đợi 2 giây để user có thời gian xem trang
      const timer = setTimeout(async () => {
        try {
          // Đợi service worker ready nếu có
          if ('serviceWorker' in navigator) {
            try {
              await navigator.serviceWorker.ready;
            } catch (error) {
              // Chỉ log lỗi, không log warning
            }
          }

          const granted = await requestPermission();
          
          if (granted) {

            // Lưu vào localStorage để không request lại
            localStorage.setItem('notification-permission-requested', 'true');
            localStorage.setItem('notification-permission-granted', 'true');
            
            // Tự động subscribe push notification sau khi permission được granted
            if ('serviceWorker' in navigator && 'PushManager' in window && !isSubscribed) {
              try {
                const subscribed = await subscribe();
                // Log trong usePushSubscription, không log ở đây
                
                // Hiển thị notification chào mừng sau khi subscribe thành công
                if (subscribed) {
                  setTimeout(() => {
                    // Đợi config load xong nếu chưa
                    if (!configLoading && config) {
                      const gameName = config?.nameGame || config?.serverName || 'MuDauTruongSS1';
                      showNotification({
                        title: `🎉 Chào mừng bạn đến với ${gameName}!`,
                        body: 'Bạn sẽ nhận thông báo về các sự kiện quan trọng trong game!',
                        icon: '/favicon.ico',
                        badge: '/favicon.ico',
                        tag: 'welcome-notification',
                        requireInteraction: false
                      });
                    }
                  }, 2000); // Đợi 2 giây để config load
                }
              } catch (error) {

              }
            }
          } else {

            localStorage.setItem('notification-permission-requested', 'true');
            localStorage.setItem('notification-permission-granted', 'false');
          }
          setHasRequested(true);
        } catch (error) {

          setHasRequested(true);
        }
      }, 2000); // Đợi 2 giây

      return () => clearTimeout(timer);
    } else if (currentPermission === 'granted') {
      localStorage.setItem('notification-permission-requested', 'true');
      localStorage.setItem('notification-permission-granted', 'true');
      setHasRequested(true);
      
      // Tự động subscribe push notification nếu permission đã granted và chưa subscribe
      if ('serviceWorker' in navigator && 'PushManager' in window && !isSubscribed) {
        // Đợi một chút để đảm bảo service worker ready
        setTimeout(async () => {
          try {
            const subscribed = await subscribe();
            // Log trong usePushSubscription, không log ở đây
            
            // Hiển thị notification chào mừng sau khi subscribe thành công
            if (subscribed) {
              setTimeout(() => {
                // Đợi config load xong nếu chưa
                if (!configLoading && config) {
                  const gameName = config?.nameGame || config?.serverName || 'MuDauTruongSS1';
                  showNotification({
                    title: `🎉 Chào mừng bạn đến với ${gameName}!`,
                    body: 'Bạn sẽ nhận thông báo về các sự kiện quan trọng trong game!',
                    icon: '/favicon.ico',
                    badge: '/favicon.ico',
                    tag: 'welcome-notification',
                    requireInteraction: false
                  });
                }
              }, 2000); // Đợi 2 giây để config load
            }
          } catch (error) {

          }
        }, 1000);
      }
    } else if (currentPermission === 'denied') {
      localStorage.setItem('notification-permission-requested', 'true');
      localStorage.setItem('notification-permission-granted', 'false');
      setHasRequested(true);
    }
  }, [mounted, isSupported, permission, requestPermission, hasRequested, isSubscribed, subscribe, config, configLoading, showNotification]);

  // Component này không render gì cả, chỉ chạy logic
  return null;
}

