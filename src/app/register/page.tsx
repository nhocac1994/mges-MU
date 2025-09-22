'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    characterName: '',
    email: '',
    phone: '',
    securityQuestion: '',
    securityAnswer: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [successData, setSuccessData] = useState<{
    username: string;
    characterName: string;
    email: string;
    phone: string;
    securityQuestion: string;
    securityAnswer: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    if (formData.username.length < 3) newErrors.username = 'Tên đăng nhập phải có ít nhất 3 ký tự';
    
    if (!formData.password) newErrors.password = 'Mật khẩu là bắt buộc';
    if (formData.password.length < 6) newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    
    if (!formData.characterName) newErrors.characterName = 'Tên nhân vật là bắt buộc';
    if (!formData.email) newErrors.email = 'Email là bắt buộc';
    if (!formData.phone) newErrors.phone = 'Số điện thoại là bắt buộc';
    if (!formData.securityQuestion) newErrors.securityQuestion = 'Câu hỏi bảo mật là bắt buộc';
    if (!formData.securityAnswer) newErrors.securityAnswer = 'Câu trả lời bảo mật là bắt buộc';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        // Lưu thông tin thành công và hiển thị
        setSuccessData(formData);
        setIsSuccess(true);
        // Reset form
        setFormData({
          username: '',
          password: '',
          confirmPassword: '',
          characterName: '',
          email: '',
          phone: '',
          securityQuestion: '',
          securityAnswer: ''
        });
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.');
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
                <Link href="/register" className="text-blue-300 text-sm font-medium px-4 py-1 rounded hover:text-blue-200 hover:bg-blue-500/10 transition-all">
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-white mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              ĐĂNG KÝ TÀI KHOẢN
            </h1>
            <p className="text-xl text-gray-300">
              Tạo tài khoản mới để bắt đầu hành trình Mu Online
            </p>
          </div>

          {/* Success Message */}
          {isSuccess && successData && (
            <div className="mb-8 bg-green-900/20 border border-green-500/30 rounded-lg p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">✅</span>
                </div>
                <h2 className="text-3xl font-bold text-green-400 mb-2">ĐĂNG KÝ THÀNH CÔNG!</h2>
                <p className="text-green-300">Tài khoản của bạn đã được tạo thành công</p>
              </div>

              <div className="bg-black/50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 text-center">📋 THÔNG TIN TÀI KHOẢN</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Tên đăng nhập:</div>
                      <div className="text-lg font-bold text-white">{successData.username}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Tên nhân vật:</div>
                      <div className="text-lg font-bold text-white">{successData.characterName}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Email:</div>
                      <div className="text-lg font-bold text-white">{successData.email}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Số điện thoại:</div>
                      <div className="text-lg font-bold text-white">{successData.phone}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Câu hỏi bảo mật:</div>
                      <div className="text-lg font-bold text-white">
                        {successData.securityQuestion === 'pet' && 'Tên thú cưng đầu tiên của bạn?'}
                        {successData.securityQuestion === 'school' && 'Tên trường tiểu học của bạn?'}
                        {successData.securityQuestion === 'city' && 'Thành phố bạn sinh ra?'}
                        {successData.securityQuestion === 'food' && 'Món ăn yêu thích của bạn?'}
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Trạng thái:</div>
                      <div className="text-lg font-bold text-green-400">✅ Tài khoản đã kích hoạt</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <h4 className="text-lg font-bold text-blue-400 mb-2">🎮 BƯỚC TIẾP THEO</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Tải game client từ trang <Link href="/download" className="text-blue-400 hover:text-blue-300">TẢI GAME</Link></li>
                    <li>• Đăng nhập với thông tin tài khoản trên</li>
                    <li>• Bắt đầu hành trình Mu Online Season 1</li>
                    <li>• Tham gia cộng đồng game thủ Việt Nam</li>
                  </ul>
                </div>

                <div className="text-center mt-6">
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all mr-4"
                  >
                    ĐĂNG KÝ TÀI KHOẢN KHÁC
                  </button>
                  <Link
                    href="/login"
                    className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-6 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all"
                  >
                    ĐĂNG NHẬP NGAY
                  </Link>
                </div>
              </div>
            </div>
          )}

          {!isSuccess && (
            <div className="bg-black bg-opacity-70 rounded-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
              {/* Thông tin tài khoản */}
              <div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-6">Thông tin tài khoản</h3>
                <div className="grid md:grid-cols-2 gap-6">
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

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Xác nhận mật khẩu *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full p-3 bg-gray-800 border rounded-lg focus:outline-none ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-600 focus:border-yellow-400'
                      }`}
                      placeholder="Nhập lại mật khẩu"
                    />
                    {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Tên nhân vật *
                    </label>
                    <input
                      type="text"
                      name="characterName"
                      value={formData.characterName}
                      onChange={handleInputChange}
                      className={`w-full p-3 bg-gray-800 border rounded-lg focus:outline-none ${
                        errors.characterName ? 'border-red-500' : 'border-gray-600 focus:border-yellow-400'
                      }`}
                      placeholder="Nhập tên nhân vật"
                    />
                    {errors.characterName && <p className="text-red-400 text-sm mt-1">{errors.characterName}</p>}
                  </div>
                </div>
              </div>

              {/* Thông tin cá nhân */}
              <div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-6">Thông tin cá nhân</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-3 bg-gray-800 border rounded-lg focus:outline-none ${
                        errors.email ? 'border-red-500' : 'border-gray-600 focus:border-yellow-400'
                      }`}
                      placeholder="Nhập email"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full p-3 bg-gray-800 border rounded-lg focus:outline-none ${
                        errors.phone ? 'border-red-500' : 'border-gray-600 focus:border-yellow-400'
                      }`}
                      placeholder="Nhập số điện thoại"
                    />
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Bảo mật */}
              <div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-6">Bảo mật</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Câu hỏi bảo mật *
                    </label>
                    <select
                      name="securityQuestion"
                      value={formData.securityQuestion}
                      onChange={handleInputChange}
                      className={`w-full p-3 bg-gray-800 border rounded-lg focus:outline-none ${
                        errors.securityQuestion ? 'border-red-500' : 'border-gray-600 focus:border-yellow-400'
                      }`}
                    >
                      <option value="">Chọn câu hỏi bảo mật</option>
                      <option value="pet">Tên thú cưng đầu tiên của bạn?</option>
                      <option value="school">Tên trường tiểu học của bạn?</option>
                      <option value="city">Thành phố bạn sinh ra?</option>
                      <option value="food">Món ăn yêu thích của bạn?</option>
                    </select>
                    {errors.securityQuestion && <p className="text-red-400 text-sm mt-1">{errors.securityQuestion}</p>}
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Câu trả lời *
                    </label>
                    <input
                      type="text"
                      name="securityAnswer"
                      value={formData.securityAnswer}
                      onChange={handleInputChange}
                      className={`w-full p-3 bg-gray-800 border rounded-lg focus:outline-none ${
                        errors.securityAnswer ? 'border-red-500' : 'border-gray-600 focus:border-yellow-400'
                      }`}
                      placeholder="Nhập câu trả lời"
                    />
                    {errors.securityAnswer && <p className="text-red-400 text-sm mt-1">{errors.securityAnswer}</p>}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold py-4 px-8 rounded-lg hover:from-yellow-600 hover:to-red-600 transition-all text-lg"
                >
                  TẠO TÀI KHOẢN
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center text-white">
                <p>
                  Đã có tài khoản?{' '}
                  <Link href="/login" className="text-yellow-400 hover:text-yellow-300">
                    Đăng nhập ngay
                  </Link>
                </p>
              </div>
              </form>
            </div>
          )}
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
