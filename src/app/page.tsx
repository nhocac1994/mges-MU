'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import EventCountdown from '@/components/EventCountdown';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import AnimatedSection from '@/components/AnimatedSection';
import NetworkOverlay from '@/components/NetworkOverlay';
import MultiTypewriter from '@/components/MultiTypewriter';

// Lazy load các components nặng
const FloatingParticles = dynamic(() => import('@/components/FloatingParticles'), {
  ssr: false,
  loading: () => null
});

const Network3D = dynamic(() => import('@/components/Network3D'), {
  ssr: false,
  loading: () => null
});

// Logo Section Component - Tách riêng để tránh hooks trong callback
const LogoSection = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: logoRef,
    offset: ["start end", "end start"]
  });

  const logoOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0],
    { clamp: false }
  );

  const logoInView = useInView(logoRef, {
    amount: 0.2,
    once: false,
    margin: "0px 0px -200px 0px"
  });

  return (
    <motion.div 
      ref={logoRef} 
      className="relative w-full h-full flex items-center justify-center"
      style={{ opacity: logoOpacity }}
    >
      <div className="relative w-[60vw] sm:w-[50vw] md:w-[45vw] lg:w-[40vw] xl:w-[35vw] h-[60vw] sm:h-[50vw] md:h-[45vw] lg:h-[40vw] xl:h-[35vw] max-w-3xl max-h-3xl mx-auto">
        {/* Part 1: Top Left */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={logoInView ? { x: 0, y: 0, opacity: 1 } : { x: '-100vw', y: '-100vh', opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            clipPath: 'polygon(0 0, 50% 0, 50% 50%, 0 50%)',
            zIndex: 1
          }}
        >
          <Image 
            src="/MU-DAUTRUONG.PNG" 
            alt="MuDauTruongSS1.net Logo Part 1" 
            fill
            className="object-contain"
            style={{ objectPosition: 'left top' }}
            priority
          />
        </motion.div>

        {/* Part 2: Top Right */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={logoInView ? { x: 0, y: 0, opacity: 1 } : { x: '100vw', y: '-100vh', opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            clipPath: 'polygon(50% 0, 100% 0, 100% 50%, 50% 50%)',
            zIndex: 1
          }}
        >
          <Image 
            src="/MU-DAUTRUONG.PNG" 
            alt="MuDauTruongSS1.net Logo Part 2" 
            fill
            className="object-contain"
            style={{ objectPosition: 'right top' }}
            priority
          />
        </motion.div>

        {/* Part 3: Bottom Left */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={logoInView ? { x: 0, y: 0, opacity: 1 } : { x: '-100vw', y: '100vh', opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            clipPath: 'polygon(0 50%, 50% 50%, 50% 100%, 0 100%)',
            zIndex: 1
          }}
        >
          <Image 
            src="/MU-DAUTRUONG.PNG" 
            alt="MuDauTruongSS1.net Logo Part 3" 
            fill
            className="object-contain"
            style={{ objectPosition: 'left bottom' }}
            priority
          />
        </motion.div>

        {/* Part 4: Bottom Right */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={logoInView ? { x: 0, y: 0, opacity: 1 } : { x: '100vw', y: '100vh', opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)',
            zIndex: 1
          }}
        >
          <Image 
            src="/MU-DAUTRUONG.PNG" 
            alt="MuDauTruongSS1.net Logo Part 4" 
            fill
            className="object-contain"
            style={{ objectPosition: 'right bottom' }}
            priority
          />
        </motion.div>

        {/* Ánh sáng vàng hình tròn xung quanh logo - Chỉ hiện khi ghép thành công */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={false}
          animate={logoInView ? { 
            opacity: [0, 1, 0.8, 1, 0.7],
            scale: [0.8, 1.15, 1, 1.1, 1]
          } : { opacity: 0, scale: 0.8 }}
          transition={{ 
            duration: 2,
            delay: 0.6,
            ease: "easeOut"
          }}
          style={{
            background: 'radial-gradient(circle, transparent 40%, rgba(255, 215, 0, 0.4) 50%, rgba(255, 223, 0, 0.6) 55%, rgba(255, 215, 0, 0.4) 60%, rgba(255, 200, 0, 0.3) 70%, transparent 85%)',
            filter: 'blur(25px)',
            zIndex: 0,
            width: '120%',
            height: '120%',
            left: '-10%',
            top: '-10%'
          }}
        />
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-float" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-red-400 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
      </div>
    </motion.div>
  );
};

// Image Section Component - Tách riêng để tránh hooks trong map
const ImageSection = ({ image, index }: { image: { src: string; alt: string; title: string }; index: number }) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    amount: 0.2,
    once: false,
    margin: "0px 0px -100px 0px"
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0],
    { clamp: false }
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.96, 1, 1, 0.96],
    { clamp: false }
  );

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -50],
    { clamp: false }
  );

  return (
    <motion.section
      key={index}
      ref={ref}
      className="min-h-screen w-screen relative bg-black/20 overflow-hidden"
      style={{ 
        opacity, 
        margin: 0, 
        padding: 0,
        width: '100vw',
        left: 0,
        right: 0,
        position: 'relative',
        willChange: 'opacity',
        transform: 'translateZ(0)'
      }}
    >
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          scale,
          y,
          left: 0,
          right: 0,
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0,
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority={index < 2}
          loading={index < 2 ? "eager" : "lazy"}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            objectPosition: 'center center',
            margin: 0,
            padding: 0,
            left: 0,
            right: 0
          }}
        />
        
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/80 via-black/30 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/60 via-black/20 to-transparent z-10 pointer-events-none"></div>
        
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{
            willChange: 'opacity, transform',
            transform: 'translateZ(0)'
          }}
        >
          <div className="text-center px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {image.title}
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto drop-shadow-lg">
              {image.alt}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

