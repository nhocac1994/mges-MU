'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SimpleCaptcha from '@/components/SimpleCaptcha';
import NetworkOverlay from '@/components/NetworkOverlay';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [captchaValid, setCaptchaValid] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrollY(scrollTop);
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        // Store user data in localStorage
        localStorage.setItem('auth_token', 'temp_token_' + Date.now());
        localStorage.setItem('user_data', JSON.stringify(result.data));
        
        // Redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      fontFamily: 'Roboto, sans-serif'
    }}>
      {/* Network Overlay - Luôn chạy trên background */}
      <NetworkOverlay />
      
      {/* Background Image - Desktop Only */}
      {isClient && (
        <>
          <div 
            className="hidden md:block fixed inset-0 bg-cover bg-center bg-no-repeat"
            // style={{
            //   backgroundImage: 'url(/logoweb.jpg)',
            //   backgroundAttachment: 'fixed'
            // }}
          ></div>
          
          {/* Mobile Background - Simple gradient */}
          <div className="md:hidden fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
        </>
      )}
      
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10 pt-28">
        {/* Main Content */}
        <main className="relative z-10 py-8">
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
                  className={`w-full p-3 bg-gray-800 text-white border rounded-lg focus:outline-none ${
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
                  className={`w-full p-3 bg-gray-800 text-white border rounded-lg focus:outline-none ${
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

              {/* CAPTCHA */}
              <SimpleCaptcha onVerify={setCaptchaValid} />

              <button
                type="submit"
                disabled={!captchaValid}
                className={`w-full font-bold py-3 px-6 rounded-lg transition-all ${
                  captchaValid 
                    ? 'bg-gradient-to-r from-yellow-500 to-red-500 text-white hover:from-yellow-600 hover:to-red-600' 
                    : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                }`}
              >
                {captchaValid ? 'ĐĂNG NHẬP' : 'VUI LÒNG XÁC THỰC CAPTCHA'}
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
      </div>
    </div>
  );
}
