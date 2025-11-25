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
      console.error('Error checking subscription:', error);
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
        console.warn('⚠️ Đăng ký push notification thất bại:', result.message || 'Unknown error');
        return false;
      }
    } catch (error) {
      console.error('❌ Error registering subscription với server:', error);
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
          console.warn('⚠️ Notification permission not granted:', permission);
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
              console.warn('⚠️ VAPID key API returned success=false:', keyResult);
            }
          } else {
            // Response không ok, log để debug
            const errorText = await keyResponse.text().catch(() => 'Unknown error');
            console.warn(`⚠️ VAPID key API returned ${keyResponse.status}:`, errorText);
          }
        } catch (error) {
          console.warn('⚠️ Could not fetch VAPID key from server:', error);
        }
      } else {
        
      }
      
      // Validate VAPID key format
      if (!vapidPublicKey) {
        console.error('❌ VAPID public key not available. Cannot subscribe to push notifications.');
        console.error('💡 Please ensure NEXT_PUBLIC_VAPID_PUBLIC_KEY is set in .env.local or backend C# is running with VAPID keys configured.');
        setIsLoading(false);
        return false;
      }

      // Validate VAPID key format (phải là base64 URL-safe string)
      if (typeof vapidPublicKey !== 'string' || vapidPublicKey.length < 80) {
        console.error('❌ Invalid VAPID key format. Key must be a base64 URL-safe string.');
        setIsLoading(false);
        return false;
      }

      // Convert VAPID key to Uint8Array
      let applicationServerKey: Uint8Array;
      try {
        applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);
      } catch (keyError) {
        console.error('❌ Failed to convert VAPID key:', keyError);
        console.error('💡 VAPID key format may be invalid. Expected base64 URL-safe string.');
        setIsLoading(false);
        return false;
      }

      // Kiểm tra xem đã có subscription chưa
      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        
        try {
          await existingSubscription.unsubscribe();
        } catch (unsubError) {
          console.warn('⚠️ Failed to unsubscribe existing subscription:', unsubError);
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
        console.error('❌ Failed to subscribe to push notifications:', subscribeError);
        
        // Cung cấp thông báo lỗi chi tiết hơn
        if (subscribeError.name === 'AbortError') {
          console.error('💡 AbortError: Push service registration failed. Possible causes:');
          console.error('   1. VAPID key không hợp lệ hoặc không match với private key trên server');
          console.error('   2. Browser đã chặn push service (kiểm tra browser settings)');
          console.error('   3. Service worker không có quyền truy cập push service');
          console.error('   4. Network error hoặc timeout');
        } else if (subscribeError.name === 'NotAllowedError') {
          console.error('💡 NotAllowedError: User denied permission or browser blocked push notifications');
        } else if (subscribeError.name === 'InvalidStateError') {
          console.error('💡 InvalidStateError: Service worker registration is not active');
        } else {
          console.error('💡 Unknown error:', subscribeError.name, subscribeError.message);
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
      console.error('❌ Error subscribing to push:', error);
      console.error('Error details:', {
        name: error?.name,
        message: error?.message,
        stack: error?.stack
      });
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
      console.error('Error unsubscribing:', error);
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
      console.warn(`⚠️ VAPID key length is ${outputArray.length} bytes. Expected 64-65 bytes.`);
    }

    return outputArray;
  } catch (error) {
    console.error('❌ Error converting VAPID key:', error);
    throw new Error(`Failed to convert VAPID key: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

