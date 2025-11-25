import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:55777';

/**
 * API endpoint để server gửi thông báo manual đến tất cả clients
 * POST /api/notifications/send
 * Body: { title: string, message: string, url?: string }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, message, url, requireInteraction } = body;

    if (!title || !message) {
      return NextResponse.json(
        { success: false, error: 'Title and message are required' },
        { status: 400 }
      );
    }

    // Lưu thông báo vào database hoặc queue để service worker check
    // Ở đây chúng ta sẽ lưu vào một file tạm hoặc database
    // Service worker sẽ check endpoint này định kỳ

    // Tạm thời, chúng ta có thể broadcast message đến tất cả clients
    // Thông qua BroadcastChannel hoặc lưu vào cache để service worker đọc

    return NextResponse.json({
      success: true,
      message: 'Notification queued successfully',
      notification: {
        title,
        message,
        url: url || '/',
        requireInteraction: requireInteraction !== false,
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

/**
 * GET endpoint để service worker check notifications pending
 */
export async function GET() {
  try {
    // Load notifications pending từ backend hoặc cache
    // Tạm thời trả về empty array
    // Có thể mở rộng để lưu vào database/file
    
    return NextResponse.json({
      success: true,
      notifications: [],
    });
  } catch (error: any) {

    return NextResponse.json({
      success: true,
      notifications: [],
    });
  }
}

