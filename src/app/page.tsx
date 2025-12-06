'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import NetworkOverlay from '@/components/NetworkOverlay';
import MultiTypewriter from '@/components/MultiTypewriter';
import { useConfig } from '@/contexts/ConfigContext';

// Lazy load các components nặng
const FloatingParticles = dynamic(() => import('@/components/FloatingParticles'), {
  ssr: false,
  loading: () => null
});

const Network3D = dynamic(() => import('@/components/Network3D'), {
  ssr: false,
  loading: () => null
});

export default function HeroPage() {
  const { config } = useConfig();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  
  // Đảm bảo config có giá trị
  const displayName = config?.nameGame || 'Mu Online';
  const gameSubtitle = config?.gameSubtitle || 'Hành trình huyền thoại bắt đầu';

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll handler - CHỈ hoạt động trên mobile
  // Trên PC: vô hiệu hóa scroll, chỉ dùng nút để chuyển trang
  useEffect(() => {
    if (!isClient) return;
    
    // Kiểm tra xem có đang ở trang chủ không
    const currentPath = window.location.pathname;
    if (currentPath !== '/') {
      return; // Không chạy logic này nếu không ở trang chủ
    }
    
    // CHỈ cho phép scroll navigation trên mobile
    if (!isMobile) {
      // Trên PC: vô hiệu hóa scroll, chỉ dùng nút
      // Ngăn scroll bằng cách set overflow hidden cho body
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
    
    // Chỉ chạy scroll handler trên mobile
    let ticking = false;
    let hasNavigated = false;
    const scrollThreshold = 150; // Threshold cho mobile
    
    const handleScroll = () => {
      if (!ticking && !hasNavigated) {
        window.requestAnimationFrame(() => {
          // Kiểm tra lại pathname trước khi navigate
          const currentPath = window.location.pathname;
          if (currentPath !== '/') {
            return; // Không navigate nếu đã chuyển sang trang khác
          }
          
          const scrollTop = window.scrollY;
          setIsScrolled(scrollTop > 50);
          
          // Khi scroll xuống > threshold, tự động navigate sang /home
          if (scrollTop > scrollThreshold && !hasNavigated && currentPath === '/') {
            hasNavigated = true;
            router.push('/home');
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [router, isClient, isMobile]);

  return (
    <>
      <div 
        className="relative min-h-screen" 
        style={{
          fontFamily: 'Roboto, sans-serif',
          margin: 0,
          padding: 0,
          width: '100%',
          minWidth: '100%',
          maxWidth: '100%',
          touchAction: 'pan-y',
          overscrollBehavior: 'auto'
        }}
      >
        {/* Network Overlay */}
      <NetworkOverlay />
      
        {/* 3D Network Background */}
      {!isScrolled && !isMobile && isClient && <Network3D />}
      
        {/* Floating Particles Background */}
      {!isScrolled && isClient && <FloatingParticles count={isMobile ? 4 : 8} />}
      
        {/* Background Image */}
      {isClient && (
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/Panael-mu.JPEG)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            zIndex: 0,
              pointerEvents: 'none'
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
        </div>
      )}

      {/* Hero Section - Full Screen */}
      {isClient && (
          <section 
            className="fixed z-10 mobile-hero-optimized"
            style={{
              inset: 0,
              width: '100%',
              height: '100vh',
              pointerEvents: 'none', // Cho phép scroll xuyên qua
              touchAction: 'pan-y',
              overscrollBehavior: 'auto'
            }}
          >
            {/* Overlay */}
        <div className="absolute inset-0 bg-black/3" style={{ pointerEvents: 'none', zIndex: 1 }}></div>
        
        {/* Hero Content */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            touchAction: 'pan-y',
            overscrollBehavior: 'auto',
            zIndex: 2,
            pointerEvents: 'none' // Cho phép scroll xuyên qua
          }}
        >
          <div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-black/3 to-black/10"
            style={{
              touchAction: 'pan-y',
              overscrollBehavior: 'auto',
              pointerEvents: 'none'
            }}
          ></div>
          
          <motion.div 
            className="text-center text-white px-4 relative z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              touchAction: 'pan-y',
              overscrollBehavior: 'auto',
              pointerEvents: 'none' // Cho phép scroll xuyên qua text
            }}
          >
            {/* Welcome Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-2"
            >
              <p className="text-xl sm:text-1xl md:text-2xl lg:text-3xl text-white/90 font-bold">
                Chào mừng bạn đã quay trở lại
              </p>
              <p className="text-sm sm:text-base md:text-lg text-white/70 font-light italic mb-6">
                (Welcome to)
              </p>
            </motion.div>

            {/* Game Title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8 md:mb-10"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-2xl">
                <span className="bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent">
                {displayName}
                </span>
              </h1>
            </motion.div>

            {/* Typewriter Text Section */}
            <motion.div 
              className="mb-6 md:mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div 
                className="text-lg sm:text-xl md:text-1xl lg:text-2xl font-bold min-h-[40px] md:min-h-[50px] flex items-center justify-center"
                style={{
                  textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)',
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: '300',
                  letterSpacing: '1px'
                }}
              >
                <MultiTypewriter
                  texts={[
                    `${config?.serverVersion || 'Season 1'} ${gameSubtitle}!`,
                    'Hãy cùng nhau chiến đấu nào, tôi đang chờ bạn!'
                  ]}
                  speed={25}
                  deleteSpeed={25}
                  pauseTime={1500}
                  className="text-white"
                  highlights={{
                        [config?.serverVersion || 'Season 1']: '#FFD700',
                        'tôi đang chờ bạn!': '#FF6B35'
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Start Button & Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          style={{ 
            filter: "brightness(1.5)",
            touchAction: 'pan-y',
            overscrollBehavior: 'auto',
            pointerEvents: 'auto',
            zIndex: 1000
          }}
          onClick={(e) => {
            // Ngăn click event bubble lên để không ảnh hưởng scroll
            e.stopPropagation();
          }}
        >
          {/* Start Button - MU Classic Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              href="/home"
              className="relative inline-block px-8 py-4 bg-gradient-to-r from-yellow-600/30 via-orange-600/30 to-yellow-600/30 border-2 border-yellow-500/60 text-yellow-300 font-bold text-lg rounded-lg mu-button-glow hover:from-yellow-600/50 hover:via-orange-600/50 hover:to-yellow-600/50 hover:border-yellow-400/80 transition-all duration-300 shadow-lg cursor-pointer"
              style={{ 
                fontFamily: 'Arial, sans-serif',
                touchAction: 'manipulation',
                overscrollBehavior: 'auto',
                pointerEvents: 'auto',
                zIndex: 1000,
                position: 'relative',
                display: 'inline-block'
              }}
            >
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-400/60 pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-400/60 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-400/60 pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-400/60 pointer-events-none"></div>
              
              <span className="relative z-10">BẮT ĐẦU</span>
            </Link>
          </motion.div>

          {/* Scroll Indicator - CHỈ hiển thị trên mobile */}
          {isMobile && (
            <motion.div 
              className="flex flex-col items-center opacity-70"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ pointerEvents: 'none' }}
            >
              <span className="text-xs mb-2 font-semibold drop-shadow-lg">Hoặc cuộn xuống</span>
              <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center shadow-lg">
                <motion.div 
                  className="w-1 h-3 bg-white rounded-full mt-2"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>
        </section>
      )}

        {/* Spacer để có thể scroll - CHỈ trên mobile */}
        {isClient && isMobile && <div style={{ height: '100vh' }}></div>}
    </div>
    </>
  );
}
