import Link from 'next/link';

export default function NewsRoadmap() {
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
                <img 
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
            <span className="text-white">Lộ Trình</span>
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
                <span className="text-gray-400">20/09/2024</span>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-6">
                LỘ TRÌNH PHÁT TRIỂN SERVER
              </h1>
              
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-4">🚀 Giai Đoạn 1: Khởi Động (Q4 2024)</h2>
                <p className="text-gray-300 mb-6">
                  Giai đoạn đầu tiên tập trung vào việc ổn định server và thu hút người chơi:
                </p>
                
                <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">✅ Đã Hoàn Thành</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• ✅ Khởi động server Season 1</li>
                    <li>• ✅ Hệ thống đăng ký/đăng nhập</li>
                    <li>• ✅ Website chính thức</li>
                    <li>• ✅ Hệ thống anti-cheat cơ bản</li>
                  </ul>
                </div>

                <div className="bg-blue-800/30 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">🔄 Đang Thực Hiện</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• 🔄 Tối ưu hóa server performance</li>
                    <li>• 🔄 Thêm các sự kiện hàng ngày</li>
                    <li>• 🔄 Cải thiện hệ thống support</li>
                    <li>• 🔄 Phát triển mobile app</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">🎯 Giai Đoạn 2: Phát Triển (Q1 2025)</h2>
                <p className="text-gray-300 mb-6">
                  Giai đoạn thứ hai tập trung vào việc thêm tính năng mới và cải thiện trải nghiệm:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-green-800/30 rounded-lg p-6 border border-green-500/30">
                    <h3 className="text-xl font-bold text-green-400 mb-4">🎮 Tính Năng Game</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Thêm class Summoner</li>
                      <li>• Hệ thống guild war nâng cao</li>
                      <li>• Thêm map mới</li>
                      <li>• Hệ thống quest tự động</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-800/30 rounded-lg p-6 border border-blue-500/30">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">💻 Tính Năng Website</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Hệ thống ranking online</li>
                      <li>• Forum cộng đồng</li>
                      <li>• Hệ thống vote server</li>
                      <li>• API cho mobile app</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">🌟 Giai Đoạn 3: Mở Rộng (Q2 2025)</h2>
                <p className="text-gray-300 mb-6">
                  Giai đoạn thứ ba tập trung vào việc mở rộng server và thêm tính năng cao cấp:
                </p>
                
                <div className="bg-purple-800/30 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-purple-400 mb-4">🎪 Tính Năng Cao Cấp</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Hệ thống castle siege nâng cao</li>
                    <li>• Thêm class Rage Fighter</li>
                    <li>• Hệ thống pet và mount</li>
                    <li>• Thêm server PvP riêng</li>
                    <li>• Hệ thống tournament tự động</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">🔮 Giai Đoạn 4: Tương Lai (Q3-Q4 2025)</h2>
                <p className="text-gray-300 mb-6">
                  Giai đoạn cuối tập trung vào việc phát triển dài hạn và mở rộng cộng đồng:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-yellow-800/30 rounded-lg p-6 border border-yellow-500/30">
                    <h3 className="text-xl font-bold text-yellow-400 mb-4">🌍 Mở Rộng</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Thêm server quốc tế</li>
                      <li>• Hệ thống cross-server</li>
                      <li>• Thêm ngôn ngữ</li>
                      <li>• Partnership với các server khác</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-800/30 rounded-lg p-6 border border-red-500/30">
                    <h3 className="text-xl font-bold text-red-400 mb-4">🚀 Công Nghệ</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Upgrade lên Season 2</li>
                      <li>• Hệ thống AI anti-cheat</li>
                      <li>• Cloud infrastructure</li>
                      <li>• Blockchain integration</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-6 mt-8">
                  <h3 className="text-xl font-bold text-white mb-4">📊 Thống Kê Mục Tiêu</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">1,000+</div>
                      <div className="text-gray-300">Người chơi online</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">10,000+</div>
                      <div className="text-gray-300">Tài khoản đăng ký</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
                      <div className="text-gray-300">Uptime server</div>
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
                  <img 
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
                    <img src="/facebook-logo.webp" alt="Facebook" width={20} height={20} />
                  </a>
                  <a href="#" className="social-link">
                    <img src="/tiktok-logo.webp" alt="TikTok" width={20} height={20} />
                  </a>
                  <a href="#" className="social-link">
                    <img src="/Zalo-icon.webp" alt="Zalo" width={20} height={20} />
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
