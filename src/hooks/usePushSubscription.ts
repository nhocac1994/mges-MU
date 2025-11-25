import { useState, useEffect, useCallback } from 'react';

interface PushSubscriptionData {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export function usePushSubscription() {
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Kiểm tra browser có hỗ trợ push notifications không
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      checkSubscription();
    }
  }, []);

  const checkSubscription = useCallback(async () => {
    if (!isSupported) return;

    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.getSubscription();
      
      if (sub) {
        setSubscription(sub);
        setIsSubscribed(true);
        // Đăng ký lại với server
        await registerSubscription(sub);
      } else {
        setIsSubscribed(false);
      }
    } catch (error) {

    }
  }, [isSupported]);

  const registerSubscription = async (sub: PushSubscription) => {
    try {
      const subscriptionData: PushSubscriptionData = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: arrayBufferToBase64(sub.getKey('p256dh')!),
          auth: arrayBufferToBase64(sub.getKey('auth')!),
        },
      };

      const response = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscription: subscriptionData }),
      });

      const result = await response.json();
      if (result.success) {
        // Chỉ log khi thành công, không log endpoint dài

        if (result.subscriptionId) {
          localStorage.setItem('push-subscription-id', result.subscriptionId);
        }
        return true;
      } else {

        return false;
      }
    } catch (error) {

      return false;
    }
  };

  const subscribe = useCallback(async (): Promise<boolean> => {
    if (!isSupported || isLoading) return false;

    setIsLoading(true);

    try {
      // Kiểm tra notification permission trước
      if (Notification.permission !== 'granted') {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {

          setIsLoading(false);
          return false;
        }
      }

      // Đảm bảo service worker đã ready
      let registration: ServiceWorkerRegistration;
      try {
        registration = await navigator.serviceWorker.ready;

      } catch (swError) {

        setIsLoading(false);
        return false;
      }

      // Kiểm tra push manager có sẵn sàng không
      if (!registration.pushManager) {

        setIsLoading(false);
        return false;
      }
      
      // Lấy VAPID public key từ server hoặc config
      let vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      
      // Nếu không có trong env, lấy từ server
      if (!vapidPublicKey) {
        try {
          const keyResponse = await fetch('/api/push/vapid-key', {
            signal: AbortSignal.timeout(5000), // Timeout 5 giây
          });
          if (keyResponse.ok) {
            const keyResult = await keyResponse.json();
            if (keyResult.success && keyResult.publicKey) {
              vapidPublicKey = keyResult.publicKey;

            } else {

            }
          } else {
            // Response không ok, log để debug
            const errorText = await keyResponse.text().catch(() => 'Unknown error');

          }
        } catch (error) {

        }
      } else {

      }
      
      // Validate VAPID key format
      if (!vapidPublicKey) {


        setIsLoading(false);
        return false;
      }

      // Validate VAPID key format (phải là base64 URL-safe string)
      if (typeof vapidPublicKey !== 'string' || vapidPublicKey.length < 80) {

        setIsLoading(false);
        return false;
      }

      // Convert VAPID key to Uint8Array
      let applicationServerKey: Uint8Array;
      try {
        applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);

      } catch (keyError) {


        setIsLoading(false);
        return false;
      }

      // Kiểm tra xem đã có subscription chưa
      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {

        try {
          await existingSubscription.unsubscribe();
        } catch (unsubError) {

        }
      }
      
      // Subscribe với retry logic
      let sub: PushSubscription;
      try {

        sub = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey as BufferSource,
        });

      } catch (subscribeError: any) {

        // Cung cấp thông báo lỗi chi tiết hơn
        if (subscribeError.name === 'AbortError') {
        } else if (subscribeError.name === 'NotAllowedError') {

        } else if (subscribeError.name === 'InvalidStateError') {

        } else {

        }
        
        setIsLoading(false);
        return false;
      }

      setSubscription(sub);
      setIsSubscribed(true);

      // Đăng ký với server
      const registered = await registerSubscription(sub);
      setIsLoading(false);
      
      return registered;
    } catch (error: any) {


      setIsLoading(false);
      return false;
    }
  }, [isSupported, isLoading]);

  const unsubscribe = useCallback(async (): Promise<boolean> => {
    if (!subscription || isLoading) return false;

    setIsLoading(true);

    try {
      await subscription.unsubscribe();
      
      const subscriptionId = localStorage.getItem('push-subscription-id');
      if (subscriptionId) {
        await fetch('/api/push/subscribe', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subscriptionId }),
        });
        localStorage.removeItem('push-subscription-id');
      }

      setSubscription(null);
      setIsSubscribed(false);
      setIsLoading(false);
      
      return true;
    } catch (error) {

      setIsLoading(false);
      return false;
    }
  }, [subscription, isLoading]);

  return {
    isSupported,
    isSubscribed,
    isLoading,
    subscription,
    subscribe,
    unsubscribe,
    checkSubscription,
  };
}

// Helper functions
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  try {
    // Validate input
    if (!base64String || typeof base64String !== 'string') {
      throw new Error('Invalid base64 string: input must be a non-empty string');
    }

    // Remove whitespace
    base64String = base64String.trim();

    // Add padding if needed
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    
    // Convert URL-safe base64 to standard base64
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    // Decode base64
    let rawData: string;
    try {
      rawData = window.atob(base64);
    } catch (btoaError) {
      throw new Error(`Failed to decode base64: ${btoaError instanceof Error ? btoaError.message : 'Unknown error'}`);
    }

    // Convert to Uint8Array
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    // Validate output length (VAPID key should be 65 bytes for uncompressed public key)
    if (outputArray.length < 64 || outputArray.length > 65) {

    }

    return outputArray;
  } catch (error) {

    throw new Error(`Failed to convert VAPID key: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

