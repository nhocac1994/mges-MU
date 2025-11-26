import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:55777';

interface Event {
  id?: string;
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  shouldNotify?: boolean;
  message?: string;
  url?: string;
  requireInteraction?: boolean;
}

/**
 * API endpoint để check events và trả về các events cần thông báo
 * - Events sắp diễn ra trong 5 phút
 * - Events đang diễn ra
 */
export async function GET() {
  try {
    // Load events từ backend C#
    const response = await fetch(`${API_URL}/api/config-files/event.txt`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(5000),
    });

    let events: Event[] = [];

    if (response.ok) {
      const result = await response.json();
      
      if (result.success && result.data && result.data.content) {
        const content = result.data.content;
        
        if (typeof content === 'string') {
          // Parse events từ text file
          // Format: EventName|Description|TimeSlots (ví dụ: "0:00,2:00,4:00")
          const lines = content.split('\n').filter((line: string) => line.trim() && !line.trim().startsWith('#'));
          events = [];
          
          for (let index = 0; index < lines.length; index++) {
            const line = lines[index];
            const parts = line.trim().split('|');
            const eventName = parts[0] || 'Sự kiện';
            const description = parts[1] || '';
            const timeSlots = (parts[2] || '').split(',').map((t: string) => t.trim()).filter((t: string) => t);
            
            // Tạo event cho mỗi time slot
            for (const timeSlot of timeSlots) {
              // Parse time slot (format: "HH:mm")
              const [hours, minutes] = timeSlot.split(':').map(Number);
              
              if (isNaN(hours) || isNaN(minutes)) continue;
              
              // Tạo date cho time slot hôm nay
              const today = new Date();
              const eventDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes, 0);
              
              // Nếu time slot đã qua, tính cho ngày mai
              if (eventDate < today) {
                eventDate.setDate(eventDate.getDate() + 1);
              }
              
              events.push({
                id: `event-${index}-${timeSlot}`,
                title: eventName,
                description: description,
                startDate: eventDate.toISOString().split('T')[0],
                startTime: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
              });
            }
          }
        } else if (Array.isArray(content)) {
          events = content;
        }
      }
    }

    // Check thời gian và filter events cần thông báo
    const now = new Date();
    const eventsToNotify: Event[] = [];

    for (const event of events) {
      try {
        // Parse event date và time
        const eventDateTime = new Date(`${event.startDate}T${event.startTime}`);
        
        if (isNaN(eventDateTime.getTime())) {
          continue; // Skip invalid dates
        }

        // Tính thời gian còn lại (milliseconds)
        const timeDiff = eventDateTime.getTime() - now.getTime();
        const minutesDiff = timeDiff / (1000 * 60); // Convert to minutes

        // Thông báo trước 5 phút (từ 4.5 đến 5.5 phút để tránh duplicate)
        if (minutesDiff >= 4.5 && minutesDiff <= 5.5) {
          eventsToNotify.push({
            ...event,
            shouldNotify: true,
            message: `⏰ Sự kiện "${event.title}" sẽ bắt đầu sau 5 phút!`,
            url: '/news',
            requireInteraction: true,
          });
        }
        // Thông báo khi sự kiện bắt đầu (trong vòng 1 phút đầu)
        else if (minutesDiff >= -1 && minutesDiff <= 1) {
          eventsToNotify.push({
            ...event,
            shouldNotify: true,
            message: `🎮 Sự kiện "${event.title}" đã bắt đầu!`,
            url: '/news',
            requireInteraction: true,
          });
        }
      } catch (error) {
        // Error processing event
      }
    }

    return NextResponse.json({
      success: true,
      events: eventsToNotify,
      timestamp: now.toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({
      success: true,
      events: [],
      error: error.message,
    });
  }
}
