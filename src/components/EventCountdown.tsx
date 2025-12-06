'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNotifications } from '@/hooks/useNotifications';
import MuClassicModal from '@/components/MuClassicModal';
import EventSkeleton from '@/components/EventSkeleton';

interface EventFromAPI {
  name: string;
  description: string;
  timeSlots: string[]; // Array of time strings like ["0:00", "2:00", "4:00"]
  isActive?: boolean;
}

interface Event {
  name: string;
  description: string;
  duration: number; // in minutes
  color: string;
  bgColor: string;
  borderColor: string;
  timeSlots: string[];
  schedule: (hour: number, minute: number) => boolean; // Function to check if event should run
}

// Color palette for events
const eventColors = [
  { color: 'text-red-400', bgColor: 'from-red-600/20 to-orange-600/20', borderColor: 'border-red-500/30' },
  { color: 'text-yellow-400', bgColor: 'from-yellow-600/20 to-orange-600/20', borderColor: 'border-yellow-500/30' },
  { color: 'text-blue-400', bgColor: 'from-blue-600/20 to-purple-600/20', borderColor: 'border-blue-500/30' },
  { color: 'text-purple-400', bgColor: 'from-purple-600/20 to-pink-600/20', borderColor: 'border-purple-500/30' },
  { color: 'text-green-400', bgColor: 'from-green-600/20 to-teal-600/20', borderColor: 'border-green-500/30' },
  { color: 'text-cyan-400', bgColor: 'from-cyan-600/20 to-blue-600/20', borderColor: 'border-cyan-500/30' },
  { color: 'text-pink-400', bgColor: 'from-pink-600/20 to-red-600/20', borderColor: 'border-pink-500/30' },
  { color: 'text-indigo-400', bgColor: 'from-indigo-600/20 to-purple-600/20', borderColor: 'border-indigo-500/30' },
  { color: 'text-emerald-400', bgColor: 'from-emerald-600/20 to-green-600/20', borderColor: 'border-emerald-500/30' },
  { color: 'text-rose-400', bgColor: 'from-rose-600/20 to-pink-600/20', borderColor: 'border-rose-500/30' },
];

// Convert API event format to internal Event format
const convertEventFromAPI = (apiEvent: EventFromAPI, index: number): Event => {
  const colorScheme = eventColors[index % eventColors.length];
  
  // Create schedule function from timeSlots
  const schedule = (hour: number, minute: number): boolean => {
    return apiEvent.timeSlots.some(timeSlot => {
      const [slotHour, slotMinute] = timeSlot.split(':').map(Number);
      return hour === slotHour && minute === (slotMinute || 0);
    });
  };

  return {
    name: apiEvent.name,
    description: apiEvent.description,
    duration: 60, // Default 1 hour duration
    color: colorScheme.color,
    bgColor: colorScheme.bgColor,
    borderColor: colorScheme.borderColor,
    timeSlots: apiEvent.timeSlots,
    schedule
  };
};

