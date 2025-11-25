'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import EventCountdown from '@/components/EventCountdown';
import AnimatedSection from '@/components/AnimatedSection';
import NetworkOverlay from '@/components/NetworkOverlay';
import DownloadLinks from '@/components/DownloadLinks';
import MuClassicModal from '@/components/MuClassicModal';

// Lazy load các components nặng
const FloatingParticles = dynamic(() => import('@/components/FloatingParticles'), {
  ssr: false,
  loading: () => null
});

const Network3D = dynamic(() => import('@/components/Network3D'), {
  ssr: false,
  loading: () => null
});

// Logo Section Component
const LogoSection = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth <= 768);
  }, []);

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
    amount: isMounted && isMobile ? 0.1 : 0.2,
    once: isMounted && isMobile,
    margin: isMounted && isMobile ? "0px 0px -100px 0px" : "0px 0px -200px 0px"
  });

  return (
    <motion.div 
      ref={logoRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{ opacity: logoOpacity }}
    >
      <div className={`relative ${isMounted && isMobile ? 'w-[85vw] h-[85vw]' : 'w-[60vw] sm:w-[50vw] md:w-[45vw] lg:w-[40vw] xl:w-[35vw] h-[60vw] sm:h-[50vw] md:h-[45vw] lg:h-[40vw] xl:h-[35vw]'} max-w-3xl max-h-3xl mx-auto`}>
        {/* Part 1: Top Left */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={logoInView ? { x: 0, y: 0, opacity: 1 } : { x: '-100vw', y: '-100vh', opacity: 0 }}
          transition={{ 
            duration: isMounted && isMobile ? 0.4 : 0.8,
            ease: [0.22, 1, 0.36, 1] as const
          }}
          style={{
            clipPath: 'polygon(0 0, 50% 0, 50% 50%, 0 50%)',
            zIndex: 1,
            willChange: isMounted && isMobile ? 'opacity' : 'transform, opacity',
            transform: 'translateZ(0)'
          }}
          suppressHydrationWarning
        >
          <Image 
            src="/logo-truyenky.png" 
            alt="MuTruyenKy.com Logo Part 1" 
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
          transition={{ 
            duration: isMounted && isMobile ? 0.4 : 0.8,
            delay: isMounted && isMobile ? 0 : 0.1,
            ease: [0.22, 1, 0.36, 1] as const
          }}
          style={{
            clipPath: 'polygon(50% 0, 100% 0, 100% 50%, 50% 50%)',
            zIndex: 1,
            willChange: isMounted && isMobile ? 'opacity' : 'transform, opacity',
            transform: 'translateZ(0)'
          }}
          suppressHydrationWarning
        >
          <Image 
              src="/logo-truyenky.png" 
            alt="MuTruyenKy.com Logo Part 2" 
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
          transition={{ 
            duration: isMounted && isMobile ? 0.4 : 0.8,
            delay: isMounted && isMobile ? 0 : 0.2,
            ease: [0.22, 1, 0.36, 1] as const
          }}
          style={{
            clipPath: 'polygon(0 50%, 50% 50%, 50% 100%, 0 100%)',
            zIndex: 1,
            willChange: isMounted && isMobile ? 'opacity' : 'transform, opacity',
            transform: 'translateZ(0)'
          }}
          suppressHydrationWarning
        >
          <Image 
            src="/logo-truyenky.png" 
            alt="Mu Logo Part 3" 
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
          transition={{ 
            duration: isMounted && isMobile ? 0.4 : 0.8,
            delay: isMounted && isMobile ? 0 : 0.3,
            ease: [0.22, 1, 0.36, 1] as const
          }}
          style={{
            clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)',
            zIndex: 1,
            willChange: isMounted && isMobile ? 'opacity' : 'transform, opacity',
            transform: 'translateZ(0)'
          }}
          suppressHydrationWarning
        >
          <Image 
            src="/logo-truyenky.png" 
            alt="MuTruyenKy.com Logo Part 4" 
            fill
            className="object-contain"
            style={{ objectPosition: 'right bottom' }}
            priority
          />
        </motion.div>

        {/* Floating Particles */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={logoInView ? { 
            opacity: 1 
          } : { opacity: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.6, 
            ease: [0.22, 1, 0.36, 1] 
          }}
        >
          <div className="absolute top-0 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-float" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-red-400 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Video Section Component
const VideoSection = () => {
  const videoRef = useRef<HTMLElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoElementRef.current;
    if (!video) return;

    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('playsinline', 'true');

    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
        })
        .catch((error) => {
          // Autoplay bị chặn, chờ user tương tác
          const handleUserInteraction = () => {
            video.play().catch(() => {});
            document.removeEventListener('touchstart', handleUserInteraction);
            document.removeEventListener('click', handleUserInteraction);
          };
          
          document.addEventListener('touchstart', handleUserInteraction, { once: true });
          document.addEventListener('click', handleUserInteraction, { once: true });
        });
    }

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
        }, 100);
      },
      { threshold: 0.3 }
    );

    observer.observe(video);

    return () => {
      if (observerTimeout) clearTimeout(observerTimeout);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={videoRef}
      className="flex flex-col items-center justify-center relative bg-black/40 backdrop-blur-sm min-h-screen"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 md:from-black via-black/40 md:via-black/80 to-black/60 md:to-black z-10 pointer-events-none"></div>
      
      <div className="w-full h-full flex flex-col items-center justify-center relative z-20 px-0">
        <div className="w-full h-full md:w-[90%] md:h-auto relative">
          <div className="absolute top-0 left-0 right-0 h-12 md:h-32 bg-gradient-to-b from-black/20 md:from-black via-black/10 md:via-black/50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-12 md:h-32 bg-gradient-to-t from-black/20 md:from-black via-black/10 md:via-black/50 to-transparent z-10 pointer-events-none"></div>
          
          <div className="relative w-full" style={{ aspectRatio: '16/9', minHeight: '70vh' }}>
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
              Trình duyệt của bạn không hỗ trợ định dạng video này.
            </video>
            
            <div className="absolute top-0 left-0 right-0 h-24 md:h-48 bg-gradient-to-b from-black/40 md:from-black via-black/30 md:via-black/70 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-24 md:h-48 bg-gradient-to-t from-black/40 md:from-black via-black/30 md:via-black/70 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-black/30 md:from-black via-black/20 md:via-black/60 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-black/30 md:from-black via-black/20 md:via-black/60 to-transparent z-10 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [downloadLinks, setDownloadLinks] = useState<{ mega?: string; media?: string; launcher?: string }>({});
  const router = useRouter();
  const [selectedNews, setSelectedNews] = useState<typeof news[0] | null>(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll handler - Khi scroll lên trên cùng thì navigate về trang hero
  // CHỈ hoạt động khi đang ở trang /home, không áp dụng cho các trang khác
  useEffect(() => {
    if (!isClient) return;
    
    // Kiểm tra xem có đang ở trang /home không
    const currentPath = window.location.pathname;
    if (currentPath !== '/home') {
      return; // Không chạy logic này nếu không ở trang /home
    }
    
    let ticking = false;
    let lastScrollTop = window.scrollY;
    let hasNavigated = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Kiểm tra lại pathname trước khi navigate
          const currentPath = window.location.pathname;
          if (currentPath !== '/home') {
            return; // Không navigate nếu đã chuyển sang trang khác
          }
          
          const scrollTop = window.scrollY;
          const scrollDirection = scrollTop < lastScrollTop ? 'up' : 'down';
          
          // Chỉ navigate khi scroll lên và đã ở trên cùng (scrollTop <= 10px)
          // Và chỉ khi đang ở trang /home
          if (scrollDirection === 'up' && scrollTop <= 10 && !hasNavigated && currentPath === '/home') {
            hasNavigated = true;
            router.push('/');
          }
          
          // Reset flag khi scroll xuống xa
          if (scrollTop > 100) {
            hasNavigated = false;
          }
          
          lastScrollTop = scrollTop;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [router, isClient]);

  useEffect(() => {
    const loadDownloadLinks = async () => {
      try {
        const response = await fetch('/api/download-urls');
        const result = await response.json();
        
        if (result.success && result.data) {
          setDownloadLinks(result.data);
        }
      } catch (error) {
      }
    };

    loadDownloadLinks();
  }, []);

  const news = [
    {
      title: 'HƯỚNG DẪN CHƠI MU DAU TRUONG - SEASON 1',
      date: '14/09/2025',
      type: 'Guide',
      link: '/news/guide',
      content: `Hướng dẫn chi tiết cách chơi game Mu Online Season 1, từ việc tạo nhân vật đến các tính năng nâng cao.

**Tạo Nhân Vật:**
- Chọn class phù hợp với phong cách chơi của bạn
- Dark Knight: Chiến binh mạnh mẽ, sức tấn công cao
- Dark Wizard: Pháp sư với sức mạnh phép thuật
- Fairy Elf: Cung thủ linh hoạt, hỗ trợ tốt
- Magic Gladiator: Chiến binh đa năng, cân bằng

**Hệ Thống Level:**
- Level tối đa: 400
- Reset system: Reset để nhận thêm stat points
- Master Level: Phát triển sau khi đạt level 400

**Tính Năng Game:**
- PvP System: Chiến đấu với người chơi khác
- Guild System: Tham gia guild và chiến đấu cùng đồng đội
- Castle Siege: Cuộc chiến chiếm lâu đài
- Blood Castle & Devil Square: Sự kiện đặc biệt`
    },
    {
      title: 'SỰ KIỆN MỞ SERVER',
      date: '07/09/2025',
      type: 'Notice',
      link: '/news/opening',
      content: `Thông báo chính thức về sự kiện mở server MU Đấu Trường Season 1!

**Thời Gian Mở Server:**
- Ngày: 07/09/2025
- Giờ: 20:00 (GMT+7)

**Sự Kiện Đặc Biệt:**
- Tặng 1000 điểm cho tất cả người chơi đăng ký trong tuần đầu
- Double EXP trong 7 ngày đầu tiên
- Double Drop Rate trong 3 ngày đầu
- Event PK Tournament với giải thưởng lớn

**Phần Thưởng Đăng Ký Sớm:**
- Người chơi đăng ký trong 24h đầu: Nhận set items +10
- Người chơi đăng ký trong 48h đầu: Nhận set items +9
- Người chơi đăng ký trong tuần đầu: Nhận set items +8

**Hỗ Trợ:**
- Hỗ trợ 24/7 qua Discord và Facebook
- Hướng dẫn chi tiết cho người chơi mới
- Sự kiện hàng tuần với phần thưởng hấp dẫn`
    },
    {
      title: 'UPDATE SERVER',
      date: '27/08/2025',
      type: 'Update',
      link: '/news/update',
      content: `Cập nhật mới nhất cho server MU Đấu Trường Season 1!

**Cập Nhật Tính Năng:**
- Thêm hệ thống Master Level
- Cải thiện hệ thống PvP
- Tối ưu hóa hiệu suất server
- Thêm các map mới

**Sửa Lỗi:**
- Sửa lỗi lag khi có nhiều người chơi
- Sửa lỗi disconnect đột ngột
- Cải thiện độ ổn định kết nối
- Sửa lỗi hiển thị items

**Cân Bằng Game:**
- Điều chỉnh sức mạnh các class
- Cân bằng PvP giữa các class
- Điều chỉnh drop rate
- Cải thiện hệ thống reset

**Sự Kiện Mới:**
- Thêm sự kiện Blood Castle hàng ngày
- Thêm sự kiện Devil Square
- Thêm sự kiện Castle Siege hàng tuần
- Thêm các sự kiện đặc biệt theo mùa`
    }
  ];

  const handleNewsClick = (e: React.MouseEvent, newsItem: typeof news[0]) => {
    e.preventDefault();
    setSelectedNews(newsItem);
    setIsNewsModalOpen(true);
  };

  const handleCloseNewsModal = () => {
    setIsNewsModalOpen(false);
    setSelectedNews(null);
  };

  const handleFeatureClick = (feature: string) => {
    setSelectedFeature(feature);
    setIsFeatureModalOpen(true);
  };

  const handleCloseFeatureModal = () => {
    setIsFeatureModalOpen(false);
    setSelectedFeature(null);
  };

  const getFeatureContent = (feature: string) => {
    switch (feature) {
      case 'pvp':
        return {
          title: 'PvP Combat',
          icon: '⚔️',
          description: `Hệ thống PvP (Player vs Player) trong MU Online cho phép người chơi chiến đấu trực tiếp với nhau trong các cuộc đối đầu gay cấn và đầy thử thách.`,
          details: [
            {
              title: 'Các Chế Độ PvP',
              items: [
                'Duel System: Thách đấu 1 vs 1 với người chơi khác',
                'Free PvP: Chiến đấu tự do tại các map PvP',
                'Arena: Tham gia đấu trường để nhận phần thưởng',
                'PK Mode: Bật chế độ PK để tấn công người chơi khác'
              ]
            },
            {
              title: 'Quy Tắc PvP',
              items: [
                'Người chơi dưới level 100 được bảo vệ khỏi PvP',
                'Mất điểm kinh nghiệm khi bị giết trong PvP',
                'Có thể rơi đồ khi bị giết (tùy cài đặt server)',
                'Hệ thống điểm danh dự và ranking PvP'
              ]
            },
            {
              title: 'Phần Thưởng',
              items: [
                'Nhận điểm danh dự khi thắng',
                'Xếp hạng trong bảng PvP Ranking',
                'Phần thưởng đặc biệt từ Arena',
                'Danh hiệu và title đặc biệt'
              ]
            }
          ]
        };
      case 'guild':
        return {
          title: 'Guild System',
          icon: '🏰',
          description: `Hệ thống Guild cho phép người chơi tạo hoặc tham gia các guild để cùng nhau phát triển, chiến đấu và chinh phục các thử thách trong game.`,
          details: [
            {
              title: 'Tính Năng Guild',
              items: [
                'Tạo guild với tối thiểu 5 thành viên',
                'Guild War: Chiến đấu giữa các guild',
                'Guild Storage: Kho chung để chia sẻ items',
                'Guild Skills: Kỹ năng đặc biệt cho cả guild'
              ]
            },
            {
              title: 'Cấp Bậc Guild',
              items: [
                'Guild Master: Người sáng lập, quyền cao nhất',
                'Assistant: Phó guild, quản lý thành viên',
                'Battle Master: Chỉ huy trong Guild War',
                'Member: Thành viên thường'
              ]
            },
            {
              title: 'Lợi Ích',
              items: [
                'Buff kinh nghiệm khi cùng guild',
                'Tham gia Castle Siege',
                'Hỗ trợ từ đồng đội',
                'Phần thưởng từ Guild War'
              ]
            }
          ]
        };
      case 'events':
        return {
          title: 'Events',
          icon: '🎯',
          description: `Các sự kiện đặc biệt diễn ra thường xuyên trong game, mang đến nhiều cơ hội nhận phần thưởng và trải nghiệm thú vị cho người chơi.`,
          details: [
            {
              title: 'Sự Kiện Hàng Ngày',
              items: [
                'Double EXP: Tăng gấp đôi kinh nghiệm',
                'Double Drop: Tăng tỷ lệ rơi đồ',
                'Blood Castle: Sự kiện đặc biệt hàng ngày',
                'Devil Square: Thử thách với phần thưởng lớn'
              ]
            },
            {
              title: 'Sự Kiện Hàng Tuần',
              items: [
                'Castle Siege: Cuộc chiến chiếm lâu đài',
                'PK Tournament: Giải đấu PvP',
                'Guild War: Chiến tranh giữa các guild',
                'Boss Raid: Sự kiện đánh boss'
              ]
            },
            {
              title: 'Sự Kiện Đặc Biệt',
              items: [
                'Season Opening: Sự kiện mở server',
                'Holiday Events: Sự kiện theo ngày lễ',
                'Limited Time Events: Sự kiện giới hạn thời gian',
                'Special Rewards: Phần thưởng đặc biệt'
              ]
            }
          ]
        };
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative" style={{
      fontFamily: 'Roboto, sans-serif'
    }}>
      <NetworkOverlay />
      
      {!isMobile && isClient && <Network3D />}
      {isClient && <FloatingParticles count={isMobile ? 4 : 8} />}
      
      {/* Tạm thời ẩn background image */}
      {/* {isClient && (
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
      )} */}

      <main className="relative z-10">
        {/* Logo Section */}
        <section className="flex items-center justify-center relative min-h-screen w-full">
          <div className="relative z-10">
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-2xl animate-bounce" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-red-500/20 rounded-full blur-xl animate-ping" style={{animationDelay: '2s'}}></div>
            </div>
            <LogoSection />
          </div>
        </section>

        {/* Video Section */}
        {!isMobile && (isClient ? <VideoSection /> : null)}

        {/* Content Sections */}
        <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
          <section className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Sự Kiện Game - Classic MU Style */}
            <AnimatedSection direction="left" delay={0.2}>
              <div className="relative">
                <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
                <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-6">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                  
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-yellow-400 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>Sự Kiện Game</h3>
                    <div className="text-green-400 text-sm font-medium mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>Đang diễn ra</div>
                  </div>
                  <EventCountdown />
                </div>
              </div>
            </AnimatedSection>

            {/* Bản Tin Mới - Classic MU Style */}
            <AnimatedSection direction="right" delay={0.3}>
              <div className="relative">
                <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
                <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-6">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                  
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-yellow-400 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>Bản Tin Mới</h3>
                    <Link 
                      href="/news" 
                      className="text-yellow-400 hover:text-yellow-300 transition-colors font-semibold mu-text-glow"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      Xem Thêm
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {news.map((item, index) => (
                      <motion.div 
                        key={index} 
                        onClick={(e) => handleNewsClick(e, item)}
                        className="relative bg-black/40 rounded-lg p-4 border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 group cursor-pointer mu-command-card"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98, y: 0 }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          type: 'spring',
                          damping: 20,
                          stiffness: 300,
                          delay: index * 0.1
                        }}
                      >
                        {/* Corner decorations */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/50"></div>
                        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/50"></div>
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/50"></div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/50"></div>
                        
                        <span className="bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border border-yellow-500/60 text-yellow-300 text-xs px-2 py-1 rounded font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>{item.type}</span>
                        <h4 className="text-white font-semibold mt-2 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                          <span className="hover:text-yellow-300 transition-colors group-hover:text-yellow-200">
                            {item.title}
                          </span>
                        </h4>
                        <span className="text-yellow-400 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>{item.date}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Download Section */}
          <section className="py-16 bg-black/10">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    TẢI GAME NGAY
                  </span>
                </h2>
                <p className="text-xl text-gray-300">Tải client và launcher để bắt đầu hành trình Mu Online</p>
              </div>
              
              <DownloadLinks 
                mega={downloadLinks.mega}
                media={downloadLinks.media}
                launcher={downloadLinks.launcher}
              />
            </div>
          </section>

          {/* Game Features - Classic MU Style */}
          <section className="grid lg:grid-cols-3 gap-8">
            <AnimatedSection direction="up" delay={0.1}>
              <motion.div 
                onClick={() => handleFeatureClick('pvp')}
                className="relative cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
                <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-6 text-center">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                  
                  <div className="text-4xl mb-4">⚔️</div>
                  <h3 className="text-xl font-bold text-yellow-400 mb-3 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>PvP Combat</h3>
                  <p className="text-gray-300 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Chiến đấu với người chơi khác trong các cuộc chiến gay cấn</p>
                  <p className="text-yellow-400 text-sm mt-3 font-semibold mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>Click để xem chi tiết →</p>
                </div>
              </motion.div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.2}>
              <motion.div 
                onClick={() => handleFeatureClick('guild')}
                className="relative cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
                <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-6 text-center">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                  
                  <div className="text-4xl mb-4">🏰</div>
                  <h3 className="text-xl font-bold text-yellow-400 mb-3 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>Guild System</h3>
                  <p className="text-gray-300 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Tham gia guild và chiến đấu cùng đồng đội</p>
                  <p className="text-yellow-400 text-sm mt-3 font-semibold mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>Click để xem chi tiết →</p>
                </div>
              </motion.div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.3}>
              <motion.div 
                onClick={() => handleFeatureClick('events')}
                className="relative cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
                <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-6 text-center">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                  
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold text-yellow-400 mb-3 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>Events</h3>
                  <p className="text-gray-300 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Tham gia các sự kiện đặc biệt và nhận phần thưởng</p>
                  <p className="text-yellow-400 text-sm mt-3 font-semibold mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>Click để xem chi tiết →</p>
                </div>
              </motion.div>
            </AnimatedSection>
          </section>
        </div>
      </main>

      {/* News Detail Modal */}
      {selectedNews && (
        <MuClassicModal
          isOpen={isNewsModalOpen}
          onClose={handleCloseNewsModal}
          title="Chi Tiết Tin Tức"
          type="news"
          newsDate={selectedNews.date}
          newsType={selectedNews.type}
        >
          <div className="space-y-6">
            {/* News Title */}
            <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
              <h2 className="text-2xl font-bold text-yellow-300 mb-2">{selectedNews.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Ngày đăng: {selectedNews.date}</span>
                <span>|</span>
                <span>Loại: {selectedNews.type}</span>
              </div>
            </div>

            {/* News Content */}
            <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {selectedNews.content.split('\n').map((line, idx) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <h3 key={idx} className="text-yellow-400 font-bold text-lg mt-4 mb-2">
                          {line.replace(/\*\*/g, '')}
                        </h3>
                      );
                    }
                    if (line.startsWith('-')) {
                      return (
                        <p key={idx} className="ml-4 mb-2">
                          {line}
                        </p>
                      );
                    }
                    return (
                      <p key={idx} className="mb-3">
                        {line}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
              <div className="flex gap-4">
                <Link
                  href={selectedNews.link}
                  className="flex-1 px-6 py-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/60 text-blue-300 font-semibold hover:from-blue-600/50 hover:to-purple-600/50 transition-all duration-300 text-center mu-button-glow"
                  onClick={handleCloseNewsModal}
                >
                  Đọc Toàn Bộ
                </Link>
              </div>
            </div>
          </div>
        </MuClassicModal>
      )}

      {/* Feature Detail Modal */}
      {selectedFeature && getFeatureContent(selectedFeature) && (
        <MuClassicModal
          isOpen={isFeatureModalOpen}
          onClose={handleCloseFeatureModal}
          title={`Chi Tiết Tính Năng - ${getFeatureContent(selectedFeature)?.title}`}
          type="news"
        >
          {(() => {
            const content = getFeatureContent(selectedFeature);
            if (!content) return null;
            
            return (
              <div className="space-y-6">
                {/* Feature Header */}
                <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-4xl">{content.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-yellow-300 mb-2">{content.title}</h2>
                      <p className="text-gray-300 leading-relaxed">{content.description}</p>
                    </div>
                  </div>
                </div>

                {/* Feature Details */}
                {content.details.map((detail, index) => (
                  <div key={index} className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
                    <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                      {detail.title}
                    </h3>
                    <ul className="space-y-2">
                      {detail.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-gray-300 flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            );
          })()}
        </MuClassicModal>
      )}
    </div>
  );
}

