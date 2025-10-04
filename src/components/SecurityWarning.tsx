'use client';

import { useState, useEffect } from 'react';

const SecurityWarning = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    // Kiểm tra URL parameters cho các dấu hiệu tấn công
    const urlParams = new URLSearchParams(window.location.search);
    const securityBlocked = urlParams.get('security');
    
    if (securityBlocked === 'blocked') {
      setWarningMessage('Phát hiện hoạt động đáng ngờ! Trang web đã được bảo vệ.');
      setShowWarning(true);
    }

    // Kiểm tra console cho các dấu hiệu tấn công
    const originalConsoleWarn = console.warn;
    console.warn = function(...args: unknown[]) {
      const message = args.join(' ');
      if (message.includes('Blocked') || message.includes('Suspicious')) {
        setWarningMessage('Hệ thống bảo mật đã ngăn chặn một cuộc tấn công tiềm ẩn.');
        setShowWarning(true);
      }
      return originalConsoleWarn.apply(console, args);
    };

    // Kiểm tra iframe hijacking
    if (window.top !== window.self) {
      setWarningMessage('Cảnh báo: Trang web đang được tải trong iframe. Đây có thể là cuộc tấn công clickjacking.');
      setShowWarning(true);
    }

  }, []);

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 bg-red-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-red-800 border-2 border-red-600 rounded-lg p-8 max-w-md text-center">
        <div className="text-6xl mb-4">🛡️</div>
        <h2 className="text-2xl font-bold text-white mb-4">CẢNH BÁO BẢO MẬT</h2>
        <p className="text-red-200 mb-6">{warningMessage}</p>
        <div className="space-y-3">
          <button
            onClick={() => setShowWarning(false)}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Tôi hiểu và tiếp tục
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityWarning;
