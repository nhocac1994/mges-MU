import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:55777';

/**
 * Proxy characters request to C# backend
 */
export async function GET(request: NextRequest) {
  try {
    let accountId = request.nextUrl.searchParams.get('accountId');
    
    if (!accountId) {
      return NextResponse.json({ 
        success: false, 
        message: 'Account ID không được cung cấp' 
      }, { status: 400 });
    }

    accountId = accountId.trim();

    const response = await fetch(`${API_URL}/api/character?accountId=${encodeURIComponent(accountId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {

      const errorText = await response.text();

      return NextResponse.json(
        { 
          success: false, 
          message: `Backend error: ${response.status} ${response.statusText}` 
        }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {

    return NextResponse.json(
      { 
        success: false, 
        message: `Lỗi kết nối đến server: ${error instanceof Error ? error.message : 'Unknown error'}` 
      },
      { status: 500 }
    );
  }
}
