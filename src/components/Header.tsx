'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useConfig } from '@/contexts/ConfigContext';
import { getSiteConfig } from '@/lib/config';

export default function Header() {
  const { config } = useConfig();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/' || pathname === '/home';
  
  // Đảm bảo config có giá trị - Sử dụng giá trị từ config tĩnh để tránh hydration mismatch
  // Lấy từ config tĩnh ngay để server và client render cùng giá trị
  const staticConfig = getSiteConfig();
  const [displayName, setDisplayName] = useState(staticConfig?.nameGame || 'Mu Online');
  
  useEffect(() => {
    // Chỉ cập nhật sau khi client mount và có config từ API khác với config tĩnh
    if (config?.nameGame && config.nameGame !== staticConfig?.nameGame) {
      setDisplayName(config.nameGame);
    }
  }, [config?.nameGame, staticConfig?.nameGame]);

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
      {/* Top Header - Classic MU Style - Ẩn trên mobile */}
      <motion.div 
        className="hidden md:block fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-900/95 via-black/95 to-gray-900/95 py-2 border-b-2 border-yellow-500/60 z-[100]"
        style={{
          pointerEvents: isHomePage && !isScrolled ? 'none' : 'auto',
          fontFamily: 'Arial, sans-serif'
        }}
        animate={{
          y: isHomePage && !isScrolled ? -100 : 0,
          opacity: isHomePage && !isScrolled ? 0 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut'
        }}
        initial={false}
      >
        <div className="absolute inset-0 mu-modal-border-glow opacity-50"></div>
        <div className="relative max-w-6xl mx-auto px-5 flex justify-between items-center">
          <div className="text-green-400 text-sm font-medium whitespace-nowrap flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mu-dot-glow"></span>
            Server Online
          </div>
          <div className="flex gap-3 items-center">
            <Link 
              href="/register" 
              className="text-yellow-300 text-sm font-semibold px-3 py-1 rounded hover:text-yellow-200 hover:bg-yellow-600/20 border border-yellow-500/30 hover:border-yellow-400/60 transition-all whitespace-nowrap mu-button-glow"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              ĐĂNG KÝ
            </Link>
            <span className="text-yellow-500/50">|</span>
            <Link 
              href="/login" 
              className="text-yellow-300 text-sm font-semibold px-3 py-1 rounded hover:text-yellow-200 hover:bg-yellow-600/20 border border-yellow-500/30 hover:border-yellow-400/60 transition-all whitespace-nowrap mu-button-glow"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              ĐĂNG NHẬP
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Navigation - Classic MU Style */}
      <motion.nav 
        className="fixed md:top-12 top-0 left-0 right-0 bg-gradient-to-r from-gray-900/95 via-black/95 to-gray-900/95 py-3 md:py-4 border-b-2 border-yellow-500/60 z-[100]"
        initial={false}
        style={{
          pointerEvents: isClient && (isScrolled || !isHomePage) ? 'auto' : 'none',
          fontFamily: 'Arial, sans-serif'
        }}
        animate={{ 
          y: isClient && (isScrolled || !isHomePage) ? 0 : (isHomePage ? -100 : 0), 
          opacity: isClient && (isScrolled || !isHomePage) ? 1 : (isHomePage ? 0 : 1),
        }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 mu-modal-border-glow opacity-50"></div>
        <div className="relative max-w-6xl mx-auto px-5">
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center">
            <div className="flex gap-4 justify-center">
              {[
                { href: '/home', label: 'TRANG CHỦ', paths: ['/home', '/'] },
                { href: '/info', label: 'THÔNG TIN', paths: ['/info'] },
                { href: '/download', label: 'TẢI GAME', paths: ['/download'] },
                { href: '/donate', label: 'QUYÊN GÓP', paths: ['/donate'] },
                { href: '/news', label: 'TIN TỨC', paths: ['/news'] },
                { href: '/rankings', label: 'XẾP HẠNG', paths: ['/rankings'] }
              ].map((item) => {
                const active = item.paths.some(path => isActive(path));
                return (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className={`font-bold transition-all px-4 py-2 rounded relative z-10 ${
                      active 
                        ? 'text-yellow-400 bg-yellow-600/20 border border-yellow-500/60 mu-text-glow mu-button-glow' 
                        : 'text-white hover:text-yellow-400 hover:bg-yellow-600/10 border border-transparent hover:border-yellow-500/30'
                    }`}
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          
          {/* Mobile Navigation - Classic MU Style */}
          <div className="md:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                {/* Server Status trên mobile */}
                <div className="text-green-400 text-xs font-medium whitespace-nowrap flex items-center gap-1.5 mr-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="hidden sm:inline">Server Online</span>
                  <span className="sm:hidden">Online</span>
                </div>
                {/* Logo đã được ẩn trên mobile */}
                <span 
                  className="text-yellow-400 font-bold text-xs sm:text-sm mu-text-glow truncate" 
                  style={{ fontFamily: 'Arial, sans-serif' }}
                  suppressHydrationWarning
                >
                  {displayName}
                </span>
              </div>
              
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* ĐĂNG KÝ và ĐĂNG NHẬP trên mobile */}
                <Link 
                  href="/register" 
                  className="text-yellow-300 text-xs font-semibold px-2 py-1 rounded hover:text-yellow-200 hover:bg-yellow-600/20 border border-yellow-500/30 hover:border-yellow-400/60 transition-all whitespace-nowrap"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  ĐK
                </Link>
                <Link 
                  href="/login" 
                  className="text-yellow-300 text-xs font-semibold px-2 py-1 rounded hover:text-yellow-200 hover:bg-yellow-600/20 border border-yellow-500/30 hover:border-yellow-400/60 transition-all whitespace-nowrap"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  ĐN
                </Link>
                
                <motion.button 
                  className="text-yellow-400 p-2 border border-yellow-500/30 rounded hover:bg-yellow-600/20 transition-all flex-shrink-0"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </motion.button>
              </div>
            </div>
            
            {/* Mobile Menu */}
            <div className={`transition-all duration-300 ${
              mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}>
              <div className="py-4 space-y-3 border-t border-yellow-500/30 mt-3">
                {[
                  { href: '/', label: 'TRANG CHỦ', paths: ['/home', '/'] },
                  { href: '/info', label: 'THÔNG TIN', paths: ['/info'] },
                  { href: '/download', label: 'TẢI GAME', paths: ['/download'] },
                  { href: '/donate', label: 'QUYÊN GÓP', paths: ['/donate'] },
                  { href: '/news', label: 'TIN TỨC', paths: ['/news'] },
                  { href: '/rankings', label: 'XẾP HẠNG', paths: ['/rankings'] }
                ].map((item) => {
                  const active = item.paths.some(path => isActive(path));
                  return (
                    <Link 
                      key={item.href}
                      href={item.href} 
                      className={`block transition-all py-2 px-3 rounded relative z-10 ${
                        active 
                          ? 'text-yellow-400 bg-yellow-600/20 border border-yellow-500/60 mu-text-glow' 
                          : 'text-white hover:text-yellow-400 hover:bg-yellow-600/10'
                      }`}
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}

