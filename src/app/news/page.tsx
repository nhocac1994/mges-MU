'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NetworkOverlay from '@/components/NetworkOverlay';

export default function News() {
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
          <h1 className="text-5xl font-bold text-white mb-4">📰 TIN TỨC MỚI NHẤT</h1>
          <p className="text-xl text-blue-300">Cập nhật thông tin mới nhất về server</p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Tìm kiếm tin tức..." 
                className="w-full bg-black/50 backdrop-blur-sm border border-blue-500/30 rounded-lg px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                🔍 Tìm Kiếm
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main News */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-blue-500/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">HOT</span>
                  <span className="text-gray-400">22/09/2024</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  HƯỚNG DẪN CHƠI MU DAU TRUONG - SEASON 1
                </h2>
                <p className="text-gray-300 mb-6">
                  Hướng dẫn chi tiết cách chơi game Mu Online Season 1, từ việc tạo nhân vật đến các tính năng nâng cao. 
                  Tìm hiểu về các class, kỹ năng, và cách phát triển nhân vật hiệu quả nhất.
                </p>
                <Link href="/news/guide" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">
                  Đọc thêm →
                </Link>
              </div>

              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-green-500/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">EVENT</span>
                  <span className="text-gray-400">21/09/2024</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  CÁC SỰ KIỆN TRONG GAME
                </h2>
                <p className="text-gray-300 mb-6">
                  Thông tin về các sự kiện đặc biệt trong game như Double EXP, Drop Rate Event, 
                  PK Tournament và nhiều sự kiện thú vị khác đang diễn ra.
                </p>
                <Link href="/news/events" className="text-green-400 hover:text-green-300 transition-colors font-semibold">
                  Đọc thêm →
                </Link>
              </div>

              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-purple-500/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">UPDATE</span>
                  <span className="text-gray-400">20/09/2024</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  LỘ TRÌNH PHÁT TRIỂN SERVER
                </h2>
                <p className="text-gray-300 mb-6">
                  Kế hoạch phát triển server trong tương lai, bao gồm các tính năng mới, 
                  cập nhật game và cải thiện trải nghiệm người chơi.
                </p>
                <Link href="/news/roadmap" className="text-purple-400 hover:text-purple-300 transition-colors font-semibold">
                  Đọc thêm →
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Recent News */}
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30">
                <h3 className="text-xl font-bold text-white mb-6">📋 TIN TỨC GẦN ĐÂY</h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-700 pb-4">
                    <h4 className="text-white font-semibold mb-2">THÔNG BÁO MỞ SERVER</h4>
                    <p className="text-gray-400 text-sm">19/09/2024</p>
                  </div>
                  <div className="border-b border-gray-700 pb-4">
                    <h4 className="text-white font-semibold mb-2">CẬP NHẬT PATCH 1.1</h4>
                    <p className="text-gray-400 text-sm">18/09/2024</p>
                  </div>
                  <div className="border-b border-gray-700 pb-4">
                    <h4 className="text-white font-semibold mb-2">SỰ KIỆN DOUBLE EXP</h4>
                    <p className="text-gray-400 text-sm">17/09/2024</p>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30">
                <h3 className="text-xl font-bold text-white mb-6">🏷️ DANH MỤC</h3>
                <div className="space-y-3">
                  <Link href="/news/guide" className="block text-blue-400 hover:text-blue-300 transition-colors">
                    📖 Hướng Dẫn
                  </Link>
                  <Link href="/news/events" className="block text-green-400 hover:text-green-300 transition-colors">
                    🎮 Sự Kiện
                  </Link>
                  <Link href="/news/roadmap" className="block text-purple-400 hover:text-purple-300 transition-colors">
                    🚀 Cập Nhật
                  </Link>
                  <Link href="/news/opening" className="block text-red-400 hover:text-red-300 transition-colors">
                    📢 Thông Báo
                  </Link>
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
