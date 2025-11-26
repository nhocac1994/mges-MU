import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:55777';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileName: string }> }
) {
  try {
    const resolvedParams = await params;
    const fileName = resolvedParams.fileName;
    const accountId = request.nextUrl.searchParams.get('accountId');

    const url = new URL(`${API_URL}/api/config-files/${fileName}`);
    if (accountId) {
      url.searchParams.append('accountId', accountId);
    }

    const response = await fetch(url.toString(), {
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ fileName: string }> }
) {
  try {
    const resolvedParams = await params;
    const fileName = resolvedParams.fileName;
    const accountId = request.nextUrl.searchParams.get('accountId');
    const body = await request.json();

    if (!accountId) {
      return NextResponse.json(
        { success: false, message: 'Account ID is required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_URL}/api/config-files/${fileName}?accountId=${accountId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
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

