'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface LevelRanking {
  CharacterName: string;
  Class: string;
  cLevel: number;
  Experience: number;
}

interface GuildRanking {
  GuildName: string;
  Points: number;
  Logo: string;
}

interface Event {
  EventName: string;
  EventTime: string;
  EventType: string;
  Status: string;
  Countdown: string;
}

export default function Home() {
  const [levelRanking, setLevelRanking] = useState<LevelRanking[]>([]);
  const [guildRanking, setGuildRanking] = useState<GuildRanking[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRankingData();
  }, []);

  const fetchRankingData = async () => {
    try {
      const response = await fetch('/api/ranking');
      const result = await response.json();
      
      if (result.success) {
        setLevelRanking(result.data.levelRanking);
        setGuildRanking(result.data.guildRanking);
        setEvents(result.data.events);
      }
    } catch (error) {
      console.error('Error fetching ranking data:', error);
    } finally {
      setLoading(false);
    }
  };
  const news = [
    {
      title: 'HƯỚNG DẪN CHƠI MU DAU TRUONG - SEASON 1',
      date: '14/09/2025',
      type: 'Notice',
      link: '/news/guide'
    },
    {
      title: 'CÁC SỰ KIỆN TRONG GAME',
      date: '07/09/2025',
      type: 'Event',
      link: '/news/events'
    },
    {
      title: 'LỘ TRÌNH PHÁT TRIỂN SERVER',
      date: '07/09/2025',
      type: 'Update',
      link: '/news/roadmap'
    },
    {
      title: 'THÔNG BÁO MỞ SERVER',
      date: '07/09/2025',
      type: 'Notice',
      link: '/news/opening'
    },
    {
      title: 'UPDATE SERVER',
      date: '27/08/2025',
      type: 'Update',
      link: '/news/update'
    }
  ];

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
            </div>
          </div>
        </div>
        {/* Navigation dot */}
        <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-5 h-5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        <div className="max-w-6xl mx-auto px-5 py-8">
        {/* Hero Section */}
          <section className="text-center mb-12 relative">
            <div className="mb-8 relative">
              {/* Animated Background Effects */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-2xl animate-bounce" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-red-500/20 rounded-full blur-xl animate-ping" style={{animationDelay: '2s'}}></div>
          </div>
              
              {/* Main Logo with Effects */}
              <div className="relative inline-block">
                <div className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-4 relative" style={{fontFamily: 'Orbitron, monospace'}}>
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent animate-pulse">
                    MU
                  </span>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 text-4xl sm:text-6xl md:text-8xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent blur-sm opacity-50 animate-pulse">
                    MU
                  </div>
                </div>

                {/* Subtitle with Animation */}
                <div className="text-lg sm:text-2xl md:text-3xl font-bold text-blue-300 mb-4 animate-fade-in-up px-4" style={{animationDelay: '0.5s'}}>
                  <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                    ĐẤU TRƯỜNG SS1
                  </span>
                </div>
                
                {/* Domain with Typewriter Effect */}
                <div className="text-sm sm:text-lg md:text-2xl font-semibold text-white animate-fade-in-up px-4" style={{animationDelay: '1s'}}>
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    MuDauTruongSS1.Net
                  </span>
                </div>
                
                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-float" style={{animationDelay: '0s'}}></div>
                  <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
                  <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-red-400 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
                  <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
                </div>
              </div>
            </div>
          </section>

          {/* Content Grid */}
          <section className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* News Section */}
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30 hover-lift transition-all duration-300 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Tin Tức Mới Nhất</h3>
                <Link href="/news" className="text-blue-400 hover:text-blue-300 transition-colors">Xem Thêm</Link>
              </div>
              <div className="space-y-4">
                {news.map((item, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-4 border border-white/20 hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/20 group">
                    <div className="flex items-start gap-3">
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded group-hover:bg-blue-500 transition-colors">{item.type}</span>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1">
                          <Link href={item.link} className="hover:text-blue-300 transition-colors group-hover:text-blue-200">
                            {item.title}
                          </Link>
                        </h4>
                        <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{item.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Login Section */}
            <div className="space-y-6">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30 hover-lift transition-all duration-300 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20">
                <h3 className="text-xl font-bold text-white mb-6">Đăng nhập</h3>
                <form className="space-y-4">
                  <div className="text-right">
                    <Link href="#" className="text-blue-400 hover:text-blue-300 text-sm">quên mật khẩu?</Link>
                  </div>
                  <div>
              <input 
                type="text" 
                placeholder="Tên đăng nhập" 
                      className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
              />
                  </div>
                  <div>
              <input 
                type="password" 
                placeholder="Mật khẩu" 
                      className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Đăng Nhập
              </button>
                  <div className="text-center">
                    <Link href="/register" className="text-blue-400 hover:text-blue-300 text-sm">Đăng ký tài khoản mới</Link>
                  </div>
                </form>
              </div>
              
              {/* Join Banner */}
              <div className="relative overflow-hidden rounded-lg p-6 text-center hover-lift transition-all duration-300 hover:scale-105">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 animate-gradient-shift"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 animate-gradient-shift" style={{animationDelay: '1s'}}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-gradient-shift" style={{animationDelay: '2s'}}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">THAM GIA NGAY</h2>
                  <p className="text-white/90 mb-4 drop-shadow-md">TẠO TÀI KHOẢN CỦA BẠN</p>
                  <Link href="/register" className="inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-lg font-bold hover:bg-white/30 transition-all duration-300 border border-white/30 hover:border-white/50">
                    Đăng Ký Ngay
              </Link>
            </div>
          </div>
            </div>
          </section>

          {/* Download Section */}
          <section className="py-16 bg-black/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    🎮 TẢI GAME NGAY
                  </span>
                </h2>
                <p className="text-xl text-gray-300">Tải client và launcher để bắt đầu hành trình Mu Online</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-4">Google Drive</h3>
                  <a 
                    href="https://drive.google.com/file/d/11XWOxM88XId3zXyeTC6HxiwcJr5m2Dth/view?usp=drive_link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors inline-block"
                  >
                    📥 Tải Client
                  </a>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-4">MediaFire</h3>
                  <a 
                    href="https://www.mediafire.com/file/xyz123/client.zip/file" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors inline-block"
                  >
                    📥 Tải Client
                  </a>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-4">Mega</h3>
                  <a 
                    href="https://mega.nz/file/abc123#xyz789" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors inline-block"
                  >
                    📥 Tải Client
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Sections */}
          <section className="grid lg:grid-cols-3 gap-8">
            {/* Top Level */}
            <div className="bg-black/50 backdrop-blur-sm rounded-lg border border-blue-500/30 hover-lift transition-all duration-300 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="flex justify-between items-center p-4 border-b border-white/20">
                <h3 className="text-lg font-bold text-white">Xếp Hạng Cấp Độ</h3>
                <span className="text-white text-xl">+</span>
              </div>
              <div className="p-4">
                {loading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
                    <p className="text-gray-400 mt-2">Đang tải...</p>
                  </div>
                ) : (
                  <table className="w-full text-white">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-2">Nhân Vật</th>
                        <th className="text-left py-2">Lớp</th>
                        <th className="text-left py-2">Cấp Độ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {levelRanking.length > 0 ? (
                        levelRanking.map((player, index) => (
                          <tr key={index} className="border-b border-white/10">
                            <td className="py-2">{player.CharacterName}</td>
                            <td className="py-2">{player.Class}</td>
                            <td className="py-2">{player.cLevel}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="py-4 text-center text-gray-400">
                            Chưa có dữ liệu
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
          </div>
        </div>

            {/* Top Guilds */}
            <div className="bg-black/50 backdrop-blur-sm rounded-lg border border-blue-500/30 hover-lift transition-all duration-300 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="flex justify-between items-center p-4 border-b border-white/20">
                <h3 className="text-lg font-bold text-white">Xếp Hạng Guild</h3>
                <span className="text-white text-xl">+</span>
              </div>
              <div className="p-4">
                {loading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
                    <p className="text-gray-400 mt-2">Đang tải...</p>
                  </div>
                ) : (
                  <table className="w-full text-white">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-2">Tên Guild</th>
                        <th className="text-left py-2">Logo Guild</th>
                        <th className="text-left py-2">Điểm</th>
                      </tr>
                    </thead>
                    <tbody>
                      {guildRanking.length > 0 ? (
                        guildRanking.map((guild, index) => (
                          <tr key={index} className="border-b border-white/10">
                            <td className="py-2">{guild.GuildName}</td>
                            <td className="py-2">
                              <div className={`w-6 h-4 rounded ${
                                guild.Logo === 'blue-red' ? 'bg-gradient-to-r from-blue-500 to-red-500' :
                                guild.Logo === 'red-black' ? 'bg-gradient-to-r from-red-500 to-black' :
                                guild.Logo === 'yellow-orange' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                guild.Logo === 'black-red' ? 'bg-gradient-to-r from-black to-red-500' :
                                guild.Logo === 'blue-white' ? 'bg-gradient-to-r from-blue-500 to-white' :
                                'bg-gradient-to-r from-gray-500 to-gray-700'
                              }`}></div>
                            </td>
                            <td className="py-2">{guild.Points}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="py-4 text-center text-gray-400">
                            Chưa có dữ liệu
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Events Schedule */}
            <div className="bg-black/50 backdrop-blur-sm rounded-lg border border-blue-500/30 hover-lift transition-all duration-300 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="flex justify-between items-center p-4 border-b border-white/20">
                <h3 className="text-lg font-bold text-white">Lịch Sự Kiện</h3>
              </div>
              <div className="p-4 space-y-3">
                {loading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
                    <p className="text-gray-400 mt-2">Đang tải...</p>
                  </div>
                ) : events.length > 0 ? (
                  events.map((event, index) => (
                    <div key={index} className="bg-white/10 rounded-lg p-3 hover:bg-white/20 hover:border-green-400/50 transition-all duration-300 hover:shadow-md hover:shadow-green-500/20 group">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-white font-semibold group-hover:text-green-300 transition-colors">{event.EventName}</div>
                        <div className="text-blue-400 text-sm group-hover:text-blue-300 transition-colors">Sun {event.EventTime} PM</div>
                      </div>
                      <div className="text-green-400 text-sm group-hover:text-green-300 transition-colors">Bắt đầu sau {event.Countdown}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-400">
                    Chưa có sự kiện nào
                  </div>
                )}
            </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-black/90 to-black backdrop-blur-sm border-t border-blue-500/30 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">MuDauTruongSS1.Net</h3>
                  <p className="text-blue-300 text-sm">Server Mu Online Season 1</p>
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
              </div>
            </div>

            {/* Social Media Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Mạng Xã Hội
              </h4>
              <div className="flex space-x-4">
                <a href="#" className="group flex items-center justify-center w-12 h-12 bg-blue-600/20 hover:bg-blue-600/40 rounded-lg border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-110">
                  <img src="/facebook-logo.webp" alt="Facebook" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="group flex items-center justify-center w-12 h-12 bg-pink-600/20 hover:bg-pink-600/40 rounded-lg border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 hover:scale-110">
                  <img src="/tiktok-logo.webp" alt="TikTok" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="group flex items-center justify-center w-12 h-12 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300 hover:scale-110">
                  <img src="/Zalo-icon.webp" alt="Zalo" width={20} height={20} className="group-hover:scale-110 transition-transform" />
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
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">M</span>
                </div>
                <p className="text-gray-400 text-sm">
                  © 2024 MuDauTruongSS1.Net. All rights reserved.
                </p>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span>Được phát triển với ❤️</span>
                <span>•</span>
                <span>Version 1.0</span>
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