'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminConfig() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [config, setConfig] = useState({
    server: {
      port: 55777,
      name: 'MuOnline Server'
    },
    game: {
      expRate: 100,
      dropRate: 100,
      resetLevel: 400,
      maxReset: 100
    }
  });

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
        
        if (!accountId || userObj.AccountLevel < 11) {
          alert('Bạn không có quyền truy cập');
          router.push('/dashboard');
          return;
        }

        setUser(userObj);

        // Lấy config
        const response = await fetch(`/api/admin/config?accountId=${accountId}`);
        const result = await response.json();

        if (result.success && result.data) {
          setConfig(result.data);
        }

        setLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  const handleSave = async () => {
    if (!confirm('Bạn có chắc muốn lưu cấu hình này?')) {
      return;
    }

    try {
      setSaving(true);
      const accountId = user?.Username || user?.username || user?.memb___id;
      
      const response = await fetch(`/api/admin/config?accountId=${accountId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      const result = await response.json();
      if (result.success) {
        alert('Lưu cấu hình thành công!');
      } else {
        alert(result.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error saving config:', error);
      alert('Có lỗi xảy ra khi lưu cấu hình');
    } finally {
      setSaving(false);
    }
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
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Cấu Hình Server</h1>
            <p className="text-gray-300">Quản lý cấu hình game và server</p>
          </div>
          <Link href="/admin" className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
            ← Về Dashboard
          </Link>
        </div>

        <div className="bg-black bg-opacity-70 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Cấu Hình Server</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Port</label>
              <input
                type="number"
                value={config.server.port}
                onChange={(e) => setConfig({
                  ...config,
                  server: { ...config.server, port: parseInt(e.target.value) || 55777 }
                })}
                className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Tên Server</label>
              <input
                type="text"
                value={config.server.name}
                onChange={(e) => setConfig({
                  ...config,
                  server: { ...config.server, name: e.target.value }
                })}
                className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
              />
            </div>
          </div>
        </div>

        <div className="bg-black bg-opacity-70 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Cấu Hình Game</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Exp Rate (%)</label>
              <input
                type="number"
                value={config.game.expRate}
                onChange={(e) => setConfig({
                  ...config,
                  game: { ...config.game, expRate: parseInt(e.target.value) || 100 }
                })}
                className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Drop Rate (%)</label>
              <input
                type="number"
                value={config.game.dropRate}
                onChange={(e) => setConfig({
                  ...config,
                  game: { ...config.game, dropRate: parseInt(e.target.value) || 100 }
                })}
                className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Reset Level</label>
              <input
                type="number"
                value={config.game.resetLevel}
                onChange={(e) => setConfig({
                  ...config,
                  game: { ...config.game, resetLevel: parseInt(e.target.value) || 400 }
                })}
                className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Max Reset</label>
              <input
                type="number"
                value={config.game.maxReset}
                onChange={(e) => setConfig({
                  ...config,
                  game: { ...config.game, maxReset: parseInt(e.target.value) || 100 }
                })}
                className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/admin" className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg">
            Hủy
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg disabled:opacity-50"
          >
            {saving ? 'Đang lưu...' : 'Lưu Cấu Hình'}
          </button>
        </div>
      </div>
    </div>
  );
}

