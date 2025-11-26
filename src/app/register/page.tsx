'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SimpleCaptcha from '@/components/SimpleCaptcha';
import NetworkOverlay from '@/components/NetworkOverlay';
import FloatingParticles from '@/components/FloatingParticles';
import AnimatedSection from '@/components/AnimatedSection';
import { useConfig } from '@/contexts/ConfigContext';

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
  const [captchaValid, setCaptchaValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [successData, setSuccessData] = useState<{
    username: string;
    characterName: string;
    email: string;
    phone: string;
    securityQuestion: string;
    securityAnswer: string;
  } | null>(null);
  const { config } = useConfig();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Đảm bảo config có giá trị
  if (!config) {
    return null;
  }

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

    setIsLoading(true);

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

      alert('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative ${isClient && window.innerWidth <= 768 ? '' : 'min-h-screen overflow-hidden'}`} style={{
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
          <section className="py-20 bg-gradient-to-b from-black/40 to-black/60 relative overflow-x-hidden md:overflow-hidden mb-8">
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
                    ĐĂNG KÝ TÀI KHOẢN
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
                    ĐĂNG KÝ TÀI KHOẢN
                  </motion.div>
                </motion.h1>
                <AnimatedSection direction="up" delay={0.2}>
                  <div className="text-2xl font-semibold text-blue-300 mb-4">
                    <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                      Tạo tài khoản mới để bắt đầu hành trình {config.nameGame}
                    </span>
                  </div>
                </AnimatedSection>
              </motion.div>
            </div>
          </section>

        <div className="max-w-4xl mx-auto px-4">

          {/* Success Message - Classic MU Style */}
          {isSuccess && successData && (
            <AnimatedSection direction="up" delay={0.1}>
              <div className="relative mb-8">
                <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
                <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-green-500/60 mu-modal-container rounded-lg p-8">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-green-500/60"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-green-500/60"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-green-500/60"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-green-500/60"></div>
                  <div className="text-center mb-6">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4 border-2 border-yellow-500/30"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                    >
                      <span className="text-white text-2xl">✅</span>
                    </motion.div>
                    <h2 className="text-3xl font-bold text-green-400 mb-2 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>ĐĂNG KÝ THÀNH CÔNG!</h2>
                    <p className="text-green-300" style={{ fontFamily: 'Arial, sans-serif' }}>Tài khoản của bạn đã được tạo thành công</p>
                  </div>

                  <div className="bg-black/50 rounded-lg p-6 border border-yellow-500/30">
                    <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>📋 THÔNG TIN TÀI KHOẢN</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        {[
                          { label: 'Tên đăng nhập:', value: successData.username },
                          { label: 'Tên nhân vật:', value: successData.characterName },
                          { label: 'Email:', value: successData.email }
                        ].map((item, idx) => (
                          <motion.div
                            key={idx}
                            className="relative bg-black/40 rounded-lg p-4 border border-yellow-500/30 mu-command-card"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + idx * 0.05 }}
                          >
                            {/* Corner decorations */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/50"></div>
                            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/50"></div>
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/50"></div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/50"></div>
                            
                            <div className="text-sm text-yellow-400 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>{item.label}</div>
                            <div className="text-lg font-bold text-white" style={{ fontFamily: 'Arial, sans-serif' }}>{item.value}</div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="space-y-4">
                        {[
                          { label: 'Số điện thoại:', value: successData.phone },
                          { 
                            label: 'Câu hỏi bảo mật:', 
                            value: successData.securityQuestion === 'pet' ? 'Tên thú cưng đầu tiên của bạn?' :
                                   successData.securityQuestion === 'school' ? 'Tên trường tiểu học của bạn?' :
                                   successData.securityQuestion === 'city' ? 'Thành phố bạn sinh ra?' :
                                   'Món ăn yêu thích của bạn?'
                          },
                          { label: 'Trạng thái:', value: '✅ Tài khoản đã kích hoạt', isStatus: true }
                        ].map((item, idx) => (
                          <motion.div
                            key={idx}
                            className="relative bg-black/40 rounded-lg p-4 border border-yellow-500/30 mu-command-card"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + idx * 0.05 }}
                          >
                            {/* Corner decorations */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/50"></div>
                            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/50"></div>
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/50"></div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/50"></div>
                            
                            <div className="text-sm text-yellow-400 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>{item.label}</div>
                            <div className={`text-lg font-bold ${item.isStatus ? 'text-green-400' : 'text-white'}`} style={{ fontFamily: 'Arial, sans-serif' }}>{item.value}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <motion.div 
                      className="mt-6 p-4 bg-black/40 rounded-lg border border-yellow-500/30"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4 className="text-lg font-bold text-yellow-400 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>🎮 BƯỚC TIẾP THEO</h4>
                      <ul className="text-gray-300 space-y-2">
                        {[
                          `Tải game client từ trang TẢI GAME`,
                          'Đăng nhập với thông tin tài khoản trên',
                          'Bắt đầu hành trình Mu Online Season 1',
                          'Tham gia cộng đồng game thủ Việt Nam'
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow" style={{animationDelay: `${idx * 0.2}s`}}></span>
                            <span>{item.includes('TẢI GAME') ? (
                              <>
                                Tải game client từ trang <Link href="/download" className="text-yellow-400 hover:text-yellow-300 font-semibold">TẢI GAME</Link>
                              </>
                            ) : item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    <div className="text-center mt-6">
                      <motion.button
                        onClick={() => setIsSuccess(false)}
                        className="bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border border-yellow-500/60 text-yellow-300 font-bold py-3 px-6 rounded-lg mu-button-glow mr-4"
                        style={{ fontFamily: 'Arial, sans-serif' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        ĐĂNG KÝ TÀI KHOẢN KHÁC
                      </motion.button>
                      <Link href="/login">
                        <motion.div
                          className="inline-block bg-gradient-to-r from-green-600/30 to-emerald-600/30 border border-green-500/60 text-green-300 font-bold py-3 px-6 rounded-lg mu-button-glow"
                          style={{ fontFamily: 'Arial, sans-serif' }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          ĐĂNG NHẬP NGAY
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}

          {!isSuccess && (
            <AnimatedSection direction="up" delay={0.1}>
              <div className="relative">
                <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
                <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-8">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Thông tin tài khoản */}
                  <AnimatedSection direction="up" delay={0.2}>
                    <div>
                      <h3 className="text-2xl font-bold text-yellow-400 mb-6 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>Thông tin tài khoản</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {[
                          { name: 'username', label: 'Tên đăng nhập *', type: 'text', placeholder: 'Nhập tên đăng nhập' },
                          { name: 'password', label: 'Mật khẩu *', type: 'password', placeholder: 'Nhập mật khẩu' },
                          { name: 'confirmPassword', label: 'Xác nhận mật khẩu *', type: 'password', placeholder: 'Nhập lại mật khẩu' },
                          { name: 'characterName', label: 'Tên nhân vật *', type: 'text', placeholder: 'Nhập tên nhân vật' }
                        ].map((field, idx) => (
                          <motion.div
                            key={field.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + idx * 0.05 }}
                          >
                            <label className="block text-yellow-400 font-semibold mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                              {field.label}
                            </label>
                            <div className="relative">
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
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* Thông tin cá nhân */}
                  <AnimatedSection direction="up" delay={0.3}>
                    <div>
                      <h3 className="text-2xl font-bold text-yellow-400 mb-6 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>Thông tin cá nhân</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {[
                          { name: 'email', label: 'Email *', type: 'email', placeholder: 'Nhập email' },
                          { name: 'phone', label: 'Số điện thoại *', type: 'tel', placeholder: 'Nhập số điện thoại' }
                        ].map((field, idx) => (
                          <motion.div
                            key={field.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + idx * 0.05 }}
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
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* Bảo mật */}
                  <AnimatedSection direction="up" delay={0.4}>
                    <div>
                      <h3 className="text-2xl font-bold text-yellow-400 mb-6 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>Bảo mật</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <label className="block text-yellow-400 font-semibold mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Câu hỏi bảo mật *
                          </label>
                          <select
                            name="securityQuestion"
                            value={formData.securityQuestion}
                            onChange={handleInputChange}
                            className={`w-full p-3 bg-black/40 text-white border rounded-lg focus:outline-none transition-all ${
                              errors.securityQuestion ? 'border-red-500/60' : 'border-yellow-500/30 focus:border-yellow-400/60'
                            }`}
                            style={{ fontFamily: 'Arial, sans-serif' }}
                          >
                            <option value="">Chọn câu hỏi bảo mật</option>
                            <option value="pet">Tên thú cưng đầu tiên của bạn?</option>
                            <option value="school">Tên trường tiểu học của bạn?</option>
                            <option value="city">Thành phố bạn sinh ra?</option>
                            <option value="food">Món ăn yêu thích của bạn?</option>
                          </select>
                          {errors.securityQuestion && (
                            <motion.p 
                              className="text-red-400 text-sm mt-1"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              style={{ fontFamily: 'Arial, sans-serif' }}
                            >
                              {errors.securityQuestion}
                            </motion.p>
                          )}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.45 }}
                        >
                          <label className="block text-yellow-400 font-semibold mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Câu trả lời *
                          </label>
                          <input
                            type="text"
                            name="securityAnswer"
                            value={formData.securityAnswer}
                            onChange={handleInputChange}
                            className={`w-full p-3 bg-black/40 text-white border rounded-lg focus:outline-none transition-all ${
                              errors.securityAnswer ? 'border-red-500/60' : 'border-yellow-500/30 focus:border-yellow-400/60'
                            }`}
                            placeholder="Nhập câu trả lời"
                            style={{ fontFamily: 'Arial, sans-serif' }}
                          />
                          {errors.securityAnswer && (
                            <motion.p 
                              className="text-red-400 text-sm mt-1"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              style={{ fontFamily: 'Arial, sans-serif' }}
                            >
                              {errors.securityAnswer}
                            </motion.p>
                          )}
                        </motion.div>
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* CAPTCHA */}
                  <AnimatedSection direction="up" delay={0.5}>
                    <div>
                      <h3 className="text-2xl font-bold text-yellow-400 mb-6 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>Xác thực bảo mật</h3>
                      <SimpleCaptcha onVerify={setCaptchaValid} />
                    </div>
                  </AnimatedSection>

                  {/* Submit Button */}
                  <AnimatedSection direction="up" delay={0.6}>
                    <div className="text-center">
                      <motion.button
                        type="submit"
                        disabled={!captchaValid || isLoading}
                        className={`font-bold py-4 px-8 rounded-lg transition-all text-lg flex items-center justify-center gap-3 mx-auto ${
                          captchaValid && !isLoading
                            ? 'bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border border-yellow-500/60 text-yellow-300 mu-button-glow' 
                            : 'bg-gray-500/30 text-gray-300 cursor-not-allowed border border-gray-500/30'
                        }`}
                        style={{ fontFamily: 'Arial, sans-serif' }}
                        whileHover={captchaValid && !isLoading ? { scale: 1.05 } : {}}
                        whileTap={captchaValid && !isLoading ? { scale: 0.95 } : {}}
                      >
                        {isLoading ? (
                          <>
                            <div className="loading-dots">
                              <span></span>
                              <span></span>
                              <span></span>
                            </div>
                            ĐANG XỬ LÝ...
                          </>
                        ) : captchaValid ? (
                          'TẠO TÀI KHOẢN'
                        ) : (
                          'VUI LÒNG XÁC THỰC CAPTCHA'
                        )}
                      </motion.button>
                    </div>
                  </AnimatedSection>

                  {/* Login Link */}
                  <AnimatedSection direction="up" delay={0.7}>
                    <div className="text-center text-white">
                      <p style={{ fontFamily: 'Arial, sans-serif' }}>
                        Đã có tài khoản?{' '}
                        <Link href="/login" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
                          Đăng nhập ngay
                        </Link>
                      </p>
                    </div>
                  </AnimatedSection>
                  </form>
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </main>
      </div>
    </div>
  );
}
