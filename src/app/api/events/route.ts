import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:55777';

/**
 * API endpoint để lấy danh sách events từ event.txt
 */
export async function GET() {
  try {
    const response = await fetch(`${API_URL}/api/config-files/event.txt`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success && result.data) {
        const content = typeof result.data.content === 'string' 
          ? result.data.content 
          : JSON.stringify(result.data.content);
        
        // Parse events từ text
        // Format: EventName|Description|TimeSlots (0:00,2:00,4:00,...)
        const events = content
          .split('\n')
          .filter((line: string) => line.trim() && !line.trim().startsWith('#'))
          .map((line: string) => {
            const parts = line.trim().split('|');
            const timeSlots = (parts[2] || '').split(',').map((t: string) => t.trim()).filter((t: string) => t);
            
            return {
              name: parts[0] || '',
              description: parts[1] || '',
              timeSlots: timeSlots, // Array of time strings like ["0:00", "2:00", "4:00"]
              isActive: false // Will be calculated on frontend based on current time
            };
          });

        return NextResponse.json({
          success: true,
          data: events
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: []
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      data: []
    });
  }
}

