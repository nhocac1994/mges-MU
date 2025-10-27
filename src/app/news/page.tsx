import Link from 'next/link';
import Image from 'next/image';

export default function News() {
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
              <Link href="/rankings" className="text-white font-bold hover:text-blue-300 transition-colors relative z-10 px-4 py-2 rounded hover:bg-blue-500/10">
                XẾP HẠNG
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

      {/* Footer */}
      <footer className="bg-gradient-to-b from-black/90 to-black backdrop-blur-sm border-t border-blue-500/30 py-12 mt-12">
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
      </div>
    </div>
  );
}
