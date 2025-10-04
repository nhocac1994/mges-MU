import { NextRequest, NextResponse } from 'next/server';
import { loginAccount } from '@/lib/database';
import { getClientIP } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;
    const clientIP = getClientIP(request);

    // Validate input
    if (!username || !password) {
      return NextResponse.json({ 
        success: false, 
        message: 'Vui lòng nhập đầy đủ thông tin' 
      }, { status: 400 });
    }

    // Check rate limit
    const rateLimitResponse = await fetch(`${request.nextUrl.origin}/api/rate-limit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ip: clientIP, action: 'check' })
    });
    
    const rateLimitData = await rateLimitResponse.json();
    
    if (!rateLimitData.allowed) {
      const resetTime = new Date(rateLimitData.resetTime).toLocaleString('vi-VN');
      return NextResponse.json({ 
        success: false, 
        message: `Bạn đã vượt quá giới hạn đăng nhập (5 lần/24h). Thử lại sau: ${resetTime}` 
      }, { status: 429 });
    }

    // Use the loginAccount function from database.ts
    const result = await loginAccount(username, password);

    // Increment rate limit counter
    await fetch(`${request.nextUrl.origin}/api/rate-limit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ip: clientIP, action: 'increment' })
    });

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: result.message,
        data: result.user
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: result.message 
      }, { status: 401 });
    }

  } catch {
    console.error('Login error: [Hidden for security]');
    return NextResponse.json({ 
      success: false, 
      message: 'Lỗi hệ thống. Vui lòng thử lại sau.' 
    }, { status: 500 });
  }
}
