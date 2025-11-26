'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

  // Scroll handler - Khi scroll xuống thì header trượt xuống và navigate sang /home
  // CHỈ hoạt động khi đang ở trang chủ (/)
  useEffect(() => {
    if (!isClient) return;
    
    // Kiểm tra xem có đang ở trang chủ không
    const currentPath = window.location.pathname;
    if (currentPath !== '/') {
      return; // Không chạy logic này nếu không ở trang chủ
    }
    
    let ticking = false;
    let hasNavigated = false;
    let lastCheckTime = 0;
    const throttleDelay = isMobile ? 150 : 100; // Throttle dài hơn trên mobile
    
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastCheckTime < throttleDelay) return; // Throttle
      lastCheckTime = now;
      
      if (!ticking && !hasNavigated) {
        window.requestAnimationFrame(() => {
          // Kiểm tra lại pathname trước khi navigate
          const currentPath = window.location.pathname;
          if (currentPath !== '/') {
            return; // Không navigate nếu đã chuyển sang trang khác
          }
          
          const scrollTop = window.scrollY;
          setIsScrolled(scrollTop > 50);
          
          // Khi scroll xuống > 100px, tự động navigate sang /home
          // Và chỉ khi đang ở trang chủ
          if (scrollTop > 100 && !hasNavigated && currentPath === '/') {
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
  }, [router, isClient]);

  return (
    <>
      <div className="relative min-h-screen" style={{
      fontFamily: 'Roboto, sans-serif',
      margin: 0,
      padding: 0,
      width: '100%',
      minWidth: '100%',
        maxWidth: '100%'
      }}>
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
            className="fixed z-0 mobile-hero-optimized"
        style={{
          inset: 0,
          width: '100%',
              height: '100vh',
              pointerEvents: 'auto'
            }}
          >
            {/* Overlay */}
        <div className="absolute inset-0 bg-black/3"></div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/3 to-black/10"></div>
          
          <motion.div 
            className="text-center text-white px-4 relative z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
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
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          style={{ filter: "brightness(1.5)" }}
        >
          <motion.div 
            className="flex flex-col items-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-sm mb-2 font-semibold drop-shadow-lg">Cuộn xuống để khám phá</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center shadow-lg">
              <motion.div 
                className="w-1 h-3 bg-white rounded-full mt-2"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
        </section>
      )}

        {/* Spacer để có thể scroll - Chỉ render trên client để tránh hydration error */}
        {isClient && <div style={{ height: '100vh' }}></div>}
    </div>
    </>
  );
}
