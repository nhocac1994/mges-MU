'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useConfig } from '@/contexts/ConfigContext';
import NetworkOverlay from '@/components/NetworkOverlay';
import FloatingParticles from '@/components/FloatingParticles';
import AnimatedSection from '@/components/AnimatedSection';

export default function NewsGuide() {
  const { config } = useConfig();

  // Đảm bảo config có giá trị
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
                <span className="text-white font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>Hướng Dẫn</span>
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
                      <span className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-1 rounded-full text-sm font-bold border border-yellow-500/30 mu-button-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
                        HOT
                      </span>
                      <span className="text-yellow-400 font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>22/09/2024</span>
                    </div>
                    
                    <h1 className="text-4xl font-bold text-yellow-300 mb-6 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
                      HƯỚNG DẪN CHƠI {config.nameGame.toUpperCase()} - {config.gameTitle.toUpperCase()}
                    </h1>
                    
                    <div className="prose prose-invert max-w-none">
                      <AnimatedSection direction="up" delay={0.3}>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>🎮 Tạo Nhân Vật</h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          Đầu tiên, bạn cần tạo một tài khoản và nhân vật. Có 3 class chính trong Mu Online Season 1:
                        </p>
                        
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                          {[
                            { title: '⚔️ Dark Knight', desc: 'Chiến binh mạnh mẽ với khả năng chiến đấu cận chiến', items: ['Sức mạnh cao', 'Khả năng chịu đòn tốt', 'Phù hợp với người mới'] },
                            { title: '🏹 Dark Wizard', desc: 'Pháp sư với khả năng tấn công từ xa', items: ['Sát thương cao', 'Tấn công từ xa', 'Cần kỹ năng cao'] },
                            { title: '🔮 Fairy Elf', desc: 'Tiên nữ với khả năng hỗ trợ và tấn công', items: ['Khả năng hỗ trợ', 'Tấn công linh hoạt', 'Cân bằng tốt'] }
                          ].map((classItem, idx) => (
                            <motion.div
                              key={idx}
                              className="relative bg-black/40 rounded-lg p-6 border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 mu-command-card"
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
                              
                              <h3 className="text-xl font-bold text-yellow-300 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>{classItem.title}</h3>
                              <p className="text-gray-300 mb-4">{classItem.desc}</p>
                              <ul className="text-gray-300 space-y-2">
                                {classItem.items.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow"></span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          ))}
                        </div>
                      </AnimatedSection>

                      <AnimatedSection direction="up" delay={0.4}>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>📈 Phát Triển Nhân Vật</h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          Sau khi tạo nhân vật, bạn cần phát triển nhân vật thông qua:
                        </p>
                        
                        <div className="space-y-6 mb-8">
                          {[
                            { title: '⚡ Leveling', items: [
                              'Level 1-50: Tập trung vào việc giết quái vật cấp thấp',
                              'Level 50-100: Tham gia các sự kiện EXP',
                              'Level 100+: Tìm party để level hiệu quả'
                            ]},
                            { title: '💎 Equipment', items: [
                              'Weapon: Vũ khí chính để tăng sát thương',
                              'Armor: Giáp để tăng khả năng phòng thủ',
                              'Accessories: Trang sức để tăng stats'
                            ]}
                          ].map((section, idx) => (
                            <motion.div
                              key={idx}
                              className="relative bg-black/40 rounded-lg p-6 border border-yellow-500/30 mu-command-card"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + idx * 0.1 }}
                            >
                              {/* Corner decorations */}
                              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/50"></div>
                              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/50"></div>
                              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/50"></div>
                              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/50"></div>
                              
                              <h3 className="text-xl font-bold text-yellow-300 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>{section.title}</h3>
                              <ul className="text-gray-300 space-y-2">
                                {section.items.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow" style={{animationDelay: `${i * 0.2}s`}}></span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          ))}
                        </div>
                      </AnimatedSection>

                      <AnimatedSection direction="up" delay={0.5}>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>💎 Drop Item</h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          Hướng dẫn về hệ thống drop item theo từng map:
                        </p>
                        
                        <div className="space-y-6 mb-8">
                          {[
                            { 
                              title: '🔮 Map Lorencia & Devias', 
                              color: 'blue',
                              items: [
                                'Rơi: Ngọc Ước Nguyện và Ngọc Tâm Linh',
                                'Đây là các map chính để farm ngọc socket',
                                'Thích hợp cho người chơi level trung bình'
                              ]
                            },
                            { 
                              title: '⚔️ Map Dungeon', 
                              color: 'purple',
                              items: [
                                'Rơi: Các loại ngọc và Vũ khí Box 3',
                                'Map có độ khó cao, cần chuẩn bị tốt',
                                'Phần thưởng giá trị cao cho người chơi mạnh'
                              ]
                            },
                            { 
                              title: '📈 Tỷ Lệ EXP', 
                              color: 'green',
                              items: [
                                'Tỷ lệ EXP 150% cho các map khác',
                                'Giúp leveling nhanh hơn so với map thường',
                                'Tham gia các sự kiện để nhận EXP bonus thêm'
                              ]
                            }
                          ].map((section, idx) => (
                            <motion.div
                              key={idx}
                              className={`relative bg-black/40 rounded-lg p-6 border ${
                                section.color === 'blue' 
                                  ? 'border-blue-500/30 hover:border-blue-400/60' 
                                  : section.color === 'purple'
                                  ? 'border-purple-500/30 hover:border-purple-400/60'
                                  : 'border-green-500/30 hover:border-green-400/60'
                              } transition-all duration-300 mu-command-card`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + idx * 0.1 }}
                              whileHover={{ scale: 1.02, y: -5 }}
                            >
                              {/* Corner decorations */}
                              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/50"></div>
                              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/50"></div>
                              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/50"></div>
                              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/50"></div>
                              
                              <h3 className={`text-xl font-bold mb-4 ${
                                section.color === 'blue'
                                  ? 'text-blue-400'
                                  : section.color === 'purple'
                                  ? 'text-purple-400'
                                  : 'text-green-400'
                              }`} style={{ fontFamily: 'Arial, sans-serif' }}>{section.title}</h3>
                              <ul className="text-gray-300 space-y-2">
                                {section.items.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className={`w-2 h-2 rounded-full mt-2 animate-pulse ${
                                      section.color === 'blue'
                                        ? 'bg-blue-400 mu-dot-glow'
                                        : section.color === 'purple'
                                        ? 'bg-purple-400 mu-dot-glow'
                                        : 'bg-green-400 mu-dot-glow'
                                    }`} style={{animationDelay: `${i * 0.2}s`}}></span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          ))}
                        </div>
                      </AnimatedSection>

                      <AnimatedSection direction="up" delay={0.6}>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>🎯 Tips & Tricks</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                          {[
                            { title: '✅ Nên Làm', color: 'green', items: [
                              'Tham gia guild để có hỗ trợ',
                              'Làm daily quests mỗi ngày',
                              'Tham gia events để nhận rewards',
                              'Upgrade equipment thường xuyên'
                            ]},
                            { title: '❌ Không Nên', color: 'red', items: [
                              'Bỏ qua việc upgrade equipment',
                              'Chơi solo quá nhiều',
                              'Bỏ qua các sự kiện',
                              'Không tham gia guild'
                            ]}
                          ].map((tip, idx) => (
                            <motion.div
                              key={idx}
                              className={`relative bg-black/40 rounded-lg p-6 border ${
                                tip.color === 'green' ? 'border-green-500/30 hover:border-green-400/60' : 'border-red-500/30 hover:border-red-400/60'
                              } transition-all duration-300 mu-command-card`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 + idx * 0.1 }}
                              whileHover={{ scale: 1.02, y: -5 }}
                            >
                              {/* Corner decorations */}
                              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/50"></div>
                              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/50"></div>
                              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/50"></div>
                              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/50"></div>
                              
                              <h3 className={`text-lg font-bold mb-3 ${
                                tip.color === 'green' ? 'text-green-400' : 'text-red-400'
                              }`} style={{ fontFamily: 'Arial, sans-serif' }}>
                                {tip.title}
                              </h3>
                              <ul className="text-gray-300 space-y-2">
                                {tip.items.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className={`w-2 h-2 rounded-full mt-2 animate-pulse ${
                                      tip.color === 'green' ? 'bg-green-400 mu-dot-glow' : 'bg-red-400 mu-dot-glow'
                                    }`} style={{animationDelay: `${i * 0.2}s`}}></span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          ))}
                        </div>
                      </AnimatedSection>
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
