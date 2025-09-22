import Link from 'next/link';

export default function Download() {
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
              <Link href="/download" className="text-blue-300 font-bold hover:text-blue-200 transition-colors relative z-10 px-4 py-2 rounded hover:bg-blue-500/10">
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
      <section className="py-16 bg-black/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">TẢI GAME</h1>
          <p className="text-xl text-blue-300">MuDauTruongSS1.Net - Client và Launcher</p>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Alternative Download Links */}
          <div className="mb-12">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-yellow-500/30">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">🔗 LINK TẢI GAME</h2>
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
                    <p className="text-gray-300">Giải nén file .zip vào thư mục bạn muốn</p>
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
      </div>
    </div>
  );
}
