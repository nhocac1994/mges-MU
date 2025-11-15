'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import NetworkOverlay from '@/components/NetworkOverlay';

interface Character {
  name: string;
  level: number;
  class: number;
  className: string;
  resetCount: number;
  masterResetCount: number;
  stats: {
    strength: number;
    dexterity: number;
    vitality: number;
    energy: number;
    leadership: number;
  };
  life: number;
  maxLife: number;
  mana: number;
  maxMana: number;
  money: number;
  mapNumber: number;
  mapPosX: number;
  mapPosY: number;
  pkCount: number;
  pkLevel: number;
}

interface CharacterData {
  name: string;
  level: number;
  experience: number;
  nextLevelExp: number;
  expProgress: number;
  class: number;
  strength: number;
  dexterity: number;
  vitality: number;
  energy: number;
  leadership: number;
  money: number;
  life: number;
  maxLife: number;
  mana: number;
  maxMana: number;
  mapNumber: number;
  mapPosX: number;
  mapPosY: number;
  pkCount: number;
  pkLevel: number;
  resetCount: number;
  masterResetCount: number;
  isOnline: boolean;
  connectTime: string;
  disconnectTime: string;
  totalPlayTime: number;
  playTimeHours: number;
  playTimeMinutes: number;
}

interface ResetData {
  dailyReset: number;
  weeklyReset: number;
  monthlyReset: number;
  lastDailyReset: string;
  lastWeeklyReset: string;
  lastMonthlyReset: string;
  masterDailyReset: number;
  masterWeeklyReset: number;
  masterMonthlyReset: number;
  lastMasterDailyReset: string;
  lastMasterWeeklyReset: string;
  lastMasterMonthlyReset: string;
  totalResetCount: number;
  totalMasterResetCount: number;
}

interface GuildData {
  name: string;
  master: string;
  score: number;
  memberCount: number;
}

interface DashboardData {
  account: {
    id: string;
    characterCount: number;
    level: number;
    levelName: string;
    levelColor: string;
    expireDate: string;
    isExpired: boolean;
  };
  character: CharacterData;
  reset: ResetData;
  warehouse: {
    money: number;
  };
  guild: GuildData | null;
}

