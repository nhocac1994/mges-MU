'use client';

import React, { useState, useEffect } from 'react';

interface Character {
  Name: string;
  cLevel: number;
  Class: number;
  Experience: number;
  ResetCount: number;
  MasterResetCount: number;
  PkCount: number;
  Money: number;
  Strength: number;
  Dexterity: number;
  Vitality: number;
  Energy: number;
  Leadership: number;
}

interface Guild {
  G_Name: string;
  G_Score: number;
  G_Master: string;
  G_Count: number;
  G_Mark: Buffer;
}

interface CharacterRanking {
  topLevel: Character[];
  topMasterReset: Character[];
  topReset: Character[];
  topPk: Character[];
}

interface GuildRanking {
  topGuildScore: Guild[];
  topGuildMembers: Guild[];
}

const RankingSection: React.FC = () => {
  const [characterRankings, setCharacterRankings] = useState<CharacterRanking | null>(null);
  const [guildRankings, setGuildRankings] = useState<GuildRanking | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRankings = async () => {
    try {
      setLoading(true);
      
      // Fetch character rankings
      const characterResponse = await fetch('/api/ranking/characters-new');
      const characterData = await characterResponse.json();
      
      if (characterData.success) {
        setCharacterRankings(characterData.data);
      }

      // Fetch guild rankings
      const guildResponse = await fetch('/api/ranking/guilds-new');
      const guildData = await guildResponse.json();
      
      if (guildData.success) {
        setGuildRankings(guildData.data);
      }

    } catch (error) {
      console.error('Error fetching rankings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  const getClassName = (classId: number) => {
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
      49: 'Dark Lord',
      64: 'Dark Lord',
      65: 'Lord Emperor',
      80: 'Summoner',
      81: 'Bloody Summoner',
      82: 'Dimension Master'
    };
    return classNames[classId] || `Class ${classId}`;
  };

  if (loading) {
    return (
      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30">
        <h3 className="text-xl font-bold text-white mb-4">🏆 Bảng Xếp Hạng</h3>
        <div className="text-center py-8">
          <div className="loading-spinner w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30">
      <h3 className="text-xl font-bold text-white mb-6">🏆 Bảng Xếp Hạng</h3>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Character Rankings */}
        <div>
          <h4 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Top Nhân Vật
          </h4>
          
          {characterRankings && (
            <div className="space-y-4">
              {/* Top Level */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h5 className="text-white font-semibold mb-3">🔥 Top Level</h5>
                <div className="space-y-2">
                  {characterRankings.topLevel.slice(0, 5).map((char, index) => (
                    <div key={index} className="flex items-center justify-between bg-white/5 rounded p-2">
                      <div className="flex items-center gap-3">
                        <span className="text-yellow-400 font-bold">#{index + 1}</span>
                        <div>
                          <div className="text-white font-semibold">{char.Name}</div>
                          <div className="text-gray-400 text-sm">{getClassName(char.Class)}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-blue-400 font-bold">Lv.{char.cLevel}</div>
                        <div className="text-gray-400 text-sm">{char.ResetCount} Reset</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Master Reset */}
              {characterRankings.topMasterReset.length > 0 && (
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h5 className="text-white font-semibold mb-3">👑 Top Master Reset</h5>
                  <div className="space-y-2">
                    {characterRankings.topMasterReset.slice(0, 3).map((char, index) => (
                      <div key={index} className="flex items-center justify-between bg-white/5 rounded p-2">
                        <div className="flex items-center gap-3">
                          <span className="text-purple-400 font-bold">#{index + 1}</span>
                          <div>
                            <div className="text-white font-semibold">{char.Name}</div>
                            <div className="text-gray-400 text-sm">{getClassName(char.Class)}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-purple-400 font-bold">{char.MasterResetCount} MR</div>
                          <div className="text-gray-400 text-sm">Lv.{char.cLevel}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Guild Rankings */}
        <div>
          <h4 className="text-lg font-semibold text-green-400 mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Top Guild
          </h4>
          
          {guildRankings && (
            <div className="space-y-4">
              {/* Top Guild Score */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h5 className="text-white font-semibold mb-3">🏆 Top Guild Score</h5>
                <div className="space-y-2">
                  {guildRankings.topGuildScore.slice(0, 5).map((guild, index) => (
                    <div key={index} className="flex items-center justify-between bg-white/5 rounded p-2">
                      <div className="flex items-center gap-3">
                        <span className="text-green-400 font-bold">#{index + 1}</span>
                        <div>
                          <div className="text-white font-semibold">{guild.G_Name}</div>
                          <div className="text-gray-400 text-sm">Master: {guild.G_Master}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold">{guild.G_Score} Score</div>
                        <div className="text-gray-400 text-sm">{guild.G_Count || 0} Members</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RankingSection;
