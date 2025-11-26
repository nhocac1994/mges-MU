import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:55777';

/**
 * Proxy guild ranking request to C# backend
 */
export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${API_URL}/api/rankings/guild`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {

    return NextResponse.json(
      { success: false, message: 'Lỗi kết nối đến server. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
