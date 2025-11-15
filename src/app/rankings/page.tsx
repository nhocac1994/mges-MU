'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RankingTable from '@/components/RankingTable';
import GuildRankingTable from '@/components/GuildRankingTable';
import NetworkOverlay from '@/components/NetworkOverlay';

export default function RankingsPage() {
  const [activeTab, setActiveTab] = useState<'characters' | 'guilds'>('characters');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
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

  return (
    <div className="min-h-screen relative" style={{
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
      <div className="fixed inset-0 bg-black/70 -z-10"></div>
      
      {/* Content */}
      <div className="relative z-10 pt-28">
      {/* Main Content */}
      <main className="relative z-10 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-yellow-400 mb-4">
              Bảng Xếp Hạng MuOnline
            </h1>
            <p className="text-gray-300 text-lg">
              Top players và guilds của server
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-black/80 rounded-lg p-1 flex w-full max-w-md border border-gray-800">
              <button
                onClick={() => setActiveTab('characters')}
                className={`flex-1 px-3 sm:px-6 py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                  activeTab === 'characters'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-black/60'
                }`}
              >
                🏆 Top Resets
              </button>
              <button
                onClick={() => setActiveTab('guilds')}
                className={`flex-1 px-3 sm:px-6 py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                  activeTab === 'guilds'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-black/60'
                }`}
              >
                🏰 Top Guilds
              </button>
            </div>
          </div>

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

          <div className="mt-8 bg-black/80 rounded-lg p-6 max-w-6xl mx-auto border border-gray-800">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">
              📋 Thông tin về Ranking
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
              <div>
                <h4 className="font-bold text-yellow-300 mb-2">🏆 Top Resets:</h4>
                <ul className="space-y-1">
                  <li>• Xếp hạng dựa trên tổng số resets của nhân vật</li>
                  <li>• Hiển thị top 100 người chơi đầu tiên</li>
                  <li>• Chỉ tính các nhân vật có CtlCode &lt; 8 hoặc NULL</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-yellow-300 mb-2">🏰 Top Guilds:</h4>
                <ul className="space-y-1">
                  <li>• Xếp hạng dựa trên điểm số guild (G_Score)</li>
                  <li>• Hiển thị top 50 guild đầu tiên</li>
                  <li>• Bao gồm Guild Master và số thành viên</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-red-900/20"></div>
      </div>
    </div>
  );
}
