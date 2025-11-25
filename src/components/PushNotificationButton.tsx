'use client';

import { useState, useEffect } from 'react';
import { usePushSubscription } from '@/hooks/usePushSubscription';
import { useNotifications } from '@/hooks/useNotifications';

/**
 * Component để đăng ký push notifications
 * Hiển thị button để user đăng ký nhận thông báo
 */
export default function PushNotificationButton() {
  const { isSupported, isSubscribed, isLoading, subscribe, unsubscribe, checkSubscription } = usePushSubscription();
  const { permission, requestPermission } = useNotifications();
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    if (isSupported) {
      checkSubscription();
    }
  }, [isSupported, checkSubscription]);

  const handleSubscribe = async () => {
    setIsRequesting(true);
    
    try {
      // Request notification permission trước
      if (permission.default) {
        const granted = await requestPermission();
        if (!granted) {
          setIsRequesting(false);
          return;
        }
      }

      // Subscribe to push
      const success = await subscribe();
      if (success) {

      } else {

      }
    } catch (error) {

    } finally {
      setIsRequesting(false);
    }
  };

  const handleUnsubscribe = async () => {
    setIsRequesting(true);
    try {
      await unsubscribe();
    } catch (error) {

    } finally {
      setIsRequesting(false);
    }
  };

  if (!isSupported) {
    return null; // Không hiển thị nếu browser không hỗ trợ
  }

  if (isSubscribed) {
    return (
      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 text-xs text-green-300">
        ✅ Đã đăng ký nhận thông báo đẩy. Bạn sẽ nhận thông báo ngay cả khi đóng trình duyệt.
        <button
          onClick={handleUnsubscribe}
          disabled={isRequesting || isLoading}
          className="ml-2 text-red-400 hover:text-red-300 underline"
        >
          Hủy đăng ký
        </button>
      </div>
    );
  }

  return (
    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white text-sm font-semibold mb-1">🔔 Nhận thông báo đẩy</p>
          <p className="text-gray-300 text-xs">
            Đăng ký để nhận thông báo về sự kiện và cập nhật ngay cả khi đóng trình duyệt
          </p>
        </div>
        <button
          onClick={handleSubscribe}
          disabled={isRequesting || isLoading || permission.denied}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded text-sm font-semibold transition-colors whitespace-nowrap"
        >
          {isRequesting || isLoading ? 'Đang xử lý...' : 'Đăng ký'}
        </button>
      </div>
      {permission.denied && (
        <p className="text-red-400 text-xs mt-2">
          ⚠️ Bạn đã từ chối thông báo. Vui lòng bật lại trong cài đặt trình duyệt.
        </p>
      )}
    </div>
  );
}

