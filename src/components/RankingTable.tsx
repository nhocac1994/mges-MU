'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';

interface CharacterRank {
  account: string;
  character: string;
  class: number;
  resets: number;
  level?: number;
  pkcount?: number;
  isOnline?: boolean | number;
  mapName?: string;
}

interface RankingTableProps {
  title: string;
  endpoint: string;
}

const classNames: { [key: number]: string } = {
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
  81: 'Fist Master',
  96: 'Grow Lancer',
  97: 'Mirage Lancer'
};

export default function RankingTable({ title, endpoint }: RankingTableProps) {
  const [characters, setCharacters] = useState<CharacterRank[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const fetchRankings = async (searchName?: string) => {
    try {
      setLoading(true);
      setIsSearching(!!searchName);
      
      const url = searchName 
        ? `/api/characters/search?name=${encodeURIComponent(searchName)}`
        : `/api/rankings/${endpoint}`;
        
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP ${response.status}` }));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setCharacters(data.data);
        setIsSearchMode(!!searchName);
        setError(null); // Clear error nếu thành công
      } else {
        setError(data.message || 'Lỗi khi tải dữ liệu ranking');
      }
    } catch (err: any) {
      const errorMessage = err?.message || 'Lỗi khi tải dữ liệu ranking';
      setError(errorMessage);

    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, [endpoint]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchRankings(searchTerm.trim());
    } else {
      fetchRankings();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setIsSearchMode(false);
    fetchRankings();
  };

  const getClassName = (classId: number) => {
    return classNames[classId] || `Class ${classId}`;
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  if (loading) {
    return (
      <AnimatedSection direction="up" delay={0.1}>
        <div className="relative">
          <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
          <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-6">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
            
            <h2 className="text-2xl font-bold text-yellow-400 mb-4 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>{title}</h2>
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    );
  }

  if (error) {
    return (
      <AnimatedSection direction="up" delay={0.1}>
        <div className="relative">
          <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
          <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-6">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
            
            <h2 className="text-2xl font-bold text-yellow-400 mb-4 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>{title}</h2>
            <div className="text-red-400 text-center">{error}</div>
          </div>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection direction="up" delay={0.1}>
      <div className="relative">
        {/* Border Glow Effect */}
        <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
        
        <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-6">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
          
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>{title}</h2>
          
          {/* Search Box - Classic MU Style */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
              <div className="relative bg-black/40 border border-yellow-500/30 rounded-lg p-2 flex gap-2">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/50"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/50"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/50"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/50"></div>
                
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tên nhân vật..."
                  className="flex-1 px-4 py-2 bg-black/60 text-white border border-yellow-500/30 rounded focus:outline-none focus:border-yellow-400/60 transition-colors"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                />
                <motion.button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="px-6 py-2 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border border-yellow-500/60 text-yellow-300 rounded font-semibold mu-button-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                  whileHover={{ scale: isSearching ? 1 : 1.05 }}
                  whileTap={{ scale: isSearching ? 1 : 0.95 }}
                >
                  {isSearching ? '🔍' : 'Tìm kiếm'}
                </motion.button>
                {isSearchMode && (
                  <motion.button
                    onClick={handleClearSearch}
                    className="px-4 py-2 bg-black/60 hover:bg-black/80 text-white rounded font-medium transition-colors border border-yellow-500/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ✕
                  </motion.button>
                )}
              </div>
            </div>
            {isSearchMode && (
              <motion.p 
                className="text-sm text-yellow-400 mt-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                🔍 Đang hiển thị kết quả tìm kiếm cho &quot;{searchTerm}&quot; ({characters.length} kết quả)
              </motion.p>
            )}
          </div>
      
          <div className="overflow-x-auto">
            <div className="relative">
              {/* Table Container with Classic Style */}
              <div className="relative bg-black/40 rounded-lg border border-yellow-500/30 overflow-hidden">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/50"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/50"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/50"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/50"></div>
                
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b-2 border-yellow-500/60 bg-black/60">
                      <th className="text-left py-3 px-2 sm:px-4 text-yellow-400 font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>Hạng</th>
                      <th className="text-left py-3 px-2 sm:px-4 text-yellow-400 font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>Nhân vật</th>
                      <th className="text-left py-3 px-2 sm:px-4 text-yellow-400 font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>Class</th>
                      <th className="text-left py-3 px-2 sm:px-4 text-yellow-400 font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>Resets</th>
                      {isSearchMode && (
                        <>
                          <th className="text-left py-3 px-2 sm:px-4 text-yellow-400 font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>Level</th>
                          <th className="text-left py-3 px-2 sm:px-4 text-yellow-400 font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>PK</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {characters.map((char, index) => (
                      <motion.tr
                        key={`${char.account}-${char.character}`}
                        className="border-b border-yellow-500/20 hover:bg-yellow-500/10 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02 }}
                        whileHover={{ scale: 1.01, x: 5 }}
                      >
                        <td className="py-3 px-2 sm:px-4 text-yellow-300 font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>
                          {isSearchMode ? `#${index + 1}` : getRankIcon(index)}
                        </td>
                        <td className="py-3 px-2 sm:px-4 text-white font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>
                          <span>{char.character}</span>
                          {(() => {
                            const isOnline = char.isOnline === 1 || char.isOnline === true;
                            const status = isOnline ? 'online' : 'offline';
                            const map = char.mapName ? `-${char.mapName.toLowerCase()}` : '';
                            const statusClass = isOnline ? 'text-green-400' : 'text-gray-500';
                            return (
                              <span className={`ml-2 font-semibold ${statusClass}`}>
                                ({status}{map})
                              </span>
                            );
                          })()}
                        </td>
                        <td className="py-3 px-2 sm:px-4 text-blue-300" style={{ fontFamily: 'Arial, sans-serif' }}>
                          {getClassName(char.class)}
                        </td>
                        <td className="py-3 px-2 sm:px-4 text-purple-300 font-bold mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
                          {char.resets.toLocaleString()}
                        </td>
                        {isSearchMode && (
                          <>
                            <td className="py-3 px-2 sm:px-4 text-green-300" style={{ fontFamily: 'Arial, sans-serif' }}>
                              {char.level || 'N/A'}
                            </td>
                            <td className="py-3 px-2 sm:px-4 text-red-300" style={{ fontFamily: 'Arial, sans-serif' }}>
                              {char.pkcount || 'N/A'}
                            </td>
                          </>
                        )}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {characters.length === 0 && (
            <motion.div 
              className="text-center text-yellow-400 py-8 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {isSearchMode ? `Không tìm thấy nhân vật nào với tên "${searchTerm}"` : 'Chưa có dữ liệu ranking'}
            </motion.div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}
