'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NetworkOverlay from '@/components/NetworkOverlay';

export default function Download() {
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
          <h1 className="text-5xl font-bold text-white mb-4">TẢI GAME</h1>
          <p className="text-xl text-blue-300">MuDauTruongSS1.net - Client và Launcher</p>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Alternative Download Links */}
          <div className="mb-12">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-yellow-500/30">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">🔗 LINK TẢI GAME</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">MediaFire</h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-3">File size: 155.35MB</p>
                  <a 
                     href="https://www.mediafire.com/file/0tp6wj1yko12318/Mu-DauTruongs1.net_v1.1.7z/file" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white py-3 px-4 sm:px-6 rounded-lg font-semibold transition-colors inline-block text-sm sm:text-base"
                  >
                    📥 Tải Client v1.1
                  </a>
                </div>
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">MEGA</h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-3">Alternative download</p>
                  <a 
                    href="https://mega.nz/file/4UNwiZhL#MJzsMKtdv4vQI765iDdd200fdOPZPwSBxoB1xUaacyw" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 sm:px-6 rounded-lg font-semibold transition-colors inline-block text-sm sm:text-base"
                  >
                    📥 Tải Client v1.1
                  </a>
                </div>
                
              </div>
              
              {/* Launcher Download Links */}
              {/* <div className="mt-8 pt-6 border-t border-gray-600">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">🚀 LAUNCHER</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <a 
                      href="https://drive.google.com/file/d/1DEF456UVW/view?usp=sharing" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors inline-block"
                    >
                      📥 Tải Launcher
                    </a>
                  </div>
                  <div className="text-center">
                    <a 
                      href="https://www.mediafire.com/file/launcher123/launcher.exe/file" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors inline-block"
                    >
                      📥 Tải Launcher
                    </a>
                  </div>
                  <div className="text-center">
                    <a 
                      href="https://mega.nz/file/launcher456#key789" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors inline-block"
                    >
                      📥 Tải Launcher
                    </a>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

        </div>
      </section>

      {/* System Requirements */}
      <section className="py-16 bg-black/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">💻 YÊU CẦU HỆ THỐNG</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-green-500/30">
              <h3 className="text-2xl font-bold text-white mb-6">✅ Tối Thiểu</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">OS:</span>
                  <span className="text-white">Windows 7/8/10/11</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">CPU:</span>
                  <span className="text-white">Intel Core 2 Duo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">RAM:</span>
                  <span className="text-white">2 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">GPU:</span>
                  <span className="text-white">DirectX 9.0c</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Storage:</span>
                  <span className="text-white">5 GB</span>
                </div>
              </div>
            </div>
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-blue-500/30">
              <h3 className="text-2xl font-bold text-white mb-6">🚀 Khuyến Nghị</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">OS:</span>
                  <span className="text-white">Windows 10/11</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">CPU:</span>
                  <span className="text-white">Intel Core i5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">RAM:</span>
                  <span className="text-white">8 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">GPU:</span>
                  <span className="text-white">DirectX 11</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Storage:</span>
                  <span className="text-white">10 GB SSD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Guide */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">📋 HƯỚNG DẪN CÀI ĐẶT</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-blue-500/30">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Tải xuống Client</h3>
                    <p className="text-gray-300">Tải xuống file client từ link phía trên</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Giải nén file</h3>
                    <p className="text-gray-300">Giải nén file .7z bằng WinRAR hoặc 7-Zip vào thư mục bạn muốn</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Chạy Launcher</h3>
                    <p className="text-gray-300">Chạy file launcher.exe để tự động cập nhật</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Đăng nhập và chơi</h3>
                    <p className="text-gray-300">Sử dụng tài khoản đã đăng ký để vào game</p>
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
