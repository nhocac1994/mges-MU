'use client';

import { useEffect, useState } from 'react';
import { useIdleRedirect } from '@/hooks/useIdleRedirect';

export default function IdleRedirectProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setEnabled(mobile); // Chỉ bật trên mobile
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sử dụng hook idle redirect
  useIdleRedirect({
    idleTime: 60000, // 60 giây (1 phút)
    enabled: enabled && isMobile, // Chỉ bật trên mobile
    redirectTo: '/',
    excludePaths: ['/', '/login', '/register']
  });

  return <>{children}</>;
}

