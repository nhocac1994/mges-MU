'use client';

import React, { useState, useEffect } from 'react';

interface Event {
  name: string;
  description: string;
  timeSlots: string[];
  isActive: boolean;
}

interface EventTimerProps {
  events: Event[];
}

/**
 * Component hiển thị events theo thời gian thực
 * Tự động tính toán và hiển thị event đang active dựa trên giờ hiện tại
 */
export default function EventTimer({ events }: EventTimerProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeEvents, setActiveEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Update time mỗi giây
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Tính toán events đang active
    const now = currentTime;
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTotalMinutes = currentHour * 60 + currentMinute;

    const active = events
      .map(event => {
        // Kiểm tra xem có time slot nào đang active không
        // Event active trong 1 giờ (từ giờ bắt đầu đến giờ tiếp theo)
        const isActive = event.timeSlots.some(timeSlot => {
          const [hour, minute] = timeSlot.split(':').map(Number);
          const eventStartMinutes = hour * 60 + (minute || 0);
          const eventEndMinutes = eventStartMinutes + 60; // 1 giờ
          
          // Xử lý trường hợp qua ngày (ví dụ: 23:00 -> 00:00)
          if (eventEndMinutes >= 24 * 60) {
            // Event kéo dài qua ngày
            return currentTotalMinutes >= eventStartMinutes || currentTotalMinutes < (eventEndMinutes % (24 * 60));
          } else {
            return currentTotalMinutes >= eventStartMinutes && currentTotalMinutes < eventEndMinutes;
          }
        });

        return { ...event, isActive };
      })
      .filter(event => event.isActive);

    setActiveEvents(active);
  }, [currentTime, events]);

  // Tính thời gian còn lại đến event tiếp theo
  const getNextEventTime = (): { hour: number; minute: number; diff: number } | null => {
    const now = currentTime;
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const current = currentHour * 60 + currentMinute;

    let nextTime: { hour: number; minute: number; diff: number } | null = null;
    let minDiff = Infinity;

    events.forEach(event => {
      event.timeSlots.forEach(timeSlot => {
        const [hour, minute] = timeSlot.split(':').map(Number);
        const eventTime = hour * 60 + (minute || 0);
        let diff = eventTime - current;

        // Nếu event đã qua trong ngày, tính cho ngày mai
        if (diff <= 0) {
          diff += 24 * 60; // Thêm 24 giờ
        }

        if (diff > 0 && diff < minDiff) {
          minDiff = diff;
          nextTime = { hour, minute: minute || 0, diff };
        }
      });
    });

    return nextTime;
  };

  const nextEvent: { hour: number; minute: number; diff: number } | null = getNextEventTime();
  const hoursUntilNext = nextEvent ? Math.floor(nextEvent.diff / 60) : 0;
  const minutesUntilNext = nextEvent ? nextEvent.diff % 60 : 0;

  return (
    <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">📅 Sự Kiện Hiện Tại</h2>
        <div className="text-white text-sm">
          {currentTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
      </div>

      {activeEvents.length > 0 ? (
        <div className="space-y-3">
          {activeEvents.map((event, index) => (
            <div
              key={index}
              className="bg-green-600 bg-opacity-80 rounded-lg p-4 border-2 border-green-400 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{event.name}</h3>
                  <p className="text-gray-200 mt-1">{event.description}</p>
                </div>
                <div className="bg-green-500 rounded-full px-4 py-2">
                  <span className="text-white font-bold">ĐANG DIỄN RA</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 bg-opacity-70 rounded-lg p-4 text-center">
          <p className="text-gray-300">Hiện tại không có sự kiện nào đang diễn ra</p>
          {nextEvent && (
            <p className="text-yellow-400 mt-2">
              Sự kiện tiếp theo: {nextEvent.hour.toString().padStart(2, '0')}:{nextEvent.minute.toString().padStart(2, '0')} 
              ({hoursUntilNext}h {minutesUntilNext}m)
            </p>
          )}
        </div>
      )}

      {/* Danh sách tất cả events */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-white mb-3">📋 Lịch Sự Kiện Hôm Nay</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-black bg-opacity-50 rounded-lg p-3 border border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{event.name}</h4>
                  <p className="text-gray-400 text-sm mt-1">{event.description}</p>
                </div>
                <div className="ml-4">
                  <div className="flex flex-wrap gap-1">
                    {event.timeSlots.map((time, timeIndex) => {
                      const [hour, minute] = time.split(':').map(Number);
                      const eventTime = hour * 60 + (minute || 0);
                      const current = currentTime.getHours() * 60 + currentTime.getMinutes();
                      const isActive = current >= eventTime && current < eventTime + 60;
                      
                      return (
                        <span
                          key={timeIndex}
                          className={`px-2 py-1 rounded text-xs ${
                            isActive
                              ? 'bg-green-500 text-white font-bold'
                              : 'bg-gray-700 text-gray-300'
                          }`}
                        >
                          {time}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

