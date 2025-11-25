'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface OverviewStats {
  totalAccounts: number;
  totalCharacters: number;
  onlineAccounts: number;
  newAccountsToday: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');
        
        if (!token || !userData) {
          router.push('/login');
          return;
        }

        const userObj = JSON.parse(userData);
        const accountId = userObj.Username || userObj.username || userObj.memb___id;
        
        if (!accountId) {
          router.push('/login');
          return;
        }

        setUser(userObj);

        // Kiểm tra quyền admin (AccountLevel >= 11)
        if (userObj.AccountLevel < 11) {
          alert('Bạn không có quyền truy cập Admin Panel');
          router.push('/dashboard');
          return;
        }

        // Lấy thống kê
        const response = await fetch(`/api/admin/stats/overview?accountId=${accountId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setStats(result.data);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-gray-300">Quản lý server và dữ liệu</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-black bg-opacity-70 rounded-lg p-6">
            <h3 className="text-gray-400 text-sm mb-2">Tổng số tài khoản</h3>
            <p className="text-3xl font-bold text-yellow-400">{stats?.totalAccounts || 0}</p>
          </div>
          <div className="bg-black bg-opacity-70 rounded-lg p-6">
            <h3 className="text-gray-400 text-sm mb-2">Tổng số nhân vật</h3>
            <p className="text-3xl font-bold text-blue-400">{stats?.totalCharacters || 0}</p>
          </div>
          <div className="bg-black bg-opacity-70 rounded-lg p-6">
            <h3 className="text-gray-400 text-sm mb-2">Đang online</h3>
            <p className="text-3xl font-bold text-green-400">{stats?.onlineAccounts || 0}</p>
          </div>
          <div className="bg-black bg-opacity-70 rounded-lg p-6">
            <h3 className="text-gray-400 text-sm mb-2">Đăng ký hôm nay</h3>
            <p className="text-3xl font-bold text-purple-400">{stats?.newAccountsToday || 0}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/config-files" className="bg-black bg-opacity-70 rounded-lg p-6 hover:bg-opacity-80 transition">
            <h3 className="text-xl font-bold text-white mb-2">📝 Quản Lý Config Files</h3>
            <p className="text-gray-400">Quản lý config.json, event.txt, urldownload.txt</p>
          </Link>

          <Link href="/admin/config" className="bg-black bg-opacity-70 rounded-lg p-6 hover:bg-opacity-80 transition">
            <h3 className="text-xl font-bold text-white mb-2">⚙️ Cấu Hình Server</h3>
            <p className="text-gray-400">Quản lý cấu hình game settings</p>
          </Link>

          <Link href="/admin/accounts" className="bg-black bg-opacity-70 rounded-lg p-6 hover:bg-opacity-80 transition">
            <h3 className="text-xl font-bold text-white mb-2">👥 Quản Lý Tài Khoản</h3>
            <p className="text-gray-400">Xem, block/unblock, reset password</p>
          </Link>

          <Link href="/admin/characters" className="bg-black bg-opacity-70 rounded-lg p-6 hover:bg-opacity-80 transition">
            <h3 className="text-xl font-bold text-white mb-2">🎮 Quản Lý Nhân Vật</h3>
            <p className="text-gray-400">Xem, chỉnh sửa nhân vật</p>
          </Link>

          <Link href="/admin/upload" className="bg-black bg-opacity-70 rounded-lg p-6 hover:bg-opacity-80 transition">
            <h3 className="text-xl font-bold text-white mb-2">📤 Upload Dữ Liệu</h3>
            <p className="text-gray-400">Tải dữ liệu lên server</p>
          </Link>

          <Link href="/admin/stats" className="bg-black bg-opacity-70 rounded-lg p-6 hover:bg-opacity-80 transition">
            <h3 className="text-xl font-bold text-white mb-2">📊 Thống Kê Chi Tiết</h3>
            <p className="text-gray-400">Xem thống kê và báo cáo</p>
          </Link>

          <Link href="/dashboard" className="bg-black bg-opacity-70 rounded-lg p-6 hover:bg-opacity-80 transition">
            <h3 className="text-xl font-bold text-white mb-2">🏠 Về Dashboard</h3>
            <p className="text-gray-400">Quay lại dashboard người dùng</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

