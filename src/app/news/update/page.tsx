import Link from 'next/link';
import Image from 'next/image';

export default function NewsUpdate() {
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
                <Link href="/info" className="text-white font-bold hover:text-blue-300 transition-colors relative z-10 px-4 py-2 rounded hover:bg-blue-500/10">
                  THÔNG TIN
                </Link>
                <Link href="/download" className="text-white font-bold hover:text-blue-300 transition-colors relative z-10 px-4 py-2 rounded hover:bg-blue-500/10">
                  TẢI GAME
                </Link>
                <Link href="/donate" className="text-white font-bold hover:text-blue-300 transition-colors relative z-10 px-4 py-2 rounded hover:bg-blue-500/10">
                  QUYÊN GÓP
                </Link>
                <Link href="/news" className="text-blue-300 font-bold hover:text-blue-200 transition-colors relative z-10 px-4 py-2 rounded hover:bg-blue-500/10">
                  TIN TỨC
                </Link>
              </div>
            </div>
          </div>
          {/* Navigation dot */}
          <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-5 h-5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
        </nav>

      {/* Breadcrumb */}
      <section className="py-4 bg-black/30">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-2 text-sm">
            <Link href="/" className="text-blue-400 hover:text-blue-300">Trang Chủ</Link>
            <span className="text-gray-400">/</span>
            <Link href="/news" className="text-blue-400 hover:text-blue-300">Tin Tức</Link>
            <span className="text-gray-400">/</span>
            <span className="text-white">Cập Nhật</span>
          </nav>
        </div>
      </section>

      {/* Article */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-purple-500/30">
              <div className="flex items-center justify-between mb-6">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">UPDATE</span>
                <span className="text-gray-400">27/08/2025</span>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-6">
                UPDATE SERVER
              </h1>
              
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-4">🔄 Cập Nhật Phiên Bản 1.1</h2>
                <p className="text-gray-300 mb-6">
                  Chúng tôi vui mừng thông báo về bản cập nhật mới nhất cho server MuDauTruongSS1.Net!
                </p>
                
                <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">✅ Tính Năng Mới</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Hệ thống guild war nâng cao</li>
                    <li>• Thêm map mới: Lost Tower</li>
                    <li>• Hệ thống pet và mount</li>
                    <li>• Cải thiện giao diện game</li>
                    <li>• Thêm tính năng auto-save</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">🐛 Sửa Lỗi</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-red-800/30 rounded-lg p-6 border border-red-500/30">
                    <h3 className="text-lg font-bold text-red-400 mb-3">Lỗi Gameplay</h3>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Sửa lỗi crash khi PK</li>
                      <li>• Sửa lỗi disconnect</li>
                      <li>• Sửa lỗi lag khi leveling</li>
                      <li>• Sửa lỗi inventory</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-800/30 rounded-lg p-6 border border-blue-500/30">
                    <h3 className="text-lg font-bold text-blue-400 mb-3">Lỗi Server</h3>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Sửa lỗi database connection</li>
                      <li>• Cải thiện performance</li>
                      <li>• Sửa lỗi memory leak</li>
                      <li>• Tối ưu hóa network</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">⚖️ Cân Bằng Game</h2>
                <div className="bg-yellow-800/30 rounded-lg p-6 mb-8 border border-yellow-500/30">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4">Thay Đổi Cân Bằng</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-bold text-white mb-3">Dark Knight</h4>
                      <ul className="text-gray-300 space-y-1 text-sm">
                        <li>• Tăng sát thương skill 5%</li>
                        <li>• Giảm mana cost 10%</li>
                        <li>• Tăng HP regeneration</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-3">Dark Wizard</h4>
                      <ul className="text-gray-300 space-y-1 text-sm">
                        <li>• Tăng casting speed 8%</li>
                        <li>• Giảm cooldown skill 15%</li>
                        <li>• Tăng critical rate</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">🎁 Event Đặc Biệt</h2>
                <p className="text-gray-300 mb-6">
                  Để chào mừng bản cập nhật mới, chúng tôi sẽ tổ chức event đặc biệt:
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-green-800/30 rounded-lg p-6 border border-green-500/30">
                    <h3 className="text-lg font-bold text-green-400 mb-3">🎯 Double EXP</h3>
                    <p className="text-gray-300 text-sm mb-3">Thời gian: 28/08 - 30/08</p>
                    <p className="text-gray-300 text-sm">Nhận gấp đôi kinh nghiệm trong 3 ngày</p>
                  </div>
                  
                  <div className="bg-blue-800/30 rounded-lg p-6 border border-blue-500/30">
                    <h3 className="text-lg font-bold text-blue-400 mb-3">💎 Drop Rate</h3>
                    <p className="text-gray-300 text-sm mb-3">Thời gian: 28/08 - 30/08</p>
                    <p className="text-gray-300 text-sm">Tăng tỷ lệ rơi đồ hiếm x3</p>
                  </div>
                  
                  <div className="bg-purple-800/30 rounded-lg p-6 border border-purple-500/30">
                    <h3 className="text-lg font-bold text-purple-400 mb-3">🎁 Free Items</h3>
                    <p className="text-gray-300 text-sm mb-3">Thời gian: 28/08 - 30/08</p>
                    <p className="text-gray-300 text-sm">Nhận free items mỗi ngày</p>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-6 mt-8">
                  <h3 className="text-xl font-bold text-white mb-4">📋 Hướng Dẫn Cập Nhật</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                      <div>
                        <h4 className="text-lg font-bold text-white mb-2">Tải Launcher Mới</h4>
                        <p className="text-gray-300">Tải xuống launcher phiên bản mới từ trang download</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                      <div>
                        <h4 className="text-lg font-bold text-white mb-2">Chạy Auto Update</h4>
                        <p className="text-gray-300">Launcher sẽ tự động cập nhật game files</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                      <div>
                        <h4 className="text-lg font-bold text-white mb-2">Khởi Động Game</h4>
                        <p className="text-gray-300">Đăng nhập và trải nghiệm tính năng mới</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Optimized Footer */}
        <footer className="bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-sm border-t border-blue-500/30 py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Logo & Description */}
              <div className="md:col-span-2">
                <div className="flex items-center mb-4">
                  <Image 
                    src="/icon.jpg" 
                    alt="Mu Online Logo" 
                    width={40} 
                    height={40}
                    className="rounded-lg mr-3"
                  />
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      MuDauTruongSS1.Net
                    </h3>
                    <p className="text-blue-300 text-sm">Đấu Trường SS1</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 max-w-md">
                  Server Mu Online Season 1 chuyên nghiệp với hệ thống ổn định, 
                  bảo mật cao và cập nhật thường xuyên. Tham gia ngay để trải nghiệm 
                  game Mu Online tốt nhất!
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="social-link">
                    <Image src="/facebook-logo.webp" alt="Facebook" width={20} height={20} />
                  </a>
                  <a href="#" className="social-link">
                    <Image src="/tiktok-logo.webp" alt="TikTok" width={20} height={20} />
                  </a>
                  <a href="#" className="social-link">
                    <Image src="/Zalo-icon.webp" alt="Zalo" width={20} height={20} />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Liên Kết Nhanh</h4>
                <div className="space-y-3">
                  <Link href="/" className="block text-gray-300 hover:text-blue-300 transition-colors">Trang Chủ</Link>
                  <Link href="/info" className="block text-gray-300 hover:text-blue-300 transition-colors">Thông Tin Server</Link>
                  <Link href="/download" className="block text-gray-300 hover:text-blue-300 transition-colors">Tải Game</Link>
                  <Link href="/donate" className="block text-gray-300 hover:text-blue-300 transition-colors">Ủng Hộ Server</Link>
                  <Link href="/news" className="block text-gray-300 hover:text-blue-300 transition-colors">Tin Tức</Link>
                </div>
              </div>

              {/* Game Info */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Thông Tin Game</h4>
                <div className="space-y-3">
                  <div className="text-gray-300">
                    <span className="text-blue-400">Server:</span> MuDauTruongSS1
                  </div>
                  <div className="text-gray-300">
                    <span className="text-blue-400">Season:</span> Season 1
                  </div>
                  <div className="text-gray-300">
                    <span className="text-blue-400">Online:</span> 24/7
                  </div>
                  <div className="text-gray-300">
                    <span className="text-blue-400">Website:</span> mudautruongss1.net
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-gray-400 text-sm mb-4 md:mb-0">
                  © 2024 MuDauTruongSS1.Net. All rights reserved.
                </div>
                <div className="flex space-x-6 text-sm text-gray-400">
                  <span>Version 1.0.0</span>
                  <span>•</span>
                  <span>Powered by React Next.js</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
