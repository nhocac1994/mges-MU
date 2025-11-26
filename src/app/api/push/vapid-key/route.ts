import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:55777';

/**
 * API endpoint để lấy VAPID public key từ server C#
 */
export async function GET() {
  // Kiểm tra env variable trước (nhanh nhất)
  const envKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (envKey) {
    return NextResponse.json({
      success: true,
      publicKey: envKey,
    });
  }

  try {
    // Lấy VAPID key từ server C#
    const response = await fetch(`${API_URL}/api/push/vapid-key`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(5000),
    });

    if (response.ok) {
      const result = await response.json();
      // Server C# trả về: { success: true, data: { publicKey: "..." } }
      const publicKey = result.data?.publicKey || result.publicKey;
      if (result.success && publicKey) {
        return NextResponse.json({
          success: true,
          publicKey: publicKey,
        });
      }
    } else {
      // Backend trả về lỗi, log để debug
      const errorText = await response.text().catch(() => 'Unknown error');

    }
  } catch (error: any) {
    // Lỗi kết nối hoặc timeout
    if (error.name !== 'AbortError') {

    }
  }

  // Fallback: Sử dụng key mặc định từ backend config (nếu biết)
  // Key này từ appsettings.json của backend C#
  const fallbackKey = 'BOIMUZzLXhXRiqGYxHYX1zymdrTF7fSa8w3LU8J4B5rAztz8N6ND19lOjPCh4InUPwjRXjplXpn2cs7IDv01XLI';
  
  // Chỉ dùng fallback nếu backend không accessible
  // Trong production nên dùng env variable thay vì hardcode
  return NextResponse.json({
    success: true,
    publicKey: fallbackKey,
  });
}

