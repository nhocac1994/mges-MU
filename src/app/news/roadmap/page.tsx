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
                      <span className="text-yellow-400 font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>{new Date().toLocaleDateString('vi-VN')}</span>
                    </div>
                    
                    <h1 className="text-4xl font-bold text-yellow-300 mb-6 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
                      LỘ TRÌNH PHÁT TRIỂN SERVER
                    </h1>
                    
                    <div className="prose prose-invert max-w-none">
                      <AnimatedSection direction="up" delay={0.3}>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>🚀 3 Tháng Đầu: Khởi Động Box 1 & 2</h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          Giai đoạn đầu tiên tập trung vào việc mở đồ box và tạo nền tảng cho người chơi:
                        </p>
                        
                        <motion.div
                          className="relative bg-black/40 rounded-lg p-6 border border-green-500/30 hover:border-green-400/60 transition-all duration-300 mu-command-card mb-8"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          whileHover={{ scale: 1.02, y: -5 }}
                        >
                          {/* Corner decorations */}
                          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/50"></div>
                          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/50"></div>
                          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/50"></div>
                          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/50"></div>
                          
                          <h3 className="text-xl font-bold text-green-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>⚔️ Nội Dung Cập Nhật</h3>
                          <ul className="text-gray-300 space-y-2">
                            {[
                              'Mở đồ Box 1',
                              'Mở đồ Box 2',
                              'Tất cả đều 1 Ốp (Option)'
                            ].map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 animate-pulse mu-dot-glow" style={{animationDelay: `${i * 0.2}s`}}></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      </AnimatedSection>

                      <AnimatedSection direction="up" delay={0.4}>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>🎯 Tháng 4 & 5: Mở Rộng Box 3</h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          Giai đoạn thứ hai tiếp tục mở rộng hệ thống box:
                        </p>
                        
                        <motion.div
                          className="relative bg-black/40 rounded-lg p-6 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 mu-command-card mb-8"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          whileHover={{ scale: 1.02, y: -5 }}
                        >
                          {/* Corner decorations */}
                          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/50"></div>
                          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/50"></div>
                          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/50"></div>
                          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/50"></div>
                          
                          <h3 className="text-xl font-bold text-blue-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>⚔️ Nội Dung Cập Nhật</h3>
                          <ul className="text-gray-300 space-y-2">
                            {[
                              'Mở đồ Box 3',
                              '1 Ốp (Option)'
                            ].map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 animate-pulse mu-dot-glow" style={{animationDelay: `${i * 0.2}s`}}></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      </AnimatedSection>

                      <AnimatedSection direction="up" delay={0.5}>
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>🌟 Tháng Thứ 3: Bắt Đầu Mở W2</h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          Giai đoạn thứ ba bắt đầu mở rộng sang W2:
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
                          
                          <h3 className="text-xl font-bold text-purple-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>🌍 Nội Dung Cập Nhật</h3>
                          <ul className="text-gray-300 space-y-2">
                            {[
                              'Bắt đầu mở W2',
                              'Các tính năng mới cho W2',
                              'Nâng cấp hệ thống game'
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
                        <h2 className="text-2xl font-bold text-yellow-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>⚡ Tháng Thứ 6: Hoàn Thiện Box 4 & 5</h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          Giai đoạn cuối cùng hoàn thiện hệ thống box:
                        </p>
                        
                        <motion.div
                          className="relative bg-black/40 rounded-lg p-6 border border-orange-500/30 hover:border-orange-400/60 transition-all duration-300 mu-command-card mb-8"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          whileHover={{ scale: 1.02, y: -5 }}
                        >
                          {/* Corner decorations */}
                          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/50"></div>
                          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/50"></div>
                          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/50"></div>
                          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/50"></div>
                          
                          <h3 className="text-xl font-bold text-orange-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>⚔️ Nội Dung Cập Nhật</h3>
                          <ul className="text-gray-300 space-y-2">
                            {[
                              'Mở đồ Box 4',
                              'Mở đồ Box 5',
                              'Tất cả đều 1 Ốp (Option)'
                            ].map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 animate-pulse mu-dot-glow" style={{animationDelay: `${i * 0.2}s`}}></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
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
                          
                          <h3 className="text-xl font-bold text-yellow-400 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>📊 Lộ Trình Tóm Tắt</h3>
                          <div className="space-y-4">
                            <div className="flex items-start gap-3 p-3 bg-black/30 rounded border border-green-500/20">
                              <span className="text-green-400 font-bold text-lg">1-3</span>
                              <div className="flex-1">
                                <div className="text-yellow-400 font-semibold mb-1">3 Tháng Đầu</div>
                                <div className="text-gray-300 text-sm">Đồ Box 1, Box 2 (Tất cả 1 Ốp)</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-black/30 rounded border border-purple-500/20">
                              <span className="text-purple-400 font-bold text-lg">3</span>
                              <div className="flex-1">
                                <div className="text-yellow-400 font-semibold mb-1">Tháng Thứ 3</div>
                                <div className="text-gray-300 text-sm">Bắt đầu mở W2</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-black/30 rounded border border-blue-500/20">
                              <span className="text-blue-400 font-bold text-lg">4-5</span>
                              <div className="flex-1">
                                <div className="text-yellow-400 font-semibold mb-1">Tháng 4 & 5</div>
                                <div className="text-gray-300 text-sm">Đồ Box 3 (1 Ốp)</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-black/30 rounded border border-orange-500/20">
                              <span className="text-orange-400 font-bold text-lg">6</span>
                              <div className="flex-1">
                                <div className="text-yellow-400 font-semibold mb-1">Tháng Thứ 6</div>
                                <div className="text-gray-300 text-sm">Đồ Box 4, Box 5 (Tất cả 1 Ốp)</div>
                              </div>
                            </div>
                            <div className="mt-4 p-3 bg-red-500/10 rounded border border-red-500/30">
                              <div className="text-red-400 font-semibold text-sm">⚠️ Lưu ý: Server chỉ có tới W2, không có W3</div>
                            </div>
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
