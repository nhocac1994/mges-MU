'use client';

import React, { useState, useEffect } from 'react';

interface Event {
  name: string;
  duration: number; // in minutes
  color: string;
  bgColor: string;
  borderColor: string;
}

const events: Event[] = [
  { name: '[Chaos Castle]', duration: 30, color: 'text-red-400', bgColor: 'from-red-600/20 to-orange-600/20', borderColor: 'border-red-500/30' },
  { name: '[Devil Square]', duration: 120, color: 'text-yellow-400', bgColor: 'from-yellow-600/20 to-orange-600/20', borderColor: 'border-yellow-500/30' },
  { name: '[Blood Castle]', duration: 60, color: 'text-blue-400', bgColor: 'from-blue-600/20 to-purple-600/20', borderColor: 'border-blue-500/30' },
  { name: 'Vua Xuong', duration: 120, color: 'text-purple-400', bgColor: 'from-purple-600/20 to-pink-600/20', borderColor: 'border-purple-500/30' },
  { name: 'Rong Do', duration: 30, color: 'text-green-400', bgColor: 'from-green-600/20 to-teal-600/20', borderColor: 'border-green-500/30' },
  { name: 'Rong Vang', duration: 60, color: 'text-cyan-400', bgColor: 'from-cyan-600/20 to-blue-600/20', borderColor: 'border-cyan-500/30' },
  { name: 'Binh Doan Phu Thuy', duration: 30, color: 'text-pink-400', bgColor: 'from-pink-600/20 to-red-600/20', borderColor: 'border-pink-500/30' },
  { name: 'Hydra', duration: 60, color: 'text-indigo-400', bgColor: 'from-indigo-600/20 to-purple-600/20', borderColor: 'border-indigo-500/30' },
  { name: 'Tarkan Golden Boss', duration: 180, color: 'text-amber-400', bgColor: 'from-amber-600/20 to-yellow-600/20', borderColor: 'border-amber-500/30' },
  { name: 'Kundun Arena Event', duration: 60, color: 'text-emerald-400', bgColor: 'from-emerald-600/20 to-green-600/20', borderColor: 'border-emerald-500/30' },
  { name: 'Erohim', duration: 30, color: 'text-rose-400', bgColor: 'from-rose-600/20 to-pink-600/20', borderColor: 'border-rose-500/30' },
  { name: '[Su Kien] PK Arena', duration: 480, color: 'text-violet-400', bgColor: 'from-violet-600/20 to-purple-600/20', borderColor: 'border-violet-500/30' },
];

const EventCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentMinute = now.getMinutes();
      const currentHour = now.getHours();
      
      const newTimeLeft: { [key: string]: number } = {};
      
      events.forEach((event) => {
        // Calculate which cycle we're in (every 2 hours = 120 minutes)
        const cycleStart = Math.floor(currentHour / 2) * 2;
        const minutesInCycle = (currentHour - cycleStart) * 60 + currentMinute;
        
        // Find the next occurrence of this event
        let nextEventTime = 0;
        // Events happen every 2 hours, so we need to find the next occurrence
        while (nextEventTime <= minutesInCycle) {
          nextEventTime += event.duration;
          if (nextEventTime > minutesInCycle) break;
        }
        
        const timeUntilNext = nextEventTime - minutesInCycle;
        newTimeLeft[event.name] = timeUntilNext;
      });
      
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    const secs = Math.floor((minutes % 1) * 60);
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDotColor = (event: Event): string => {
    const timeLeftForEvent = timeLeft[event.name] || 0;
    if (timeLeftForEvent <= 5) return 'bg-red-500';
    if (timeLeftForEvent <= 15) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-3">
      {events.map((event, index) => (
        <div 
          key={index}
          className={`bg-gradient-to-r ${event.bgColor} rounded-lg p-4 border ${event.borderColor} hover:border-opacity-50 transition-all duration-300`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 ${getDotColor(event)} rounded-full animate-pulse`}></div>
              <span className="text-white font-semibold">{event.name}</span>
            </div>
            <div className={`${event.color} font-mono text-lg font-bold`}>
              {formatTime(timeLeft[event.name] || 0)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventCountdown;
