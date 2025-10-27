// Script để cập nhật footer cho tất cả các trang
// Chạy từng lệnh này để cập nhật footer

const footerTemplate = `
      <footer className="bg-black/90 text-white py-12 mt-16">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Server Information */}
            <div className="flex flex-col items-start">
              <div className="flex items-center space-x-3 mb-4">
                <Image 
                  src="/icon.jpg" 
                  alt="Mu Logo" 
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded"
                />
                <div>
                  <h3 className="text-white font-bold text-lg">MuDauTruongSS1.Net</h3>
                  <p className="text-gray-300 text-sm">033.77.14.654</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Server Mu Online Season 1 chuyên nghiệp với hệ thống game ổn định, cộng đồng sôi động và sự kiện thường xuyên.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Liên Kết
              </h3>
              <ul className="space-y-2">
                <li><Link href="/info" className="text-gray-300 hover:text-blue-300 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                  Thông Tin Server
                </Link></li>
                <li><Link href="/download" className="text-gray-300 hover:text-blue-300 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                  Tải Game
                </Link></li>
                <li><Link href="/donate" className="text-gray-300 hover:text-blue-300 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                  Ủng Hộ Server
                </Link></li>
                <li><Link href="/news" className="text-gray-300 hover:text-blue-300 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                  Tin Tức
                </Link></li>
                <li><Link href="/rankings" className="text-gray-300 hover:text-blue-300 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                  Bảng Xếp Hạng
                </Link></li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                Mạng Xã Hội
              </h3>
              <div className="flex space-x-3 mb-4">
                <a href="#" className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <span className="text-white font-bold text-sm">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-pink-500 rounded flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <span className="text-white font-bold text-sm">♪</span>
                </a>
                <a href="#" className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="text-white font-bold text-xs">Zalo</span>
                </a>
              </div>
              <p className="text-gray-300 text-sm">
                Theo dõi chúng tôi để cập nhật tin tức mới nhất
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <Image 
                  src="/icon.jpg" 
                  alt="Mu Logo" 
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded"
                />
                <span className="text-gray-400 text-sm">© 2025 MuDauTruongSS1.Net. Tất cả quyền được bảo lưu.</span>
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
`;

console.log('Footer template ready for copy-paste to all pages');
console.log('Pages to update:');
console.log('- rankings/page.tsx');
console.log('- info/page.tsx'); 
console.log('- download/page.tsx');
console.log('- donate/page.tsx');
console.log('- news/page.tsx');
console.log('- login/page.tsx');
console.log('- register/page.tsx');
