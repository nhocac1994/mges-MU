'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SimpleCaptcha from '@/components/SimpleCaptcha';
import NetworkOverlay from '@/components/NetworkOverlay';
import FloatingParticles from '@/components/FloatingParticles';
import AnimatedSection from '@/components/AnimatedSection';
import { useConfig } from '@/contexts/ConfigContext';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [captchaValid, setCaptchaValid] = useState(false);
  const { config } = useConfig();

  // Đảm bảo config có giá trị
  if (!config) {
    return null;
  }

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

      alert('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      fontFamily: 'Roboto, sans-serif'
    }}>
      {/* Network Overlay - Luôn chạy trên background */}
      <NetworkOverlay />
      
      {/* Floating Particles Background */}
      <FloatingParticles count={25} />
      
      {/* Background Image - Desktop Only */}
      <div 
        className="hidden md:block fixed inset-0 bg-cover bg-center bg-no-repeat"
        // style={{
        //   backgroundImage: 'url(/logoweb.jpg)',
        //   backgroundAttachment: 'fixed'
        // }}
      ></div>
      
      {/* Mobile Background - Simple gradient */}
      <div className="md:hidden fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
      
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10 pt-28">
        {/* Main Content */}
        <main className="relative z-10 py-8">
          {/* Page Header - Classic MU Style */}
          <section className="py-20 bg-gradient-to-b from-black/40 to-black/60 relative overflow-hidden mb-8">
            {/* Background Effects */}
            <div className="absolute inset-0">
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            
            <div className="container mx-auto px-4 text-center relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.h1 
                  className="text-6xl font-black text-white mb-4 relative"
                  style={{ fontFamily: 'Arial, sans-serif', textShadow: '0 0 20px rgba(234, 179, 8, 0.5)' }}
                >
                  <span 
                    className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mu-text-glow"
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    ĐĂNG NHẬP
                  </span>
                  {/* Glow Effect */}
                  <motion.div 
                    className="absolute inset-0 text-6xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent blur-sm opacity-50"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    ĐĂNG NHẬP
                  </motion.div>
                </motion.h1>
                <AnimatedSection direction="up" delay={0.2}>
                  <div className="text-2xl font-semibold text-blue-300 mb-4">
                    <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                      Đăng nhập vào tài khoản {config.nameGame}
                    </span>
                  </div>
                </AnimatedSection>
              </motion.div>
            </div>
          </section>

        <div className="max-w-md mx-auto px-4">
          <AnimatedSection direction="up" delay={0.3}>
            <div className="relative">
              <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
              <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-8">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { name: 'username', label: 'Tên đăng nhập *', type: 'text', placeholder: 'Nhập tên đăng nhập' },
                    { name: 'password', label: 'Mật khẩu *', type: 'password', placeholder: 'Nhập mật khẩu' }
                  ].map((field, idx) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                    >
                      <label className="block text-yellow-400 font-semibold mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleInputChange}
                        className={`w-full p-3 bg-black/40 text-white border rounded-lg focus:outline-none transition-all ${
                          errors[field.name] ? 'border-red-500/60' : 'border-yellow-500/30 focus:border-yellow-400/60'
                        }`}
                        placeholder={field.placeholder}
                        style={{ fontFamily: 'Arial, sans-serif' }}
                      />
                      {errors[field.name] && (
                        <motion.p 
                          className="text-red-400 text-sm mt-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          style={{ fontFamily: 'Arial, sans-serif' }}
                        >
                          {errors[field.name]}
                        </motion.p>
                      )}
                    </motion.div>
                  ))}

                  <div className="text-right">
                    <Link href="#" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold transition-colors" style={{ fontFamily: 'Arial, sans-serif' }}>
                      Quên mật khẩu?
                    </Link>
                  </div>

                  {/* CAPTCHA */}
                  <AnimatedSection direction="up" delay={0.5}>
                    <SimpleCaptcha onVerify={setCaptchaValid} />
                  </AnimatedSection>

                  <AnimatedSection direction="up" delay={0.6}>
                    <motion.button
                      type="submit"
                      disabled={!captchaValid}
                      className={`w-full font-bold py-3 px-6 rounded-lg transition-all ${
                        captchaValid 
                          ? 'bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border border-yellow-500/60 text-yellow-300 mu-button-glow' 
                          : 'bg-gray-500/30 text-gray-300 cursor-not-allowed border border-gray-500/30'
                      }`}
                      style={{ fontFamily: 'Arial, sans-serif' }}
                      whileHover={captchaValid ? { scale: 1.02 } : {}}
                      whileTap={captchaValid ? { scale: 0.98 } : {}}
                    >
                      {captchaValid ? 'ĐĂNG NHẬP' : 'VUI LÒNG XÁC THỰC CAPTCHA'}
                    </motion.button>
                  </AnimatedSection>

                  <AnimatedSection direction="up" delay={0.7}>
                    <div className="text-center text-white">
                      <p style={{ fontFamily: 'Arial, sans-serif' }}>
                        Chưa có tài khoản?{' '}
                        <Link href="/register" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
                          Đăng ký ngay
                        </Link>
                      </p>
                    </div>
                  </AnimatedSection>
                </form>
              </div>
            </div>
          </AnimatedSection>
        </div>
        </main>
      </div>
    </div>
  );
}