const EventCountdown: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>({});
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { isSupported, permission, requestPermission, showEventNotification } = useNotifications();
  const notificationSent = useRef<{ [key: string]: { fiveMin: boolean; started: boolean } }>({});
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mark component as mounted (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load events from API (only on client-side)
  useEffect(() => {
    if (!mounted) return;

    const loadEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const result = await response.json();
        
        if (result.success && result.data && Array.isArray(result.data)) {
          const convertedEvents = result.data.map((apiEvent: EventFromAPI, index: number) => 
            convertEventFromAPI(apiEvent, index)
          );
          setEvents(convertedEvents);
        } else {

          setEvents([]);
        }
      } catch (error) {

        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [mounted]);

  useEffect(() => {
    if (events.length === 0) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentSecond = now.getSeconds();
      
      const newTimeLeft: { [key: string]: number } = {};
      
      events.forEach((event) => {
        // Check if event is currently running
        if (event.schedule(currentHour, currentMinute) && currentSecond < event.duration * 60) {
          // Event is currently running - show remaining time
          const totalEventSeconds = event.duration * 60; // Total event duration in seconds (10 minutes = 600 seconds)
          const remainingSeconds = totalEventSeconds - currentSecond;
          newTimeLeft[event.name] = Math.max(0, remainingSeconds);
          
          // Send notification when event starts (only once per event)
          if (notificationsEnabled && permission.granted && !notificationSent.current[event.name]?.started) {
            showEventNotification(event.name, 0, true);
            notificationSent.current[event.name] = {
              ...notificationSent.current[event.name],
              started: true
            };
          }
        } else {
          // Find next occurrence
          let nextEventTime = null;
          
          // Check today's remaining hours
          for (let hour = currentHour; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute++) {
              if (event.schedule(hour, minute)) {
                const eventTime = new Date();
                eventTime.setHours(hour, minute, 0, 0);
                
                const timeDiff = eventTime.getTime() - now.getTime();
                if (timeDiff > 0) {
                  nextEventTime = timeDiff / 1000;
                  break;
                }
              }
            }
            if (nextEventTime) break;
          }
          
          // If no event today, check tomorrow
          if (!nextEventTime) {
            for (let hour = 0; hour < 24; hour++) {
              for (let minute = 0; minute < 60; minute++) {
                if (event.schedule(hour, minute)) {
                  const eventTime = new Date();
                  eventTime.setDate(eventTime.getDate() + 1);
                  eventTime.setHours(hour, minute, 0, 0);
                  
                  const timeDiff = eventTime.getTime() - now.getTime();
                  if (timeDiff > 0) {
                    nextEventTime = timeDiff / 1000;
                    break;
                  }
                }
              }
              if (nextEventTime) break;
            }
          }
          
          newTimeLeft[event.name] = nextEventTime || 0;
          
          // Send notification 5 minutes before event starts (only once per event)
          if (notificationsEnabled && permission.granted && nextEventTime && nextEventTime <= 300) {
            if (!notificationSent.current[event.name]?.fiveMin) {
              showEventNotification(event.name, nextEventTime, false);
              notificationSent.current[event.name] = {
                ...notificationSent.current[event.name],
                fiveMin: true
              };
            }
          }
          
          // Reset notification flags when event is far away (more than 10 minutes)
          if (nextEventTime && nextEventTime > 600) {
            notificationSent.current[event.name] = {
              fiveMin: false,
              started: false
            };
          }
        }
      });
      
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [events, notificationsEnabled, permission.granted, showEventNotification]);

  // Initialize notifications on component mount and auto-request permission
  useEffect(() => {
    if (isSupported) {
      if (permission.granted) {
        setNotificationsEnabled(true);
        // Show welcome notification when permission is first granted
        showEventNotification('Chào mừng!', 0, false);
      } else if (permission.default) {
        // Auto-request permission when page loads
        requestPermission();
      } else {
        setNotificationsEnabled(false);
      }
    } else {
      setNotificationsEnabled(false);
    }
  }, [isSupported, permission, requestPermission, showEventNotification]);

  // Register for background sync
  useEffect(() => {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then((registration) => {
        // Register for background sync
        (registration as any).sync.register('background-sync').catch((err: any) => {

        });
      });
    }
  }, []);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const getDotColor = (event: Event): string => {
    const timeLeftForEvent = timeLeft[event.name] || 0;
    if (timeLeftForEvent <= 300) return 'bg-red-500'; // 5 minutes
    if (timeLeftForEvent <= 900) return 'bg-yellow-500'; // 15 minutes
    return 'bg-green-500';
  };

  const isEventRunning = (event: Event): boolean => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();
    
    // Check if event is currently running
    if (event.schedule(currentHour, currentMinute)) {
      // Event is running if we're within the duration
      return currentSecond < event.duration * 60;
    }
    
    return false;
  };


  // Render loading state only on client-side after mount
  if (!mounted || loading) {
    return <EventSkeleton />;
  }

  if (events.length === 0) {
    return (
      <div className="space-y-4">
        <div className="text-center text-gray-400 py-8">
          Chưa có sự kiện nào. Vui lòng cấu hình trong Admin Panel.
        </div>
      </div>
    );
  }

  return (
    <>
      <div 
        className="space-y-4"
        style={{ 
          touchAction: 'pan-y',
          overscrollBehavior: 'auto'
        }}
      >
        {/* Events List */}
        <div 
          className="space-y-3"
          style={{ 
            touchAction: 'pan-y',
            overscrollBehavior: 'auto'
          }}
        >
          {events.map((event, index) => (
          <motion.div 
            key={index}
            onClick={() => handleEventClick(event)}
            onWheel={(e) => {
              // Cho phép scroll ngay cả khi con trỏ ở trên card
              e.stopPropagation();
            }}
            className={`relative bg-gradient-to-r ${event.bgColor} rounded-lg p-3 sm:p-4 border-2 ${event.borderColor} hover:border-opacity-70 transition-all duration-300 cursor-pointer mu-command-card ${
              isEventRunning(event) ? 'ring-2 ring-green-400 ring-opacity-50' : ''
            }`}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 300,
              delay: index * 0.1
            }}
            style={{ 
              fontFamily: 'Arial, sans-serif',
              touchAction: 'pan-y',
              overscrollBehavior: 'auto'
            }}
          >
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-500/50"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500/50"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500/50"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-500/50"></div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 relative z-10">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={`w-2 h-2 sm:w-3 sm:h-3 ${getDotColor(event)} rounded-full animate-pulse mu-dot-glow`} style={{animationDelay: `${index * 0.2}s`}}></div>
                <span className="text-white font-semibold text-sm sm:text-base" style={{ fontFamily: 'Arial, sans-serif' }}>
                  {event.name}
                  {isEventRunning(event) && <span className="text-green-400 ml-2 text-xs sm:text-sm font-bold">(Đang diễn ra)</span>}
                </span>
              </div>
              <div className={`${event.color} font-mono text-base sm:text-lg font-bold mu-text-glow`} style={{ fontFamily: 'Arial, sans-serif' }}>
                {formatTime(timeLeft[event.name] || 0)}
              </div>
            </div>
          </motion.div>
          ))}
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <MuClassicModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Chi Tiết Sự Kiện"
          type="event"
          eventName={selectedEvent.name}
          eventTime={formatTime(timeLeft[selectedEvent.name] || 0)}
        >
          <div className="space-y-6">
            {/* Event Status */}
            <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-yellow-300">Trạng Thái</h3>
                {isEventRunning(selectedEvent) ? (
                  <span className="px-3 py-1 bg-green-600/30 border border-green-500/60 text-green-400 rounded text-sm font-semibold">
                    🟢 Đang diễn ra
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-gray-600/30 border border-gray-500/60 text-gray-400 rounded text-sm font-semibold">
                    ⏳ Sắp diễn ra
                  </span>
                )}
              </div>
              <div className="text-white">
                <p className="mb-2"><span className="text-yellow-400 font-semibold">Thời gian còn lại:</span> {formatTime(timeLeft[selectedEvent.name] || 0)}</p>
              </div>
            </div>

            {/* Event Description */}
            <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
              <h3 className="text-xl font-bold text-yellow-300 mb-3">Mô Tả</h3>
              <p className="text-gray-300 leading-relaxed">{selectedEvent.description}</p>
            </div>

            {/* Event Schedule */}
            <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
              <h3 className="text-xl font-bold text-yellow-300 mb-3">Lịch Diễn Ra</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {selectedEvent.timeSlots.map((time, idx) => {
                  const now = new Date();
                  const currentHour = now.getHours();
                  const currentMinute = now.getMinutes();
                  const [hour, minute] = time.split(':').map(Number);
                  const isActive = currentHour === hour && currentMinute === (minute || 0);
                  
                  return (
                    <div
                      key={idx}
                      className={`px-3 py-2 rounded text-center text-sm font-semibold ${
                        isActive
                          ? 'bg-green-600/30 border border-green-500/60 text-green-400'
                          : 'bg-gray-700/30 border border-gray-600/60 text-gray-300'
                      }`}
                    >
                      {time}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Event Benefits */}
            <div className="bg-black/40 rounded-lg p-4 border border-yellow-500/30">
              <h3 className="text-xl font-bold text-yellow-300 mb-3">Lợi Ích</h3>
              <ul className="space-y-2 text-gray-300">
                {selectedEvent.name.includes('DoubleExp') || selectedEvent.name.includes('EXP') ? (
                  <>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-400">⚡</span>
                      <span>Nhận gấp đôi kinh nghiệm khi tiêu diệt quái vật</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-400">🎯</span>
                      <span>Áp dụng cho tất cả các map trong game</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-400">📈</span>
                      <span>Không giới hạn level, tất cả nhân vật đều được hưởng</span>
                    </li>
                  </>
                ) : selectedEvent.name.includes('DoubleDrop') || selectedEvent.name.includes('Drop') ? (
                  <>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-400">💎</span>
                      <span>Tăng tỷ lệ rơi đồ hiếm và set items</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-400">🎁</span>
                      <span>Áp dụng cho tất cả quái vật trong game</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-400">✨</span>
                      <span>Cơ hội nhận được các item quý giá hơn</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-400">🎮</span>
                      <span>Tham gia sự kiện để nhận nhiều phần thưởng hấp dẫn</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-400">🏆</span>
                      <span>Cơ hội nhận được các item và kinh nghiệm đặc biệt</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </MuClassicModal>
      )}
    </>
  );
};

export default EventCountdown;
