import { NextResponse } from 'next/server';
import { getSiteConfig } from '@/lib/config';

/**
 * API endpoint để lấy site configuration
 * Có thể mở rộng để lấy từ database
 */
export async function GET() {
  try {
    const config = getSiteConfig();
    return NextResponse.json({
      success: true,
      data: config
    });
  } catch (error) {
    console.error('Error getting config:', error);
    return NextResponse.json({
      success: false,
      message: 'Lỗi khi lấy cấu hình'
    }, { status: 500 });
  }
}

