'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import NetworkOverlay from '@/components/NetworkOverlay';
import FloatingParticles from '@/components/FloatingParticles';
import AnimatedSection from '@/components/AnimatedSection';
import MuClassicModal from '@/components/MuClassicModal';
import { useConfig } from '@/contexts/ConfigContext';

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
  } | null;
  guild: GuildData | null;
}

export default function Dashboard() {
  const [user, setUser] = useState<{memb___id: string; memb_name: string; Username?: string; username?: string} | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [charactersLoading, setCharactersLoading] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const router = useRouter();
  const { config } = useConfig();

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
      const trimmedAccountId = accountId.trim();
      
      const response = await fetch(`/api/characters?accountId=${encodeURIComponent(trimmedAccountId)}`);
      
      if (!response.ok) {
        return;
      }
      
      const result = await response.json();
      
      if (result.success && result.data) {
        const charactersList = result.data.characters || result.data || [];
        
        if (!Array.isArray(charactersList)) {
          setCharacters([]);
          return;
        }
        
        const mappedCharacters: Character[] = charactersList.map((char: any) => ({
          name: char.Name || char.name,
          level: char.Level || char.level,
          class: char.Class || char.class,
          className: char.ClassName || char.className,
          resetCount: char.ResetCount || char.resetCount || 0,
          masterResetCount: char.MasterResetCount || char.masterResetCount || 0,
          stats: {
            strength: char.Stats?.Strength || char.stats?.strength || char.Strength || char.strength || 0,
            dexterity: char.Stats?.Dexterity || char.stats?.dexterity || char.Dexterity || char.dexterity || 0,
            vitality: char.Stats?.Vitality || char.stats?.vitality || char.Vitality || char.vitality || 0,
            energy: char.Stats?.Energy || char.stats?.energy || char.Energy || char.energy || 0,
            leadership: char.Stats?.Leadership || char.stats?.leadership || char.Leadership || char.leadership || 0,
          },
          life: char.Life || char.life || 0,
          maxLife: char.MaxLife || char.maxLife || 0,
          mana: char.Mana || char.mana || 0,
          maxMana: char.MaxMana || char.maxMana || 0,
          money: char.Money || char.money || 0,
          mapNumber: char.MapNumber || char.mapNumber || 0,
          mapPosX: char.MapPosX || char.mapPosX || 0,
          mapPosY: char.MapPosY || char.mapPosY || 0,
          pkCount: char.PkCount || char.pkCount || char.PKCount || 0,
          pkLevel: char.PkLevel || char.pkLevel || char.PKLevel || 0,
        }));
        
        setCharacters(mappedCharacters);
        if (mappedCharacters.length > 0) {
          setSelectedCharacter(mappedCharacters[0]);
        }
      } else {
        setCharacters([]);
      }
    } catch (error) {
      setCharacters([]);
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
      const accountId = user?.Username || user?.username || user?.memb___id;
      if (!accountId) {
        alert('Không tìm thấy thông tin tài khoản');
        return;
      }
      
      const response = await fetch('/api/account/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountId: accountId,
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
      alert('Lỗi khi cập nhật thông tin');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleChangePassword = async (passwordData: { currentPassword: string; newPassword: string }) => {
    try {
      const accountId = user?.Username || user?.username || user?.memb___id;
      if (!accountId) {
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
          accountId: accountId,
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
        // Backend trả về Username (chữ U hoa), nhưng có thể là username (chữ thường)
        const accountId = user.Username || user.username || user.memb___id;
        
        if (!accountId) {
          router.push('/login');
          return;
        }
        
        
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
            // Lưu user data với format đúng
            const accountId = result.data.account.id;
            const updatedUserData = {
              Username: accountId,
              username: accountId,
              memb___id: accountId,
              CharacterName: result.data.character.name,
              memb_name: result.data.character.name
            };
            localStorage.setItem('user_data', JSON.stringify(updatedUserData));
            setUser(updatedUserData);
          }
        }
        
        setLoading(false);
      } catch (error) {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/');
  };

  // Đảm bảo config có giá trị (sau tất cả hooks)
  if (!config) {
    return null;
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center relative">
        <NetworkOverlay />
        <FloatingParticles count={25} />
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white text-xl mu-text-glow"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Đang tải...
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{
      fontFamily: 'Arial, sans-serif'
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
      <div className="relative z-10 pt-32">
        {/* User Info Header - Classic MU Style */}
        <div className="relative bg-gradient-to-r from-gray-900/90 via-black/90 to-gray-900/90 backdrop-blur-sm border-b-2 border-yellow-500/60">
          <div className="absolute inset-0 mu-modal-border-glow"></div>
          <div className="relative max-w-6xl mx-auto px-5 py-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Image src="/icon.jpg" alt="Mu Online Logo" width={40} height={40} className="rounded-lg border border-yellow-500/30"/>
                </motion.div>
                <div>
                  <h1 className="text-lg font-bold text-yellow-400 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>{config.nameGame}</h1>
                  <p className="text-blue-300 text-xs" style={{ fontFamily: 'Arial, sans-serif' }}>{config.gameTitle}</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 w-full md:w-auto">
                <span className="text-yellow-300 text-sm whitespace-nowrap" style={{ fontFamily: 'Arial, sans-serif' }}>Xin chào, <span className="font-bold">{user?.memb_name}</span></span>
                
                {/* Character Selector - Luôn hiển thị */}
                <div className="flex items-center space-x-2 w-full md:w-auto">
                  <span className="text-yellow-400 text-sm font-semibold whitespace-nowrap" style={{ fontFamily: 'Arial, sans-serif' }}>Character:</span>
                  {charactersLoading ? (
                    <span className="text-gray-400 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>Đang tải...</span>
                  ) : characters.length > 0 ? (
                    <select
                      value={selectedCharacter?.name || ''}
                      onChange={(e) => handleCharacterChange(e.target.value)}
                      className="bg-black/40 text-white px-3 py-1 rounded border border-yellow-500/30 focus:border-yellow-400/60 focus:outline-none mu-button-glow min-w-[200px] w-full md:w-auto"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      {characters.map((char) => (
                        <option key={char.name} value={char.name}>
                          {char.name} ({char.className}) - Lv.{char.level}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-gray-400 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>Chưa có nhân vật</span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => setShowAccountModal(true)}
                    className="bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border border-yellow-500/60 text-yellow-300 px-3 py-1 rounded text-sm mu-button-glow"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Quản lý
                  </motion.button>
                  
                  <motion.button 
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-red-600/30 to-orange-600/30 border border-red-500/60 text-red-300 px-3 py-1 rounded text-sm mu-button-glow"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Đăng xuất
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

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
              DASHBOARD
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
                    DASHBOARD
                  </motion.div>
                </motion.h1>
                <AnimatedSection direction="up" delay={0.2}>
                  <div className="text-2xl font-semibold text-blue-300 mb-4">
                    <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                      Chào mừng bạn đến với {config.nameGame}
                    </span>
          </div>
                </AnimatedSection>
              </motion.div>
            </div>
          </section>

        <div className="max-w-6xl mx-auto px-4">

          {/* User Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Thông tin tài khoản */}
            <AnimatedSection direction="up" delay={0.1}>
              <div className="relative">
                <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
                <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-6">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                  
                  <h3 className="text-xl font-bold text-yellow-400 mb-4 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>Thông tin tài khoản</h3>
              <div className="space-y-2">
                    {[
                      { label: 'Tên đăng nhập:', value: dashboardData?.account.id || 'N/A' },
                      { label: 'Nhân vật chính:', value: dashboardData?.character.name || 'N/A' },
                      { label: 'Số nhân vật:', value: dashboardData?.account.characterCount || 0 }
                    ].map((item, idx) => (
                      <motion.p 
                        key={idx}
                        className="text-white flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                        style={{ fontFamily: 'Arial, sans-serif' }}
                      >
                        <span className="text-yellow-400">{item.label}</span>
                        <span className="font-semibold">{item.value}</span>
                      </motion.p>
                    ))}
                    <div className="flex items-center space-x-2 pt-2">
                      <span className="text-yellow-400" style={{ fontFamily: 'Arial, sans-serif' }}>Loại tài khoản:</span>
                  <span 
                        className="px-2 py-1 rounded text-sm font-semibold border border-yellow-500/30"
                    style={{ 
                      backgroundColor: dashboardData?.account.levelColor || '#808080',
                          color: '#000',
                          fontFamily: 'Arial, sans-serif'
                    }}
                  >
                    {dashboardData?.account.levelName || 'Thường'}
                  </span>
                </div>
                {dashboardData?.account.expireDate && (
                      <motion.p 
                        className="text-white flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                        style={{ fontFamily: 'Arial, sans-serif' }}
                      >
                        <span className="text-yellow-400">Hết hạn:</span> 
                        <span className={dashboardData?.account.isExpired ? 'text-red-400 font-semibold' : 'text-green-400 font-semibold'}>
                      {new Date(dashboardData.account.expireDate).toLocaleDateString('vi-VN')}
                    </span>
                      </motion.p>
                    )}
                    <motion.p 
                      className="text-white flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      <span className="text-yellow-400">Trạng thái:</span> 
                      <span className={`font-semibold ${dashboardData?.character.isOnline ? 'text-green-400' : 'text-red-400'}`}>
                    {dashboardData?.character.isOnline ? 'Online' : 'Offline'}
                  </span>
                    </motion.p>
              </div>
            </div>
              </div>
            </AnimatedSection>

            {/* Trạng thái game */}
            <AnimatedSection direction="up" delay={0.15}>
              <div className="relative">
                <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
                <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-6">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                  
                  <h3 className="text-xl font-bold text-yellow-400 mb-4 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>Trạng thái game</h3>
              <div className="space-y-2">
                    {[
                      { label: 'Server:', value: 'Online', isOnline: true },
                      { label: 'Cấp độ:', value: dashboardData?.character.level || 0 },
                      { label: 'Class:', value: getClassName(dashboardData?.character.class || 0) },
                      { label: 'Kinh nghiệm:', value: `${formatMoney(dashboardData?.character.experience || 0)}/${formatMoney(dashboardData?.character.nextLevelExp || 0)}` }
                    ].map((item, idx) => (
                      <motion.p 
                        key={idx}
                        className="text-white flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + idx * 0.05 }}
                        style={{ fontFamily: 'Arial, sans-serif' }}
                      >
                        <span className="text-yellow-400">{item.label}</span>
                        <span className={`font-semibold ${item.isOnline ? 'text-green-400' : ''}`}>{item.value}</span>
                      </motion.p>
                    ))}
                    <div className="w-full bg-black/40 rounded-full h-2 mt-2 border border-yellow-500/30">
                      <motion.div 
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                        initial={{ width: 0 }}
                        animate={{ width: `${dashboardData?.character.expProgress || 0}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                      ></motion.div>
                </div>
              </div>
            </div>
              </div>
            </AnimatedSection>

            {/* Thống kê */}
            <AnimatedSection direction="up" delay={0.2}>
              <div className="relative">
                <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
                <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-6">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                  
                  <h3 className="text-xl font-bold text-yellow-400 mb-4 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>Thống kê</h3>
              <div className="space-y-2">
                    {[
                      { label: 'Thời gian chơi:', value: formatTime(dashboardData?.character.playTimeHours || 0, dashboardData?.character.playTimeMinutes || 0) },
                      { label: 'PK Count:', value: dashboardData?.character.pkCount || 0 },
                      { label: 'PK Level:', value: dashboardData?.character.pkLevel || 0 },
                      { label: 'Vị trí:', value: `Map ${dashboardData?.character.mapNumber} (${dashboardData?.character.mapPosX}, ${dashboardData?.character.mapPosY})` }
                    ].map((item, idx) => (
                      <motion.p 
                        key={idx}
                        className="text-white flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + idx * 0.05 }}
                        style={{ fontFamily: 'Arial, sans-serif' }}
                      >
                        <span className="text-yellow-400">{item.label}</span>
                        <span className="font-semibold">{item.value}</span>
                      </motion.p>
                    ))}
              </div>
            </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Character Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Stats */}
            <AnimatedSection direction="up" delay={0.25}>
              <div className="relative min-h-[400px]">
                <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
                <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-6 min-h-[400px]">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                  
                  <h3 className="text-xl font-bold text-yellow-400 mb-4 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>Chỉ số nhân vật</h3>
              <div className="space-y-2">
                {/* Basic Stats */}
                <div className="space-y-2">
                      {[
                        { label: 'Strength:', value: selectedCharacter?.stats.strength || dashboardData?.character.strength, color: 'text-orange-400' },
                        { label: 'Dexterity:', value: selectedCharacter?.stats.dexterity || dashboardData?.character.dexterity, color: 'text-blue-400' },
                        { label: 'Vitality:', value: selectedCharacter?.stats.vitality || dashboardData?.character.vitality, color: 'text-red-400' },
                        { label: 'Energy:', value: selectedCharacter?.stats.energy || dashboardData?.character.energy, color: 'text-purple-400' },
                        { label: 'Leadership:', value: selectedCharacter?.stats.leadership || dashboardData?.character.leadership, color: 'text-yellow-400' }
                      ].map((stat, idx) => (
                        <motion.p 
                          key={idx}
                          className="text-white flex justify-between items-center"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.25 + idx * 0.05 }}
                          style={{ fontFamily: 'Arial, sans-serif' }}
                        >
                          <span className="text-yellow-400">{stat.label}</span> 
                          <span className={`font-bold ${stat.color}`}>{stat.value}</span>
                        </motion.p>
                      ))}
                </div>
                
                {/* Additional Stats */}
                    <div className="pt-3 border-t border-yellow-500/30 mt-3 space-y-2">
                      {[
                        { label: 'Level:', value: selectedCharacter?.level || dashboardData?.character.level, color: 'text-green-400' },
                        { label: 'Class:', value: selectedCharacter?.className || getClassName(dashboardData?.character.class || 0), color: 'text-cyan-400' },
                        { label: 'PK Count:', value: selectedCharacter?.pkCount || dashboardData?.character.pkCount, color: 'text-red-300' },
                        { label: 'PK Level:', value: selectedCharacter?.pkLevel || dashboardData?.character.pkLevel, color: 'text-red-300' },
                        { label: 'Reset Count:', value: selectedCharacter?.resetCount || dashboardData?.character.resetCount, color: 'text-blue-300' },
                        { label: 'Master Reset:', value: selectedCharacter?.masterResetCount || dashboardData?.character.masterResetCount, color: 'text-purple-300' }
                      ].map((stat, idx) => (
                        <motion.p 
                          key={idx}
                          className="text-white flex justify-between items-center"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + idx * 0.05 }}
                          style={{ fontFamily: 'Arial, sans-serif' }}
                        >
                          <span className="text-yellow-400">{stat.label}</span> 
                          <span className={`font-bold ${stat.color}`}>{stat.value}</span>
                        </motion.p>
                      ))}
                </div>
              </div>
            </div>
              </div>
            </AnimatedSection>

            {/* Life & Mana */}
            <AnimatedSection direction="up" delay={0.3}>
              <div className="relative">
                <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
                <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-6">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                  
                  <h3 className="text-xl font-bold text-yellow-400 mb-4 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>HP & MP</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                        <span className="text-yellow-400">Life:</span> <span className="font-semibold">{Math.floor(selectedCharacter?.life || dashboardData?.character.life || 0)}/{Math.floor(selectedCharacter?.maxLife || dashboardData?.character.maxLife || 0)}</span>
                      </p>
                      <div className="w-full bg-black/40 rounded-full h-3 border border-yellow-500/30">
                        <motion.div 
                          className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, ((selectedCharacter?.life || dashboardData?.character.life || 0) / (selectedCharacter?.maxLife || dashboardData?.character.maxLife || 1)) * 100)}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                        ></motion.div>
                </div>
                </div>
                    <div>
                      <p className="text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                        <span className="text-yellow-400">Mana:</span> <span className="font-semibold">{Math.floor(selectedCharacter?.mana || dashboardData?.character.mana || 0)}/{Math.floor(selectedCharacter?.maxMana || dashboardData?.character.maxMana || 0)}</span>
                      </p>
                      <div className="w-full bg-black/40 rounded-full h-3 border border-yellow-500/30">
                        <motion.div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, ((selectedCharacter?.mana || dashboardData?.character.mana || 0) / (selectedCharacter?.maxMana || dashboardData?.character.maxMana || 1)) * 100)}%` }}
                          transition={{ duration: 1, delay: 0.4 }}
                        ></motion.div>
              </div>
            </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Money */}
            <AnimatedSection direction="up" delay={0.35}>
              <div className="relative">
                <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
                <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-6">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                  
                  <h3 className="text-xl font-bold text-yellow-400 mb-4 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>Tiền tệ</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-yellow-400 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>Tiền nhân vật:</p>
                      <p className="text-green-400 font-bold text-lg" style={{ fontFamily: 'Arial, sans-serif' }}>{formatMoney(selectedCharacter?.money || dashboardData?.character.money || 0)} Zen</p>
              </div>
                    <div>
                      <p className="text-yellow-400 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>Tiền kho:</p>
                      <p className="text-green-400 font-bold text-lg" style={{ fontFamily: 'Arial, sans-serif' }}>{formatMoney(dashboardData?.warehouse?.money || 0)} Zen</p>
            </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

          </div>

          {/* Reset Info - Full Width Layout */}
          <AnimatedSection direction="up" delay={0.4}>
            <div className="relative mb-8">
              <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
              <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-6">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
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
              </div>
            </AnimatedSection>

          {/* Guild Info */}
          {dashboardData?.guild && (
            <AnimatedSection direction="up" delay={0.45}>
              <div className="relative mb-8">
                <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
                <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-6">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                  
                  <h3 className="text-xl font-bold text-yellow-400 mb-4 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>Thông tin Guild</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white" style={{ fontFamily: 'Arial, sans-serif' }}><span className="text-yellow-400">Tên Guild:</span> <span className="font-semibold">{dashboardData.guild.name}</span></p>
                      <p className="text-white" style={{ fontFamily: 'Arial, sans-serif' }}><span className="text-yellow-400">Guild Master:</span> <span className="font-semibold">{dashboardData.guild.master}</span></p>
                    </div>
                    <div>
                      <p className="text-white" style={{ fontFamily: 'Arial, sans-serif' }}><span className="text-yellow-400">Điểm số:</span> <span className="font-semibold">{formatMoney(dashboardData.guild.score)}</span></p>
                      <p className="text-white" style={{ fontFamily: 'Arial, sans-serif' }}><span className="text-yellow-400">Số thành viên:</span> <span className="font-semibold">{dashboardData.guild.memberCount}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <AnimatedSection direction="up" delay={0.5}>
              <div className="relative">
                <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
                <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-8 text-center">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                  
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>Bắt đầu chơi</h3>
                  <p className="text-gray-300 mb-6" style={{ fontFamily: 'Arial, sans-serif' }}>Tải game và bắt đầu hành trình Mu Online</p>
                  <Link href="/download">
                    <motion.div
                      className="bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border border-yellow-500/60 text-yellow-300 font-bold py-3 px-6 rounded-lg mu-button-glow inline-block"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
              >
                TẢI GAME NGAY
                    </motion.div>
                  </Link>
            </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.55}>
              <div className="relative">
                <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
                <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-8 text-center">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                  
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>Thông tin server</h3>
                  <p className="text-gray-300 mb-6" style={{ fontFamily: 'Arial, sans-serif' }}>Xem thông tin chi tiết về server và cài đặt</p>
                  <Link href="/info">
                    <motion.div
                      className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/60 text-blue-300 font-bold py-3 px-6 rounded-lg mu-button-glow inline-block"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
              >
                XEM THÔNG TIN
                    </motion.div>
                  </Link>
            </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </main>



      {/* Account Management Modal */}
      <MuClassicModal
        isOpen={showAccountModal}
        onClose={() => setShowAccountModal(false)}
        title="Quản lý tài khoản"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-yellow-400 text-sm mb-1 font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>Tên hiển thị:</label>
            <input
              type="text"
              defaultValue={user?.memb_name || ''}
              id="memb_name"
              className="w-full bg-black/40 text-white px-3 py-2 rounded border border-yellow-500/30 focus:border-yellow-400/60 focus:outline-none"
              style={{ fontFamily: 'Arial, sans-serif' }}
            />
          </div>
          
          <div>
            <label className="block text-yellow-400 text-sm mb-1 font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>Email:</label>
            <input
              type="email"
              id="mail_addr"
              className="w-full bg-black/40 text-white px-3 py-2 rounded border border-yellow-500/30 focus:border-yellow-400/60 focus:outline-none"
              style={{ fontFamily: 'Arial, sans-serif' }}
            />
          </div>
          
          <div>
            <label className="block text-yellow-400 text-sm mb-1 font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>Số điện thoại:</label>
            <input
              type="tel"
              id="phon_numb"
              className="w-full bg-black/40 text-white px-3 py-2 rounded border border-yellow-500/30 focus:border-yellow-400/60 focus:outline-none"
              style={{ fontFamily: 'Arial, sans-serif' }}
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <motion.button
              onClick={() => {
                const updateData = {
                  memb_name: (document.getElementById('memb_name') as HTMLInputElement)?.value,
                  mail_addr: (document.getElementById('mail_addr') as HTMLInputElement)?.value,
                  phon_numb: (document.getElementById('phon_numb') as HTMLInputElement)?.value,
                };
                handleUpdateAccount(updateData);
              }}
              disabled={updateLoading}
              className="flex-1 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border border-yellow-500/60 text-yellow-300 px-4 py-2 rounded mu-button-glow disabled:opacity-50"
              style={{ fontFamily: 'Arial, sans-serif' }}
              whileHover={!updateLoading ? { scale: 1.05 } : {}}
              whileTap={!updateLoading ? { scale: 0.95 } : {}}
            >
              {updateLoading ? 'Đang cập nhật...' : 'Cập nhật'}
            </motion.button>
            
            <motion.button
              onClick={() => {
                setShowAccountModal(false);
                setShowPasswordModal(true);
              }}
              className="flex-1 bg-gradient-to-r from-green-600/30 to-emerald-600/30 border border-green-500/60 text-green-300 px-4 py-2 rounded mu-button-glow"
              style={{ fontFamily: 'Arial, sans-serif' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Đổi mật khẩu
            </motion.button>
          </div>
        </div>
      </MuClassicModal>

      {/* Password Change Modal */}
      <MuClassicModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="Đổi mật khẩu"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-yellow-400 text-sm mb-1 font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>Mật khẩu hiện tại:</label>
            <input
              type="password"
              id="currentPassword"
              className="w-full bg-black/40 text-white px-3 py-2 rounded border border-yellow-500/30 focus:border-yellow-400/60 focus:outline-none"
              style={{ fontFamily: 'Arial, sans-serif' }}
            />
          </div>
          
          <div>
            <label className="block text-yellow-400 text-sm mb-1 font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>Mật khẩu mới:</label>
            <input
              type="password"
              id="newPassword"
              className="w-full bg-black/40 text-white px-3 py-2 rounded border border-yellow-500/30 focus:border-yellow-400/60 focus:outline-none"
              style={{ fontFamily: 'Arial, sans-serif' }}
            />
          </div>
          
          <div>
            <label className="block text-yellow-400 text-sm mb-1 font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>Xác nhận mật khẩu mới:</label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full bg-black/40 text-white px-3 py-2 rounded border border-yellow-500/30 focus:border-yellow-400/60 focus:outline-none"
              style={{ fontFamily: 'Arial, sans-serif' }}
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <motion.button
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
              className="flex-1 bg-gradient-to-r from-green-600/30 to-emerald-600/30 border border-green-500/60 text-green-300 px-4 py-2 rounded mu-button-glow disabled:opacity-50"
              style={{ fontFamily: 'Arial, sans-serif' }}
              whileHover={!updateLoading ? { scale: 1.05 } : {}}
              whileTap={!updateLoading ? { scale: 0.95 } : {}}
            >
              {updateLoading ? 'Đang đổi...' : 'Đổi mật khẩu'}
            </motion.button>
            
            <motion.button
              onClick={() => setShowPasswordModal(false)}
              className="flex-1 bg-gradient-to-r from-gray-600/30 to-gray-700/30 border border-gray-500/60 text-gray-300 px-4 py-2 rounded mu-button-glow"
              style={{ fontFamily: 'Arial, sans-serif' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hủy
            </motion.button>
          </div>
        </div>
      </MuClassicModal>
      </div>
    </div>
  );
}
