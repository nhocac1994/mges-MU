'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useConfig } from '@/contexts/ConfigContext';
import NetworkOverlay from '@/components/NetworkOverlay';
import FloatingParticles from '@/components/FloatingParticles';
import AnimatedSection from '@/components/AnimatedSection';

export default function NewsRoadmap() {
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
                <span className="text-white font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>Lộ Trình</span>
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
                      <span className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold border border-yellow-500/30 mu-button-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
                        UPDATE
                      </span>
                      <span className="text-yellow-400 font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>20/09/2024</span>
                    </div>
                    
                    <h1 className="text-4xl font-bold text-yellow-300 mb-6 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
                      LỘ TRÌNH PHÁT TRIỂN SERVER
                    </h1>
                    
                    <div className="prose prose-invert max-w-none">
                      <AnimatedSection direction="up" delay={0.3}>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>🚀 Giai Đoạn 1: Khởi Động (Q4 2024)</h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          Giai đoạn đầu tiên tập trung vào việc ổn định server và thu hút người chơi:
                        </p>
                        
                        <div className="space-y-6 mb-8">
                          {[
                            { title: '✅ Đã Hoàn Thành', color: 'green', items: [
                              'Khởi động server Season 1',
                              'Hệ thống đăng ký/đăng nhập',
                              'Website chính thức',
                              'Hệ thống anti-cheat cơ bản'
                            ]},
                            { title: '🔄 Đang Thực Hiện', color: 'blue', items: [
                              'Tối ưu hóa server performance',
                              'Thêm các sự kiện hàng ngày',
                              'Cải thiện hệ thống support',
                              'Phát triển mobile app'
                            ]}
                          ].map((section, idx) => (
                            <motion.div
                              key={idx}
                              className={`relative bg-black/40 rounded-lg p-6 border ${
                                section.color === 'green' ? 'border-green-500/30 hover:border-green-400/60' : 'border-blue-500/30 hover:border-blue-400/60'
                              } transition-all duration-300 mu-command-card`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + idx * 0.1 }}
                              whileHover={{ scale: 1.02, x: 5 }}
                            >
                              {/* Corner decorations */}
                              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/50"></div>
                              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/50"></div>
                              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/50"></div>
                              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/50"></div>
                              
                              <h3 className={`text-xl font-bold mb-4 ${
                                section.color === 'green' ? 'text-green-400' : 'text-blue-400'
                              }`} style={{ fontFamily: 'Arial, sans-serif' }}>{section.title}</h3>
                              <ul className="text-gray-300 space-y-2">
                                {section.items.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className={`w-2 h-2 rounded-full mt-2 animate-pulse ${
                                      section.color === 'green' ? 'bg-green-400 mu-dot-glow' : 'bg-blue-400 mu-dot-glow'
                                    }`} style={{animationDelay: `${i * 0.2}s`}}></span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          ))}
                        </div>
                      </AnimatedSection>

                      <AnimatedSection direction="up" delay={0.4}>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>🎯 Giai Đoạn 2: Phát Triển (Q1 2025)</h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          Giai đoạn thứ hai tập trung vào việc thêm tính năng mới và cải thiện trải nghiệm:
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          {[
                            { title: '🎮 Tính Năng Game', color: 'green', items: [
                              'Thêm class Summoner',
                              'Hệ thống guild war nâng cao',
                              'Thêm map mới',
                              'Hệ thống quest tự động'
                            ]},
                            { title: '💻 Tính Năng Website', color: 'blue', items: [
                              'Hệ thống ranking online',
                              'Forum cộng đồng',
                              'Hệ thống vote server',
                              'API cho mobile app'
                            ]}
                          ].map((feature, idx) => (
                            <motion.div
                              key={idx}
                              className={`relative bg-black/40 rounded-lg p-6 border ${
                                feature.color === 'green' ? 'border-green-500/30 hover:border-green-400/60' : 'border-blue-500/30 hover:border-blue-400/60'
                              } transition-all duration-300 mu-command-card`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 + idx * 0.1 }}
                              whileHover={{ scale: 1.02, y: -5 }}
                            >
                              {/* Corner decorations */}
                              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/50"></div>
                              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/50"></div>
                              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/50"></div>
                              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/50"></div>
                              
                              <h3 className={`text-xl font-bold mb-4 ${
                                feature.color === 'green' ? 'text-green-400' : 'text-blue-400'
                              }`} style={{ fontFamily: 'Arial, sans-serif' }}>{feature.title}</h3>
                              <ul className="text-gray-300 space-y-2">
                                {feature.items.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className={`w-2 h-2 rounded-full mt-2 animate-pulse ${
                                      feature.color === 'green' ? 'bg-green-400 mu-dot-glow' : 'bg-blue-400 mu-dot-glow'
                                    }`} style={{animationDelay: `${i * 0.2}s`}}></span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          ))}
                        </div>
                      </AnimatedSection>

                      <AnimatedSection direction="up" delay={0.5}>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>🌟 Giai Đoạn 3: Mở Rộng (Q2 2025)</h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          Giai đoạn thứ ba tập trung vào việc mở rộng server và thêm tính năng cao cấp:
                        </p>
                        
                        <motion.div
                          className="relative bg-black/40 rounded-lg p-6 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 mu-command-card mb-8"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          whileHover={{ scale: 1.02, y: -5 }}
                        >
                          {/* Corner decorations */}
                          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/50"></div>
                          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/50"></div>
                          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/50"></div>
                          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/50"></div>
                          
                          <h3 className="text-xl font-bold text-purple-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>🎪 Tính Năng Cao Cấp</h3>
                          <ul className="text-gray-300 space-y-2">
                            {[
                              'Hệ thống castle siege nâng cao',
                              'Thêm class Rage Fighter',
                              'Hệ thống pet và mount',
                              'Thêm server PvP riêng',
                              'Hệ thống tournament tự động'
                            ].map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 animate-pulse mu-dot-glow" style={{animationDelay: `${i * 0.2}s`}}></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      </AnimatedSection>

                      <AnimatedSection direction="up" delay={0.6}>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>🔮 Giai Đoạn 4: Tương Lai (Q3-Q4 2025)</h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          Giai đoạn cuối tập trung vào việc phát triển dài hạn và mở rộng cộng đồng:
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          {[
                            { title: '🌍 Mở Rộng', color: 'yellow', items: [
                              'Thêm server quốc tế',
                              'Hệ thống cross-server',
                              'Thêm ngôn ngữ',
                              'Partnership với các server khác'
                            ]},
                            { title: '🚀 Công Nghệ', color: 'red', items: [
                              'Upgrade lên Season 2',
                              'Hệ thống AI anti-cheat',
                              'Cloud infrastructure',
                              'Blockchain integration'
                            ]}
                          ].map((future, idx) => (
                            <motion.div
                              key={idx}
                              className={`relative bg-black/40 rounded-lg p-6 border ${
                                future.color === 'yellow' ? 'border-yellow-500/30 hover:border-yellow-400/60' : 'border-red-500/30 hover:border-red-400/60'
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
                                future.color === 'yellow' ? 'text-yellow-400' : 'text-red-400'
                              }`} style={{ fontFamily: 'Arial, sans-serif' }}>{future.title}</h3>
                              <ul className="text-gray-300 space-y-2">
                                {future.items.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className={`w-2 h-2 rounded-full mt-2 animate-pulse ${
                                      future.color === 'yellow' ? 'bg-yellow-400 mu-dot-glow' : 'bg-red-400 mu-dot-glow'
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
                        <motion.div
                          className="relative bg-black/40 rounded-lg p-6 border border-yellow-500/30 mu-command-card"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          {/* Corner decorations */}
                          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/50"></div>
                          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/50"></div>
                          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/50"></div>
                          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/50"></div>
                          
                          <h3 className="text-xl font-bold text-yellow-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>📊 Thống Kê Mục Tiêu</h3>
                          <div className="grid md:grid-cols-3 gap-6">
                            {[
                              { value: '1,000+', label: 'Người chơi online', color: 'green' },
                              { value: '10,000+', label: 'Tài khoản đăng ký', color: 'blue' },
                              { value: '99.9%', label: 'Uptime server', color: 'purple' }
                            ].map((stat, idx) => (
                              <motion.div
                                key={idx}
                                className="text-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 + idx * 0.1 }}
                              >
                                <div className={`text-3xl font-bold mb-2 ${
                                  stat.color === 'green' ? 'text-green-400' : stat.color === 'blue' ? 'text-blue-400' : 'text-purple-400'
                                } mu-text-glow`} style={{ fontFamily: 'Arial, sans-serif' }}>
                                  {stat.value}
                                </div>
                                <div className="text-gray-300">{stat.label}</div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
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
