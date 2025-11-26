import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:55777';

/**
 * API endpoint để lấy site configuration từ file config.json
 * Load từ backend C# thay vì file tĩnh
 */
export async function GET() {
  try {
    // Load từ backend C# config file
    const response = await fetch(`${API_URL}/api/config-files/config.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Thêm timeout để tránh treo quá lâu
      signal: AbortSignal.timeout(5000), // 5 giây timeout
    });

    if (response.ok) {
      const result = await response.json();

      // Backend trả về: { success: true, data: { fileName, content, isJson } }
      if (result.success && result.data && result.data.content) {
        // Nếu content là object (đã parse), dùng trực tiếp
        // Nếu content là string, parse lại
        let configData = result.data.content;
        
        if (typeof configData === 'string') {
          try {
            configData = JSON.parse(configData);
          } catch (e) {

            throw new Error('Invalid JSON format from backend');
          }
        }
        
        return NextResponse.json({
          success: true,
          data: configData
        });
      } else {

        throw new Error('Backend response missing content');
      }
    } else {

      throw new Error(`Backend returned ${response.status}`);
    }
  } catch (error: any) {

    // Nếu là lỗi timeout hoặc connection, log rõ ràng
    if (error.name === 'AbortError' || error.message?.includes('fetch')) {

    }
    
    // Fallback về config tĩnh
    const { getSiteConfig } = await import('@/lib/config');
    const config = getSiteConfig();
    return NextResponse.json({
      success: true,
      data: config
    });
  }
}
