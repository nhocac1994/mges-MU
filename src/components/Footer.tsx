'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useConfig } from '@/contexts/ConfigContext';

export default function Footer() {
  const { config } = useConfig();
  
  // Đảm bảo config có giá trị
  if (!config) {
    return null; // Hoặc return một fallback UI
  }
  
  return (
    <footer className="relative z-10 bg-gradient-to-b from-black/90 via-black to-black border-t-2 border-yellow-500/60 py-12 mt-12">
      <div className="absolute inset-0 mu-modal-border-glow"></div>
      <div className="relative max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section - Classic MU Style */}
          <div className="relative space-y-4">
            <div className="absolute inset-0 mu-modal-border-glow rounded-lg opacity-50"></div>
            <div className="relative bg-gradient-to-b from-gray-900/50 via-black/50 to-gray-900/50 border border-yellow-500/30 rounded-lg p-4">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-yellow-500/50"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-yellow-500/50"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-yellow-500/50"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-yellow-500/50"></div>
              
              <div className="flex items-center space-x-3 relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Image 
                    src="/icon.jpg" 
                    alt={`${config.nameGame} - ${config.gameTitle} Logo`}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-lg border border-yellow-500/30"
                  />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-400 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>{config.nameGame}</h3>
                  <p className="text-yellow-300 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>{config.phone}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mt-4 relative z-10" style={{ fontFamily: 'Arial, sans-serif' }}>
                {config.gameSubtitle} chuyên nghiệp với hệ thống game ổn định, 
                cộng đồng sôi động và sự kiện thường xuyên.
              </p>
            </div>
          </div>

          {/* Links Section - Classic MU Style */}
          <div className="relative space-y-4">
            <div className="absolute inset-0 mu-modal-border-glow rounded-lg opacity-50"></div>
            <div className="relative bg-gradient-to-b from-gray-900/50 via-black/50 to-gray-900/50 border border-yellow-500/30 rounded-lg p-4">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-yellow-500/50"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-yellow-500/50"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-yellow-500/50"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-yellow-500/50"></div>
              
              <h4 className="text-lg font-semibold text-yellow-400 flex items-center mb-4 relative z-10 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse mu-dot-glow"></span>
                Liên Kết
              </h4>
              <div className="space-y-3 relative z-10">
                {[
                  { href: '/info', label: 'Thông Tin Server' },
                  { href: '/download', label: 'Tải Game' },
                  { href: '/donate', label: 'Ủng Hộ Server' },
                  { href: '/news', label: 'Tin Tức' },
                  { href: '/rankings', label: 'Bảng Xếp Hạng' }
                ].map((link, index) => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className="block text-gray-300 hover:text-yellow-400 transition-colors flex items-center group"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    <span className="w-1.5 h-1.5 bg-yellow-500/50 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors mu-dot-glow" style={{animationDelay: `${index * 0.1}s`}}></span>
                    <span className="group-hover:font-semibold transition-all">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Social Media Section - Classic MU Style */}
          <div className="relative space-y-4">
            <div className="absolute inset-0 mu-modal-border-glow rounded-lg opacity-50"></div>
            <div className="relative bg-gradient-to-b from-gray-900/50 via-black/50 to-gray-900/50 border border-yellow-500/30 rounded-lg p-4">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-yellow-500/50"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-yellow-500/50"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-yellow-500/50"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-yellow-500/50"></div>
              
              <h4 className="text-lg font-semibold text-yellow-400 flex items-center mb-4 relative z-10 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse mu-dot-glow"></span>
                Mạng Xã Hội
              </h4>
              <div className="flex space-x-4 relative z-10">
                {config.linkFacebook && (
                  <motion.a 
                    href={config.linkFacebook} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-12 h-12 bg-black/40 hover:bg-blue-600/40 rounded-lg border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 mu-button-glow"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Image src="/facebook.webp" alt="Facebook" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                  </motion.a>
                )}
                {config.linkYoutube && (
                  <motion.a 
                    href={config.linkYoutube} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-12 h-12 bg-black/40 hover:bg-red-600/40 rounded-lg border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 mu-button-glow"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Image src="/youtube.webp" alt="YouTube" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                  </motion.a>
                )}
                {config.linkZalo && (
                  <motion.a 
                    href={config.linkZalo} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-12 h-12 bg-black/40 hover:bg-blue-500/40 rounded-lg border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 mu-button-glow"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Image src="/zalo.webp" alt="Zalo" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                  </motion.a>
                )}
                {config.linkDiscord && (
                  <motion.a 
                    href={config.linkDiscord} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-12 h-12 bg-black/40 hover:bg-indigo-600/40 rounded-lg border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 mu-button-glow"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Image src="/disco.webp" alt="Discord" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                  </motion.a>
                )}
                {config.linkTikTok && (
                  <motion.a 
                    href={config.linkTikTok} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-12 h-12 bg-black/40 hover:bg-pink-600/40 rounded-lg border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 mu-button-glow"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Image src="/tiktok.webp" alt="TikTok" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                  </motion.a>
                )}
              </div>
              <div className="pt-4 relative z-10">
                <p className="text-yellow-300 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Theo dõi chúng tôi để cập nhật tin tức mới nhất
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Classic MU Style */}
        <div className="border-t-2 border-yellow-500/60 pt-6 relative">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Image 
                src="/icon.jpg" 
                alt={`${config.nameGame} - ${config.gameTitle} Icon`}
                width={24}
                height={24}
                className="w-4 h-4 sm:w-6 sm:h-6 rounded border border-yellow-500/30"
              />
              <p className="text-yellow-300 text-xs sm:text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                © {new Date().getFullYear()} {config.nameGame}. Tất cả quyền được bảo lưu.
              </p>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-6 text-xs sm:text-sm text-yellow-300" style={{ fontFamily: 'Arial, sans-serif' }}>
              <span suppressHydrationWarning>Được phát triển với MGES.COM</span>
              <span suppressHydrationWarning className="text-yellow-500">•</span>
              <span suppressHydrationWarning>Version 2.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

