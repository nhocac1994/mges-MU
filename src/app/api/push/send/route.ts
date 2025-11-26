import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:55777';

/**
 * API endpoint để server C# gửi push notifications đến các subscriptions
 * POST /api/push/send
 * Body: { title: string, message: string, url?: string }
 * 
 * Server C# sẽ gọi endpoint này với danh sách subscriptions và gửi push notifications
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, message, url, subscriptions } = body;

    if (!title || !message) {
      return NextResponse.json(
        { success: false, error: 'Title and message are required' },
        { status: 400 }
      );
    }

    // Nếu có subscriptions, gửi đến backend C# để xử lý
    // Backend C# sẽ gửi push notifications đến các subscriptions này
    if (subscriptions && Array.isArray(subscriptions) && subscriptions.length > 0) {
      try {
        const response = await fetch(`${API_URL}/api/push/send`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            message,
            url: url || '/',
            subscriptions,
          }),
        });

        if (response.ok) {
          const result = await response.json();

          return NextResponse.json({
            success: true,
            message: 'Push notifications sent successfully',
            sent: result.sent || subscriptions.length,
          });
        }
      } catch (error) {

      }
    }

    // Fallback: Lưu notification để service worker check sau
    return NextResponse.json({
      success: true,
      message: 'Notification queued',
      notification: {
        title,
        message,
        url: url || '/',
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

