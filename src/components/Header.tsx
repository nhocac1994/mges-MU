'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    // Trên trang chủ: chỉ hiện khi scroll, trên trang khác: luôn hiện
    if (!isHomePage) {
      setIsScrolled(true);
    } else {
      // Kiểm tra scroll position ban đầu
      handleScroll();
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isHomePage]);

  // Đóng mobile menu khi route thay đổi
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      {/* Top Header - Hidden on homepage initially, always visible on other pages */}
      <motion.div 
        className="fixed top-0 left-0 right-0 bg-black/95 py-2 border-b border-gray-600 z-[100] glass-strong"
        initial={false}
        animate={{ 
          y: isClient && (isScrolled || !isHomePage) ? 0 : -100, 
          opacity: isClient && (isScrolled || !isHomePage) ? 1 : 0,
          pointerEvents: isClient && (isScrolled || !isHomePage) ? 'auto' : 'none'
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-6xl mx-auto px-5 flex justify-between items-center">
          <div className="text-green-400 text-sm font-medium whitespace-nowrap">🟢 Server Online</div>
          <div className="flex gap-3 items-center">
            <Link href="/register" className="text-white text-sm font-medium px-3 py-1 rounded hover:text-blue-300 hover:bg-blue-500/10 transition-all whitespace-nowrap">
              ĐĂNG KÝ
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/login" className="text-white text-sm font-medium px-3 py-1 rounded hover:text-blue-300 hover:bg-blue-500/10 transition-all whitespace-nowrap">
              ĐĂNG NHẬP
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Navigation - Hidden on homepage initially, always visible on other pages */}
      <motion.nav 
        className="fixed top-12 left-0 right-0 bg-black/95 py-4 border-b-2 border-blue-400 z-[100] glass-strong"
        initial={false}
        animate={{ 
          y: isClient && (isScrolled || !isHomePage) ? 0 : -100, 
          opacity: isClient && (isScrolled || !isHomePage) ? 1 : 0,
          pointerEvents: isClient && (isScrolled || !isHomePage) ? 'auto' : 'none'
        }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-6xl mx-auto px-5">
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center">
            <div className="flex gap-8 justify-center">
              <Link 
                href="/" 
                className={`font-bold transition-colors px-4 py-2 rounded hover:bg-blue-500/10 ${
                  isActive('/') ? 'text-blue-300' : 'text-white hover:text-blue-300'
                }`}
              >
                TRANG CHỦ
              </Link>
              <Link 
                href="/info" 
                className={`font-bold transition-colors px-4 py-2 rounded hover:bg-blue-500/10 ${
                  isActive('/info') ? 'text-blue-300' : 'text-white hover:text-blue-300'
                }`}
              >
                THÔNG TIN
              </Link>
              <Link 
                href="/download" 
                className={`font-bold transition-colors px-4 py-2 rounded hover:bg-blue-500/10 ${
                  isActive('/download') ? 'text-blue-300' : 'text-white hover:text-blue-300'
                }`}
              >
                TẢI GAME
              </Link>
              <Link 
                href="/donate" 
                className={`font-bold transition-colors px-4 py-2 rounded hover:bg-blue-500/10 ${
                  isActive('/donate') ? 'text-blue-300' : 'text-white hover:text-blue-300'
                }`}
              >
                QUYÊN GÓP
              </Link>
              <Link 
                href="/news" 
                className={`font-bold transition-colors px-4 py-2 rounded hover:bg-blue-500/10 ${
                  isActive('/news') ? 'text-blue-300' : 'text-white hover:text-blue-300'
                }`}
              >
                TIN TỨC
              </Link>
              <Link 
                href="/rankings" 
                className={`font-bold transition-colors px-4 py-2 rounded hover:bg-blue-500/10 ${
                  isActive('/rankings') ? 'text-blue-300' : 'text-white hover:text-blue-300'
                }`}
              >
                XẾP HẠNG
              </Link>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image 
                  src="/logo-muty.PNG" 
                  alt="MuDauTruongSS1.net - Mu Online Season 1 Mobile Logo" 
                  width={40}
                  height={16}
                  className="w-8 h-auto"
                />
                <span className="text-white font-bold text-sm">MuDauTruongSS1.net</span>
              </div>
              
              <button 
                className="text-white p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            
            {/* Mobile Menu */}
            <div className={`transition-all duration-300 ${
              mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}>
              <div className="py-4 space-y-3 border-t border-gray-700 mt-3">
                <Link 
                  href="/" 
                  className={`block transition-colors py-2 ${
                    isActive('/') ? 'text-blue-300' : 'text-white hover:text-blue-400'
                  }`}
                >
                  TRANG CHỦ
                </Link>
                <Link 
                  href="/info" 
                  className={`block transition-colors py-2 ${
                    isActive('/info') ? 'text-blue-300' : 'text-white hover:text-blue-400'
                  }`}
                >
                  THÔNG TIN
                </Link>
                <Link 
                  href="/download" 
                  className={`block transition-colors py-2 ${
                    isActive('/download') ? 'text-blue-300' : 'text-white hover:text-blue-200'
                  }`}
                >
                  TẢI GAME
                </Link>
                <Link 
                  href="/donate" 
                  className={`block transition-colors py-2 ${
                    isActive('/donate') ? 'text-blue-300' : 'text-white hover:text-blue-400'
                  }`}
                >
                  QUYÊN GÓP
                </Link>
                <Link 
                  href="/news" 
                  className={`block transition-colors py-2 ${
                    isActive('/news') ? 'text-blue-300' : 'text-white hover:text-blue-400'
                  }`}
                >
                  TIN TỨC
                </Link>
                <Link 
                  href="/rankings" 
                  className={`block transition-colors py-2 ${
                    isActive('/rankings') ? 'text-blue-300' : 'text-white hover:text-blue-400'
                  }`}
                >
                  XẾP HẠNG
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}

