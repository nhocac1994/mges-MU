import Link from 'next/link';
import Image from 'next/image';

export default function Info() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/logoweb.jpg)',
          backgroundAttachment: 'fixed'
        }}
      ></div>
      
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-blue-900/80 to-purple-900/80 backdrop-blur-sm border-b border-blue-500/30">
        <div className="max-w-6xl mx-auto px-5 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Image 
                src="/icon.jpg" 
                alt="Mu Online Logo" 
                width={40} 
                height={40}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-lg font-bold text-white">MuDauTruongSS1.Net</h1>
                <p className="text-blue-300 text-xs">Đấu Trường SS1</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/register" className="text-white text-sm font-medium px-4 py-1 rounded hover:text-blue-300 hover:bg-blue-500/10 transition-all">
                ĐĂNG KÝ
              </Link>
              <Link href="/login" className="text-white text-sm font-medium px-4 py-1 rounded hover:text-blue-300 hover:bg-blue-500/10 transition-all">
                ĐĂNG NHẬP
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-black/95 py-4 border-b-2 border-blue-400 relative z-50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex justify-center">
            <div className="flex gap-8">
              <Link href="/" className="text-white font-bold hover:text-blue-300 transition-colors relative z-10 px-4 py-2 rounded hover:bg-blue-500/10">
                TRANG CHỦ
              </Link>
              <Link href="/info" className="text-blue-300 font-bold hover:text-blue-200 transition-colors relative z-10 px-4 py-2 rounded hover:bg-blue-500/10">
                THÔNG TIN
              </Link>
              <Link href="/download" className="text-white font-bold hover:text-blue-300 transition-colors relative z-10 px-4 py-2 rounded hover:bg-blue-500/10">
                TẢI GAME
              </Link>
              <Link href="/donate" className="text-white font-bold hover:text-blue-300 transition-colors relative z-10 px-4 py-2 rounded hover:bg-blue-500/10">
                QUYÊN GÓP
              </Link>
              <Link href="/news" className="text-white font-bold hover:text-blue-300 transition-colors relative z-10 px-4 py-2 rounded hover:bg-blue-500/10">
                TIN TỨC
              </Link>
            </div>
          </div>
        </div>
        {/* Navigation dot */}
        <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-5 h-5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
      </nav>

      {/* Page Header */}
      <section className="py-20 bg-gradient-to-b from-black/40 to-black/60 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-2xl animate-bounce" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-8">
            <div className="text-6xl font-black text-white mb-4 relative" style={{fontFamily: 'Orbitron, monospace'}}>
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent animate-pulse">
                THÔNG TIN SERVER
              </span>
              {/* Glow Effect */}
              <div className="absolute inset-0 text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent blur-sm opacity-50 animate-pulse">
                THÔNG TIN SERVER
              </div>
            </div>
            <div className="text-2xl font-semibold text-blue-300 mb-4 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                MuDauTruongSS1.Net - Server Mu Online Season 1
              </span>
            </div>
            <div className="text-lg text-white/80 animate-fade-in-up" style={{animationDelay: '1s'}}>
              Thông tin chi tiết về server và các tính năng nổi bật
            </div>
          </div>
        </div>
      </section>

      {/* Server Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Server Stats */}
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-blue-500/30 hover-lift transition-all duration-300 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20">
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
            </div>

            {/* Server Settings */}
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-purple-500/30 hover-lift transition-all duration-300 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20">
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
            </div>
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
                      <td className="py-4 px-6 font-mono text-green-400">/change</td>
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
                      <td className="py-4 px-6 font-mono text-green-400">/ware [0-5]</td>
                      <td className="py-4 px-6">Mở thùng đồ cá nhân từ 1 - 5</td>
                    </tr>
                    <tr className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-6 font-mono text-green-400">/requests [on/off]</td>
                      <td className="py-4 px-6">Bật / tắt requests trong game</td>
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
              Khám phá những tính năng độc đáo và hấp dẫn của server MuDauTruongSS1.Net
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
                  <Image src="/facebook-logo.webp" alt="Facebook" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="group flex items-center justify-center w-12 h-12 bg-pink-600/20 hover:bg-pink-600/40 rounded-lg border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 hover:scale-110">
                  <Image src="/tiktok-logo.webp" alt="TikTok" width={20} height={20} className="group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="group flex items-center justify-center w-12 h-12 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300 hover:scale-110">
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
      </div>
    </div>
  );
}
