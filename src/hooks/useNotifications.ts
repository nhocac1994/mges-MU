import { useState, useEffect, useCallback } from 'react';

interface NotificationPermission {
  granted: boolean;
  denied: boolean;
  default: boolean;
}

interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  requireInteraction?: boolean;
}

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>({
    granted: false,
    denied: false,
    default: false
  });
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Kiểm tra xem browser có hỗ trợ notifications không
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setIsSupported(true);
      // Cập nhật permission status ngay lập tức
      const currentPermission = Notification.permission;
      setPermission({
        granted: currentPermission === 'granted',
        denied: currentPermission === 'denied',
        default: currentPermission === 'default'
      });
    }
  }, []);

  const updatePermissionStatus = useCallback(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return;
    }

    const currentPermission = Notification.permission;
    setPermission({
      granted: currentPermission === 'granted',
      denied: currentPermission === 'denied',
      default: currentPermission === 'default'
    });
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) {

      return false;
    }

    try {
      const result = await Notification.requestPermission();
      updatePermissionStatus();
      return result === 'granted';
    } catch (error) {

      return false;
    }
  }, [isSupported, updatePermissionStatus]);

  const showNotification = useCallback((options: NotificationOptions) => {
    if (!isSupported || !permission.granted) {

      return null;
    }

    try {
      const notification = new Notification(options.title, {
        body: options.body,
        icon: options.icon || '/icon.jpg',
        badge: options.badge || '/icon.jpg',
        tag: options.tag,
        requireInteraction: options.requireInteraction || false
      });

      // Tự động đóng notification sau 10 giây
      setTimeout(() => {
        notification.close();
      }, 10000);

      return notification;
    } catch (error) {

      return null;
    }
  }, [isSupported, permission.granted]);

  const showEventNotification = useCallback((eventName: string, timeLeft: number, isStarting: boolean = false) => {
    let title, body;
    
    if (eventName === 'Chào mừng!') {
      title = '🎉 Chào mừng đến với Mu Season 1!';
      body = 'Bạn sẽ nhận thông báo về các sự kiện quan trọng trong game!';
    } else if (isStarting) {
      title = '🎮 Sự kiện đã bắt đầu!';
      body = `${eventName} đã bắt đầu! Hãy tham gia ngay!`;
    } else {
      title = '⏰ Sự kiện sắp bắt đầu!';
      body = `${eventName} sẽ bắt đầu trong ${Math.floor(timeLeft / 60)} phút!`;
    }

    return showNotification({
      title,
      body,
      tag: `event-${eventName.toLowerCase().replace(/\s+/g, '-')}`,
      requireInteraction: isStarting || eventName === 'Chào mừng!'
    });
  }, [showNotification]);

  return {
    isSupported,
    permission,
    requestPermission,
    showNotification,
    showEventNotification,
    updatePermissionStatus
  };
}
