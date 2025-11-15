'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NetworkOverlay from '@/components/NetworkOverlay';

export default function MyAccount() {
  const [user, setUser] = useState<{
    username: string;
    characterName: string;
    email: string;
    phone: string;
    securityQuestion: string;
    securityAnswer: string;
    joinDate: string;
    lastLogin: string;
    accountLevel: number;
    accountExpire: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profileData, setProfileData] = useState({
    characterName: '',
    email: '',
    phone: '',
    securityQuestion: '',
    securityAnswer: ''
  });
  const [passwordErrors, setPasswordErrors] = useState<{[key: string]: string}>({});
  const [profileErrors, setProfileErrors] = useState<{[key: string]: string}>({});
  const [lastPasswordChange, setLastPasswordChange] = useState<string | null>(null);
  const [canChangePassword, setCanChangePassword] = useState(true);

  useEffect(() => {
    // Mock user data - trong thực tế sẽ lấy từ session/token
    const mockUser = {
      username: 'testuser',
      characterName: 'TestCharacter',
      email: 'test@example.com',
      phone: '0123456789',
      securityQuestion: 'pet',
      securityAnswer: 'Fluffy',
      joinDate: '2025-01-01',
      lastLogin: '2025-01-15',
      accountLevel: 0,
      accountExpire: '2079-06-06'
    };
    setUser(mockUser);
    setProfileData({
      characterName: mockUser.characterName,
      email: mockUser.email,
      phone: mockUser.phone,
      securityQuestion: mockUser.securityQuestion,
      securityAnswer: mockUser.securityAnswer
    });

    // Kiểm tra lần thay đổi mật khẩu cuối
    const lastChange = localStorage.getItem('lastPasswordChange');
    if (lastChange) {
      setLastPasswordChange(lastChange);
      const today = new Date().toDateString();
      const lastChangeDate = new Date(lastChange).toDateString();
      setCanChangePassword(today !== lastChangeDate);
    }
  }, []);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (profileErrors[name]) {
      setProfileErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!passwordData.currentPassword) newErrors.currentPassword = 'Mật khẩu hiện tại là bắt buộc';
    if (!passwordData.newPassword) newErrors.newPassword = 'Mật khẩu mới là bắt buộc';
    if (passwordData.newPassword.length < 6) newErrors.newPassword = 'Mật khẩu mới phải có ít nhất 6 ký tự';
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateProfileForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!profileData.characterName) newErrors.characterName = 'Tên nhân vật là bắt buộc';
    if (!profileData.email) newErrors.email = 'Email là bắt buộc';
    if (!profileData.phone) newErrors.phone = 'Số điện thoại là bắt buộc';
    if (!profileData.securityQuestion) newErrors.securityQuestion = 'Câu hỏi bảo mật là bắt buộc';
    if (!profileData.securityAnswer) newErrors.securityAnswer = 'Câu trả lời bảo mật là bắt buộc';

    setProfileErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) return;

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Lưu thời gian thay đổi mật khẩu
      const now = new Date().toISOString();
      localStorage.setItem('lastPasswordChange', now);
      setLastPasswordChange(now);
      setCanChangePassword(false);
      
      alert('Mật khẩu đã được thay đổi thành công!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Password change error:', error);
      alert('Có lỗi xảy ra khi thay đổi mật khẩu. Vui lòng thử lại.');
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateProfileForm()) return;

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Thông tin cá nhân đã được cập nhật thành công!');
    } catch (error) {
      console.error('Profile update error:', error);
      alert('Có lỗi xảy ra khi cập nhật thông tin. Vui lòng thử lại.');
    }
  };

  const getSecurityQuestionText = (question: string) => {
    switch (question) {
      case 'pet': return 'Tên thú cưng đầu tiên của bạn?';
      case 'school': return 'Tên trường tiểu học của bạn?';
      case 'city': return 'Thành phố bạn sinh ra?';
      case 'food': return 'Món ăn yêu thích của bạn?';
      default: return question;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Network Overlay - Luôn chạy trên background */}
      <NetworkOverlay />
      
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        // style={{
        //   backgroundImage: 'url(/logoweb.jpg)',
        //   backgroundAttachment: 'fixed'
        // }}
      ></div>
      
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10 pt-28">
        {/* Main Content */}
        <main className="relative z-10 container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center text-white mb-12">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                QUẢN LÝ TÀI KHOẢN
              </h1>
              <p className="text-xl text-gray-300">
                Quản lý thông tin cá nhân và bảo mật tài khoản
              </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
              <div className="bg-black/50 rounded-lg p-2 flex space-x-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    activeTab === 'profile' 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  📋 THÔNG TIN CÁ NHÂN
                </button>
                <button
                  onClick={() => setActiveTab('password')}
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    activeTab === 'password' 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  🔒 ĐỔI MẬT KHẨU
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    activeTab === 'security' 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  🛡️ BẢO MẬT
                </button>
              </div>
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-blue-500/30">
                <h2 className="text-2xl font-bold text-white mb-6">📋 THÔNG TIN CÁ NHÂN</h2>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">Tên đăng nhập</label>
                      <input
                        type="text"
                        value={user?.username || ''}
                        disabled
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-400"
                      />
                      <p className="text-gray-400 text-sm mt-1">Tên đăng nhập không thể thay đổi</p>
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">Tên nhân vật *</label>
                      <input
                        type="text"
                        name="characterName"
                        value={profileData.characterName}
                        onChange={handleProfileChange}
                        className={`w-full p-3 bg-gray-800 border rounded-lg focus:outline-none ${
                          profileErrors.characterName ? 'border-red-500' : 'border-gray-600 focus:border-blue-400'
                        }`}
                        placeholder="Nhập tên nhân vật"
                      />
                      {profileErrors.characterName && <p className="text-red-400 text-sm mt-1">{profileErrors.characterName}</p>}
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className={`w-full p-3 bg-gray-800 border rounded-lg focus:outline-none ${
                          profileErrors.email ? 'border-red-500' : 'border-gray-600 focus:border-blue-400'
                        }`}
                        placeholder="Nhập email"
                      />
                      {profileErrors.email && <p className="text-red-400 text-sm mt-1">{profileErrors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">Số điện thoại *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        className={`w-full p-3 bg-gray-800 border rounded-lg focus:outline-none ${
                          profileErrors.phone ? 'border-red-500' : 'border-gray-600 focus:border-blue-400'
                        }`}
                        placeholder="Nhập số điện thoại"
                      />
                      {profileErrors.phone && <p className="text-red-400 text-sm mt-1">{profileErrors.phone}</p>}
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-8 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
                    >
                      CẬP NHẬT THÔNG TIN
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-blue-500/30">
                <h2 className="text-2xl font-bold text-white mb-6">🔒 ĐỔI MẬT KHẨU</h2>
                
                {!canChangePassword && (
                  <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-yellow-400 text-xl mr-3">⚠️</span>
                      <div>
                        <p className="text-yellow-400 font-bold">Giới hạn thay đổi mật khẩu</p>
                        <p className="text-gray-300 text-sm">
                          Bạn đã thay đổi mật khẩu trong ngày hôm nay. Chỉ được phép thay đổi 1 lần/ngày.
                        </p>
                        {lastPasswordChange && (
                          <p className="text-gray-400 text-xs mt-1">
                            Lần thay đổi cuối: {new Date(lastPasswordChange).toLocaleString('vi-VN')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-semibold mb-2">Mật khẩu hiện tại *</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        disabled={!canChangePassword}
                        className={`w-full p-3 bg-gray-800 border rounded-lg focus:outline-none ${
                          passwordErrors.currentPassword ? 'border-red-500' : 'border-gray-600 focus:border-blue-400'
                        } ${!canChangePassword ? 'opacity-50 cursor-not-allowed' : ''}`}
                        placeholder="Nhập mật khẩu hiện tại"
                      />
                      {passwordErrors.currentPassword && <p className="text-red-400 text-sm mt-1">{passwordErrors.currentPassword}</p>}
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">Mật khẩu mới *</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        disabled={!canChangePassword}
                        className={`w-full p-3 bg-gray-800 border rounded-lg focus:outline-none ${
                          passwordErrors.newPassword ? 'border-red-500' : 'border-gray-600 focus:border-blue-400'
                        } ${!canChangePassword ? 'opacity-50 cursor-not-allowed' : ''}`}
                        placeholder="Nhập mật khẩu mới"
                      />
                      {passwordErrors.newPassword && <p className="text-red-400 text-sm mt-1">{passwordErrors.newPassword}</p>}
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">Xác nhận mật khẩu mới *</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        disabled={!canChangePassword}
                        className={`w-full p-3 bg-gray-800 border rounded-lg focus:outline-none ${
                          passwordErrors.confirmPassword ? 'border-red-500' : 'border-gray-600 focus:border-blue-400'
                        } ${!canChangePassword ? 'opacity-50 cursor-not-allowed' : ''}`}
                        placeholder="Nhập lại mật khẩu mới"
                      />
                      {passwordErrors.confirmPassword && <p className="text-red-400 text-sm mt-1">{passwordErrors.confirmPassword}</p>}
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={!canChangePassword}
                      className={`font-bold py-3 px-8 rounded-lg transition-all ${
                        canChangePassword
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {canChangePassword ? 'THAY ĐỔI MẬT KHẨU' : 'ĐÃ THAY ĐỔI TRONG NGÀY'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-blue-500/30">
                <h2 className="text-2xl font-bold text-white mb-6">🛡️ THÔNG TIN BẢO MẬT</h2>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">Câu hỏi bảo mật</label>
                      <input
                        type="text"
                        value={getSecurityQuestionText(profileData.securityQuestion)}
                        disabled
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">Câu trả lời</label>
                      <input
                        type="text"
                        value="••••••••"
                        disabled
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-400"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Ngày tham gia</div>
                      <div className="text-lg font-bold text-white">{user?.joinDate}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Đăng nhập cuối</div>
                      <div className="text-lg font-bold text-white">{user?.lastLogin}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Cấp độ tài khoản</div>
                      <div className="text-lg font-bold text-white">Level {user?.accountLevel}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