export default function Dashboard() {
  const [user, setUser] = useState<{memb___id: string; memb_name: string} | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [charactersLoading, setCharactersLoading] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

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

  const getClassName = (classId: number): string => {
    const classNames: {[key: number]: string} = {
      0: 'Dark Wizard',
      1: 'Soul Master', 
      2: 'Grand Master',
      16: 'Dark Knight',
      17: 'Blade Knight',
      18: 'Blade Master',
      32: 'Fairy Elf',
      33: 'Muse Elf',
      34: 'High Elf',
      48: 'Magic Gladiator',
      50: 'Dark Lord',
      64: 'Summoner',
      65: 'Bloody Summoner',
      66: 'Dimension Master',
      80: 'Rage Fighter',
      81: 'Fist Master'
    };
    return classNames[classId] || 'Unknown';
  };

  const formatMoney = (money: number): string => {
    return new Intl.NumberFormat('vi-VN').format(money);
  };

  const formatTime = (hours: number, minutes: number): string => {
    if (hours > 0) {
      return `${hours} giờ ${minutes} phút`;
    }
    return `${minutes} phút`;
  };

  const fetchCharacters = async (accountId: string) => {
    try {
      setCharactersLoading(true);
      const response = await fetch(`/api/characters?accountId=${accountId}`);
      const result = await response.json();
      
      if (result.success) {
        setCharacters(result.data.characters);
        // Set first character as default selected
        if (result.data.characters.length > 0) {
          setSelectedCharacter(result.data.characters[0]);
        }
      } else {
        console.error('Failed to fetch characters:', result.message);
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setCharactersLoading(false);
    }
  };

  const handleCharacterChange = (characterName: string) => {
    const character = characters.find(char => char.name === characterName);
    if (character) {
      setSelectedCharacter(character);
    }
  };

  const handleUpdateAccount = async (updateData: Record<string, string>) => {
    try {
      setUpdateLoading(true);
      const response = await fetch('/api/account/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountId: user?.memb___id,
          updateData
        })
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Cập nhật thông tin thành công!');
        setShowAccountModal(false);
        // Refresh user data
        const userData = localStorage.getItem('user_data');
        if (userData) {
          const updatedUser = JSON.parse(userData);
          updatedUser.memb_name = updateData.memb_name || updatedUser.memb_name;
          localStorage.setItem('user_data', JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
      } else {
        alert('Lỗi: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating account:', error);
      alert('Lỗi khi cập nhật thông tin');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleChangePassword = async (passwordData: { currentPassword: string; newPassword: string }) => {
    try {
      if (!user?.memb___id) {
        alert('Không tìm thấy thông tin tài khoản. Vui lòng đăng nhập lại.');
        return;
      }

      setUpdateLoading(true);
      const response = await fetch('/api/account/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountId: user.memb___id,
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Đổi mật khẩu thành công!');
        setShowPasswordModal(false);
      } else {
        alert('Lỗi: ' + result.message);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Lỗi khi đổi mật khẩu. Vui lòng thử lại.');
    } finally {
      setUpdateLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');
        
        if (!token || !userData) {
          router.push('/login');
          return;
        }
        
        // Parse user data để lấy account ID
        const user = JSON.parse(userData);
        const accountId = user.memb___id;
        
        console.log('Loading dashboard for account:', accountId);
        
        // Fetch characters first
        await fetchCharacters(accountId);
        
        // Lấy thông tin dashboard từ API với account ID
        const response = await fetch(`/api/dashboard?accountId=${accountId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'x-user-account': accountId
          }
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setDashboardData(result.data);
            setUser({
              memb___id: result.data.account.id,
              memb_name: result.data.character.name
            });
          } else {
            console.error('Failed to load dashboard data:', result.message);
          }
        } else {
          console.error('Failed to fetch dashboard data');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

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
        {/* User Info Header - Always visible */}
        <div className="bg-gradient-to-r from-blue-900/80 to-purple-900/80 backdrop-blur-sm border-b border-blue-500/30">
          <div className="max-w-6xl mx-auto px-5 py-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center space-x-4">
                <Image src="/icon.jpg" alt="Mu Online Logo" width={40} height={40} className="rounded-lg"/>
                <div>
                  <h1 className="text-lg font-bold text-white">MuDauTruongSS1.net</h1>
                  <p className="text-blue-300 text-xs">Đấu Trường SS1</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <span className="text-white text-sm">Xin chào, {user?.memb_name}</span>
                
                {/* Character Selector */}
                {characters.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-300 text-sm">Character:</span>
                    <select
                      value={selectedCharacter?.name || ''}
                      onChange={(e) => handleCharacterChange(e.target.value)}
                      disabled={charactersLoading}
                      className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    >
                      {characters.map((char) => (
                        <option key={char.name} value={char.name}>
                          {char.name} ({char.className}) - Lv.{char.level}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAccountModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Quản lý
                  </button>
                  
                  <button 
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="relative z-10 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center text-white mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              DASHBOARD
            </h1>
            <p className="text-xl text-gray-300">Chào mừng bạn đến với MuDauTruongSS1.net</p>
          </div>

          {/* User Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Thông tin tài khoản */}
            <div className="bg-black bg-opacity-70 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Thông tin tài khoản</h3>
              <div className="space-y-2">
                <p className="text-white"><span className="text-gray-400">Tên đăng nhập:</span> {dashboardData?.account.id}</p>
                <p className="text-white"><span className="text-gray-400">Nhân vật chính:</span> {dashboardData?.character.name}</p>
                <p className="text-white"><span className="text-gray-400">Số nhân vật:</span> {dashboardData?.account.characterCount}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Loại tài khoản:</span>
                  <span 
                    className="px-2 py-1 rounded text-sm font-semibold"
                    style={{ 
                      backgroundColor: dashboardData?.account.levelColor || '#808080',
                      color: '#000'
                    }}
                  >
                    {dashboardData?.account.levelName || 'Thường'}
                  </span>
                </div>
                {dashboardData?.account.expireDate && (
                  <p className="text-white">
                    <span className="text-gray-400">Hết hạn:</span> 
                    <span className={dashboardData?.account.isExpired ? 'text-red-400' : 'text-green-400'}>
                      {new Date(dashboardData.account.expireDate).toLocaleDateString('vi-VN')}
                    </span>
                  </p>
                )}
                <p className="text-white"><span className="text-gray-400">Trạng thái:</span> 
                  <span className={`ml-2 ${dashboardData?.character.isOnline ? 'text-green-400' : 'text-red-400'}`}>
                    {dashboardData?.character.isOnline ? 'Online' : 'Offline'}
                  </span>
                </p>
              </div>
            </div>

            {/* Trạng thái game */}
            <div className="bg-black bg-opacity-70 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Trạng thái game</h3>
              <div className="space-y-2">
                <p className="text-white"><span className="text-gray-400">Server:</span> <span className="text-green-400">Online</span></p>
                <p className="text-white"><span className="text-gray-400">Cấp độ:</span> {dashboardData?.character.level}</p>
                <p className="text-white"><span className="text-gray-400">Class:</span> {getClassName(dashboardData?.character.class || 0)}</p>
                <p className="text-white"><span className="text-gray-400">Kinh nghiệm:</span> {formatMoney(dashboardData?.character.experience || 0)}/{formatMoney(dashboardData?.character.nextLevelExp || 0)}</p>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${dashboardData?.character.expProgress || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Thống kê */}
            <div className="bg-black bg-opacity-70 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Thống kê</h3>
              <div className="space-y-2">
                <p className="text-white"><span className="text-gray-400">Thời gian chơi:</span> {formatTime(dashboardData?.character.playTimeHours || 0, dashboardData?.character.playTimeMinutes || 0)}</p>
                <p className="text-white"><span className="text-gray-400">PK Count:</span> {dashboardData?.character.pkCount}</p>
                <p className="text-white"><span className="text-gray-400">PK Level:</span> {dashboardData?.character.pkLevel}</p>
                <p className="text-white"><span className="text-gray-400">Vị trí:</span> Map {dashboardData?.character.mapNumber} ({dashboardData?.character.mapPosX}, {dashboardData?.character.mapPosY})</p>
              </div>
            </div>
          </div>

          {/* Character Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Stats */}
            <div className="bg-black bg-opacity-70 rounded-lg p-6 min-h-[400px]">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Chỉ số nhân vật</h3>
              <div className="space-y-2">
                {/* Basic Stats */}
                <div className="space-y-2">
                  <p className="text-white flex justify-between items-center">
                    <span className="text-gray-400">Strength:</span> 
                    <span className="font-bold text-orange-400">{selectedCharacter?.stats.strength || dashboardData?.character.strength}</span>
                  </p>
                  <p className="text-white flex justify-between items-center">
                    <span className="text-gray-400">Dexterity:</span> 
                    <span className="font-bold text-blue-400">{selectedCharacter?.stats.dexterity || dashboardData?.character.dexterity}</span>
                  </p>
                  <p className="text-white flex justify-between items-center">
                    <span className="text-gray-400">Vitality:</span> 
                    <span className="font-bold text-red-400">{selectedCharacter?.stats.vitality || dashboardData?.character.vitality}</span>
                  </p>
                  <p className="text-white flex justify-between items-center">
                    <span className="text-gray-400">Energy:</span> 
                    <span className="font-bold text-purple-400">{selectedCharacter?.stats.energy || dashboardData?.character.energy}</span>
                  </p>
                  <p className="text-white flex justify-between items-center">
                    <span className="text-gray-400">Leadership:</span> 
                    <span className="font-bold text-yellow-400">{selectedCharacter?.stats.leadership || dashboardData?.character.leadership}</span>
                  </p>
                </div>
                
                {/* Additional Stats */}
                <div className="pt-3 border-t border-gray-600 mt-3 space-y-2">
                  <p className="text-white flex justify-between items-center">
                    <span className="text-gray-400">Level:</span> 
                    <span className="font-bold text-green-400">{selectedCharacter?.level || dashboardData?.character.level}</span>
                  </p>
                  <p className="text-white flex justify-between items-center">
                    <span className="text-gray-400">Class:</span> 
                    <span className="font-bold text-cyan-400">{selectedCharacter?.className || getClassName(dashboardData?.character.class || 0)}</span>
                  </p>
                  <p className="text-white flex justify-between items-center">
                    <span className="text-gray-400">PK Count:</span> 
                    <span className="font-bold text-red-300">{selectedCharacter?.pkCount || dashboardData?.character.pkCount}</span>
                  </p>
                  <p className="text-white flex justify-between items-center">
                    <span className="text-gray-400">PK Level:</span> 
                    <span className="font-bold text-red-300">{selectedCharacter?.pkLevel || dashboardData?.character.pkLevel}</span>
                  </p>
                  <p className="text-white flex justify-between items-center">
                    <span className="text-gray-400">Reset Count:</span> 
                    <span className="font-bold text-blue-300">{selectedCharacter?.resetCount || dashboardData?.character.resetCount}</span>
                  </p>
                  <p className="text-white flex justify-between items-center">
                    <span className="text-gray-400">Master Reset:</span> 
                    <span className="font-bold text-purple-300">{selectedCharacter?.masterResetCount || dashboardData?.character.masterResetCount}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Life & Mana */}
            <div className="bg-black bg-opacity-70 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">HP & MP</h3>
              <div className="space-y-2">
                <p className="text-white"><span className="text-gray-400">Life:</span> {Math.floor(selectedCharacter?.life || dashboardData?.character.life || 0)}/{Math.floor(selectedCharacter?.maxLife || dashboardData?.character.maxLife || 0)}</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${Math.min(100, ((selectedCharacter?.life || dashboardData?.character.life || 0) / (selectedCharacter?.maxLife || dashboardData?.character.maxLife || 1)) * 100)}%` }}
                  ></div>
                </div>
                <p className="text-white"><span className="text-gray-400">Mana:</span> {Math.floor(selectedCharacter?.mana || dashboardData?.character.mana || 0)}/{Math.floor(selectedCharacter?.maxMana || dashboardData?.character.maxMana || 0)}</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${Math.min(100, ((selectedCharacter?.mana || dashboardData?.character.mana || 0) / (selectedCharacter?.maxMana || dashboardData?.character.maxMana || 1)) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Money */}
            <div className="bg-black bg-opacity-70 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Tiền tệ</h3>
              <div className="space-y-2">
                <p className="text-white"><span className="text-gray-400">Tiền nhân vật:</span></p>
                <p className="text-green-400 font-bold">{formatMoney(selectedCharacter?.money || dashboardData?.character.money || 0)} Zen</p>
                <p className="text-white"><span className="text-gray-400">Tiền kho:</span></p>
                <p className="text-green-400 font-bold">{formatMoney(dashboardData?.warehouse.money || 0)} Zen</p>
              </div>
            </div>

          </div>

          {/* Reset Info - Full Width Layout */}
          <div className="bg-black bg-opacity-70 rounded-lg p-6 mb-8 hover:bg-opacity-80 transition-all duration-300">
            <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
              Reset
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Reset Thường */}
              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                <h4 className="text-lg font-semibold text-blue-400 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                  Reset Thường
                </h4>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Daily:</span>
                    <span className="text-lg font-bold text-white bg-blue-800/30 rounded px-2 py-1 hover:bg-blue-800/50 hover:scale-105 transition-all duration-200 cursor-default">
                      {dashboardData?.reset.dailyReset || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Weekly:</span>
                    <span className="text-lg font-bold text-white bg-blue-800/30 rounded px-2 py-1 hover:bg-blue-800/50 hover:scale-105 transition-all duration-200 cursor-default">
                      {dashboardData?.reset.weeklyReset || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Monthly:</span>
                    <span className="text-lg font-bold text-white bg-blue-800/30 rounded px-2 py-1 hover:bg-blue-800/50 hover:scale-105 transition-all duration-200 cursor-default">
                      {dashboardData?.reset.monthlyReset || 0}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-blue-500/20 text-center">
                    <span className="text-sm text-gray-400">Tổng: </span>
                    <span className="text-lg font-bold text-blue-300 hover:text-blue-200 transition-colors duration-200">
                      {dashboardData?.reset.totalResetCount || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Master Reset */}
              <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/30 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                <h4 className="text-lg font-semibold text-purple-400 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
                  Master Reset
                </h4>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Daily:</span>
                    <span className="text-lg font-bold text-white bg-purple-800/30 rounded px-2 py-1 hover:bg-purple-800/50 hover:scale-105 transition-all duration-200 cursor-default">
                      {dashboardData?.reset.masterDailyReset || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Weekly:</span>
                    <span className="text-lg font-bold text-white bg-purple-800/30 rounded px-2 py-1 hover:bg-purple-800/50 hover:scale-105 transition-all duration-200 cursor-default">
                      {dashboardData?.reset.masterWeeklyReset || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Monthly:</span>
                    <span className="text-lg font-bold text-white bg-purple-800/30 rounded px-2 py-1 hover:bg-purple-800/50 hover:scale-105 transition-all duration-200 cursor-default">
                      {dashboardData?.reset.masterMonthlyReset || 0}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-purple-500/20 text-center">
                    <span className="text-sm text-gray-400">Tổng: </span>
                    <span className="text-lg font-bold text-purple-300 hover:text-purple-200 transition-colors duration-200">
                      {dashboardData?.reset.totalMasterResetCount || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lần Reset Cuối */}
              <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300">
                <h4 className="text-lg font-semibold text-green-400 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  Lần Reset Cuối
                </h4>
                
                <div className="space-y-2">
                  {dashboardData?.reset.lastDailyReset && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Daily:</span>
                      <span className="text-sm font-medium text-green-300 bg-green-800/30 rounded px-2 py-1 hover:bg-green-800/50 hover:text-green-200 transition-all duration-200">
                        {new Date(dashboardData.reset.lastDailyReset).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  )}
                  {dashboardData?.reset.lastWeeklyReset && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Weekly:</span>
                      <span className="text-sm font-medium text-green-300 bg-green-800/30 rounded px-2 py-1 hover:bg-green-800/50 hover:text-green-200 transition-all duration-200">
                        {new Date(dashboardData.reset.lastWeeklyReset).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  )}
                  {dashboardData?.reset.lastMonthlyReset && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Monthly:</span>
                      <span className="text-sm font-medium text-green-300 bg-green-800/30 rounded px-2 py-1 hover:bg-green-800/50 hover:text-green-200 transition-all duration-200">
                        {new Date(dashboardData.reset.lastMonthlyReset).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  )}
                  {!dashboardData?.reset.lastDailyReset && !dashboardData?.reset.lastWeeklyReset && !dashboardData?.reset.lastMonthlyReset && (
                    <div className="text-center text-gray-500 text-sm py-4">
                      Chưa có dữ liệu reset
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Guild Info */}
          {dashboardData?.guild && (
            <div className="bg-black bg-opacity-70 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Thông tin Guild</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-white"><span className="text-gray-400">Tên Guild:</span> {dashboardData.guild.name}</p>
                  <p className="text-white"><span className="text-gray-400">Guild Master:</span> {dashboardData.guild.master}</p>
                </div>
                <div>
                  <p className="text-white"><span className="text-gray-400">Điểm số:</span> {formatMoney(dashboardData.guild.score)}</p>
                  <p className="text-white"><span className="text-gray-400">Số thành viên:</span> {dashboardData.guild.memberCount}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black bg-opacity-70 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Bắt đầu chơi</h3>
              <p className="text-gray-300 mb-6">Tải game và bắt đầu hành trình Mu Online</p>
              <a 
                href="/download" 
                className="bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold py-3 px-6 rounded-lg hover:from-yellow-600 hover:to-red-600 transition-all inline-block"
              >
                TẢI GAME NGAY
              </a>
            </div>

            <div className="bg-black bg-opacity-70 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Thông tin server</h3>
              <p className="text-gray-300 mb-6">Xem thông tin chi tiết về server và cài đặt</p>
              <a 
                href="/info" 
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all inline-block"
              >
                XEM THÔNG TIN
              </a>
            </div>
          </div>
        </div>
      </main>



      {/* Account Management Modal */}
      {showAccountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">Quản lý tài khoản</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Tên hiển thị:</label>
                <input
                  type="text"
                  defaultValue={user?.memb_name || ''}
                  id="memb_name"
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm mb-1">Email:</label>
                <input
                  type="email"
                  id="mail_addr"
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm mb-1">Số điện thoại:</label>
                <input
                  type="tel"
                  id="phon_numb"
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    const updateData = {
                      memb_name: (document.getElementById('memb_name') as HTMLInputElement)?.value,
                      mail_addr: (document.getElementById('mail_addr') as HTMLInputElement)?.value,
                      phon_numb: (document.getElementById('phon_numb') as HTMLInputElement)?.value,
                    };
                    handleUpdateAccount(updateData);
                  }}
                  disabled={updateLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
                >
                  {updateLoading ? 'Đang cập nhật...' : 'Cập nhật'}
                </button>
                
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
                >
                  Đổi mật khẩu
                </button>
              </div>
              
              <button
                onClick={() => setShowAccountModal(false)}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">Đổi mật khẩu</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Mật khẩu hiện tại:</label>
                <input
                  type="password"
                  id="currentPassword"
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm mb-1">Mật khẩu mới:</label>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm mb-1">Xác nhận mật khẩu mới:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    const currentPassword = (document.getElementById('currentPassword') as HTMLInputElement)?.value;
                    const newPassword = (document.getElementById('newPassword') as HTMLInputElement)?.value;
                    const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement)?.value;
                    
                    if (newPassword !== confirmPassword) {
                      alert('Mật khẩu xác nhận không khớp!');
                      return;
                    }
                    
                    handleChangePassword({ currentPassword, newPassword });
                  }}
                  disabled={updateLoading}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
                >
                  {updateLoading ? 'Đang đổi...' : 'Đổi mật khẩu'}
                </button>
                
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
