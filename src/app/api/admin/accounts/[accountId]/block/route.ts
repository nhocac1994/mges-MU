import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:55777';

export async function PUT(
  request: NextRequest,
  { params }: { params: { accountId: string } }
) {
  try {
    const adminAccountId = request.nextUrl.searchParams.get('accountId');
    const targetAccountId = params.accountId;
    const body = await request.json();
    
    if (!adminAccountId) {
      return NextResponse.json(
        { success: false, message: 'Admin Account ID is required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_URL}/api/admin/accounts/${targetAccountId}/block?accountId=${adminAccountId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Admin block account proxy error:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi kết nối đến server. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

