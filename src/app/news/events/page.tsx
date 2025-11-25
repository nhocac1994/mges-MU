'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useConfig } from '@/contexts/ConfigContext';
import NetworkOverlay from '@/components/NetworkOverlay';
import FloatingParticles from '@/components/FloatingParticles';
import AnimatedSection from '@/components/AnimatedSection';

export default function NewsEvents() {
  const { config } = useConfig();

  if (!config) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      fontFamily: 'Roboto, sans-serif'
    }}>
      {/* Network Overlay - Luôn chạy trên background */}
      <NetworkOverlay />
      
      {/* Floating Particles Background */}
      <FloatingParticles count={25} />
      
      {/* Background Image - Desktop Only */}
      <div className="hidden md:block fixed inset-0 bg-cover bg-center bg-no-repeat"></div>
      
      {/* Mobile Background - Simple gradient */}
      <div className="md:hidden fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
      
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10 pt-28">
        {/* Breadcrumb - Classic MU Style */}
        <section className="py-4 bg-black/30">
          <div className="container mx-auto px-4">
            <AnimatedSection direction="right" delay={0.1}>
              <nav className="flex space-x-2 text-sm">
                <Link href="/" className="text-yellow-400 hover:text-yellow-300 transition-colors font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Trang Chủ
                </Link>
                <span className="text-gray-400">/</span>
                <Link href="/news" className="text-yellow-400 hover:text-yellow-300 transition-colors font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Tin Tức
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-white font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>Sự Kiện</span>
              </nav>
            </AnimatedSection>
          </div>
        </section>

        {/* Article - Classic MU Style */}
        <section className="py-16 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection direction="up" delay={0.2}>
                <div className="relative">
                  {/* Border Glow Effect */}
                  <div className="absolute inset-0 mu-modal-border-glow"></div>
                  
                  <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-8">
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                    
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-1 rounded-full text-sm font-bold border border-yellow-500/30 mu-button-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
                        EVENT
                      </span>
                      <span className="text-yellow-400 font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>21/09/2024</span>
                    </div>
                    
                    <h1 className="text-4xl font-bold text-yellow-300 mb-6 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
                      CÁC SỰ KIỆN TRONG GAME
                    </h1>
              
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-4">🎮 Sự Kiện Hàng Ngày</h2>
                <p className="text-gray-300 mb-6">
                  Mỗi ngày server sẽ có các sự kiện đặc biệt để người chơi có thể nhận được nhiều phần thưởng hơn:
                </p>
                
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      {[
                        { title: '⚡ Double EXP Event', time: '20:00 - 22:00 hàng ngày', items: ['Nhận gấp đôi kinh nghiệm', 'Áp dụng cho tất cả map', 'Không giới hạn level'], color: 'green' },
                        { title: '💎 Drop Rate Event', time: '14:00 - 16:00 hàng ngày', items: ['Tăng tỷ lệ rơi đồ hiếm', 'Áp dụng cho tất cả quái vật', 'Cơ hội nhận set items'], color: 'blue' }
                      ].map((event, idx) => (
                        <motion.div
                          key={idx}
                          className={`relative bg-black/40 rounded-lg p-6 border ${
                            event.color === 'green' ? 'border-green-500/30 hover:border-green-400/60' : 'border-blue-500/30 hover:border-blue-400/60'
                          } transition-all duration-300 mu-command-card`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          whileHover={{ scale: 1.02, y: -5 }}
                        >
                          {/* Corner decorations */}
                          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/50"></div>
                          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/50"></div>
                          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/50"></div>
                          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/50"></div>
                          
                          <h3 className={`text-xl font-bold mb-4 ${
                            event.color === 'green' ? 'text-green-400' : 'text-blue-400'
                          }`} style={{ fontFamily: 'Arial, sans-serif' }}>{event.title}</h3>
                          <p className="text-gray-300 mb-4">Thời gian: {event.time}</p>
                          <ul className="text-gray-300 space-y-2">
                            {event.items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className={`w-2 h-2 rounded-full mt-2 animate-pulse ${
                                  event.color === 'green' ? 'bg-green-400 mu-dot-glow' : 'bg-blue-400 mu-dot-glow'
                                }`} style={{animationDelay: `${i * 0.2}s`}}></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>

                <h2 className="text-2xl font-bold text-white mb-4">🏆 Sự Kiện Hàng Tuần</h2>
                <p className="text-gray-300 mb-6">
                  Các sự kiện đặc biệt diễn ra vào cuối tuần với phần thưởng lớn:
                </p>
                
                <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">⚔️ PK Tournament</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-300 mb-4">Thời gian: Chủ nhật 20:00</p>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Giải đấu PK 1vs1</li>
                        <li>• Phần thưởng: Zen + Items</li>
                        <li>• Đăng ký: 19:00 - 19:30</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-gray-300 mb-4">Phần thưởng:</p>
                      <ul className="text-gray-300 space-y-2">
                        <li>• 🥇 Hạng 1: 10,000 Zen + Wing</li>
                        <li>• 🥈 Hạng 2: 5,000 Zen + Ring</li>
                        <li>• 🥉 Hạng 3: 2,000 Zen + Pendant</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">🏰 Guild War</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-300 mb-4">Thời gian: Thứ 7 21:00</p>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Chiến tranh giữa các guild</li>
                        <li>• Chiếm lấy Castle Siege</li>
                        <li>• Phần thưởng guild lớn</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-gray-300 mb-4">Phần thưởng Guild:</p>
                      <ul className="text-gray-300 space-y-2">
                        <li>• 🏆 Guild thắng: 50,000 Zen</li>
                        <li>• 🥈 Guild thua: 10,000 Zen</li>
                        <li>• 🎁 Bonus items cho tất cả</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">🎉 Sự Kiện Đặc Biệt</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-red-800/30 rounded-lg p-6 border border-red-500/30">
                    <h3 className="text-lg font-bold text-red-400 mb-3">🎂 Birthday Event</h3>
                    <p className="text-gray-300 text-sm">Sự kiện sinh nhật server với nhiều phần thưởng đặc biệt</p>
                  </div>
                  
                  <div className="bg-purple-800/30 rounded-lg p-6 border border-purple-500/30">
                    <h3 className="text-lg font-bold text-purple-400 mb-3">🎃 Halloween Event</h3>
                    <p className="text-gray-300 text-sm">Sự kiện Halloween với trang phục và items đặc biệt</p>
                  </div>
                  
                  <div className="bg-yellow-800/30 rounded-lg p-6 border border-yellow-500/30">
                    <h3 className="text-lg font-bold text-yellow-400 mb-3">🎄 Christmas Event</h3>
                    <p className="text-gray-300 text-sm">Sự kiện Giáng sinh với quà tặng và decorations</p>
                  </div>
                </div>
              </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
