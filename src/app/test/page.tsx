'use client';

import { useState } from 'react';

export default function TestPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-connection');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ success: false, message: 'Lỗi kết nối' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">🧪 Test Server</h1>
        
        <div className="bg-black/50 rounded-lg p-6">
          <button
            onClick={testConnection}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            {loading ? 'Đang test...' : 'Test Kết Nối Server'}
          </button>

          {result && (
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                {result.success ? '✅ THÀNH CÔNG' : '❌ THẤT BẠI'}
              </h3>
              <p className="text-gray-300">{result.message}</p>
              {result.timestamp && (
                <p className="text-sm text-gray-400 mt-2">
                  Thời gian: {new Date(result.timestamp).toLocaleString('vi-VN')}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-blue-400 hover:text-blue-300">
            ← Về trang chủ
          </a>
        </div>
      </div>
    </div>
  );
}
