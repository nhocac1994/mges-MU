'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import FloatingParticles from '@/components/FloatingParticles';
import NetworkOverlay from '@/components/NetworkOverlay';
import { useConfig } from '@/contexts/ConfigContext';
import MuClassicModal from '@/components/MuClassicModal';

export default function Info() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { config } = useConfig();
  const [selectedCommand, setSelectedCommand] = useState<{ command: string; description: string; details?: string } | null>(null);
  const [isCommandModalOpen, setIsCommandModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<{ title: string; icon: string; description: string; details?: any } | null>(null);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCommandClick = (command: string, description: string, details?: string) => {
    setSelectedCommand({ command, description, details });
    setIsCommandModalOpen(true);
  };

  const handleCloseCommandModal = () => {
    setIsCommandModalOpen(false);
    setSelectedCommand(null);
  };

  const handleFeatureClick = (feature: { title: string; icon: string; description: string; details?: any }) => {
    setSelectedFeature(feature);
    setIsFeatureModalOpen(true);
  };

  const handleCloseFeatureModal = () => {
    setIsFeatureModalOpen(false);
    setSelectedFeature(null);
  };

  const features = [
    {
      title: 'Auto Reset',
      icon: '🎯',
      description: 'Tự động reset khi đạt level 400, giúp người chơi tiết kiệm thời gian',
      color: 'green',
      details: {
        benefits: [
          'Tự động reset khi đạt level 400',
          'Nhận thêm stat points sau mỗi lần reset',
          'Tiết kiệm thời gian, không cần reset thủ công',
          'Hỗ trợ auto reset liên tục'
        ],
        requirements: [
          'Đạt level 400',
          'Có đủ điểm stat để reset',
          'Bật chế độ auto reset trong game'
        ],
        tips: 'Sử dụng lệnh /reset auto để bật chế độ tự động reset'
      }
    },
    {
      title: 'PK System',
      icon: '⚔️',
      description: 'Hệ thống PK công bằng và thú vị với nhiều chế độ chiến đấu',
      color: 'blue',
      details: {
        benefits: [
          'Nhiều chế độ PK: Duel, Free PK, Arena',
          'Hệ thống ranking PK công bằng',
          'Phần thưởng từ PK Tournament',
          'Bảo vệ người chơi level thấp'
        ],
        modes: [
          'Duel System: Thách đấu 1 vs 1',
          'Free PvP: Chiến đấu tự do',
          'Arena: Đấu trường với ranking',
          'PK Tournament: Giải đấu hàng tuần'
        ],
        tips: 'Sử dụng /pkclear để xóa trạng thái PK nếu cần'
      }
    },
    {
      title: 'Guild War',
      icon: '🏆',
      description: 'Chiến tranh guild hàng tuần với phần thưởng hấp dẫn',
      color: 'purple',
      details: {
        benefits: [
          'Chiến tranh guild hàng tuần',
          'Phần thưởng lớn cho guild thắng',
          'Hệ thống Castle Siege',
          'Nâng cấp guild skills'
        ],
        schedule: [
          'Guild War: Chủ nhật hàng tuần',
          'Castle Siege: Thứ 7 hàng tuần',
          'Thời gian: 20:00 - 22:00'
        ],
        tips: 'Tham gia guild để có thể tham gia Guild War'
      }
    },
    {
      title: 'Economy',
      icon: '💰',
      description: 'Hệ thống kinh tế ổn định và cân bằng cho tất cả người chơi',
      color: 'yellow',
      details: {
        benefits: [
          'Hệ thống kinh tế ổn định',
          'Tỷ giá hợp lý giữa các items',
          'Marketplace công bằng',
          'Hỗ trợ trading an toàn'
        ],
        features: [
          'NPC Trading: Mua bán với NPC',
          'Player Trading: Giao dịch giữa người chơi',
          'Auction System: Đấu giá items',
          'Guild Storage: Kho chung của guild'
        ],
        tips: 'Sử dụng marketplace để giao dịch an toàn'
      }
    },
    {
      title: 'Events',
      icon: '🎮',
      description: 'Sự kiện hàng ngày và hàng tuần với phần thưởng độc quyền',
      color: 'red',
      details: {
        benefits: [
          'Sự kiện hàng ngày: Double EXP, Double Drop',
          'Sự kiện hàng tuần: PK Tournament, Guild War',
          'Sự kiện đặc biệt theo mùa',
          'Phần thưởng độc quyền'
        ],
        daily: [
          'Double EXP: Tăng gấp đôi kinh nghiệm',
          'Double Drop: Tăng tỷ lệ rơi đồ',
          'Blood Castle: Sự kiện đặc biệt',
          'Devil Square: Thử thách với phần thưởng lớn'
        ],
        tips: 'Theo dõi lịch sự kiện để không bỏ lỡ'
      }
    },
    {
      title: 'Anti-Cheat',
      icon: '🛡️',
      description: 'Hệ thống chống hack hiệu quả, đảm bảo công bằng cho mọi người',
      color: 'cyan',
      details: {
        benefits: [
          'Hệ thống chống hack hiện đại',
          'Tự động phát hiện và xử lý',
          'Đảm bảo công bằng cho mọi người',
          'Bảo vệ tài khoản người chơi'
        ],
        features: [
          'Auto-detection: Tự động phát hiện hack',
          'Real-time monitoring: Giám sát thời gian thực',
          'Fair play: Đảm bảo công bằng',
          'Account protection: Bảo vệ tài khoản'
        ],
        tips: 'Không sử dụng hack để tránh bị ban'
      }
    }
  ];

  const commands = [
    { command: '/reset', description: 'Reset your character', details: 'Reset nhân vật về level 1 và nhận thêm stat points. Yêu cầu đạt level 400.' },
    { command: '/reset auto', description: 'Auto Reset your character', details: 'Tự động reset khi đạt level 400. Cần bật chế độ auto reset trước.' },
    { command: '/nv', description: 'Làm nhiệm vụ nhanh', details: 'Hoàn thành nhiệm vụ nhanh chóng. Có thể sử dụng nhiều lần trong ngày.' },
    { command: '/pkclear', description: 'Clear killer status', details: 'Xóa trạng thái PK (Player Killer). Cần trả tiền phạt hoặc chờ thời gian.' },
    { command: '/pickset [tên item]', description: 'Cài đặt auto nhặt', details: 'Thiết lập danh sách items tự động nhặt. Ví dụ: /pickset Dragon Armor' },
    { command: '/pick', description: 'Auto nhặt', details: 'Bật chế độ tự động nhặt đồ từ quái vật. Chỉ nhặt items đã cài đặt.' },
    { command: '/pickclear', description: 'Tắt Auto nhặt', details: 'Tắt chế độ tự động nhặt đồ.' },
    { command: '/post [message]', description: 'Gửi tin nhắn đến toàn server', details: 'Gửi tin nhắn công khai đến tất cả người chơi trong server. Có thể tốn phí.' },
    { command: '/readd', description: 'Tẩy điểm', details: 'Reset lại tất cả stat points đã phân bổ để phân bổ lại từ đầu.' },
    { command: '/addstr [points]', description: 'Cộng điểm sức mạnh', details: 'Thêm điểm vào chỉ số Strength (Sức mạnh). Ví dụ: /addstr 100' },
    { command: '/addagi [points]', description: 'Cộng điểm nhanh nhẹn', details: 'Thêm điểm vào chỉ số Agility (Nhanh nhẹn). Ví dụ: /addagi 100' },
    { command: '/addvit [points]', description: 'Cộng điểm máu', details: 'Thêm điểm vào chỉ số Vitality (Máu). Ví dụ: /addvit 100' },
    { command: '/addene [points]', description: 'Cộng điểm năng lượng', details: 'Thêm điểm vào chỉ số Energy (Năng lượng). Ví dụ: /addene 100' },
    { command: '/addcmd [points]', description: 'Cộng điểm mệnh lệnh', details: 'Thêm điểm vào chỉ số Command (Mệnh lệnh). Ví dụ: /addcmd 100' },
    { command: '/thungdo [0-5]', description: 'Mở thùng đồ cá nhân từ 1 - 5', details: 'Mở thùng đồ cá nhân. Số từ 0-5 tương ứng với các thùng đồ khác nhau.' }
  ];

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          setScrollY(scrollTop);
          setIsScrolled(scrollTop > 100);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Đảm bảo config có giá trị trước khi render
  if (!config) {
    return null; // Hoặc return loading state
  }

  return (
    <div className="relative" style={{
      fontFamily: 'Roboto, sans-serif'
    }}>
      {/* Network Overlay - Luôn chạy trên background */}
      <NetworkOverlay />
      
      {/* Floating Particles Background */}
      <FloatingParticles count={25} />
      
      {/* Background Image - Desktop Only */}
      {isClient && (
        <>
          <div 
            className="hidden md:block fixed inset-0 bg-cover bg-center bg-no-repeat"
            // style={{
            //   backgroundImage: 'url(/logoweb.jpg)',
            //   backgroundAttachment: 'fixed'
            // }}
          ></div>
          
          {/* Mobile Background - Simple gradient */}
          <div className="md:hidden fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
        </>
      )}
      
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/20"></div>
      
      {/* Content */}
      <div className="relative z-10 pt-28">
        {/* Main Content */}
        <main className="relative z-10 py-8">

      {/* Page Header */}
      <section className="py-20 bg-gradient-to-b from-black/40 to-black/60 relative">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
              y: [-20, 20, -20]
            }}
            transition={{
              duration: 5,
              delay: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div 
              className="text-6xl font-black text-white mb-4 relative"
              style={{fontFamily: 'Orbitron, monospace'}}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <span 
                className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent"
                style={{ backgroundSize: '200% 200%' }}
              >
                THÔNG TIN SERVER
              </span>
              {/* Glow Effect */}
              <motion.div 
                className="absolute inset-0 text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent blur-sm opacity-50"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                THÔNG TIN SERVER
              </motion.div>
            </motion.div>
            <AnimatedSection direction="up" delay={0.2}>
              <div className="text-2xl font-semibold text-blue-300 mb-4">
                <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                  {config.nameGame} - {config.gameTitle}
                </span>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.4}>
              <div className="text-lg text-white/80">
                Thông tin chi tiết về server và các tính năng nổi bật
              </div>
            </AnimatedSection>
          </motion.div>
        </div>
      </section>
      

      {/* Server Info - Classic MU Season 1 Style */}
      <section className="py-16 relative">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Server Stats - Classic MU Style */}
            <AnimatedSection direction="left" delay={0.2}>
              <div className="relative">
                {/* Border Glow Effect */}
                <div className="absolute inset-0 mu-modal-border-glow"></div>
                
                {/* Main Container */}
              <motion.div 
                  className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-8"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'tween', duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                  
                  {/* Header */}
                  <div className="relative bg-gradient-to-r from-yellow-600/20 via-orange-600/20 to-yellow-600/20 border-b-2 border-yellow-500/60 px-6 py-4 mb-6 -mx-8 -mt-8 rounded-t-lg">
                    <div className="absolute inset-0 mu-modal-shimmer"></div>
                    <div className="relative flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center border-2 border-yellow-500/30">
                  <span className="text-white text-2xl">📊</span>
                </div>
                      <div>
                        <h2 className="text-3xl font-bold text-yellow-300 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
                          THỐNG KÊ SERVER
                        </h2>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse mu-dot-glow mt-2"></div>
                      </div>
              </div>
                  </div>
                  
                  {/* Stats List */}
                  <div className="space-y-4">
                    <motion.div 
                      className="relative bg-black/40 rounded-lg p-4 border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 group mu-command-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05, type: 'tween', duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      {/* Corner decorations */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500/50"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500/50"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500/50"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500/50"></div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow"></div>
                        <div className="flex-1">
                          <div className="text-yellow-400 font-bold text-lg mb-2 group-hover:text-yellow-300 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Người Online:
                          </div>
                          <div className="text-green-400 font-bold text-2xl group-hover:text-green-300 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>1,234</div>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="relative bg-black/40 rounded-lg p-4 border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 group mu-command-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, type: 'tween', duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      {/* Corner decorations */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500/50"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500/50"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500/50"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500/50"></div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow" style={{animationDelay: '0.5s'}}></div>
                        <div className="flex-1">
                          <div className="text-yellow-400 font-bold text-lg mb-2 group-hover:text-yellow-300 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Tổng Tài Khoản:
                          </div>
                          <div className="text-blue-400 font-bold text-2xl group-hover:text-blue-300 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>5,678</div>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="relative bg-black/40 rounded-lg p-4 border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 group mu-command-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, type: 'tween', duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      {/* Corner decorations */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500/50"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500/50"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500/50"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500/50"></div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow" style={{animationDelay: '1s'}}></div>
                        <div className="flex-1">
                          <div className="text-yellow-400 font-bold text-lg mb-2 group-hover:text-yellow-300 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Server Uptime:
                          </div>
                          <div className="text-yellow-400 font-bold text-2xl group-hover:text-yellow-300 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>99.9%</div>
                </div>
                  </div>
                    </motion.div>
                    
                    <motion.div 
                      className="relative bg-black/40 rounded-lg p-4 border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 group mu-command-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, type: 'tween', duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      {/* Corner decorations */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500/50"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500/50"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500/50"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500/50"></div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow" style={{animationDelay: '1.5s'}}></div>
                        <div className="flex-1">
                          <div className="text-yellow-400 font-bold text-lg mb-2 group-hover:text-yellow-300 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Version:
                </div>
                          <div className="text-purple-400 font-bold text-2xl group-hover:text-purple-300 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>{config.serverVersion}</div>
                  </div>
                </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>

            {/* Server Settings - Classic MU Style */}
            <AnimatedSection direction="right" delay={0.3}>
              <div className="relative">
                {/* Border Glow Effect */}
                <div className="absolute inset-0 mu-modal-border-glow"></div>
                
                {/* Main Container */}
              <motion.div 
                  className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-8"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'tween', duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                  
                  {/* Header */}
                  <div className="relative bg-gradient-to-r from-yellow-600/20 via-orange-600/20 to-yellow-600/20 border-b-2 border-yellow-500/60 px-6 py-4 mb-6 -mx-8 -mt-8 rounded-t-lg">
                    <div className="absolute inset-0 mu-modal-shimmer"></div>
                    <div className="relative flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center border-2 border-yellow-500/30">
                  <span className="text-white text-2xl">⚙️</span>
                </div>
                      <div>
                        <h2 className="text-3xl font-bold text-yellow-300 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
                          CÀI ĐẶT SERVER
                        </h2>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse mu-dot-glow mt-2"></div>
                      </div>
              </div>
                  </div>
                  
                  {/* Settings List */}
                  <div className="space-y-4">
                    <motion.div 
                      className="relative bg-black/40 rounded-lg p-4 border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 group mu-command-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05, type: 'tween', duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      {/* Corner decorations */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500/50"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500/50"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500/50"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500/50"></div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow"></div>
                        <div className="flex-1">
                          <div className="text-yellow-400 font-bold text-lg mb-2 group-hover:text-yellow-300 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Exp Rate:
                          </div>
                          <div className="text-green-400 font-bold text-2xl group-hover:text-green-300 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>{config.expRate}</div>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="relative bg-black/40 rounded-lg p-4 border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 group mu-command-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, type: 'tween', duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      {/* Corner decorations */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500/50"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500/50"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500/50"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500/50"></div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow" style={{animationDelay: '0.5s'}}></div>
                        <div className="flex-1">
                          <div className="text-yellow-400 font-bold text-lg mb-2 group-hover:text-yellow-300 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Drop Rate:
                          </div>
                          <div className="text-green-400 font-bold text-2xl group-hover:text-green-300 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>{config.dropRate}</div>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="relative bg-black/40 rounded-lg p-4 border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 group mu-command-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, type: 'tween', duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      {/* Corner decorations */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500/50"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500/50"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500/50"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500/50"></div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow" style={{animationDelay: '1s'}}></div>
                        <div className="flex-1">
                          <div className="text-yellow-400 font-bold text-lg mb-2 group-hover:text-yellow-300 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Max Level:
                          </div>
                          <div className="text-blue-400 font-bold text-2xl group-hover:text-blue-300 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>{config.resetLevel}</div>
                </div>
                  </div>
                    </motion.div>
                    
                    <motion.div 
                      className="relative bg-black/40 rounded-lg p-4 border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 group mu-command-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, type: 'tween', duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      {/* Corner decorations */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500/50"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500/50"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500/50"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500/50"></div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow" style={{animationDelay: '1.5s'}}></div>
                        <div className="flex-1">
                          <div className="text-yellow-400 font-bold text-lg mb-2 group-hover:text-yellow-300 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Reset Level:
                </div>
                          <div className="text-purple-400 font-bold text-2xl group-hover:text-purple-300 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>{config.resetLevel}</div>
                  </div>
                </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Game Commands Section - Classic MU Season 1 Style */}
      <section className="py-16 bg-black/30 relative">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-5xl font-black text-white mb-4 relative"
                style={{ fontFamily: 'Arial, sans-serif', textShadow: '0 0 20px rgba(234, 179, 8, 0.5)' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mu-text-glow">
                  CÁC LỆNH TRONG GAME
                </span>
                {/* Glow Effect */}
                <motion.div 
                  className="absolute inset-0 text-5xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent blur-sm opacity-50"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  CÁC LỆNH TRONG GAME
                </motion.div>
              </motion.h2>
              <p className="text-xl text-gray-300">
                Danh sách các lệnh hữu ích để chơi game hiệu quả
              </p>
            </div>

            {/* Classic MU Style Container */}
            <div className="relative">
              {/* Border Glow Effect */}
              <div className="absolute inset-0 mu-modal-border-glow"></div>
              
              {/* Main Container */}
              <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-8">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-yellow-600/20 via-orange-600/20 to-yellow-600/20 border-b-2 border-yellow-500/60 px-6 py-4 mb-6 rounded-t-lg">
                  <div className="absolute inset-0 mu-modal-shimmer"></div>
                  <div className="relative flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse mu-dot-glow"></div>
                    <h3 className="text-2xl font-bold text-yellow-300 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
                      DANH SÁCH LỆNH
                    </h3>
                  </div>
                </div>

                {/* Commands Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {commands.map((cmd, index) => (
                    <motion.div
                      key={index}
                      onClick={() => handleCommandClick(cmd.command, cmd.description, cmd.details)}
                      className="relative bg-black/40 rounded-lg p-4 border border-yellow-500/30 hover:border-yellow-400/60 cursor-pointer transition-all duration-300 group mu-command-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03, type: 'tween', duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Corner decorations */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500/50"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500/50"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500/50"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500/50"></div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
                        <div className="flex-1">
                          <div className="font-mono text-yellow-400 font-bold text-lg mb-2 group-hover:text-yellow-300 transition-colors" style={{ fontFamily: 'Courier New, monospace' }}>
                            {cmd.command}
                          </div>
                          <div className="text-gray-300 text-sm group-hover:text-white transition-colors">
                            {cmd.description}
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/0 via-yellow-600/10 to-yellow-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Footer Note */}
                <div className="mt-8 p-6 bg-black/40 rounded-lg border border-yellow-500/30 relative">
                  <div className="absolute inset-0 mu-modal-shimmer opacity-30"></div>
                  <div className="relative">
                    <h3 className="text-lg font-bold text-yellow-400 mb-4 flex items-center gap-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                      <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                      Lưu ý quan trọng:
                    </h3>
                <ul className="text-gray-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>Tất cả lệnh phải được nhập chính xác, phân biệt chữ hoa/thường</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>Một số lệnh yêu cầu quyền admin hoặc level nhất định</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>Sử dụng lệnh /help để xem thêm thông tin chi tiết</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>Liên hệ admin nếu gặp vấn đề với các lệnh</span>
                      </li>
                </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Classic MU Season 1 Style */}
      <section className="py-20 bg-gradient-to-b from-black/30 to-black/50 relative">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-5xl font-black text-white mb-6 relative"
              style={{ fontFamily: 'Arial, sans-serif', textShadow: '0 0 20px rgba(234, 179, 8, 0.5)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mu-text-glow">
                TÍNH NĂNG NỔI BẬT
              </span>
              {/* Glow Effect */}
              <motion.div 
                className="absolute inset-0 text-5xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent blur-sm opacity-50"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                TÍNH NĂNG NỔI BẬT
              </motion.div>
            </motion.h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Khám phá những tính năng độc đáo và hấp dẫn của server {config.nameGame}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                onClick={() => handleFeatureClick(feature)}
                className="relative bg-black/40 rounded-lg p-6 border border-yellow-500/30 hover:border-yellow-400/60 cursor-pointer transition-all duration-300 group mu-command-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, type: 'tween', duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500/50"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500/50"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500/50"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500/50"></div>
                
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${
                    feature.color === 'green' ? 'from-green-500 to-emerald-500' :
                    feature.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                    feature.color === 'purple' ? 'from-purple-500 to-pink-500' :
                    feature.color === 'yellow' ? 'from-yellow-500 to-orange-500' :
                    feature.color === 'red' ? 'from-red-500 to-pink-500' :
                    'from-cyan-500 to-blue-500'
                  } rounded-lg flex items-center justify-center border-2 border-yellow-500/30 group-hover:scale-110 transition-transform`}>
                    <span className="text-white text-2xl">{feature.icon}</span>
                </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse mu-dot-glow"></div>
                      <h3 className="text-xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>
                        {feature.title}
                      </h3>
              </div>
                    <p className="text-gray-300 text-sm group-hover:text-white transition-colors leading-relaxed">
                      {feature.description}
                    </p>
                    <p className="text-yellow-400 text-xs mt-3 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Click để xem chi tiết →
                    </p>
            </div>
            </div>
            
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/0 via-yellow-600/10 to-yellow-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </motion.div>
            ))}
                </div>
              </div>
      </section>
      </main>
            </div>
            
      {/* Command Detail Modal */}
      {selectedCommand && (
        <MuClassicModal
          isOpen={isCommandModalOpen}
          onClose={handleCloseCommandModal}
          title="Chi Tiết Lệnh"
          type="news"
        >
          <div className="space-y-6">
            {/* Command Header */}
            <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">⚔️</span>
                <div>
                  <h2 className="text-2xl font-bold text-yellow-300 mb-1" style={{ fontFamily: 'Courier New, monospace' }}>
                    {selectedCommand.command}
                  </h2>
                  <p className="text-gray-300">{selectedCommand.description}</p>
                </div>
              </div>
            </div>
            
            {/* Command Details */}
            {selectedCommand.details && (
              <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
                <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  Mô Tả Chi Tiết
                </h3>
                <p className="text-gray-300 leading-relaxed">{selectedCommand.details}</p>
              </div>
            )}

            {/* Usage Example */}
            <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
              <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Cách Sử Dụng
              </h3>
              <div className="bg-black/60 rounded p-3 border border-yellow-500/20">
                <code className="text-yellow-400 font-mono text-lg" style={{ fontFamily: 'Courier New, monospace' }}>
                  {selectedCommand.command}
                </code>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Nhập lệnh này trong game chat để sử dụng
              </p>
            </div>
          </div>
        </MuClassicModal>
      )}

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <MuClassicModal
          isOpen={isFeatureModalOpen}
          onClose={handleCloseFeatureModal}
          title={`Chi Tiết Tính Năng - ${selectedFeature.title}`}
          type="news"
        >
          <div className="space-y-6">
            {/* Feature Header */}
            <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
              <div className="flex items-center gap-4 mb-3">
                <span className="text-4xl">{selectedFeature.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-yellow-300 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                    {selectedFeature.title}
                  </h2>
                  <p className="text-gray-300 leading-relaxed">{selectedFeature.description}</p>
                </div>
              </div>
            </div>

            {/* Feature Details */}
            {selectedFeature.details && (
              <>
                {selectedFeature.details.benefits && (
                  <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
                    <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                      Lợi Ích
                    </h3>
                    <ul className="space-y-2">
                      {selectedFeature.details.benefits.map((benefit: string, idx: number) => (
                        <li key={idx} className="text-gray-300 flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedFeature.details.modes && (
                  <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
                    <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                      Các Chế Độ
                    </h3>
                    <ul className="space-y-2">
                      {selectedFeature.details.modes.map((mode: string, idx: number) => (
                        <li key={idx} className="text-gray-300 flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span>{mode}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedFeature.details.requirements && (
                  <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
                    <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                      Yêu Cầu
                    </h3>
                    <ul className="space-y-2">
                      {selectedFeature.details.requirements.map((req: string, idx: number) => (
                        <li key={idx} className="text-gray-300 flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedFeature.details.schedule && (
                  <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
                    <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                      Lịch Diễn Ra
                    </h3>
                    <ul className="space-y-2">
                      {selectedFeature.details.schedule.map((schedule: string, idx: number) => (
                        <li key={idx} className="text-gray-300 flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span>{schedule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedFeature.details.features && (
                  <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
                    <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                      Tính Năng
                    </h3>
                    <ul className="space-y-2">
                      {selectedFeature.details.features.map((feat: string, idx: number) => (
                        <li key={idx} className="text-gray-300 flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedFeature.details.daily && (
                  <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
                    <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                      Sự Kiện Hàng Ngày
                    </h3>
                    <ul className="space-y-2">
                      {selectedFeature.details.daily.map((event: string, idx: number) => (
                        <li key={idx} className="text-gray-300 flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span>{event}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedFeature.details.tips && (
                  <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
                    <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                      💡 Gợi Ý
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{selectedFeature.details.tips}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </MuClassicModal>
      )}
    </div>
  );
}

