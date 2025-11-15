'use client';

import { useState, useEffect } from 'react';

interface GuildRank {
  guildName: string;
  score: number;
  guildMaster: string;
  memberCount: number;
  guildMark?: string | null;
}

interface GuildRankingTableProps {
  title: string;
  endpoint: string;
}

export default function GuildRankingTable({ title, endpoint }: GuildRankingTableProps) {
  const [guilds, setGuilds] = useState<GuildRank[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingSample, setIsAddingSample] = useState(false);

  const fetchGuildRankings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/rankings/${endpoint}`);
      const data = await response.json();
      
      if (data.success) {
        setGuilds(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Lỗi khi tải dữ liệu guild ranking');
    } finally {
      setLoading(false);
    }
  };

  const addSampleGuilds = async () => {
    try {
      setIsAddingSample(true);
      const response = await fetch('/api/guilds/sample', { method: 'POST' });
      const data = await response.json();
      
      if (data.success) {
        alert(data.message);
        // Reload data after adding samples
        await fetchGuildRankings();
      } else {
        alert('Lỗi: ' + data.message);
      }
    } catch (err) {
      alert('Lỗi khi thêm dữ liệu mẫu');
    } finally {
      setIsAddingSample(false);
    }
  };

  useEffect(() => {
    fetchGuildRankings();
  }, [endpoint]);

  const getRankIcon = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  const getGuildLogo = (guildName: string) => {
    if (!guildName) return null;
    
    // Tạo logo đơn giản từ tên guild
    const firstLetter = guildName.charAt(0).toUpperCase();
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 
      'bg-purple-500', 'bg-yellow-500', 'bg-pink-500',
      'bg-indigo-500', 'bg-orange-500', 'bg-teal-500', 'bg-cyan-500'
    ];
    const colorIndex = guildName.length % colors.length;
    
    return (
      <div className={`w-8 h-8 ${colors[colorIndex]} rounded flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
        {firstLetter}
      </div>
    );
  };

  const formatValue = (value: number | string) => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value.toString();
  };

  if (loading) {
    return (
      <div className="bg-black/80 rounded-lg p-6 border border-gray-800">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">{title}</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black/80 rounded-lg p-6 border border-gray-800">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">{title}</h2>
        <div className="text-red-400 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-black/80 rounded-lg p-6 border border-gray-800">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">{title}</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-2 sm:py-3 px-1 sm:px-2 text-yellow-400">Hạng</th>
              <th className="text-left py-2 sm:py-3 px-1 sm:px-2 text-yellow-400">Logo</th>
              <th className="text-left py-2 sm:py-3 px-1 sm:px-2 text-yellow-400">Tên Guild</th>
              <th className="text-left py-2 sm:py-3 px-1 sm:px-2 text-yellow-400">Guild Master</th>
              <th className="text-left py-2 sm:py-3 px-1 sm:px-2 text-yellow-400">Thành viên</th>
              <th className="text-left py-2 sm:py-3 px-1 sm:px-2 text-yellow-400">Điểm số</th>
            </tr>
          </thead>
          <tbody>
            {guilds.map((guild, index) => (
              <tr key={guild.guildName} className="border-b border-gray-800 hover:bg-black/60">
                <td className="py-2 sm:py-3 px-1 sm:px-2 text-yellow-300 font-bold">
                  {getRankIcon(index)}
                </td>
                <td className="py-2 sm:py-3 px-1 sm:px-2">
                  {getGuildLogo(guild.guildName)}
                </td>
                <td className="py-2 sm:py-3 px-1 sm:px-2 text-white font-medium">
                  {guild.guildName || 'Unknown'}
                </td>
                <td className="py-2 sm:py-3 px-1 sm:px-2 text-blue-300">
                  {guild.guildMaster || 'Unknown'}
                </td>
                <td className="py-2 sm:py-3 px-1 sm:px-2 text-green-300">
                  {formatValue(guild.memberCount)}
                </td>
                <td className="py-2 sm:py-3 px-1 sm:px-2 text-purple-300 font-bold">
                  {formatValue(guild.score)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {guilds.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          <div className="mb-4">
            <div className="text-6xl mb-2">🏰</div>
            <p className="text-lg font-medium">Chưa có dữ liệu guild</p>
            <p className="text-sm mt-2 mb-4">Có thể database chưa có guild nào hoặc dữ liệu chưa được cập nhật</p>
            <button
              onClick={addSampleGuilds}
              disabled={isAddingSample}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {isAddingSample ? 'Đang thêm...' : '➕ Thêm dữ liệu mẫu'}
            </button>
          </div>
        </div>
      )}
      
      {guilds.length > 0 && (
        <div className="mt-4 text-center text-gray-400 text-sm">
          Hiển thị {guilds.length} guild đầu tiên
        </div>
      )}
    </div>
  );
}
