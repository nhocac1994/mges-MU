'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useNotifications } from '@/hooks/useNotifications';

interface Event {
  name: string;
  duration: number; // in minutes
  color: string;
  bgColor: string;
  borderColor: string;
  schedule: (hour: number, minute: number) => boolean; // Function to check if event should run
}

const events: Event[] = [
  { 
    name: '[Chaos Castle]', 
    duration: 10, 
    color: 'text-red-400', 
    bgColor: 'from-red-600/20 to-orange-600/20', 
    borderColor: 'border-red-500/30',
    schedule: (hour, minute) => hour % 2 === 1 && minute === 0 // Giờ lẻ: 1, 3, 5, 7, 9...
  },
  { 
    name: '[Devil Square]', 
    duration: 10, 
    color: 'text-yellow-400', 
    bgColor: 'from-yellow-600/20 to-orange-600/20', 
    borderColor: 'border-yellow-500/30',
    schedule: (hour, minute) => hour % 4 === 0 && minute === 0 // Giờ chẵn 4h 1 lần: 0, 4, 8, 12...
  },
  { 
    name: '[Blood Castle]', 
    duration: 10, 
    color: 'text-blue-400', 
    bgColor: 'from-blue-600/20 to-purple-600/20', 
    borderColor: 'border-blue-500/30',
    schedule: (hour, minute) => hour % 2 === 0 && minute === 0 // Giờ chẵn 2h 1 lần: 0, 2, 4, 6, 8...
  },
  { 
    name: 'Vua Xuong', 
    duration: 10, 
    color: 'text-purple-400', 
    bgColor: 'from-purple-600/20 to-pink-600/20', 
    borderColor: 'border-purple-500/30',
    schedule: (hour, minute) => hour % 2 === 0 && minute === 5 // Giờ chẵn 2h05: 0:05, 2:05, 4:05...
  },
  { 
    name: 'Rong Do', 
    duration: 10, 
    color: 'text-green-400', 
    bgColor: 'from-green-600/20 to-teal-600/20', 
    borderColor: 'border-green-500/30',
    schedule: (hour, minute) => hour % 2 === 1 && minute === 30 // Giờ lẻ 1h30: 1:30, 3:30, 5:30...
  },
  { 
    name: 'Rong Vang', 
    duration: 10, 
    color: 'text-cyan-400', 
    bgColor: 'from-cyan-600/20 to-blue-600/20', 
    borderColor: 'border-cyan-500/30',
    schedule: (hour, minute) => hour % 2 === 0 && minute === 30 // Giờ chẵn 2h30: 2:30, 4:30...
  },
  { 
    name: 'Binh Doan Phu Thuy', 
    duration: 10, 
    color: 'text-pink-400', 
    bgColor: 'from-pink-600/20 to-red-600/20', 
    borderColor: 'border-pink-500/30',
    schedule: (hour, minute) => hour % 2 === 1 && minute === 0 // Giờ lẻ 2h 1 lần: 1, 3, 5, 7...
  },
  { 
    name: 'Cursed King', 
    duration: 10, 
    color: 'text-indigo-400', 
    bgColor: 'from-indigo-600/20 to-purple-600/20', 
    borderColor: 'border-indigo-500/30',
    schedule: (hour, minute) => (hour === 13 && minute === 0) || (hour === 20 && minute === 45) // 13:00 và 20:45
  },
  { 
    name: 'Kundun Arena Event', 
    duration: 10, 
    color: 'text-emerald-400', 
    bgColor: 'from-emerald-600/20 to-green-600/20', 
    borderColor: 'border-emerald-500/30',
    schedule: (hour, minute) => (hour === 11 && minute === 30) || (hour === 19 && minute === 30) || (hour === 21 && minute === 15) // 11:30, 19:30, 21:15
  },
  { 
    name: 'Erohim', 
    duration: 10, 
    color: 'text-rose-400', 
    bgColor: 'from-rose-600/20 to-pink-600/20', 
    borderColor: 'border-rose-500/30',
    schedule: (hour, minute) => (hour === 12 && minute === 30) || (hour === 20 && minute === 15) || (hour === 21 && minute === 45) // 12:30, 20:15, 21:45
  },
];

const EventCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>({});
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { isSupported, permission, requestPermission, showEventNotification } = useNotifications();
  const notificationSent = useRef<{ [key: string]: { fiveMin: boolean; started: boolean } }>({});

  useEffect(() => {
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
  }, [notificationsEnabled, permission.granted, showEventNotification]);

  // Initialize notifications on component mount
  useEffect(() => {
    if (isSupported && permission.default) {
      // Auto-request permission on first load
      requestPermission().then((granted) => {
        setNotificationsEnabled(granted);
      });
    } else if (permission.granted) {
      setNotificationsEnabled(true);
    }
  }, [isSupported, permission, requestPermission]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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

  const handleNotificationToggle = async () => {
    if (!notificationsEnabled) {
      const granted = await requestPermission();
      setNotificationsEnabled(granted);
    } else {
      setNotificationsEnabled(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Notification Settings */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 border border-blue-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-white font-semibold">🔔 Thông báo sự kiện</span>
          </div>
          <div className="flex items-center gap-3">
            {isSupported ? (
              <>
                <span className="text-sm text-gray-300">
                  {notificationsEnabled ? 'Đã bật' : 'Đã tắt'}
                </span>
                <button
                  onClick={handleNotificationToggle}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    notificationsEnabled
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-600 hover:bg-gray-700 text-white'
                  }`}
                >
                  {notificationsEnabled ? 'Tắt thông báo' : 'Bật thông báo'}
                </button>
              </>
            ) : (
              <span className="text-sm text-red-400">Trình duyệt không hỗ trợ</span>
            )}
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-400">
          {notificationsEnabled 
            ? 'Bạn sẽ nhận thông báo trước 5 phút và khi sự kiện bắt đầu'
            : 'Bật thông báo để không bỏ lỡ các sự kiện quan trọng'
          }
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {events.map((event, index) => (
        <div 
          key={index}
          className={`bg-gradient-to-r ${event.bgColor} rounded-lg p-4 border ${event.borderColor} hover:border-opacity-50 transition-all duration-300 ${
            isEventRunning(event) ? 'ring-2 ring-green-400 ring-opacity-50' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 ${getDotColor(event)} rounded-full animate-pulse`}></div>
              <span className="text-white font-semibold">
                {event.name}
                {isEventRunning(event) && <span className="text-green-400 ml-2">(Đang diễn ra)</span>}
              </span>
            </div>
            <div className={`${event.color} font-mono text-lg font-bold`}>
              {formatTime(timeLeft[event.name] || 0)}
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default EventCountdown;
