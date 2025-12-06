'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface UseIdleRedirectOptions {
  idleTime?: number; // Thời gian idle (ms) - mặc định 60 giây
  enabled?: boolean; // Bật/tắt tính năng
  redirectTo?: string; // Trang chuyển đến khi idle
  excludePaths?: string[]; // Các path không áp dụng idle redirect
}

/**
 * Hook để tự động redirect về trang chính sau khi idle
 * Khi user tương tác (scroll, click, touch), quay lại trang trước đó
 */
export function useIdleRedirect(options: UseIdleRedirectOptions = {}) {
  const {
    idleTime = 60000, // 60 giây
    enabled = true,
    redirectTo = '/',
    excludePaths = ['/', '/login', '/register']
  } = options;

  const router = useRouter();
  const pathname = usePathname();
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const previousPathRef = useRef<string | null>(null);
  const isIdleRedirectedRef = useRef(false);

  // Lưu path trước đó khi chuyển trang
  useEffect(() => {
    if (pathname !== redirectTo && !excludePaths.includes(pathname)) {
      previousPathRef.current = pathname;
    }
  }, [pathname, redirectTo, excludePaths]);

  // Reset idle timer khi có tương tác
  const resetIdleTimer = () => {
    if (!enabled) return;
    if (excludePaths.includes(pathname)) return;

    // Clear timer cũ
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    // Nếu đã redirect về trang chính và user tương tác, quay lại trang trước
    if (isIdleRedirectedRef.current && pathname === redirectTo && previousPathRef.current) {
      isIdleRedirectedRef.current = false;
      router.push(previousPathRef.current);
      return;
    }

    // Set timer mới
    idleTimerRef.current = setTimeout(() => {
      if (pathname !== redirectTo && !excludePaths.includes(pathname)) {
        isIdleRedirectedRef.current = true;
        router.push(redirectTo);
      }
    }, idleTime);
  };

  // Lắng nghe các sự kiện tương tác
  useEffect(() => {
    if (!enabled) return;
    if (excludePaths.includes(pathname)) return;

    // Các sự kiện reset idle timer
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      window.addEventListener(event, resetIdleTimer, { passive: true });
    });

    // Khởi tạo timer
    resetIdleTimer();

    // Cleanup
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetIdleTimer);
      });
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [enabled, pathname, idleTime, redirectTo, excludePaths, router]);

  return {
    resetIdleTimer,
    isIdleRedirected: isIdleRedirectedRef.current
  };
}

