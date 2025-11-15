'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import FloatingParticles from '@/components/FloatingParticles';
import NetworkOverlay from '@/components/NetworkOverlay';

export default function Donate() {
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
      <div className="fixed inset-0 bg-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10 pt-28">
        {/* Main Content */}
        <main className="relative z-10 py-8">

      {/* Page Header */}
      <section className="py-16 bg-black/30">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection direction="down" delay={0.2}>
            <motion.h1 
              className="text-5xl font-bold text-white mb-4 animate-text-shimmer"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              💎 ỦNG HỘ SERVER
            </motion.h1>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.4}>
            <p className="text-xl text-blue-300">Hỗ trợ server phát triển và duy trì hoạt động</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Donate Packages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">💰 CÁC GÓI ỦNG HỘ SERVER</h2>
              <p className="text-xl text-blue-300">Chọn gói ủng hộ phù hợp với bạn</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Package 1 */}
              <AnimatedSection direction="up" delay={0.1}>
                <motion.div 
                  className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-green-500/30 glass hover-lift transition-all duration-300 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/20 hover-glow hover-3d"
                  whileHover={{ y: -10, scale: 1.05, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">💎</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Gói Chaos</h3>
                  <div className="text-3xl font-bold text-green-400 mb-2">12.000đ</div>
                  <p className="text-gray-300">/ 1 Chaos</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    <span className="text-white">Nhận ngay 1 Chaos</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    <span className="text-white">Sử dụng để up đồ</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    <span className="text-white">Tỷ lệ thành công cao</span>
                  </div>
                </div>
                </motion.div>
              </AnimatedSection>

              {/* Package 2 */}
              <AnimatedSection direction="up" delay={0.2}>
                <motion.div 
                  className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-yellow-500/30 glass hover-lift transition-all duration-300 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-500/20 relative hover-glow hover-3d"
                  whileHover={{ y: -10, scale: 1.05, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    PHỔ BIẾN
                  </span>
                </div>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">👑</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Gold Member</h3>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">100.000đ</div>
                  <p className="text-gray-300">/ 30 ngày</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    <span className="text-white">Tăng 5% tỷ lệ up đồ</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    <span className="text-white">Up đồ +10/+11/+12/+13</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    <span className="text-white">Thời hạn 30 ngày</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    <span className="text-white">Ưu đãi đặc biệt</span>
                  </div>
                </div>
                </motion.div>
              </AnimatedSection>

              {/* Package 3 */}
              <AnimatedSection direction="up" delay={0.3}>
                <motion.div 
                  className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-blue-500/30 glass hover-lift transition-all duration-300 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20 hover-glow hover-3d"
                  whileHover={{ y: -10, scale: 1.05, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">❤️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Gói Life</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-2">500đ</div>
                  <p className="text-gray-300">/ 1 Life</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    <span className="text-white">Nhận ngay 1 Life</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    <span className="text-white">Hồi sinh khi chết</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    <span className="text-white">Giá rẻ nhất</span>
                  </div>
                </div>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Information */}
      <section className="py-16 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-white mb-12">💳 THÔNG TIN CHUYỂN KHOẢN</h2>
            
            <div className="flex justify-center">
              <div className="w-full max-w-[800px]">
                {/* Bank Transfer */}
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-blue-500/30">
                  <h3 className="text-2xl font-bold text-white mb-6">🏦 CHUYỂN KHOẢN NGÂN HÀNG</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-2">Số tài khoản:</div>
                      <div className="text-lg font-bold text-white">0356673016</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-2">Chủ tài khoản:</div>
                      <div className="text-lg font-bold text-white">NGUYEN CANH QUYEN</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-2">Ngân hàng:</div>
                      <div className="text-lg font-bold text-white">MB-BANK</div>
                    </div>
                    <div className="text-center">
                      <Image 
                        src="/qrcode.jpeg" 
                        alt="QR Code" 
                        width={200} 
                        height={200}
                        className="mx-auto rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="mt-8 bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4">📝 HƯỚNG DẪN THANH TOÁN</h3>
                  <div className="text-white space-y-2">
                    <p>1. Chọn gói ủng hộ phù hợp</p>
                    <p>2. Chuyển khoản theo thông tin trên</p>
                    <p>3. Ghi nội dung: &quot;Tên Tài Khoản + Gói ủng hộ&quot;</p>
                    <p>4. Gửi bill cho Admin qua Zalo: 03377.14.654</p>
                    <p>5. Chờ Admin xử lý và cấp phần thưởng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
      </div>
    </div>
  );
}
