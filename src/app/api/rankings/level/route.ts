import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:55777';

/**
 * Proxy level ranking request to C# backend
 */
export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${API_URL}/api/rankings/level`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10000), // 10 giây timeout
    });

    if (!response.ok) {
      let errorMessage = 'Unknown error';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || `HTTP ${response.status}`;
      } catch {
        const errorText = await response.text();
        errorMessage = errorText || `HTTP ${response.status}`;
      }
      
      console.error(`Backend C# returned ${response.status} for /api/rankings/level:`, errorMessage);
      
      return NextResponse.json(
        { 
          success: false, 
          message: errorMessage,
          data: null
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    // Xử lý các loại lỗi khác nhau
    let errorMessage = 'Lỗi kết nối đến server';
    
    if (error.name === 'AbortError') {
      errorMessage = 'Backend C# không phản hồi (timeout). Vui lòng kiểm tra server đã chạy chưa.';
    } else if (error.message?.includes('fetch')) {
      errorMessage = `Không thể kết nối đến backend C# tại ${API_URL}. Vui lòng kiểm tra server đã chạy chưa.`;
    } else {
      errorMessage = `Lỗi: ${error?.message || 'Unknown error'}`;
    }
    
    console.error('Level ranking proxy error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        data: null
      },
      { status: 500 }
    );
  }
}
