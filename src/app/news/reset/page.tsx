'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useConfig } from '@/contexts/ConfigContext';
import NetworkOverlay from '@/components/NetworkOverlay';
import FloatingParticles from '@/components/FloatingParticles';
import AnimatedSection from '@/components/AnimatedSection';

export default function NewsReset() {
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
                <span className="text-white font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>Hệ Thống Reset</span>
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
                      <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold border border-yellow-500/30 mu-button-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
                        NOTICE
                      </span>
                      <span className="text-yellow-400 font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>10/01/2025</span>
                    </div>
                    
                    <h1 className="text-4xl font-bold text-yellow-300 mb-6 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
                      HỆ THỐNG RESET - {config.nameGame.toUpperCase()}
                    </h1>
                    
                    <div className="prose prose-invert max-w-none">
                      <AnimatedSection direction="up" delay={0.3}>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>🎁 Reset Khi Khai Mở Server</h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          Server khai mở sẽ được reset <span className="text-yellow-400 font-bold">50 lần miễn phí</span>. Đây là cơ hội đặc biệt cho người chơi mới để phát triển nhân vật mạnh mẽ ngay từ đầu.
                        </p>
                        <div className="bg-black/40 rounded-lg p-6 border border-yellow-500/30 mb-6">
                          <ul className="text-gray-300 space-y-2">
                            <li className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow"></span>
                              <span>Server khai mở sẽ được reset <span className="text-yellow-400 font-semibold">50 lần miễn phí</span></span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow" style={{animationDelay: '0.2s'}}></span>
                              <span>Đây là cơ hội đặc biệt cho người chơi mới</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow" style={{animationDelay: '0.4s'}}></span>
                              <span>Tận dụng tối đa 50 lần reset để phát triển nhân vật mạnh mẽ</span>
                            </li>
                          </ul>
                        </div>
                      </AnimatedSection>

                      <AnimatedSection direction="up" delay={0.4}>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>⏰ Giới Hạn Reset Hàng Ngày</h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          Mỗi ngày sẽ có <span className="text-yellow-400 font-bold">2 lần reset</span>. Reset được tính từ 0h00 mỗi ngày. Sử dụng reset một cách thông minh để phát triển nhân vật hiệu quả.
                        </p>
                        <div className="bg-black/40 rounded-lg p-6 border border-yellow-500/30 mb-6">
                          <ul className="text-gray-300 space-y-2">
                            <li className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow"></span>
                              <span>Mỗi ngày sẽ có <span className="text-yellow-400 font-semibold">2 lần reset</span></span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow" style={{animationDelay: '0.2s'}}></span>
                              <span>Reset được tính từ 0h00 mỗi ngày</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow" style={{animationDelay: '0.4s'}}></span>
                              <span>Sử dụng reset một cách thông minh để phát triển nhân vật hiệu quả</span>
                            </li>
                          </ul>
                        </div>
                      </AnimatedSection>

                      <AnimatedSection direction="up" delay={0.5}>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>⌨️ Cách Reset</h2>
                        <div className="space-y-6 mb-8">
                          {[
                            { 
                              title: '/reset', 
                              description: 'Reset nhân vật về level 1 và nhận thêm stat points',
                              color: 'yellow'
                            },
                            { 
                              title: '/reset auto', 
                              description: 'Tự động reset khi đạt level. Cần bật chế độ auto reset trước.',
                              color: 'orange'
                            }
                          ].map((cmd, idx) => (
                            <motion.div
                              key={idx}
                              className="relative bg-black/40 rounded-lg p-6 border border-yellow-500/30 mu-command-card"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + idx * 0.1 }}
                            >
                              {/* Corner decorations */}
                              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/50"></div>
                              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/50"></div>
                              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/50"></div>
                              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/50"></div>
                              
                              <div className="flex items-center gap-4">
                                <div className="font-mono text-yellow-400 font-bold text-xl" style={{ fontFamily: 'Courier New, monospace' }}>
                                  {cmd.title}
                                </div>
                                <div className="flex-1 text-gray-300">
                                  {cmd.description}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </AnimatedSection>

                      <AnimatedSection direction="up" delay={0.6}>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>💰 Chi Phí Reset</h2>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          {[
                            { 
                              title: '👑 Tài Khoản VIP', 
                              items: [
                                'Chi phí: 10.000.000 Zen',
                                'Ưu đãi đặc biệt cho thành viên VIP',
                                'Tiết kiệm đáng kể so với tài khoản thường'
                              ],
                              color: 'purple'
                            },
                            { 
                              title: '👤 Tài Khoản Thường', 
                              items: [
                                'Cần: 1 Ngọc Sáng Tạo + 30.000.000 Zen',
                                'Ngọc Sáng Tạo có thể kiếm được từ các sự kiện',
                                
                              ],
                              color: 'blue'
                            }
                          ].map((account, idx) => (
                            <motion.div
                              key={idx}
                              className={`relative bg-black/40 rounded-lg p-6 border ${
                                account.color === 'purple'
                                  ? 'border-purple-500/30 hover:border-purple-400/60'
                                  : 'border-blue-500/30 hover:border-blue-400/60'
                              } transition-all duration-300 mu-command-card`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.6 + idx * 0.1 }}
                              whileHover={{ scale: 1.02, y: -5 }}
                            >
                              {/* Corner decorations */}
                              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/50"></div>
                              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/50"></div>
                              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/50"></div>
                              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/50"></div>
                              
                              <h3 className={`text-xl font-bold mb-4 ${
                                account.color === 'purple' ? 'text-purple-400' : 'text-blue-400'
                              }`} style={{ fontFamily: 'Arial, sans-serif' }}>{account.title}</h3>
                              <ul className="text-gray-300 space-y-2">
                                {account.items.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className={`w-2 h-2 rounded-full mt-2 animate-pulse ${
                                      account.color === 'purple' ? 'bg-purple-400 mu-dot-glow' : 'bg-blue-400 mu-dot-glow'
                                    }`} style={{animationDelay: `${i * 0.2}s`}}></span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          ))}
                        </div>
                      </AnimatedSection>

                      <AnimatedSection direction="up" delay={0.7}>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>⚠️ Lưu Ý Quan Trọng</h2>
                        <div className="bg-black/40 rounded-lg p-6 border border-yellow-500/30">
                          <ul className="text-gray-300 space-y-2">
                            {[
                              'Reset sẽ đưa nhân vật về level 1',
                              'Bạn sẽ nhận được thêm stat points sau mỗi lần reset',
                              'Đảm bảo có đủ vật phẩm và zen trước khi reset',
                              'Reset là cách tốt để tăng sức mạnh nhân vật lâu dài',
                              'Lên kế hoạch reset hợp lý để tối ưu hóa sự phát triển'
                            ].map((note, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow" style={{animationDelay: `${i * 0.2}s`}}></span>
                                <span>{note}</span>
                              </li>
                            ))}
                          </ul>
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

