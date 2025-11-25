'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DownloadLinksProps {
  mega?: string;
  media?: string;
  launcher?: string;
}

/**
 * Component hiển thị download links (mega, media, launcher) - Classic MU Season 1 Style
 */
export default function DownloadLinks({ mega, media, launcher }: DownloadLinksProps) {
  const downloadOptions = [
    { 
      name: 'MEGA', 
      url: mega, 
      color: 'red',
      icon: '📦',
      description: 'Tải từ Mega',
      bgGradient: 'from-red-600 to-red-700'
    },
    { 
      name: 'MEDIAFIRE', 
      url: media, 
      color: 'orange',
      icon: '💾',
      description: 'Tải từ MediaFire',
      bgGradient: 'from-orange-600 to-orange-700'
    },
    { 
      name: 'LAUNCHER', 
      url: launcher, 
      color: 'green',
      icon: '🚀',
      description: 'Tải Launcher',
      bgGradient: 'from-green-600 to-green-700'
    }
  ].filter(option => option.url);

  return (
    <div className="relative">
      {/* Border Glow Effect */}
      <div className="absolute inset-0 mu-modal-border-glow"></div>
      
      {/* Main Container */}
      <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container rounded-lg p-8">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-yellow-600/20 via-orange-600/20 to-yellow-600/20 border-b-2 border-yellow-500/60 px-6 py-4 mb-6 -mx-8 -mt-8 rounded-t-lg">
          <div className="absolute inset-0 mu-modal-shimmer"></div>
          <div className="relative flex items-center gap-3">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse mu-dot-glow"></div>
            <h2 className="text-3xl font-bold text-yellow-300 mu-text-glow" style={{ fontFamily: 'Arial, sans-serif' }}>
              TẢI GAME
            </h2>
          </div>
        </div>

        {downloadOptions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {downloadOptions.map((option, index) => (
              <motion.a
                key={index}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative bg-black/40 rounded-lg p-6 border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 group mu-command-card cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, type: 'spring', damping: 20 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500/50"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500/50"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500/50"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500/50"></div>
                
                <div className="text-center">
                  <div className="text-4xl mb-3">{option.icon}</div>
                  <div 
                    className={`font-bold text-xl mb-2 transition-colors ${
                      option.color === 'red' ? 'text-red-400 group-hover:text-red-300' :
                      option.color === 'orange' ? 'text-orange-400 group-hover:text-orange-300' :
                      'text-green-400 group-hover:text-green-300'
                    }`} 
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    {option.name}
                  </div>
                  <div className="text-gray-300 text-sm group-hover:text-white transition-colors">
                    {option.description}
                  </div>
                  <div className="mt-4 text-yellow-400 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Click để tải →
                  </div>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/0 via-yellow-600/10 to-yellow-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </motion.a>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">
            <div className="text-yellow-400 mb-2">⚠️</div>
            <p>Chưa có link tải game. Vui lòng liên hệ admin.</p>
          </div>
        )}
      </div>
    </div>
  );
}