// Video Section Component - Tách riêng để tránh hydration issues
const VideoSection = () => {
  const videoRef = useRef<HTMLElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress: videoScrollProgress } = useScroll({
    target: videoRef,
    offset: ["start end", "end start"]
  });

  const videoOpacity = useTransform(
    videoScrollProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0],
    { clamp: false }
  );

  const videoScale = useTransform(
    videoScrollProgress,
    [0, 0.3, 0.7, 1],
    [0.96, 1, 1, 0.96],
    { clamp: false }
  );

  // Đảm bảo video tự động phát trên mobile
  useEffect(() => {
    const video = videoElementRef.current;
    if (!video) return;

    // Set webkit-playsinline attribute cho Safari iOS
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('playsinline', 'true');

    // Force play trên mobile
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Video đã phát thành công
          console.log('Video đang phát');
        })
        .catch((error) => {
          // Nếu autoplay bị chặn, thử lại khi user tương tác
          console.log('Autoplay bị chặn, chờ user tương tác');
          
          const handleUserInteraction = () => {
            video.play().catch(() => {});
            document.removeEventListener('touchstart', handleUserInteraction);
            document.removeEventListener('click', handleUserInteraction);
          };
          
          document.addEventListener('touchstart', handleUserInteraction, { once: true });
          document.addEventListener('click', handleUserInteraction, { once: true });
        });
    }

    // Đảm bảo video tiếp tục phát khi vào viewport - tối ưu với throttle
    let observerTimeout: NodeJS.Timeout | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        if (observerTimeout) return;
        
        observerTimeout = setTimeout(() => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            }
          });
          observerTimeout = null;
        }, 100); // Throttle 100ms
      },
      { threshold: 0.3 } // Giảm threshold để tối ưu
    );

    observer.observe(video);

    return () => {
      if (observerTimeout) clearTimeout(observerTimeout);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.section
      ref={videoRef}
      className="min-h-screen flex flex-col items-center justify-center relative bg-black/40 backdrop-blur-sm"
      style={{
        opacity: videoOpacity,
        scale: videoScale,
        willChange: 'opacity, transform',
        transform: 'translateZ(0)'
      }}
    >
      {/* Gradient Overlay - Nhẹ hơn trên mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 md:from-black via-black/40 md:via-black/80 to-black/60 md:to-black z-10 pointer-events-none"></div>
      
      <div className="w-full h-full flex flex-col items-center justify-center relative z-20 px-0">
        {/* Video Container - Lớn hơn, gần full screen trên mobile */}
        <div className="w-full h-full md:w-[90%] md:h-auto relative">
          {/* Top Gradient - Nhẹ hơn trên mobile */}
          <div className="absolute top-0 left-0 right-0 h-12 md:h-32 bg-gradient-to-b from-black/20 md:from-black via-black/10 md:via-black/50 to-transparent z-10 pointer-events-none"></div>
          
          {/* Bottom Gradient - Nhẹ hơn trên mobile */}
          <div className="absolute bottom-0 left-0 right-0 h-12 md:h-32 bg-gradient-to-t from-black/20 md:from-black via-black/10 md:via-black/50 to-transparent z-10 pointer-events-none"></div>
          
          <div className="relative w-full" style={{ aspectRatio: '16/9', minHeight: '70vh' }}>
            {/* Video Trailer - Sáng hơn và lớn hơn trên mobile */}
            <video
              ref={videoElementRef}
              className="w-full h-full absolute inset-0 object-cover"
              autoPlay
              loop
              muted
              playsInline
              controls
              preload="auto"
              style={{ 
                zIndex: 1,
                filter: 'brightness(1.2) contrast(1.1)',
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            >
              <source src="/muonline.mp4" type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ định dạng video này. Vui lòng sử dụng Safari hoặc Chrome.
            </video>
            
            {/* Top Gradient - Nhẹ hơn trên mobile */}
            <div className="absolute top-0 left-0 right-0 h-24 md:h-48 bg-gradient-to-b from-black/40 md:from-black via-black/30 md:via-black/70 to-transparent z-10 pointer-events-none"></div>
            
            {/* Bottom Gradient - Nhẹ hơn trên mobile */}
            <div className="absolute bottom-0 left-0 right-0 h-24 md:h-48 bg-gradient-to-t from-black/40 md:from-black via-black/30 md:via-black/70 to-transparent z-10 pointer-events-none"></div>
            
            {/* Left Gradient - Nhẹ hơn trên mobile */}
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-black/30 md:from-black via-black/20 md:via-black/60 to-transparent z-10 pointer-events-none"></div>
            
            {/* Right Gradient - Nhẹ hơn trên mobile */}
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-black/30 md:from-black via-black/20 md:via-black/60 to-transparent z-10 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Throttle scroll handler để tối ưu performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          setIsScrolled(scrollTop > 100);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const news = [
    {
      title: 'HƯỚNG DẪN CHƠI MU DAU TRUONG - SEASON 1',
      date: '14/09/2025',
      type: 'Notice',
      link: '/news/guide'
    },
    {
      title: 'CÁC SỰ KIỆN TRONG GAME',
      date: '07/09/2025',
      type: 'Event',
      link: '/news/events'
    },
    {
      title: 'LỘ TRÌNH PHÁT TRIỂN SERVER',
      date: '07/09/2025',
      type: 'Update',
      link: '/news/roadmap'
    },
    {
      title: 'THÔNG BÁO MỞ SERVER',
      date: '07/09/2025',
      type: 'Notice',
      link: '/news/opening'
    },
    {
      title: 'UPDATE SERVER',
      date: '27/08/2025',
      type: 'Update',
      link: '/news/update'
    }
  ];

  const { scrollY: scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 300], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 300], [1, 0.8]);

  // Structured Data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "MuDauTruongSS1.net - Mu Online Season 1",
    "description": "Server Mu Online Season 1 với tỷ lệ exp cao, drop rate tốt. Cộng đồng game thủ Việt Nam hàng đầu.",
    "applicationCategory": "Game",
    "operatingSystem": "Windows",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "VND"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    },
    "genre": ["MMORPG", "Action", "Role-Playing"],
    "gamePlatform": "PC",
    "publisher": {
      "@type": "Organization",
      "name": "MuDauTruongSS1.net",
      "url": "https://MuDauTruongSS1.net"
    },
    "screenshot": [
      "https://MuDauTruongSS1.net/panael-mu.jpg",
      "https://MuDauTruongSS1.net/logoweb.jpg",
      "https://MuDauTruongSS1.net/muonline-panael.jpg"
    ]
  };

  const gameImages = [
    //{ src: '/lorencia.png', alt: 'Mu Online Season 1 - Giao diện game đẹp mắt với hệ thống chiến đấu PvP', title: 'Hệ Thống PvP' },
    { src: '/noria.png', alt: 'Mu Online Season 1 - Logo chính thức server MuDauTruongSS1.net', title: 'Lorencia' },
    { src: '/aida.png', alt: 'Mu Online Season 1 - Khung cảnh game 3D đẹp mắt', title: 'Aida' },
    { src: '/atlans.png', alt: 'Mu Online Season 1 - Nhân vật và trang bị trong game', title: 'Atlans' },
    { src: '/devial.png', alt: 'Mu Online Season 1 - Giao diện server và cộng đồng', title: 'Devias' },
    { src: '/arena.png', alt: 'Mu Online Season 1 - Icon và branding chính thức', title: 'Arena' }
  ];

  return (
    <>
    <div className="min-h-screen relative overflow-x-hidden" style={{
      fontFamily: 'Roboto, sans-serif',
      margin: 0,
      padding: 0,
      width: '100%',
      minWidth: '100%',
      maxWidth: '100%',
      overflowY: 'auto',
      position: 'relative'
    }}>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Network Overlay - Luôn chạy trên background */}
      <NetworkOverlay />
      
      {/* 3D Network Background - Chỉ hiển thị khi không scroll và không phải mobile */}
      {!isScrolled && !isMobile && isClient && <Network3D />}
      
      {/* Floating Particles Background - Giảm số lượng trên mobile */}
      {!isScrolled && isClient && <FloatingParticles count={isMobile ? 4 : 8} />}
      
      {/* Background Image - Cho cả Mobile và Desktop */}
      {isClient && (
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            backgroundImage: 'url(/panael-mu.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'scroll',
            zIndex: 0,
            pointerEvents: 'none',
            margin: 0,
            padding: 0
          }}
        >
          {/* Vignette Overlay - Tối hơn để background tối hơn */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.2) 0%, rgba(19, 19, 19, 0.4) 50%, rgba(0, 0, 0, 0.6) 100%)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />
        </div>
      )}
      {/* Hero Section - Full Screen */}
      {isClient && (
        <section className={`fixed z-0 transition-all duration-100 ease-out mobile-hero-optimized ${
          isScrolled ? 'opacity-10 pointer-events-none' : 'opacity-100'
        }`}
        style={{
          inset: 0,
          width: '100%',
          height: '100%'
        }}>
        {/* Overlay - Rất nhẹ để background rõ hơn */}
        <div className="absolute inset-0 bg-black/3"></div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {/* Content Background - Rất nhẹ */}
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
                MuDauTruongSS1.net
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
                    'Season 1 Hành trình huyền thoại bắt đầu!',
                    'Hãy cùng nhau chiến đấu nào, tôi đang chờ bạn!'
                  ]}
                  speed={25}
                  deleteSpeed={25}
                  pauseTime={1500}
                  className="text-white"
                  highlights={{
                    'Season 1': '#FFD700', // Màu vàng
                    'tôi đang chờ bạn!': '#FF6B35' // Màu cam đậm
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


      {/* Main Content */}
      <main className="relative z-10">
        {/* Background for main content */}
        <div className="fixed inset-0 -z-10 bg-black/20"></div>
        
        {/* Compact Logo Section - Shows when scrolled */}
        <section className={`min-h-screen flex items-center justify-center relative transition-all duration-1000 ease-out ${
          isScrolled ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8 pointer-events-none'
        }`} style={{ marginTop: '100vh' }}>
            <div className="relative z-10">
              {/* Animated Background Effects */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-2xl animate-bounce" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-red-500/20 rounded-full blur-xl animate-ping" style={{animationDelay: '2s'}}></div>
              </div>
              
              {/* Logo Assembly Animation - 4 parts coming from corners */}
              <LogoSection />
            </div>
        </section>

        {/* Video Trailer Section - Full Screen */}
        {isClient ? <VideoSection /> : (
          <section className="min-h-screen flex flex-col items-center justify-center relative bg-black/40 backdrop-blur-sm">
            {/* Gradient Overlay - Tối dần từ trên xuống dưới để khớp với background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-10 pointer-events-none"></div>
            
            <div className="w-full h-full flex flex-col items-center justify-center relative z-20">
              {/* Video Container - Full Width */}
              <div className="w-full relative">
                {/* Top Gradient - Tối dần từ trên */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/50 to-transparent z-10 pointer-events-none"></div>
                
                {/* Bottom Gradient - Tối dần từ dưới */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent z-10 pointer-events-none"></div>
                
                <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                  {/* Video Trailer */}
                  <video
                    className="w-full h-full absolute inset-0 object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    preload="auto"
                    style={{ zIndex: 1 }}
                  >
                    <source src="/muonline.mp4" type="video/mp4" />
                    Trình duyệt của bạn không hỗ trợ định dạng video này. Vui lòng sử dụng Safari hoặc Chrome.
                  </video>
                  
                  {/* Top Gradient - Mờ viền trên */}
                  <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black via-black/70 to-transparent z-10 pointer-events-none"></div>
                  
                  {/* Bottom Gradient - Mờ viền dưới */}
                  <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/70 to-transparent z-10 pointer-events-none"></div>
                  
                  {/* Left Gradient - Mờ viền trái */}
                  <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black via-black/60 to-transparent z-10 pointer-events-none"></div>
                  
                  {/* Right Gradient - Mờ viền phải */}
                  <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black via-black/60 to-transparent z-10 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Game Gallery Sections - Mỗi hình ảnh là một section full-screen với fade effect - Nằm ngoài main */}
        {gameImages.map((image, index) => (
          <ImageSection key={index} image={image} index={index} />
        ))}

        {/* Content Sections */}
        <div className="max-w-6xl mx-auto px-0 py-0 relative z-10">
          {/* Content Grid */}
          <section className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Game Events Section */}
            <AnimatedSection direction="left" delay={0.2}>
              <motion.div 
                className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-blue-500/50 glass hover-lift transition-all duration-300 hover:border-blue-400/70 hover:shadow-lg hover:shadow-blue-500/30 hover-glow hover-3d"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">🎮 Sự Kiện Game</h3>
                <div className="text-green-400 text-sm font-medium">🟢 Đang diễn ra</div>
              </div>
              <EventCountdown />
              </motion.div>
            </AnimatedSection>

            {/* News Section */}
            <AnimatedSection direction="right" delay={0.3}>
              <div className="space-y-6">
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-blue-500/50 hover-lift transition-all duration-300 hover:border-blue-400/70 hover:shadow-lg hover:shadow-blue-500/30">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">📰 Bản Tin Mới</h3>
                  <Link href="/news" className="text-blue-400 hover:text-blue-300 transition-colors">Xem Thêm</Link>
                </div>
                <div className="space-y-4">
                  {news.map((item, index) => (
                    <div key={index} className="bg-white/20 rounded-lg p-4 border border-white/30 hover:bg-white/30 hover:border-blue-400/70 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/30 group">
                      <div className="flex items-start gap-3">
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded group-hover:bg-blue-500 transition-colors">{item.type}</span>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-1">
                            <Link href={item.link} className="hover:text-blue-300 transition-colors group-hover:text-blue-200">
                              {item.title}
                            </Link>
                          </h4>
                          <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{item.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Join Banner */}
              <div className="relative overflow-hidden rounded-lg p-6 text-center hover-lift transition-all duration-300 hover:scale-105">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 animate-gradient-shift"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 animate-gradient-shift" style={{animationDelay: '1s'}}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-gradient-shift" style={{animationDelay: '2s'}}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">THAM GIA NGAY</h2>
                  <p className="text-white/90 mb-4 drop-shadow-md">TẠO TÀI KHOẢN CỦA BẠN</p>
                  <Link href="/register" className="inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-lg font-bold hover:bg-white/30 transition-all duration-300 border border-white/30 hover:border-white/50">
                    Đăng Ký Ngay
                  </Link>
                </div>
              </div>
              </div>
            </AnimatedSection>
          </section>


          {/* Download Section */}
          <section className="py-16 bg-black/10">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    TẢI GAME NGAY
                  </span>
                </h2>
                <p className="text-xl text-gray-300">Tải client và launcher để bắt đầu hành trình Mu Online</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-4">MediaFire</h3>
                  <p className="text-sm text-gray-400 mb-3">File size: 155.35MB</p>
                  <a 
                    href="https://www.mediafire.com/file/0tp6wj1yko12318/Mu-DauTruongs1.net_v1.1.7z/file" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors inline-block"
                  >
                    📥 Tải Client v1.1
                  </a>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-4">MEGA</h3>
                  <p className="text-sm text-gray-400 mb-3">Alternative download</p>
                  <a 
                    href="https://mega.nz/file/4UNwiZhL#MJzsMKtdv4vQI765iDdd200fdOPZPwSBxoB1xUaacyw" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors inline-block"
                  >
                    📥 Tải Client v1.1
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Game Features */}
          <section className="grid lg:grid-cols-3 gap-8">
            <AnimatedSection direction="up" delay={0.1}>
              <motion.div 
                className="bg-black/20 backdrop-blur-sm rounded-lg border border-blue-500/50 glass hover-lift transition-all duration-300 hover:border-blue-400/70 hover:shadow-lg hover:shadow-blue-500/30 hover-glow hover-3d"
                whileHover={{ y: -10, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
              <div className="p-6 text-center">
                <div className="text-4xl mb-4">⚔️</div>
                <h3 className="text-xl font-bold text-white mb-3">PvP Combat</h3>
                <p className="text-gray-300">Chiến đấu với người chơi khác trong các cuộc chiến gay cấn</p>
              </div>
              </motion.div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.2}>
              <motion.div 
                className="bg-black/20 backdrop-blur-sm rounded-lg border border-blue-500/50 glass hover-lift transition-all duration-300 hover:border-blue-400/70 hover:shadow-lg hover:shadow-blue-500/30 hover-glow hover-3d"
                whileHover={{ y: -10, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
              <div className="p-6 text-center">
                <div className="text-4xl mb-4">🏰</div>
                <h3 className="text-xl font-bold text-white mb-3">Guild System</h3>
                <p className="text-gray-300">Tham gia guild và chiến đấu cùng đồng đội</p>
              </div>
              </motion.div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.3}>
              <motion.div 
                className="bg-black/20 backdrop-blur-sm rounded-lg border border-blue-500/50 glass hover-lift transition-all duration-300 hover:border-blue-400/70 hover:shadow-lg hover:shadow-blue-500/30 hover-glow hover-3d"
                whileHover={{ y: -10, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
              <div className="p-6 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-3">Events</h3>
                <p className="text-gray-300">Tham gia các sự kiện đặc biệt và nhận phần thưởng</p>
              </div>
              </motion.div>
            </AnimatedSection>
          </section>

        </div>
      </main>


      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-red-900/20"></div>
      </div>
      
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
    </>
  );
}