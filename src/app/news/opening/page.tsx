import Link from 'next/link';
import Image from 'next/image';

export default function NewsOpening() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        // style={{
        //   backgroundImage: 'url(/logoweb.jpg)',
        //   backgroundAttachment: 'fixed'
        // }}
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
                  <h1 className="text-lg font-bold text-white">MuDauTruongSS1.net</h1>
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
            <span className="text-white">Thông Báo</span>
          </nav>
        </div>
      </section>

      {/* Article */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-red-500/30">
              <div className="flex items-center justify-between mb-6">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">NOTICE</span>
                <span className="text-gray-400">19/09/2024</span>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-6">
                THÔNG BÁO MỞ SERVER
              </h1>
              
              <div className="prose prose-invert max-w-none">
                <div className="bg-red-800/30 rounded-lg p-6 mb-8 border border-red-500/30">
                  <h2 className="text-2xl font-bold text-red-400 mb-4">🚀 CHÍNH THỨC MỞ SERVER</h2>
                  <p className="text-gray-300 mb-4">
                    Chúng tôi vui mừng thông báo rằng server MuDauTruongSS1.net đã chính thức mở cửa!
                  </p>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">25/09/2024</div>
                    <div className="text-xl text-blue-300">20:00 (GMT+7)</div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">🎉 Sự Kiện Khai Trương</h2>
                <p className="text-gray-300 mb-6">
                  Để chào mừng server mở cửa, chúng tôi sẽ tổ chức nhiều sự kiện đặc biệt:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-green-800/30 rounded-lg p-6 border border-green-500/30">
                    <h3 className="text-xl font-bold text-green-400 mb-4">🎁 Quà Tặng Khai Trương</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• 1,000 Zen cho tài khoản mới</li>
                      <li>• Set items cấp 1</li>
                      <li>• 3 ngày VIP miễn phí</li>
                      <li>• Pet hỗ trợ leveling</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-800/30 rounded-lg p-6 border border-blue-500/30">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">⚡ Event Đặc Biệt</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Triple EXP trong 7 ngày đầu</li>
                      <li>• Double Drop Rate</li>
                      <li>• Free reset không giới hạn</li>
                      <li>• PK không mất items</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">📋 Hướng Dẫn Bắt Đầu</h2>
                <p className="text-gray-300 mb-6">
                  Để bắt đầu chơi trên server mới, hãy làm theo các bước sau:
                </p>
                
                <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Tải Game</h3>
                        <p className="text-gray-300">Tải xuống client và launcher từ trang download</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Đăng Ký Tài Khoản</h3>
                        <p className="text-gray-300">Tạo tài khoản mới trên website</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Tạo Nhân Vật</h3>
                        <p className="text-gray-300">Chọn class và tạo nhân vật đầu tiên</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Bắt Đầu Chơi</h3>
                        <p className="text-gray-300">Tham gia vào thế giới Mu Online!</p>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">🏆 Giải Đấu Khai Trương</h2>
                <p className="text-gray-300 mb-6">
                  Để chào mừng server mở cửa, chúng tôi sẽ tổ chức giải đấu đặc biệt:
                </p>
                
                <div className="bg-yellow-800/30 rounded-lg p-6 mb-8 border border-yellow-500/30">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4">🥇 Giải Đấu Level Race</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-300 mb-4">Thời gian: 25/09 - 02/10/2024</p>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Thi đua level nhanh nhất</li>
                        <li>• Phần thưởng lớn cho top 10</li>
                        <li>• Không giới hạn reset</li>
                        <li>• Hỗ trợ từ admin</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-gray-300 mb-4">Phần thưởng:</p>
                      <ul className="text-gray-300 space-y-2">
                        <li>• 🥇 Hạng 1: 50,000 Zen + Wing</li>
                        <li>• 🥈 Hạng 2: 30,000 Zen + Ring</li>
                        <li>• 🥉 Hạng 3: 20,000 Zen + Pendant</li>
                        <li>• 🎁 Top 10: 10,000 Zen</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">📞 Hỗ Trợ & Liên Hệ</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-800/30 rounded-lg p-6 border border-blue-500/30">
                    <h3 className="text-lg font-bold text-blue-400 mb-3">💬 Discord</h3>
                    <p className="text-gray-300 text-sm">Tham gia Discord để nhận hỗ trợ 24/7</p>
                  </div>
                  
                  <div className="bg-green-800/30 rounded-lg p-6 border border-green-500/30">
                    <h3 className="text-lg font-bold text-green-400 mb-3">📱 Zalo</h3>
                    <p className="text-gray-300 text-sm">Liên hệ qua Zalo để được hỗ trợ nhanh</p>
                  </div>
                  
                  <div className="bg-purple-800/30 rounded-lg p-6 border border-purple-500/30">
                    <h3 className="text-lg font-bold text-purple-400 mb-3">📧 Email</h3>
                    <p className="text-gray-300 text-sm">Gửi email để được hỗ trợ chuyên nghiệp</p>
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
                      MuDauTruongSS1.net
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
                    <Image src="/facebook.webp" alt="Facebook" width={20} height={20} />
                  </a>
                  <a href="#" className="social-link">
                    <Image src="/tiktok.webp" alt="TikTok" width={20} height={20} />
                  </a>
                  <a href="#" className="social-link">
                    <Image src="/zalo.webp" alt="Zalo" width={20} height={20} />
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
                    <span className="text-blue-400">Server:</span> MuDauTruongSS1.net
                  </div>
                  <div className="text-gray-300">
                    <span className="text-blue-400">Season:</span> Season 1
                  </div>
                  <div className="text-gray-300">
                    <span className="text-blue-400">Online:</span> 24/7
                  </div>
                  <div className="text-gray-300">
                    <span className="text-blue-400">Website:</span> MuDauTruongSS1.net
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-gray-400 text-sm mb-4 md:mb-0">
                  © 2024 MuDauTruongSS1.net. All rights reserved.
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
