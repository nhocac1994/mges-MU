'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import FloatingParticles from '@/components/FloatingParticles';
import NetworkOverlay from '@/components/NetworkOverlay';

export default function Info() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

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

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
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
      <section className="py-20 bg-gradient-to-b from-black/40 to-black/60 relative overflow-hidden">
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
                  MuDauTruongSS1.net - Server Mu Online Season 1
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
      

      {/* Server Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Server Stats */}
            <AnimatedSection direction="left" delay={0.2}>
              <motion.div 
                className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-blue-500/30 glass hover-lift transition-all duration-300 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20 hover-glow hover-3d"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-2xl">📊</span>
                </div>
                <h2 className="text-3xl font-bold text-white">THỐNG KÊ SERVER</h2>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-gray-300">Người Online:</span>
                  </div>
                  <span className="text-green-400 font-bold text-2xl">1,234</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-400 rounded-full mr-3 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <span className="text-gray-300">Tổng Tài Khoản:</span>
                  </div>
                  <span className="text-blue-400 font-bold text-2xl">5,678</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3 animate-pulse" style={{animationDelay: '1s'}}></div>
                    <span className="text-gray-300">Server Uptime:</span>
                  </div>
                  <span className="text-yellow-400 font-bold text-2xl">99.9%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-400 rounded-full mr-3 animate-pulse" style={{animationDelay: '1.5s'}}></div>
                    <span className="text-gray-300">Version:</span>
                  </div>
                  <span className="text-purple-400 font-bold text-2xl">Season 1</span>
                </div>
              </div>
              </motion.div>
            </AnimatedSection>

            {/* Server Settings */}
            <AnimatedSection direction="right" delay={0.3}>
              <motion.div 
                className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-purple-500/30 glass hover-lift transition-all duration-300 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20 hover-glow hover-3d"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-2xl">⚙️</span>
                </div>
                <h2 className="text-3xl font-bold text-white">CÀI ĐẶT SERVER</h2>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-gray-300">Exp Rate:</span>
                  </div>
                  <span className="text-green-400 font-bold text-2xl">x50</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <span className="text-gray-300">Drop Rate:</span>
                  </div>
                  <span className="text-green-400 font-bold text-2xl">x30</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-400 rounded-full mr-3 animate-pulse" style={{animationDelay: '1s'}}></div>
                    <span className="text-gray-300">Max Level:</span>
                  </div>
                  <span className="text-blue-400 font-bold text-2xl">400</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-400 rounded-full mr-3 animate-pulse" style={{animationDelay: '1.5s'}}></div>
                    <span className="text-gray-300">Reset Level:</span>
                  </div>
                  <span className="text-purple-400 font-bold text-2xl">400</span>
                </div>
              </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Game Commands Section */}
      <section className="py-16 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  🎮 CÁC LỆNH TRONG GAME
                </span>
              </h2>
              <p className="text-xl text-gray-300">
                Danh sách các lệnh hữu ích để chơi game hiệu quả
              </p>
            </div>

            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-blue-500/30">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-blue-500/30">
                      <th className="text-blue-400 font-bold py-4 px-6 text-lg">Lệnh</th>
                      <th className="text-blue-400 font-bold py-4 px-6 text-lg">Mô tả</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-6 font-mono text-green-400">/reset</td>
                      <td className="py-4 px-6">Reset your character</td>
                    </tr>
                    <tr className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-6 font-mono text-green-400">/reset auto</td>
                      <td className="py-4 px-6">Auto Reset your character</td>
                    </tr>
                    <tr className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-6 font-mono text-green-400">/nv</td>
                      <td className="py-4 px-6">Làm nhiệm vụ nhanh</td>
                    </tr>
                    <tr className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-6 font-mono text-green-400">/pkclear</td>
                      <td className="py-4 px-6">Clear killer status</td>
                    </tr>
                    <tr className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-6 font-mono text-green-400">/pickset [tên item]</td>
                      <td className="py-4 px-6">Cài đặt auto nhặt</td>
                    </tr>
                    <tr className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-6 font-mono text-green-400">/pick</td>
                      <td className="py-4 px-6">Auto nhặt</td>
                    </tr>
                    <tr className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-6 font-mono text-green-400">/pickclear</td>
                      <td className="py-4 px-6">Tắt Auto nhặt</td>
                    </tr>
                    <tr className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-6 font-mono text-green-400">/post [message]</td>
                      <td className="py-4 px-6">Gửi tin nhắn đến toàn server</td>
                    </tr>
                    <tr className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-6 font-mono text-green-400">/readd</td>
                      <td className="py-4 px-6">Tẩy điểm</td>
                    </tr>
                    <tr className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-6 font-mono text-green-400">/addstr [points]</td>
                      <td className="py-4 px-6">Cộng điểm sức mạnh</td>
                    </tr>
                    <tr className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-6 font-mono text-green-400">/addagi [points]</td>
                      <td className="py-4 px-6">Cộng điểm nhanh nhẹn</td>
                    </tr>
                    <tr className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-6 font-mono text-green-400">/addvit [points]</td>
                      <td className="py-4 px-6">Cộng điểm máu</td>
                    </tr>
                    <tr className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-6 font-mono text-green-400">/addene [points]</td>
                      <td className="py-4 px-6">Cộng điểm năng lượng</td>
                    </tr>
                    <tr className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-6 font-mono text-green-400">/addcmd [points]</td>
                      <td className="py-4 px-6">Cộng điểm mệnh lệnh</td>
                    </tr>
                    <tr className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-6 font-mono text-green-400">/thungdo [0-5]</td>
                      <td className="py-4 px-6">Mở thùng đồ cá nhân từ 1 - 5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 p-6 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <h3 className="text-lg font-bold text-blue-400 mb-4">💡 Lưu ý quan trọng:</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Tất cả lệnh phải được nhập chính xác, phân biệt chữ hoa/thường</li>
                  <li>• Một số lệnh yêu cầu quyền admin hoặc level nhất định</li>
                  <li>• Sử dụng lệnh /help để xem thêm thông tin chi tiết</li>
                  <li>• Liên hệ admin nếu gặp vấn đề với các lệnh</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-black/30 to-black/50 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-bounce" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6 relative">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                🌟 TÍNH NĂNG NỔI BẬT
              </span>
              {/* Glow Effect */}
              <div className="absolute inset-0 text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent blur-sm opacity-50 animate-pulse">
                🌟 TÍNH NĂNG NỔI BẬT
              </div>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Khám phá những tính năng độc đáo và hấp dẫn của server MuDauTruongSS1.net
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-green-500/30 hover-lift transition-all duration-300 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/20 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-white">Auto Reset</h3>
              </div>
              <p className="text-gray-300 group-hover:text-white transition-colors">Tự động reset khi đạt level 400, giúp người chơi tiết kiệm thời gian</p>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30 hover-lift transition-all duration-300 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">⚔️</span>
                </div>
                <h3 className="text-xl font-bold text-white">PK System</h3>
              </div>
              <p className="text-gray-300 group-hover:text-white transition-colors">Hệ thống PK công bằng và thú vị với nhiều chế độ chiến đấu</p>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30 hover-lift transition-all duration-300 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-bold text-white">Guild War</h3>
              </div>
              <p className="text-gray-300 group-hover:text-white transition-colors">Chiến tranh guild hàng tuần với phần thưởng hấp dẫn</p>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-yellow-500/30 hover-lift transition-all duration-300 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-500/20 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">💰</span>
                </div>
                <h3 className="text-xl font-bold text-white">Economy</h3>
              </div>
              <p className="text-gray-300 group-hover:text-white transition-colors">Hệ thống kinh tế ổn định và cân bằng cho tất cả người chơi</p>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-red-500/30 hover-lift transition-all duration-300 hover:border-red-400/50 hover:shadow-lg hover:shadow-red-500/20 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">🎮</span>
                </div>
                <h3 className="text-xl font-bold text-white">Events</h3>
              </div>
              <p className="text-gray-300 group-hover:text-white transition-colors">Sự kiện hàng ngày và hàng tuần với phần thưởng độc quyền</p>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/30 hover-lift transition-all duration-300 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl">🛡️</span>
                </div>
                <h3 className="text-xl font-bold text-white">Anti-Cheat</h3>
              </div>
              <p className="text-gray-300 group-hover:text-white transition-colors">Hệ thống chống hack hiệu quả, đảm bảo công bằng cho mọi người</p>
            </div>
          </div>
        </div>
      </section>
      </main>
      </div>
    </div>
  );
}

