import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:55777';

interface Notification {
  id: string;
  title: string;
  message: string;
  sendTime: string; // Format: "HH:mm" hoặc "YYYY-MM-DD HH:mm"
  shouldSend?: boolean;
}

/**
 * API endpoint để lấy danh sách notifications từ notification.txt
 * Format: id | title | sendTime | message
 */
export async function GET() {
  try {
    // Load notifications từ backend C#
    const response = await fetch(`${API_URL}/api/config-files/notification.txt`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(5000),
    });

    let notifications: Notification[] = [];

    if (response.ok) {
      const result = await response.json();
      
      if (result.success && result.data && result.data.content) {
        const content = result.data.content;
        
        if (typeof content === 'string') {
          // Parse notifications từ text file
          // Format: id | title | sendTime | message
          const lines = content.split('\n').filter((line: string) => line.trim() && !line.trim().startsWith('#'));
          
          notifications = lines.map((line: string) => {
            const parts = line.trim().split('|').map((p: string) => p.trim());
            return {
              id: parts[0] || '',
              title: parts[1] || 'Thông báo',
              sendTime: parts[2] || '',
              message: parts[3] || '',
            };
          });
        } else if (Array.isArray(content)) {
          notifications = content;
        }
      }
    }

    // Check thời gian và filter notifications cần gửi
    const now = new Date();
    const notificationsToSend: Notification[] = [];

    for (const notification of notifications) {
      try {
        if (!notification.sendTime) continue;

        // Parse sendTime
        // Có thể là format "HH:mm" (gửi hàng ngày) hoặc "YYYY-MM-DD HH:mm" (gửi một lần)
        let sendDateTime: Date;

        if (notification.sendTime.includes('-')) {
          // Format: "YYYY-MM-DD HH:mm"
          sendDateTime = new Date(notification.sendTime);
        } else {
          // Format: "HH:mm" - gửi hàng ngày
          const [hours, minutes] = notification.sendTime.split(':').map(Number);
          sendDateTime = new Date();
          sendDateTime.setHours(hours, minutes, 0, 0);
          
          // Nếu đã qua giờ hôm nay, tính cho ngày mai
          if (sendDateTime < now) {
            sendDateTime.setDate(sendDateTime.getDate() + 1);
          }
        }

        if (isNaN(sendDateTime.getTime())) {
          continue; // Skip invalid dates
        }

        // Tính thời gian còn lại (milliseconds)
        const timeDiff = sendDateTime.getTime() - now.getTime();
        const minutesDiff = timeDiff / (1000 * 60);

        // Gửi notification trong vòng 1 phút (từ -1 đến 1 phút)
        if (minutesDiff >= -1 && minutesDiff <= 1) {
          notificationsToSend.push({
            ...notification,
            shouldSend: true,
          });
        }
      } catch (error) {
        // Error processing notification
      }
    }

    return NextResponse.json({
      success: true,
      notifications: notificationsToSend,
      allNotifications: notifications,
      timestamp: now.toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({
      success: true,
      notifications: [],
      allNotifications: [],
      error: error.message,
    });
  }
}

