'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Ẩn footer trên trang chủ (/)
  if (pathname === '/') {
    return null;
  }
  
  return <Footer />;
}

