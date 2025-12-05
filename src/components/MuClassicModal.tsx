'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MuClassicModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  type?: 'event' | 'news';
  eventName?: string;
  eventTime?: string;
  newsDate?: string;
  newsType?: string;
}

const MuClassicModal: React.FC<MuClassicModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  type = 'event',
  eventName,
  eventTime,
  newsDate,
  newsType
}) => {
  // Đóng modal khi nhấn ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Ngăn scroll body khi modal mở
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ 
              type: 'spring',
              damping: 25,
              stiffness: 300,
              duration: 0.4
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-2 md:p-4 pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-[95vw] md:max-w-2xl max-h-[95vh] md:max-h-[90vh] overflow-hidden pointer-events-auto">
              {/* Border Glow Effect */}
              <div className="absolute inset-0 mu-modal-border-glow"></div>
              
              {/* Main Content */}
              <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-yellow-500/60 mu-modal-container">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-yellow-600/20 via-orange-600/20 to-yellow-600/20 border-b-2 border-yellow-500/60 px-3 py-2 md:px-6 md:py-4">
                  {/* Shimmer effect trên header */}
                  <div className="absolute inset-0 mu-modal-shimmer"></div>
                  
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse mu-dot-glow"></div>
                      <h2 className="text-lg md:text-2xl font-bold text-yellow-300 mu-text-glow">
                        {title}
                      </h2>
                    </div>
                    <button
                      onClick={onClose}
                      className="text-yellow-400 hover:text-yellow-300 transition-colors text-xl md:text-2xl font-bold mu-close-button"
                      aria-label="Đóng"
                    >
                      ✕
                    </button>
                  </div>
                  
                  {/* Event/News Info */}
                  {(type === 'event' && eventName && eventTime) && (
                    <div className="mt-2 md:mt-3 flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm">
                      <span className="text-yellow-400 font-semibold">Sự kiện:</span>
                      <span className="text-white">{eventName}</span>
                      <span className="text-gray-400 hidden md:inline">|</span>
                      <span className="text-yellow-400 font-semibold">Thời gian:</span>
                      <span className="text-white font-mono">{eventTime}</span>
                    </div>
                  )}
                  
                  {(type === 'news' && newsDate && newsType) && (
                    <div className="mt-2 md:mt-3 flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm">
                      <span className={`px-2 md:px-3 py-1 rounded text-xs font-semibold ${
                        newsType === 'Guide' ? 'bg-blue-600 text-white' :
                        newsType === 'Notice' ? 'bg-red-600 text-white' :
                        newsType === 'Update' ? 'bg-purple-600 text-white' :
                        'bg-gray-600 text-white'
                      }`}>
                        {newsType}
                      </span>
                      <span className="text-gray-400 hidden md:inline">|</span>
                      <span className="text-yellow-400 font-semibold">Ngày:</span>
                      <span className="text-white">{newsDate}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-3 md:p-6 overflow-y-auto max-h-[calc(95vh-140px)] md:max-h-[calc(90vh-180px)] mu-modal-content">
                  {children}
                </div>

                {/* Footer */}
                <div className="relative bg-gradient-to-r from-yellow-600/10 via-orange-600/10 to-yellow-600/10 border-t-2 border-yellow-500/60 px-3 py-2 md:px-6 md:py-4">
                  <div className="flex justify-end">
                    <button
                      onClick={onClose}
                      className="px-4 py-1.5 md:px-6 md:py-2 text-sm md:text-base bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border border-yellow-500/60 text-yellow-300 font-semibold hover:from-yellow-600/50 hover:to-orange-600/50 transition-all duration-300 mu-button-glow"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MuClassicModal;

