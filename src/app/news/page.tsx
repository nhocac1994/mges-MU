'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import NetworkOverlay from '@/components/NetworkOverlay';
import FloatingParticles from '@/components/FloatingParticles';
import AnimatedSection from '@/components/AnimatedSection';
import MuClassicModal from '@/components/MuClassicModal';
import { useConfig } from '@/contexts/ConfigContext';

export default function News() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { config } = useConfig();
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrollY(scrollTop);
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Đảm bảo config có giá trị
  if (!config) {
    return null;
  }

  const handleNewsClick = (e: React.MouseEvent, news: any) => {
    e.preventDefault();
    setSelectedNews(news);
    setIsNewsModalOpen(true);
  };

  const handleCloseNewsModal = () => {
    setIsNewsModalOpen(false);
    setSelectedNews(null);
  };

  const newsItems = [
    {
      id: 'guide',
      type: 'HOT',
      date: '22/09/2024',
      title: `HƯỚNG DẪN CHƠI ${config.nameGame.toUpperCase()} - ${config.gameTitle.toUpperCase()}`,
      description: 'Hướng dẫn chi tiết cách chơi game Mu Online Season 1, từ việc tạo nhân vật đến các tính năng nâng cao. Tìm hiểu về các class, kỹ năng, và cách phát triển nhân vật hiệu quả nhất.',
      link: '/news/guide',
      color: 'red',
      content: `
        <h2>HƯỚNG DẪN CHƠI ${config.nameGame.toUpperCase()} - ${config.gameTitle.toUpperCase()}</h2>
        <p>Chào mừng bạn đến với server ${config.nameGame} - ${config.gameTitle}!</p>
        <h3>1. Tạo Nhân Vật</h3>
        <p>Đầu tiên, bạn cần tạo tài khoản và nhân vật. Chọn class phù hợp với phong cách chơi của bạn.</p>
        <h3>2. Các Class Trong Game</h3>
        <ul>
          <li><strong>Dark Wizard (DW):</strong> Pháp sư với sức mạnh phép thuật cao</li>
          <li><strong>Dark Knight (DK):</strong> Hiệp sĩ với khả năng chiến đấu cận chiến mạnh</li>
          <li><strong>Fairy Elf (FE):</strong> Tiên nữ với khả năng hỗ trợ và tấn công từ xa</li>
          <li><strong>Magic Gladiator (MG):</strong> Chiến binh pháp thuật với sức mạnh cân bằng</li>
        </ul>
        <h3>3. Nâng Cấp Nhân Vật</h3>
        <p>Hãy tham gia các sự kiện EXP để level up nhanh chóng. Server có tỷ lệ EXP cao giúp bạn phát triển nhanh.</p>
        <h3>4. Up Đồ</h3>
        <p>Sử dụng Chaos để nâng cấp đồ. Tỷ lệ thành công phụ thuộc vào level của đồ.</p>
      `
    },
    {
      id: 'events',
      type: 'EVENT',
      date: '21/09/2024',
      title: 'CÁC SỰ KIỆN TRONG GAME',
      description: 'Thông tin về các sự kiện đặc biệt trong game như Double EXP, Drop Rate Event, PK Tournament và nhiều sự kiện thú vị khác đang diễn ra.',
      link: '/news/events',
      color: 'green',
      content: `
        <h2>CÁC SỰ KIỆN TRONG GAME</h2>
        <p>Server thường xuyên tổ chức các sự kiện đặc biệt để người chơi có trải nghiệm tốt nhất.</p>
        <h3>1. Double EXP Event</h3>
        <p>Sự kiện EXP x2 giúp bạn level up nhanh chóng. Tham gia ngay để không bỏ lỡ cơ hội!</p>
        <h3>2. Drop Rate Event</h3>
        <p>Tăng tỷ lệ rơi đồ, giúp bạn kiếm được nhiều item quý giá hơn.</p>
        <h3>3. PK Tournament</h3>
        <p>Giải đấu PK hàng tuần với phần thưởng hấp dẫn. Thể hiện kỹ năng của bạn!</p>
        <h3>4. Guild War</h3>
        <p>Tham gia Guild War để chiến đấu cùng đồng đội và giành chiến thắng.</p>
      `
    },
    {
      id: 'roadmap',
      type: 'UPDATE',
      date: '20/09/2024',
      title: 'LỘ TRÌNH PHÁT TRIỂN SERVER',
      description: 'Kế hoạch phát triển server trong tương lai, bao gồm các tính năng mới, cập nhật game và cải thiện trải nghiệm người chơi.',
      link: '/news/roadmap',
      color: 'purple',
      content: `
        <h2>LỘ TRÌNH PHÁT TRIỂN SERVER</h2>
        <p>Chúng tôi luôn cố gắng cải thiện và phát triển server để mang lại trải nghiệm tốt nhất cho người chơi.</p>
        <h3>Q4 2024</h3>
        <ul>
          <li>Cải thiện hệ thống PvP</li>
          <li>Thêm tính năng Guild War</li>
          <li>Tối ưu hóa server performance</li>
        </ul>
        <h3>Q1 2025</h3>
        <ul>
          <li>Thêm các map mới</li>
          <li>Cập nhật hệ thống item</li>
          <li>Cải thiện UI/UX</li>
        </ul>
        <h3>Tương Lai</h3>
        <p>Chúng tôi sẽ tiếp tục phát triển và cải thiện server dựa trên phản hồi từ người chơi.</p>
      `
    }
  ];

  const recentNews = [
    { title: 'THÔNG BÁO MỞ SERVER', date: '19/09/2024', link: '/news/opening' },
    { title: 'CẬP NHẬT PATCH 1.1', date: '18/09/2024', link: '/news/update' },
    { title: 'SỰ KIỆN DOUBLE EXP', date: '17/09/2024', link: '/news/events' }
  ];

  const filteredNews = newsItems.filter(news => 
    news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    news.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <div className="fixed inset-0 bg-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10 pt-28">
        {/* Main Content */}
        <main className="relative z-10 py-8">
          {/* Page Header - Classic MU Style */}
      <section className="py-20 bg-gradient-to-b from-black/40 to-black/60 relative overflow-x-hidden md:overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"
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
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h1 
              className="text-6xl font-black text-white mb-4 relative"
              style={{ fontFamily: 'Arial, sans-serif', textShadow: '0 0 20px rgba(234, 179, 8, 0.5)' }}
            >
              <span 
                className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mu-text-glow"
                style={{ backgroundSize: '200% 200%' }}
              >
                TIN TỨC MỚI NHẤT
              </span>
              {/* Glow Effect */}
              <motion.div 
                className="absolute inset-0 text-6xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent blur-sm opacity-50"
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
                TIN TỨC MỚI NHẤT
              </motion.div>
            </motion.h1>
            <AnimatedSection direction="up" delay={0.2}>
              <div className="text-2xl font-semibold text-blue-300 mb-4">
                <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                  Cập nhật thông tin mới nhất về {config.nameGame}
                </span>
              </div>
            </AnimatedSection>
          </motion.div>
        </div>
      </section>

      {/* Search Bar - Classic MU Style */}
      <section className="py-8 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              {/* Border Glow Effect */}
              <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
              
              <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 rounded-lg p-2">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500/50"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500/50"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500/50"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500/50"></div>
                
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm tin tức..." 
                    className="flex-1 bg-black/40 border border-yellow-500/30 rounded px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/60 transition-colors"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  />
                  <motion.button 
                    className="bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border border-yellow-500/60 text-yellow-300 px-6 py-3 rounded font-semibold mu-button-glow"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🔍 Tìm Kiếm
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News List - Classic MU Style */}
      <section className="py-16 relative overflow-x-hidden md:overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main News */}
            <div className="lg:col-span-2 space-y-8">
              {filteredNews.map((news, index) => (
                <AnimatedSection key={news.id} direction="up" delay={index * 0.1}>
                  <div className="relative">
                    {/* Border Glow Effect */}
                    <div className="absolute inset-0 mu-modal-border-glow"></div>
                    
                    <motion.div
                      onClick={(e) => handleNewsClick(e, news)}
                      className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-8 cursor-pointer group"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, type: 'spring', damping: 20, stiffness: 300 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Corner decorations */}
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                      
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`bg-gradient-to-r ${
                          news.color === 'red' ? 'from-red-600 to-red-500' :
                          news.color === 'green' ? 'from-green-600 to-green-500' :
                          'from-purple-600 to-purple-500'
                        } text-white px-4 py-1 rounded-full text-sm font-bold border border-yellow-500/30 mu-button-glow`} style={{ fontFamily: 'Arial, sans-serif' }}>
                          {news.type}
                        </span>
                        <span className="text-yellow-400 font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>{news.date}</span>
                      </div>
                      
                      {/* Title */}
                      <h2 className="text-2xl font-bold text-yellow-300 mb-4 mu-text-glow group-hover:text-yellow-200 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>
                        {news.title}
                      </h2>
                      
                      {/* Description */}
                      <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors">
                        {news.description}
                      </p>
                      
                      {/* CTA */}
                      <div className="flex items-center justify-between">
                        <div className="text-yellow-400 font-semibold group-hover:text-yellow-300 transition-colors">
                          Click để xem chi tiết →
                        </div>
                        <Link 
                          href={news.link} 
                          onClick={(e) => e.stopPropagation()}
                          className="text-yellow-400 hover:text-yellow-300 transition-colors font-semibold mu-button-glow"
                        >
                          Đọc thêm →
                        </Link>
                      </div>
                      
                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/0 via-yellow-600/10 to-yellow-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                    </motion.div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Sidebar - Classic MU Style */}
            <div className="space-y-8">
              {/* Recent News */}
              <AnimatedSection direction="up" delay={0.3}>
                <div className="relative">
                  <div className="absolute inset-0 mu-modal-border-glow"></div>
                  
                  <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-6">
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500/60"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500/60"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500/60"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500/60"></div>
                    
                    <h3 className="text-xl font-bold text-yellow-300 mb-6 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
                      📋 TIN TỨC GẦN ĐÂY
                    </h3>
                    <div className="space-y-4">
                      {recentNews.map((item, idx) => (
                        <motion.div
                          key={idx}
                          className="relative bg-black/40 rounded-lg p-3 border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 group mu-command-card"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.05 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                        >
                          {/* Corner decorations */}
                          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-yellow-500/50"></div>
                          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-yellow-500/50"></div>
                          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-yellow-500/50"></div>
                          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-yellow-500/50"></div>
                          
                          <Link href={item.link} className="block">
                            <h4 className="text-white font-semibold mb-2 group-hover:text-yellow-300 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>
                              {item.title}
                            </h4>
                            <p className="text-yellow-400 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>{item.date}</p>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Categories */}
              <AnimatedSection direction="up" delay={0.4}>
                <div className="relative">
                  <div className="absolute inset-0 mu-modal-border-glow"></div>
                  
                  <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-6">
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500/60"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500/60"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500/60"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500/60"></div>
                    
                    <h3 className="text-xl font-bold text-yellow-300 mb-6 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
                      🏷️ DANH MỤC
                    </h3>
                    <div className="space-y-3">
                      {[
                        { href: '/news/guide', label: '📖 Hướng Dẫn', colorClass: 'text-blue-400' },
                        { href: '/news/events', label: '🎮 Sự Kiện', colorClass: 'text-green-400' },
                        { href: '/news/roadmap', label: '🚀 Cập Nhật', colorClass: 'text-purple-400' },
                        { href: '/news/opening', label: '📢 Thông Báo', colorClass: 'text-red-400' }
                      ].map((category, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link 
                            href={category.href} 
                            className="block relative bg-black/40 rounded-lg p-3 border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 group mu-command-card"
                          >
                            {/* Corner decorations */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-yellow-500/50"></div>
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-yellow-500/50"></div>
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-yellow-500/50"></div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-yellow-500/50"></div>
                            
                            <span className={`${category.colorClass} group-hover:text-yellow-300 transition-colors font-semibold`} style={{ fontFamily: 'Arial, sans-serif' }}>
                              {category.label}
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
        </main>
      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <MuClassicModal
          isOpen={isNewsModalOpen}
          onClose={handleCloseNewsModal}
          title={selectedNews.title}
          type="news"
          newsDate={selectedNews.date}
          newsType={selectedNews.type}
        >
          <div className="space-y-6">
            {/* News Header */}
            <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
              <div className="flex items-center justify-between mb-3">
                <span className={`bg-gradient-to-r ${
                  selectedNews.color === 'red' ? 'from-red-600 to-red-500' :
                  selectedNews.color === 'green' ? 'from-green-600 to-green-500' :
                  'from-purple-600 to-purple-500'
                } text-white px-4 py-1 rounded-full text-sm font-bold border border-yellow-500/30 mu-button-glow`} style={{ fontFamily: 'Arial, sans-serif' }}>
                  {selectedNews.type}
                </span>
                <span className="text-yellow-400 font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>
                  {selectedNews.date}
                </span>
              </div>
            </div>

            {/* News Content */}
            <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
              <div 
                className="prose prose-invert max-w-none text-gray-300"
                dangerouslySetInnerHTML={{ __html: selectedNews.content }}
                style={{ fontFamily: 'Arial, sans-serif' }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link
                href={selectedNews.link}
                className="flex-1 text-center px-6 py-3 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border border-yellow-500/60 text-yellow-300 font-semibold rounded mu-button-glow hover:from-yellow-600/50 hover:to-orange-600/50 transition-all"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                Đọc Chi Tiết Đầy Đủ →
              </Link>
            </div>
          </div>
        </MuClassicModal>
      )}
    </div>
  );
}
