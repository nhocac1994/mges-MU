'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RankingTable from '@/components/RankingTable';
import GuildRankingTable from '@/components/GuildRankingTable';

export default function RankingsPage() {
  const [activeTab, setActiveTab] = useState<'characters' | 'guilds'>('characters');

  return (
    <div className="min-h-screen relative" style={{
      background: 'url(/logoweb.jpg) center/cover no-repeat fixed',
      fontFamily: 'Roboto, sans-serif'
    }}>
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/70 -z-10"></div>
      
      {/* Top Header */}
      <div className="bg-black/95 py-2 border-b border-gray-600 relative z-50">
        <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="text-green-400 text-xs sm:text-sm font-medium">🟢 Server Online</div>
          <div className="flex gap-2 sm:gap-5">
            <Link href="/register" className="text-white text-xs sm:text-sm font-medium px-2 sm:px-4 py-1 rounded hover:text-blue-300 hover:bg-blue-500/10 transition-all">
              ĐĂNG KÝ
            </Link>
            <Link href="/login" className="text-white text-xs sm:text-sm font-medium px-2 sm:px-4 py-1 rounded hover:text-blue-300 hover:bg-blue-500/10 transition-all">
              ĐĂNG NHẬP
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-black/95 py-4 border-b-2 border-blue-400 relative z-50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex justify-center">
            <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-8 justify-center">
              <Link href="/" className="text-white font-bold hover:text-blue-300 transition-colors relative z-10 px-2 sm:px-4 py-2 rounded hover:bg-blue-500/10 text-sm sm:text-base">
                TRANG CHỦ
              </Link>
              <Link href="/info" className="text-white font-bold hover:text-blue-300 transition-colors relative z-10 px-2 sm:px-4 py-2 rounded hover:bg-blue-500/10 text-sm sm:text-base">
                THÔNG TIN
              </Link>
              <Link href="/download" className="text-blue-300 font-bold hover:text-blue-200 transition-colors relative z-10 px-2 sm:px-4 py-2 rounded hover:bg-blue-500/10 text-sm sm:text-base">
                TẢI GAME
              </Link>
              <Link href="/donate" className="text-white font-bold hover:text-blue-300 transition-colors relative z-10 px-2 sm:px-4 py-2 rounded hover:bg-blue-500/10 text-sm sm:text-base">
                QUYÊN GÓP
              </Link>
              <Link href="/news" className="text-white font-bold hover:text-blue-300 transition-colors relative z-10 px-2 sm:px-4 py-2 rounded hover:bg-blue-500/10 text-sm sm:text-base">
                TIN TỨC
              </Link>
              <Link href="/rankings" className="text-white font-bold hover:text-blue-300 transition-colors relative z-10 px-2 sm:px-4 py-2 rounded hover:bg-blue-500/10 text-sm sm:text-base">
                XẾP HẠNG
              </Link>
            </div>
          </div>
        </div>
        {/* Navigation dot */}
        <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-5 h-5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-yellow-400 mb-4">
              Bảng Xếp Hạng MuOnline
            </h1>
            <p className="text-gray-300 text-lg">
              Top players và guilds của server
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800 rounded-lg p-1 flex">
              <button
                onClick={() => setActiveTab('characters')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'characters'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                🏆 Top Resets
              </button>
              <button
                onClick={() => setActiveTab('guilds')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'guilds'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                🏰 Top Guilds
              </button>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Character Rankings */}
            {activeTab === 'characters' && (
              <RankingTable
                title="🏆 Top 100 Resets"
                endpoint="level"
              />
            )}

            {/* Guild Rankings */}
            {activeTab === 'guilds' && (
              <GuildRankingTable
                title="🏰 Top 50 Guilds"
                endpoint="guild"
              />
            )}
          </div>

          <div className="mt-8 bg-gray-800 rounded-lg p-6 max-w-6xl mx-auto">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">
              📋 Thông tin về Ranking
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
              <div>
                <h4 className="font-bold text-yellow-300 mb-2">🏆 Top Resets:</h4>
                <ul className="space-y-1">
                  <li>• Xếp hạng dựa trên tổng số resets của nhân vật</li>
                  <li>• Hiển thị top 100 người chơi đầu tiên</li>
                  <li>• Chỉ tính các nhân vật có CtlCode &lt; 8 hoặc NULL</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-yellow-300 mb-2">🏰 Top Guilds:</h4>
                <ul className="space-y-1">
                  <li>• Xếp hạng dựa trên điểm số guild (G_Score)</li>
                  <li>• Hiển thị top 50 guild đầu tiên</li>
                  <li>• Bao gồm Guild Master và số thành viên</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-black/90 to-black backdrop-blur-sm border-t border-blue-500/30 py-12 mt-12 relative z-10">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Image 
                  src="/icon.jpg" 
                  alt="Mu Logo" 
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">MuDauTruongSS1.Net</h3>
                  <p className="text-blue-300 text-sm">033.77.14.654</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Server Mu Online Season 1 chuyên nghiệp với hệ thống game ổn định, 
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
                <a href="https://www.facebook.com/share/1K54dD4kW1/?mibextid=wwXIfr" className="group flex items-center justify-center w-12 h-12 bg-blue-600/20 hover:bg-blue-600/40 rounded-lg border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-110">
                  <Image src="/facebook-logo.webp" alt="Facebook" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.tiktok.com/@mudautruongss1?_t=ZS-90eQbTHy1sf&_r=1" className="group flex items-center justify-center w-12 h-12 bg-pink-600/20 hover:bg-pink-600/40 rounded-lg border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 hover:scale-110">
                  <Image src="/tiktok-logo.webp" alt="TikTok" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://zalo.me/g/xeupyo721" className="group flex items-center justify-center w-12 h-12 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300 hover:scale-110">
                  <Image src="/Zalo-icon.webp" alt="Zalo" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                </a>
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
                  alt="Mu Logo" 
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded"
                />
                <p className="text-gray-400 text-sm">
                  © 2025 MuDauTruongSS1.Net. Tất cả quyền được bảo lưu.
                </p>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span>Được phát triển với MGeS</span>
                <span>•</span>
                <span>Version 1.2</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-red-900/20"></div>
      </div>
    </div>
  );
}
