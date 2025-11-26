'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import FloatingParticles from '@/components/FloatingParticles';
import NetworkOverlay from '@/components/NetworkOverlay';
import MuClassicModal from '@/components/MuClassicModal';
import { useConfig } from '@/contexts/ConfigContext';

export default function Donate() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { config } = useConfig();
  const [selectedPackage, setSelectedPackage] = useState<{ id: string; title: string; price: string; icon: string; color: string; benefits: string[]; details?: any } | null>(null);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);

  const handlePackageClick = (pkg: { id: string; title: string; price: string; icon: string; color: string; benefits: string[]; details?: any }) => {
    setSelectedPackage(pkg);
    setIsPackageModalOpen(true);
  };

  const handleClosePackageModal = () => {
    setIsPackageModalOpen(false);
    setSelectedPackage(null);
  };

  const donatePackages = [
    {
      id: 'chaos',
      title: 'Gói Chaos',
      price: '12.000đ',
      pricePer: '/ 1 Chaos',
      icon: '💎',
      color: 'green',
      benefits: [
        'Nhận ngay 1 Chaos',
        'Sử dụng để up đồ',
        'Tỷ lệ thành công cao',
        'Không giới hạn thời gian sử dụng'
      ],
      details: {
        description: 'Gói Chaos cho phép bạn nhận ngay 1 Chaos để sử dụng trong game. Chaos là item quan trọng để nâng cấp đồ.',
        usage: [
          'Sử dụng Chaos để up đồ từ +0 đến +15',
          'Tỷ lệ thành công tùy thuộc vào level đồ',
          'Có thể mua nhiều lần không giới hạn',
          'Item sẽ được gửi vào game sau khi thanh toán'
        ],
        note: 'Chaos sẽ được gửi vào game trong vòng 5-10 phút sau khi thanh toán thành công.'
      }
    },
    {
      id: 'gold',
      title: 'Gold Member',
      price: '100.000đ',
      pricePer: '/ 30 ngày',
      icon: '👑',
      color: 'yellow',
      popular: true,
      benefits: [
        'Tăng 5% tỷ lệ up đồ',
        'Up đồ +10/+11/+12/+13',
        'Thời hạn 30 ngày',
        'Ưu đãi đặc biệt',
        'Hỗ trợ ưu tiên'
      ],
      details: {
        description: 'Gói Gold Member mang lại nhiều lợi ích đặc biệt trong 30 ngày. Đây là gói phổ biến nhất.',
        features: [
          'Tăng 5% tỷ lệ thành công khi up đồ',
          'Có thể up đồ lên +10, +11, +12, +13',
          'Thời hạn sử dụng: 30 ngày kể từ ngày kích hoạt',
          'Nhận hỗ trợ ưu tiên từ admin',
          'Tham gia các sự kiện đặc biệt dành cho Gold Member'
        ],
        note: 'Gold Member sẽ được kích hoạt ngay sau khi thanh toán thành công và có hiệu lực trong 30 ngày.'
      }
    },
    {
      id: 'life',
      title: 'Gói Life',
      price: '500đ',
      pricePer: '/ 1 Life',
      icon: '❤️',
      color: 'blue',
      benefits: [
        'Nhận ngay 1 Life',
        'Hồi sinh khi chết',
        'Giá rẻ nhất',
        'Mua nhiều lần được'
      ],
      details: {
        description: 'Gói Life cho phép bạn hồi sinh khi nhân vật bị chết trong game. Giá rẻ và tiện lợi.',
        usage: [
          'Sử dụng Life để hồi sinh nhân vật khi chết',
          'Tiết kiệm thời gian không cần chạy lại từ map',
          'Có thể mua nhiều lần để dự trữ',
          'Life sẽ được gửi vào game sau khi thanh toán'
        ],
        note: 'Life sẽ được gửi vào game trong vòng 5-10 phút sau khi thanh toán thành công.'
      }
    }
  ];

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

  return (
    <div className={`relative ${isClient && window.innerWidth <= 768 ? '' : 'min-h-screen overflow-hidden'}`} style={{
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
                className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mu-text-glow"
                style={{ backgroundSize: '200% 200%' }}
              >
                ỦNG HỘ SERVER
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
                ỦNG HỘ SERVER
              </motion.div>
            </motion.h1>
            <AnimatedSection direction="up" delay={0.2}>
              <div className="text-2xl font-semibold text-blue-300 mb-4">
                <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                  Hỗ trợ {config.nameGame} phát triển và duy trì hoạt động
                </span>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.4}>
              <div className="text-lg text-white/80">
                Mọi sự ủng hộ đều được ghi nhận và đánh giá cao
              </div>
            </AnimatedSection>
          </motion.div>
        </div>
      </section>

      {/* Donate Packages - Classic MU Season 1 Style */}
      <section className="py-16 relative overflow-x-hidden md:overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {donatePackages.map((pkg, index) => (
                <AnimatedSection key={pkg.id} direction="up" delay={0.1 + index * 0.1}>
                  <div className="relative">
                    {/* Border Glow Effect */}
                    <div className="absolute inset-0 mu-modal-border-glow"></div>
                    
                    {/* Main Container */}
                    <motion.div 
                      onClick={() => handlePackageClick(pkg)}
                      className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-8 cursor-pointer group"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, type: 'spring', damping: 20, stiffness: 300 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Corner decorations */}
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                      
                      {/* Popular Badge */}
                      {pkg.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold border-2 border-yellow-400/60 mu-button-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
                            PHỔ BIẾN
                          </div>
                        </div>
                      )}
                      
                      {/* Header */}
                      <div className="text-center mb-6">
                        <div className={`w-20 h-20 bg-gradient-to-r ${
                          pkg.color === 'green' ? 'from-green-500 to-emerald-500' :
                          pkg.color === 'yellow' ? 'from-yellow-500 to-orange-500' :
                          'from-blue-500 to-cyan-500'
                        } rounded-lg flex items-center justify-center mx-auto mb-4 border-2 border-yellow-500/30 group-hover:scale-110 transition-transform`}>
                          <span className="text-white text-4xl">{pkg.icon}</span>
                        </div>
                        <h3 className="text-3xl font-bold text-yellow-300 mb-2 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
                          {pkg.title}
                        </h3>
                        <div className={`text-4xl font-bold mb-2 ${
                          pkg.color === 'green' ? 'text-green-400' :
                          pkg.color === 'yellow' ? 'text-yellow-400' :
                          'text-blue-400'
                        }`} style={{ fontFamily: 'Arial, sans-serif' }}>
                          {pkg.price}
                        </div>
                        <p className="text-gray-300 text-sm">{pkg.pricePer}</p>
                      </div>
                      
                      {/* Benefits List */}
                      <div className="space-y-3 mb-6">
                        {pkg.benefits.map((benefit, idx) => (
                          <motion.div
                            key={idx}
                            className="relative bg-black/40 rounded-lg p-3 border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 group mu-command-card"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + idx * 0.05 }}
                            whileHover={{ scale: 1.02, x: 5 }}
                          >
                            {/* Corner decorations */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/50"></div>
                            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/50"></div>
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/50"></div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/50"></div>
                            
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse mu-dot-glow"></div>
                              <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{benefit}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* CTA */}
                      <div className="text-center">
                        <div className="px-6 py-3 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border border-yellow-500/60 text-yellow-300 font-semibold rounded mu-button-glow inline-block">
                          Chọn Gói Này
                        </div>
                        <p className="text-yellow-400 text-xs mt-3 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          Click để xem thông tin chuyển khoản →
                        </p>
                      </div>
                      
                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/0 via-yellow-600/10 to-yellow-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                    </motion.div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      </main>
      </div>

      {/* Package Detail Modal with Payment Info */}
      {selectedPackage && (
        <MuClassicModal
          isOpen={isPackageModalOpen}
          onClose={handleClosePackageModal}
          title={`Chi Tiết Gói - ${selectedPackage.title}`}
          type="news"
        >
          <div className="space-y-6">
            {/* Package Header */}
            <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
              <div className="flex items-center gap-4 mb-3">
                <span className="text-4xl">{selectedPackage.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-yellow-300 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                    {selectedPackage.title}
                  </h2>
                  <div className={`text-3xl font-bold ${
                    selectedPackage.color === 'green' ? 'text-green-400' :
                    selectedPackage.color === 'yellow' ? 'text-yellow-400' :
                    'text-blue-400'
                  }`} style={{ fontFamily: 'Arial, sans-serif' }}>
                    {selectedPackage.price}
                  </div>
                  <p className="text-gray-300 text-sm">{selectedPackage.details?.description || ''}</p>
                </div>
              </div>
            </div>

            {/* Package Benefits */}
            <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
              <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Lợi Ích
              </h3>
              <ul className="space-y-2">
                {selectedPackage.benefits.map((benefit, idx) => (
                  <li key={idx} className="text-gray-300 flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Package Details */}
            {selectedPackage.details && (
              <>
                {selectedPackage.details.usage && (
                  <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
                    <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                      Cách Sử Dụng
                    </h3>
                    <ul className="space-y-2">
                      {selectedPackage.details.usage.map((usage: string, idx: number) => (
                        <li key={idx} className="text-gray-300 flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span>{usage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedPackage.details.features && (
                  <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
                    <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                      Tính Năng
                    </h3>
                    <ul className="space-y-2">
                      {selectedPackage.details.features.map((feature: string, idx: number) => (
                        <li key={idx} className="text-gray-300 flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedPackage.details.note && (
                  <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
                    <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                      💡 Lưu Ý
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{selectedPackage.details.note}</p>
                  </div>
                )}
              </>
            )}

            {/* Payment Information */}
            <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
              <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                💳 THÔNG TIN CHUYỂN KHOẢN
              </h3>
              
              {/* Bank Transfer Info */}
              <div className="space-y-4 mb-6">
                <div className="relative bg-black/60 rounded-lg p-4 border border-yellow-500/20">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/50"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/50"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/50"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/50"></div>
                  
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow"></div>
                    <div className="flex-1">
                      <div className="text-yellow-400 font-bold text-lg mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Số tài khoản:
                      </div>
                      <div className="text-white font-mono text-xl font-bold" style={{ fontFamily: 'Courier New, monospace' }}>
                        {config.payment?.bankAccount || '0356673016'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow" style={{animationDelay: '0.5s'}}></div>
                    <div className="flex-1">
                      <div className="text-yellow-400 font-bold text-lg mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Chủ tài khoản:
                      </div>
                      <div className="text-white font-bold text-lg" style={{ fontFamily: 'Arial, sans-serif' }}>
                        {config.payment?.accountHolder || 'NGUYEN CANH QUYEN'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow" style={{animationDelay: '1s'}}></div>
                    <div className="flex-1">
                      <div className="text-yellow-400 font-bold text-lg mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Ngân hàng:
                      </div>
                      <div className="text-white font-bold text-lg" style={{ fontFamily: 'Arial, sans-serif' }}>
                        {config.payment?.bankName || 'MB-BANK'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="text-center bg-black/60 rounded-lg p-4 border border-yellow-500/20">
                  <div className="text-yellow-400 font-bold text-lg mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                    QR Code Thanh Toán
                  </div>
                    {config.payment?.qrCodeImage ? (
                      config.payment.qrCodeImage.startsWith('http://') || config.payment.qrCodeImage.startsWith('https://') ? (
                        // External URL - use Image component with unoptimized
                        <Image 
                          src={config.payment.qrCodeImage} 
                          alt="QR Code" 
                          width={200} 
                          height={200}
                          className="mx-auto rounded-lg border-2 border-yellow-500/30"
                          unoptimized
                        />
                      ) : (
                      // Local path - use Next.js Image
                      <Image 
                        src={config.payment.qrCodeImage} 
                        alt="QR Code" 
                        width={200} 
                        height={200}
                        className="mx-auto rounded-lg border-2 border-yellow-500/30"
                      />
                    )
                  ) : (
                    <Image 
                      src="/qrcode.jpeg" 
                      alt="QR Code" 
                      width={200} 
                      height={200}
                      className="mx-auto rounded-lg border-2 border-yellow-500/30"
                    />
                  )}
                </div>
              </div>

              {/* Payment Instructions */}
              <div className="bg-black/60 rounded-lg p-4 border border-yellow-500/20">
                <h4 className="text-lg font-bold text-yellow-400 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  📝 Hướng Dẫn Thanh Toán
                </h4>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">1.</span>
                    <span>Chuyển khoản số tiền <strong className="text-yellow-400">{selectedPackage.price}</strong> theo thông tin trên</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">2.</span>
                    <span>Ghi nội dung chuyển khoản: <strong className="text-yellow-400">&quot;Tên Tài Khoản + {selectedPackage.title}&quot;</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">3.</span>
                    <span>Chụp ảnh bill chuyển khoản</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">4.</span>
                    <span>Gửi bill cho Admin qua Zalo: <strong className="text-yellow-400">{config.adminZalo || '03377.14.654'}</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">5.</span>
                    <span>Chờ Admin xử lý và cấp phần thưởng (5-10 phút)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </MuClassicModal>
      )}
    </div>
  );
}
