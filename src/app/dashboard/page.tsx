'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Dashboard() {
  const [user, setUser] = useState<{memb___id: string; memb_name: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra session/token ở đây
    const checkAuth = async () => {
      try {
        // TODO: Kiểm tra JWT token từ localStorage hoặc cookie
        const token = localStorage.getItem('auth_token');
        if (!token) {
          router.push('/login');
          return;
        }
        
        // TODO: Verify token với server
        // const response = await fetch('/api/verify-token', {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        
        // Tạm thời set user data
        setUser({
          memb___id: 'testuser6',
          memb_name: 'TestChar6'
        });
        setLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/80 to-purple-900/80 backdrop-blur-sm border-b border-blue-500/30">
        <div className="max-w-6xl mx-auto px-5 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Image src="/icon.jpg" alt="Mu Online Logo" width={40} height={40} className="rounded-lg"/>
              <div>
                <h1 className="text-lg font-bold text-white">MuDauTruongSS1.Net</h1>
                <p className="text-blue-300 text-xs">Đấu Trường SS1</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white text-sm">Xin chào, {user?.memb_name}</span>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-black/95 py-4 border-b-2 border-blue-400">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex justify-center">
            <div className="flex gap-8">
              <Link className="text-white font-bold hover:text-blue-300 transition-colors px-4 py-2 rounded hover:bg-blue-500/10" href="/">TRANG CHỦ</Link>
              <a className="text-white font-bold hover:text-blue-300 transition-colors px-4 py-2 rounded hover:bg-blue-500/10" href="/info">THÔNG TIN</a>
              <a className="text-white font-bold hover:text-blue-300 transition-colors px-4 py-2 rounded hover:bg-blue-500/10" href="/download">TẢI GAME</a>
              <a className="text-white font-bold hover:text-blue-300 transition-colors px-4 py-2 rounded hover:bg-blue-500/10" href="/donate">QUYÊN GÓP</a>
              <a className="text-white font-bold hover:text-blue-300 transition-colors px-4 py-2 rounded hover:bg-blue-500/10" href="/news">TIN TỨC</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-white mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              DASHBOARD
            </h1>
            <p className="text-xl text-gray-300">Chào mừng bạn đến với MuDauTruongSS1.Net</p>
          </div>

          {/* User Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-black bg-opacity-70 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Thông tin tài khoản</h3>
              <div className="space-y-2">
                <p className="text-white"><span className="text-gray-400">Tên đăng nhập:</span> {user?.memb___id}</p>
                <p className="text-white"><span className="text-gray-400">Tên nhân vật:</span> {user?.memb_name}</p>
              </div>
            </div>

            <div className="bg-black bg-opacity-70 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Trạng thái game</h3>
              <div className="space-y-2">
                <p className="text-white"><span className="text-gray-400">Server:</span> <span className="text-green-400">Online</span></p>
                <p className="text-white"><span className="text-gray-400">Cấp độ:</span> 1</p>
                <p className="text-white"><span className="text-gray-400">Kinh nghiệm:</span> 0/100</p>
              </div>
            </div>

            <div className="bg-black bg-opacity-70 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Thống kê</h3>
              <div className="space-y-2">
                <p className="text-white"><span className="text-gray-400">Thời gian chơi:</span> 0 giờ</p>
                <p className="text-white"><span className="text-gray-400">Số lần đăng nhập:</span> 1</p>
                <p className="text-white"><span className="text-gray-400">Lần cuối:</span> Hôm nay</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black bg-opacity-70 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Bắt đầu chơi</h3>
              <p className="text-gray-300 mb-6">Tải game và bắt đầu hành trình Mu Online</p>
              <a 
                href="/download" 
                className="bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold py-3 px-6 rounded-lg hover:from-yellow-600 hover:to-red-600 transition-all inline-block"
              >
                TẢI GAME NGAY
              </a>
            </div>

            <div className="bg-black bg-opacity-70 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Thông tin server</h3>
              <p className="text-gray-300 mb-6">Xem thông tin chi tiết về server và cài đặt</p>
              <a 
                href="/info" 
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all inline-block"
              >
                XEM THÔNG TIN
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/90 text-white py-12 mt-16">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center">
            <p className="text-gray-400 text-sm">© 2025 MuDauTruongSS1.Net. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
