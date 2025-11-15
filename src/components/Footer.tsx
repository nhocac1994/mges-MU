'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSiteConfig } from '@/lib/config';

export default function Footer() {
  const config = getSiteConfig();
  
  return (
    <footer className="relative z-10 bg-gradient-to-b from-black/90 to-black backdrop-blur-sm border-t border-blue-500/30 py-12 mt-12">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image 
                src="/icon.jpg" 
                alt={`${config.nameGame} - ${config.gameTitle} Logo`}
                width={40}
                height={40}
                className="w-10 h-10 rounded-lg"
              />
              <div>
                <h3 className="text-xl font-bold text-white">{config.nameGame}</h3>
                <p className="text-blue-300 text-sm">{config.phone}</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {config.gameSubtitle} chuyên nghiệp với hệ thống game ổn định, 
              cộng đồng sôi động và sự kiện thường xuyên.
            </p>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Liên Kết
            </h4>
            <div className="space-y-3">
              <Link href="/info" className="block text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                Thông Tin Server
              </Link>
              <Link href="/download" className="block text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                Tải Game
              </Link>
              <Link href="/donate" className="block text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                Ủng Hộ Server
              </Link>
              <Link href="/news" className="block text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                Tin Tức
              </Link>
              <Link href="/rankings" className="block text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                Bảng Xếp Hạng
              </Link>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Mạng Xã Hội
            </h4>
            <div className="flex space-x-4">
              {config.linkFacebook && (
                <a 
                  href={config.linkFacebook} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 bg-blue-600/20 hover:bg-blue-600/40 rounded-lg border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-110"
                >
                  <Image src="/facebook-logo.webp" alt="Facebook" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                </a>
              )}
              {config.linkYoutube && (
                <a 
                  href={config.linkYoutube} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 bg-red-600/20 hover:bg-red-600/40 rounded-lg border border-red-500/30 hover:border-red-400/50 transition-all duration-300 hover:scale-110"
                >
                  <Image src="/youtube-logo.webp" alt="YouTube" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                </a>
              )}
              {config.linkZalo && (
                <a 
                  href={config.linkZalo} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300 hover:scale-110"
                >
                  <Image src="/Zalo-icon.webp" alt="Zalo" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                </a>
              )}
              {config.linkDiscord && (
                <a 
                  href={config.linkDiscord} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 bg-indigo-600/20 hover:bg-indigo-600/40 rounded-lg border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300 hover:scale-110"
                >
                  <Image src="/discord-logo.webp" alt="Discord" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                </a>
              )}
              {config.linkTikTok && (
                <a 
                  href={config.linkTikTok} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-12 h-12 bg-pink-600/20 hover:bg-pink-600/40 rounded-lg border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 hover:scale-110"
                >
                  <Image src="/tiktok-logo.webp" alt="TikTok" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                </a>
              )}
            </div>
            <div className="pt-4">
              <p className="text-gray-400 text-sm">
                Theo dõi chúng tôi để cập nhật tin tức mới nhất
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Image 
                src="/icon.jpg" 
                alt={`${config.nameGame} - ${config.gameTitle} Icon`}
                width={24}
                height={24}
                className="w-4 h-4 sm:w-6 sm:h-6 rounded"
              />
              <p className="text-gray-400 text-xs sm:text-sm">
                © {new Date().getFullYear()} {config.nameGame}. Tất cả quyền được bảo lưu.
              </p>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-6 text-xs sm:text-sm text-gray-400">
              <span>Được phát triển với MGeS</span>
              <span>•</span>
              <span>Version 1.2</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

