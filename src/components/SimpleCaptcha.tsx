'use client';

import { useState, useEffect, useCallback } from 'react';

interface SimpleCaptchaProps {
  onVerify: (isValid: boolean) => void;
}

export default function SimpleCaptcha({ onVerify }: SimpleCaptchaProps) {
  const [captcha, setCaptcha] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isValid, setIsValid] = useState(false);

  const generateCaptcha = useCallback(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
    setUserInput('');
    setIsValid(false);
    onVerify(false);
  }, [onVerify]);

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setUserInput(value);
    const valid = value === captcha;
    setIsValid(valid);
    onVerify(valid);
  };

  const handleRefresh = () => {
    generateCaptcha();
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <label className="block text-white font-semibold mb-2">Mã xác thực *</label>
      <div className="flex items-center space-x-4">
        <div className="bg-white p-2 rounded text-black font-bold text-lg tracking-widest min-w-[120px] text-center">
          {captcha}
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm"
        >
          🔄
        </button>
      </div>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Nhập mã xác thực"
        className="w-full mt-3 p-3 bg-gray-700 border rounded-lg focus:outline-none border-gray-600 focus:border-yellow-400 text-white"
        maxLength={5}
      />
      {userInput && !isValid && (
        <p className="text-red-400 text-sm mt-1">Mã xác thực không đúng</p>
      )}
      {isValid && (
        <p className="text-green-400 text-sm mt-1">✓ Mã xác thực đúng</p>
      )}
    </div>
  );
}
