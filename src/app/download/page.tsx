'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import NetworkOverlay from '@/components/NetworkOverlay';
import DownloadLinks from '@/components/DownloadLinks';
import MuClassicModal from '@/components/MuClassicModal';
import { useConfig } from '@/contexts/ConfigContext';
import AnimatedSection from '@/components/AnimatedSection';

export default function Download() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [downloadLinks, setDownloadLinks] = useState<{ mega?: string; media?: string; launcher?: string }>({});
  const [loading, setLoading] = useState(true);
  const { config } = useConfig();
  const [selectedSection, setSelectedSection] = useState<'requirements' | 'guide' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSectionClick = (section: 'requirements' | 'guide') => {
    setSelectedSection(section);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSection(null);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load download links from API
  useEffect(() => {
    const loadDownloadLinks = async () => {
      try {
        const response = await fetch('/api/download-urls');
        const result = await response.json();
        
        if (result.success && result.data) {
          setDownloadLinks(result.data);
        }
      } catch (error) {

      } finally {
        setLoading(false);
      }
    };

    loadDownloadLinks();
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
    <div className="min-h-screen relative overflow-hidden" style={{
      fontFamily: 'Roboto, sans-serif'
    }}>
      {/* Network Overlay - Luôn chạy trên background */}
      <NetworkOverlay />
      
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
      <section className="py-20 bg-gradient-to-b from-black/40 to-black/60 relative overflow-hidden">
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
                TẢI GAME
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
                TẢI GAME
              </motion.div>
            </motion.h1>
            <AnimatedSection direction="up" delay={0.2}>
              <div className="text-2xl font-semibold text-blue-300 mb-4">
                <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                  {config.nameGame} - Client và Launcher
                </span>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.4}>
              <div className="text-lg text-white/80">
                Tải client và launcher để bắt đầu hành trình Mu Online
              </div>
            </AnimatedSection>
          </motion.div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Download Links Component */}
          {loading ? (
            <div className="text-center text-gray-400 py-8">Đang tải link tải game...</div>
          ) : (
            <DownloadLinks 
              mega={downloadLinks.mega}
              media={downloadLinks.media}
              launcher={downloadLinks.launcher}
            />
          )}
        </div>
      </section>

      {/* System Requirements - Classic MU Style */}
      <section className="py-16 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-5xl font-black text-white mb-4 relative"
              style={{ fontFamily: 'Arial, sans-serif', textShadow: '0 0 20px rgba(234, 179, 8, 0.5)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mu-text-glow">
                YÊU CẦU HỆ THỐNG
              </span>
              <motion.div 
                className="absolute inset-0 text-5xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent blur-sm opacity-50"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                YÊU CẦU HỆ THỐNG
              </motion.div>
            </motion.h2>
            <p className="text-xl text-gray-300">Thông tin cấu hình máy tính cần thiết để chơi game</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Minimum Requirements */}
            <AnimatedSection direction="left" delay={0.2}>
              <div className="relative">
                <div className="absolute inset-0 mu-modal-border-glow"></div>
                <motion.div 
                  onClick={() => handleSectionClick('requirements')}
                  className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-8 cursor-pointer"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                  
                  {/* Header */}
                  <div className="relative bg-gradient-to-r from-green-600/20 via-emerald-600/20 to-green-600/20 border-b-2 border-green-500/60 px-6 py-4 mb-6 -mx-8 -mt-8 rounded-t-lg">
                    <div className="absolute inset-0 mu-modal-shimmer"></div>
                    <div className="relative flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mu-dot-glow"></div>
                      <h3 className="text-2xl font-bold text-green-300 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Tối Thiểu
                      </h3>
                    </div>
                  </div>
                  
                  {/* Requirements List */}
                  <div className="space-y-4">
                    {[
                      { label: 'OS:', value: 'Windows 7/8/10/11' },
                      { label: 'CPU:', value: 'Intel Core 2 Duo' },
                      { label: 'RAM:', value: '2 GB' },
                      { label: 'GPU:', value: 'DirectX 9.0c' },
                      { label: 'Storage:', value: '5 GB' }
                    ].map((req, idx) => (
                      <motion.div
                        key={idx}
                        className="relative bg-black/40 rounded-lg p-4 border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 group mu-command-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, type: 'spring', damping: 20 }}
                        whileHover={{ scale: 1.05, x: 5 }}
                      >
                        {/* Corner decorations */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500/50"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500/50"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500/50"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500/50"></div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow"></div>
                          <div className="flex-1 flex justify-between items-center">
                            <span className="text-yellow-400 font-bold text-lg group-hover:text-yellow-300 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>
                              {req.label}
                            </span>
                            <span className="text-green-400 font-bold text-lg group-hover:text-green-300 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>
                              {req.value}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-yellow-400 text-xs mt-4 font-semibold text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    Click để xem chi tiết →
                  </p>
                </motion.div>
              </div>
            </AnimatedSection>

            {/* Recommended Requirements */}
            <AnimatedSection direction="right" delay={0.3}>
              <div className="relative">
                <div className="absolute inset-0 mu-modal-border-glow"></div>
                <motion.div 
                  onClick={() => handleSectionClick('requirements')}
                  className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-8 cursor-pointer"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                  
                  {/* Header */}
                  <div className="relative bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-blue-600/20 border-b-2 border-blue-500/60 px-6 py-4 mb-6 -mx-8 -mt-8 rounded-t-lg">
                    <div className="absolute inset-0 mu-modal-shimmer"></div>
                    <div className="relative flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mu-dot-glow"></div>
                      <h3 className="text-2xl font-bold text-blue-300 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Khuyến Nghị
                      </h3>
                    </div>
                  </div>
                  
                  {/* Requirements List */}
                  <div className="space-y-4">
                    {[
                      { label: 'OS:', value: 'Windows 10/11' },
                      { label: 'CPU:', value: 'Intel Core i5' },
                      { label: 'RAM:', value: '8 GB' },
                      { label: 'GPU:', value: 'DirectX 11' },
                      { label: 'Storage:', value: '10 GB SSD' }
                    ].map((req, idx) => (
                      <motion.div
                        key={idx}
                        className="relative bg-black/40 rounded-lg p-4 border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 group mu-command-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, type: 'spring', damping: 20 }}
                        whileHover={{ scale: 1.05, x: 5 }}
                      >
                        {/* Corner decorations */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500/50"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500/50"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500/50"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500/50"></div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow" style={{animationDelay: `${idx * 0.2}s`}}></div>
                          <div className="flex-1 flex justify-between items-center">
                            <span className="text-yellow-400 font-bold text-lg group-hover:text-yellow-300 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>
                              {req.label}
                            </span>
                            <span className="text-blue-400 font-bold text-lg group-hover:text-blue-300 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>
                              {req.value}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-yellow-400 text-xs mt-4 font-semibold text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    Click để xem chi tiết →
                  </p>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Installation Guide - Classic MU Style */}
      <section className="py-16 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-5xl font-black text-white mb-4 relative"
              style={{ fontFamily: 'Arial, sans-serif', textShadow: '0 0 20px rgba(234, 179, 8, 0.5)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mu-text-glow">
                HƯỚNG DẪN CÀI ĐẶT
              </span>
              <motion.div 
                className="absolute inset-0 text-5xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent blur-sm opacity-50"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                HƯỚNG DẪN CÀI ĐẶT
              </motion.div>
            </motion.h2>
            <p className="text-xl text-gray-300">Hướng dẫn chi tiết cách cài đặt và chạy game</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Border Glow Effect */}
              <div className="absolute inset-0 mu-modal-border-glow"></div>
              
              {/* Main Container */}
              <motion.div 
                onClick={() => handleSectionClick('guide')}
                className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-8 cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
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
                  <div className="relative flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse mu-dot-glow"></div>
                    <h3 className="text-2xl font-bold text-yellow-300 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
                      CÁC BƯỚC CÀI ĐẶT
                    </h3>
                  </div>
                </div>
                
                {/* Steps */}
                <div className="space-y-4">
                  {[
                    { step: 1, title: 'Tải xuống Client', description: 'Tải xuống file client từ link phía trên (MEGA, MediaFire hoặc Launcher)', details: 'Chọn một trong các link tải: MEGA, MediaFire hoặc tải trực tiếp Launcher. File thường có định dạng .7z hoặc .zip.' },
                    { step: 2, title: 'Giải nén file', description: 'Giải nén file .7z bằng WinRAR hoặc 7-Zip vào thư mục bạn muốn', details: 'Sử dụng WinRAR, 7-Zip hoặc phần mềm giải nén khác. Giải nén vào thư mục riêng, không giải nén vào Program Files.' },
                    { step: 3, title: 'Chạy Launcher', description: 'Chạy file launcher.exe để tự động cập nhật', details: 'Chạy file launcher.exe với quyền Administrator. Launcher sẽ tự động kiểm tra và tải các file cập nhật cần thiết.' },
                    { step: 4, title: 'Đăng nhập và chơi', description: 'Sử dụng tài khoản đã đăng ký để vào game', details: 'Nhập tài khoản và mật khẩu đã đăng ký trên website. Nếu chưa có tài khoản, vui lòng đăng ký tại trang chủ.' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="relative bg-black/40 rounded-lg p-4 border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 group mu-command-card"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, type: 'spring', damping: 20 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      {/* Corner decorations */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500/50"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500/50"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500/50"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500/50"></div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center border-2 border-yellow-500/30 font-bold text-yellow-300 text-lg group-hover:scale-110 transition-transform" style={{ fontFamily: 'Arial, sans-serif' }}>
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse mu-dot-glow"></div>
                            <h3 className="text-xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-gray-300 text-sm group-hover:text-white transition-colors leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <p className="text-yellow-400 text-xs mt-6 font-semibold text-center opacity-0 group-hover:opacity-100 transition-opacity">
                  Click để xem hướng dẫn chi tiết →
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      </main>
      </div>

      {/* Requirements/Guide Detail Modal */}
      {selectedSection && (
        <MuClassicModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedSection === 'requirements' ? 'Chi Tiết Yêu Cầu Hệ Thống' : 'Hướng Dẫn Cài Đặt Chi Tiết'}
          type="news"
        >
          <div className="space-y-6">
            {selectedSection === 'requirements' ? (
              <>
                {/* Minimum Requirements */}
                <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
                  <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Cấu Hình Tối Thiểu
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Hệ Điều Hành:', value: 'Windows 7/8/10/11 (32-bit hoặc 64-bit)' },
                      { label: 'Bộ Xử Lý:', value: 'Intel Core 2 Duo 2.0GHz hoặc tương đương' },
                      { label: 'Bộ Nhớ:', value: '2 GB RAM' },
                      { label: 'Card Đồ Họa:', value: 'DirectX 9.0c tương thích, 256MB VRAM' },
                      { label: 'Ổ Cứng:', value: '5 GB dung lượng trống' },
                      { label: 'Kết Nối:', value: 'Internet băng thông rộng' }
                    ].map((req, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-black/40 rounded border border-yellow-500/20">
                        <span className="text-yellow-400 font-semibold">{req.label}</span>
                        <span className="text-white">{req.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Requirements */}
                <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
                  <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Cấu Hình Khuyến Nghị
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Hệ Điều Hành:', value: 'Windows 10/11 (64-bit)' },
                      { label: 'Bộ Xử Lý:', value: 'Intel Core i5 hoặc AMD tương đương' },
                      { label: 'Bộ Nhớ:', value: '8 GB RAM trở lên' },
                      { label: 'Card Đồ Họa:', value: 'DirectX 11 tương thích, 1GB VRAM' },
                      { label: 'Ổ Cứng:', value: '10 GB SSD dung lượng trống' },
                      { label: 'Kết Nối:', value: 'Internet tốc độ cao, ổn định' }
                    ].map((req, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-black/40 rounded border border-yellow-500/20">
                        <span className="text-yellow-400 font-semibold">{req.label}</span>
                        <span className="text-white">{req.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
                  <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    💡 Lưu Ý
                  </h3>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Đảm bảo cài đặt đầy đủ DirectX và Visual C++ Redistributable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Tắt phần mềm diệt virus tạm thời khi cài đặt nếu bị chặn</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Chạy game với quyền Administrator để tránh lỗi</span>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                {/* Installation Steps Detail */}
                {[
                  { 
                    step: 1, 
                    title: 'Tải xuống Client', 
                    description: 'Tải xuống file client từ link phía trên',
                    details: [
                      'Chọn một trong các link tải: MEGA, MediaFire hoặc tải trực tiếp Launcher',
                      'File thường có định dạng .7z hoặc .zip',
                      'Kích thước file khoảng 2-3 GB',
                      'Đảm bảo có đủ dung lượng ổ cứng trước khi tải'
                    ]
                  },
                  { 
                    step: 2, 
                    title: 'Giải nén file', 
                    description: 'Giải nén file .7z bằng WinRAR hoặc 7-Zip',
                    details: [
                      'Sử dụng WinRAR, 7-Zip hoặc phần mềm giải nén khác',
                      'Giải nén vào thư mục riêng, không giải nén vào Program Files',
                      'Tạo thư mục mới như "C:\\MuOnline" để dễ quản lý',
                      'Đảm bảo có đủ quyền ghi vào thư mục đích'
                    ]
                  },
                  { 
                    step: 3, 
                    title: 'Chạy Launcher', 
                    description: 'Chạy file launcher.exe để tự động cập nhật',
                    details: [
                      'Chạy file launcher.exe với quyền Administrator',
                      'Launcher sẽ tự động kiểm tra và tải các file cập nhật cần thiết',
                      'Chờ quá trình cập nhật hoàn tất (có thể mất vài phút)',
                      'Không tắt launcher trong quá trình cập nhật'
                    ]
                  },
                  { 
                    step: 4, 
                    title: 'Đăng nhập và chơi', 
                    description: 'Sử dụng tài khoản đã đăng ký để vào game',
                    details: [
                      'Nhập tài khoản và mật khẩu đã đăng ký trên website',
                      'Nếu chưa có tài khoản, vui lòng đăng ký tại trang chủ',
                      'Sau khi đăng nhập, chọn server và tạo nhân vật',
                      'Bắt đầu hành trình Mu Online của bạn!'
                    ]
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center border-2 border-yellow-500/30 font-bold text-yellow-300 text-lg" style={{ fontFamily: 'Arial, sans-serif' }}>
                        {item.step}
                      </div>
                      <h3 className="text-xl font-bold text-yellow-400" style={{ fontFamily: 'Arial, sans-serif' }}>
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-300 mb-3">{item.description}</p>
                    <ul className="space-y-2">
                      {item.details.map((detail, idx) => (
                        <li key={idx} className="text-gray-300 flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Troubleshooting */}
                <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
                  <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    🔧 Xử Lý Sự Cố
                  </h3>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span><strong>Lỗi không chạy được:</strong> Cài đặt DirectX và Visual C++ Redistributable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span><strong>Lỗi kết nối:</strong> Kiểm tra firewall và antivirus</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span><strong>Lỗi cập nhật:</strong> Chạy launcher với quyền Administrator</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span><strong>Vẫn gặp vấn đề:</strong> Liên hệ admin qua Discord hoặc Facebook</span>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </MuClassicModal>
      )}
    </div>
  );
}
