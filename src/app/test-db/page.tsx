'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TestDatabase() {
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-db');
      const data = await response.json();
      setResult(data);
    } catch {
      setResult({ success: false, message: 'Lỗi kết nối API' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('/logoweb.jpg')"
        }}
      />
      
      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center text-white mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              TEST DATABASE CONNECTION
            </h1>
            <p className="text-lg text-gray-300">
              Kiểm tra kết nối đến SQL Server
            </p>
          </div>

          <div className="bg-black bg-opacity-70 rounded-lg p-8">
            <div className="text-center mb-8">
              <button
                onClick={testConnection}
                disabled={loading}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-8 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all disabled:opacity-50"
              >
                {loading ? 'Đang kiểm tra...' : 'TEST KẾT NỐI DATABASE'}
              </button>
            </div>

            {result && (
              <div className={`p-6 rounded-lg ${
                result.success 
                  ? 'bg-green-900 bg-opacity-50 border border-green-500' 
                  : 'bg-red-900 bg-opacity-50 border border-red-500'
              }`}>
                <h3 className={`text-xl font-bold mb-4 ${
                  result.success ? 'text-green-400' : 'text-red-400'
                }`}>
                  {result.success ? '✅ KẾT NỐI THÀNH CÔNG' : '❌ KẾT NỐI THẤT BẠI'}
                </h3>
                <p className="text-white">{result.message}</p>
                
                {result.success && (
        <div className="mt-4 text-sm text-gray-300">
          <p>Server: [Hidden for security]</p>
          <p>Database: [Hidden for security]</p>
          <p>Port: [Hidden for security]</p>
        </div>
                )}
              </div>
            )}

            <div className="mt-8 text-center">
              <Link 
                href="/" 
                className="text-yellow-400 hover:text-yellow-300"
              >
                ← Quay lại trang chủ
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
