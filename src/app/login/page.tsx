'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.username) newErrors.username = 'Tên đăng nhập là bắt buộc';
    if (!formData.password) newErrors.password = 'Mật khẩu là bắt buộc';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Đăng nhập thành công!');
        // Redirect to myaccount page
        window.location.href = '/myaccount';
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.');
    }
  };

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
                <Link href="/login" className="text-blue-300 text-sm font-medium px-4 py-1 rounded hover:text-blue-200 hover:bg-blue-500/10 transition-all">
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
                <Link href="/news" className="text-white font-bold hover:text-blue-300 transition-colors relative z-10 px-4 py-2 rounded hover:bg-blue-500/10">
                  TIN TỨC
                </Link>
              </div>
            </div>
          </div>
          {/* Navigation dot */}
          <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-5 h-5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
        </nav>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center text-white mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              ĐĂNG NHẬP
            </h1>
            <p className="text-lg text-gray-300">
              Đăng nhập vào tài khoản của bạn
            </p>
          </div>

          <div className="bg-black bg-opacity-70 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Tên đăng nhập *
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full p-3 bg-gray-800 border rounded-lg focus:outline-none ${
                    errors.username ? 'border-red-500' : 'border-gray-600 focus:border-yellow-400'
                  }`}
                  placeholder="Nhập tên đăng nhập"
                />
                {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Mật khẩu *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full p-3 bg-gray-800 border rounded-lg focus:outline-none ${
                    errors.password ? 'border-red-500' : 'border-gray-600 focus:border-yellow-400'
                  }`}
                  placeholder="Nhập mật khẩu"
                />
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
              </div>

              <div className="text-right">
                <Link href="#" className="text-yellow-400 hover:text-yellow-300 text-sm">
                  Quên mật khẩu?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold py-3 px-6 rounded-lg hover:from-yellow-600 hover:to-red-600 transition-all"
              >
                ĐĂNG NHẬP
              </button>

              <div className="text-center text-white">
                <p>
                  Chưa có tài khoản?{' '}
                  <Link href="/register" className="text-yellow-400 hover:text-yellow-300">
                    Đăng ký ngay
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

        {/* Footer */}
        <footer className="bg-black/90 text-white py-12 mt-16">
          <div className="max-w-6xl mx-auto px-5">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Logo và mô tả */}
              <div className="md:col-span-2">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-xl font-bold">MU</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">MuDauTruongSS1.Net</h3>
                    <p className="text-blue-300 text-sm">Đấu Trường SS1</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">
                  Server Mu Online Season 1 với tỷ lệ exp cao, drop rate tốt. 
                  Cộng đồng game thủ Việt Nam hàng đầu.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <img src="/facebook-logo.webp" alt="Facebook" width={24} height={24} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <img src="/tiktok-logo.webp" alt="TikTok" width={24} height={24} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <img src="/Zalo-icon.webp" alt="Zalo" width={24} height={24} />
                  </a>
                </div>
              </div>

              {/* Liên kết nhanh */}
              <div>
                <h4 className="text-lg font-bold text-white mb-4">Liên kết nhanh</h4>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors">Trang chủ</Link></li>
                  <li><Link href="/info" className="text-gray-300 hover:text-blue-400 transition-colors">Thông tin server</Link></li>
                  <li><Link href="/download" className="text-gray-300 hover:text-blue-400 transition-colors">Tải game</Link></li>
                  <li><Link href="/donate" className="text-gray-300 hover:text-blue-400 transition-colors">Ủng hộ server</Link></li>
                  <li><Link href="/news" className="text-gray-300 hover:text-blue-400 transition-colors">Tin tức</Link></li>
                </ul>
              </div>

              {/* Hỗ trợ */}
              <div>
                <h4 className="text-lg font-bold text-white mb-4">Hỗ trợ</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Điều khoản dịch vụ</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Chính sách bảo mật</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Liên hệ admin</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Hướng dẫn chơi</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-blue-400 transition-colors">FAQ</Link></li>
                </ul>
              </div>
            </div>

            {/* Bottom section */}
            <div className="border-t border-gray-700 mt-8 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm">
                  © 2025 MuDauTruongSS1.Net. Tất cả quyền được bảo lưu.
                </p>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <span className="text-green-400 text-sm">🟢 Server Online</span>
                  <span className="text-gray-400 text-sm">Version 1.0.0</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
