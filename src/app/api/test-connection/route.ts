import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test basic server response
    return NextResponse.json({ 
      success: true, 
      message: 'Server đang hoạt động bình thường',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: 'Lỗi server' 
    }, { status: 500 });
  }
}
