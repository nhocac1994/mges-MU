import Link from 'next/link';
import Image from 'next/image';

export default function Donate() {
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
              <Link href="/donate" className="text-blue-300 font-bold hover:text-blue-200 transition-colors relative z-10 px-4 py-2 rounded hover:bg-blue-500/10">
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
          <h1 className="text-5xl font-bold text-white mb-4">💎 ỦNG HỘ SERVER</h1>
          <p className="text-xl text-blue-300">Hỗ trợ server phát triển và duy trì hoạt động</p>
        </div>
      </section>

      {/* Donate Packages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">💰 CÁC GÓI ỦNG HỘ SERVER</h2>
              <p className="text-xl text-blue-300">Chọn gói ủng hộ phù hợp với bạn</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Package 1 */}
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-green-500/30 hover-lift transition-all duration-300 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/20">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">💎</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Gói Chaos</h3>
                  <div className="text-3xl font-bold text-green-400 mb-2">12.000đ</div>
                  <p className="text-gray-300">/ 1 Chaos</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    <span className="text-white">Nhận ngay 1 Chaos</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    <span className="text-white">Sử dụng để up đồ</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    <span className="text-white">Tỷ lệ thành công cao</span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-6 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300">
                  Chọn Gói Này
                </button>
              </div>

              {/* Package 2 */}
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-yellow-500/30 hover-lift transition-all duration-300 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-500/20 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    PHỔ BIẾN
                  </span>
                </div>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">👑</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Gold Member</h3>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">100.000đ</div>
                  <p className="text-gray-300">/ 30 ngày</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    <span className="text-white">Tăng 5% tỷ lệ up đồ</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    <span className="text-white">Up đồ +10/+11/+12/+13</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    <span className="text-white">Thời hạn 30 ngày</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    <span className="text-white">Ưu đãi đặc biệt</span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300">
                  Chọn Gói Này
                </button>
              </div>

              {/* Package 3 */}
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-blue-500/30 hover-lift transition-all duration-300 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">❤️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Gói Life</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-2">500đ</div>
                  <p className="text-gray-300">/ 1 Life</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    <span className="text-white">Nhận ngay 1 Life</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    <span className="text-white">Hồi sinh khi chết</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    <span className="text-white">Giá rẻ nhất</span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
                  Chọn Gói Này
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Information */}
      <section className="py-16 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-white mb-12">💳 THÔNG TIN CHUYỂN KHOẢN</h2>
            
            <div className="flex justify-center">
              <div className="w-full max-w-[800px]">
                {/* Bank Transfer */}
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-blue-500/30">
                  <h3 className="text-2xl font-bold text-white mb-6">🏦 CHUYỂN KHOẢN NGÂN HÀNG</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-2">Số tài khoản:</div>
                      <div className="text-lg font-bold text-white">0356673016</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-2">Chủ tài khoản:</div>
                      <div className="text-lg font-bold text-white">NGUYEN CANH QUYEN</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-2">Ngân hàng:</div>
                      <div className="text-lg font-bold text-white">MB-BANK</div>
                    </div>
                    <div className="text-center">
                      <Image 
                        src="/qrcode.jpeg" 
                        alt="QR Code" 
                        width={200} 
                        height={200}
                        className="mx-auto rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="mt-8 bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4">📝 HƯỚNG DẪN THANH TOÁN</h3>
                  <div className="text-white space-y-2">
                    <p>1. Chọn gói ủng hộ phù hợp</p>
                    <p>2. Chuyển khoản theo thông tin trên</p>
                    <p>3. Ghi nội dung: &quot;Tên Tài Khoản + Gói ủng hộ&quot;</p>
                    <p>4. Gửi bill cho Admin qua Zalo: 0819.402.668</p>
                    <p>5. Chờ Admin xử lý và cấp phần thưởng</p>
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
