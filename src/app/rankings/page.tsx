'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RankingTable from '@/components/RankingTable';
import GuildRankingTable from '@/components/GuildRankingTable';
import NetworkOverlay from '@/components/NetworkOverlay';
import FloatingParticles from '@/components/FloatingParticles';
import AnimatedSection from '@/components/AnimatedSection';
import { useConfig } from '@/contexts/ConfigContext';

export default function RankingsPage() {
  const [activeTab, setActiveTab] = useState<'characters' | 'guilds'>('characters');
  const { config } = useConfig();

  // Đảm bảo config có giá trị
  if (!config) {
    return null;
  }

  return (
    <div className="relative" style={{
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
        <section className="py-20 bg-gradient-to-b from-black/40 to-black/60 relative overflow-x-hidden md:overflow-hidden">
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
                  BẢNG XẾP HẠNG
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
                  BẢNG XẾP HẠNG
                </motion.div>
              </motion.h1>
              <AnimatedSection direction="up" delay={0.2}>
                <div className="text-2xl font-semibold text-blue-300 mb-4">
                  <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                    Top players và guilds của {config.nameGame}
                  </span>
                </div>
              </AnimatedSection>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4">

          {/* Tab Navigation - Classic MU Style */}
          <AnimatedSection direction="up" delay={0.3}>
            <div className="flex justify-center mb-8">
              <div className="relative w-full max-w-md">
                {/* Border Glow Effect */}
                <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
                
                <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 rounded-lg p-1 flex">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500/50"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500/50"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500/50"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500/50"></div>
                  
                  <motion.button
                    onClick={() => setActiveTab('characters')}
                    className={`flex-1 px-3 sm:px-6 py-3 rounded-lg font-bold transition-all text-sm sm:text-base relative ${
                      activeTab === 'characters'
                        ? 'bg-gradient-to-r from-yellow-600/30 to-orange-600/30 text-yellow-300 border border-yellow-500/60 mu-button-glow'
                        : 'text-gray-300 hover:text-yellow-300 hover:bg-black/60'
                    }`}
                    style={{ fontFamily: 'Arial, sans-serif' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🏆 Top Resets
                  </motion.button>
                  <motion.button
                    onClick={() => setActiveTab('guilds')}
                    className={`flex-1 px-3 sm:px-6 py-3 rounded-lg font-bold transition-all text-sm sm:text-base relative ${
                      activeTab === 'guilds'
                        ? 'bg-gradient-to-r from-yellow-600/30 to-orange-600/30 text-yellow-300 border border-yellow-500/60 mu-button-glow'
                        : 'text-gray-300 hover:text-yellow-300 hover:bg-black/60'
                    }`}
                    style={{ fontFamily: 'Arial, sans-serif' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🏰 Top Guilds
                  </motion.button>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <div className="max-w-6xl mx-auto">
            {/* Character Rankings */}
            {activeTab === 'characters' && (
              <RankingTable
                title="🏆 Top 100 Resets"
                endpoint="level"
              />
            )}

            {/* Guild Rankings */}
            {activeTab === 'guilds' && (
              <GuildRankingTable
                title="🏰 Top 50 Guilds"
                endpoint="guild"
              />
            )}
          </div>

          {/* Ranking Info - Classic MU Style */}
          <AnimatedSection direction="up" delay={0.4}>
            <div className="mt-8 relative max-w-6xl mx-auto">
              {/* Border Glow Effect */}
              <div className="absolute inset-0 mu-modal-border-glow rounded-lg"></div>
              
              <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-6">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-500/60"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-500/60"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-500/60"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-500/60"></div>
                
                <h3 className="text-xl font-bold text-yellow-400 mb-4 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
                  📋 Thông tin về Ranking
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  {[
                    { 
                      title: '🏆 Top Resets:', 
                      items: [
                        'Xếp hạng dựa trên tổng số resets của nhân vật',
                        'Hiển thị top 100 người chơi đầu tiên',
                        'Chỉ tính các nhân vật có CtlCode < 8 hoặc NULL'
                      ],
                      color: 'blue'
                    },
                    { 
                      title: '🏰 Top Guilds:', 
                      items: [
                        'Xếp hạng dựa trên điểm số guild (G_Score)',
                        'Hiển thị top 50 guild đầu tiên',
                        'Bao gồm Guild Master và số thành viên'
                      ],
                      color: 'purple'
                    }
                  ].map((info, idx) => (
                    <motion.div
                      key={idx}
                      className="relative bg-black/40 rounded-lg p-4 border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 mu-command-card"
                      initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      {/* Corner decorations */}
                      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/50"></div>
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/50"></div>
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/50"></div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/50"></div>
                      
                      <h4 className="font-bold text-yellow-300 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>{info.title}</h4>
                      <ul className="space-y-2 text-gray-300">
                        {info.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse mu-dot-glow" style={{animationDelay: `${i * 0.2}s`}}></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
      </div>

    </div>
  );
}
