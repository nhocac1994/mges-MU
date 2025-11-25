import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:55777';

/**
 * API endpoint để lấy danh sách download URLs từ urldownload.txt
 */
export async function GET() {
  try {
    const response = await fetch(`${API_URL}/api/config-files/urldownload.txt`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success && result.data) {
        const content = typeof result.data.content === 'string' 
          ? result.data.content 
          : JSON.stringify(result.data.content);
        
        // Parse URLs từ text
        // Format: Type|URL (mega|..., media|..., launcher|...)
        const downloadLinks: { mega?: string; media?: string; launcher?: string } = {};
        
        content
          .split('\n')
          .filter(line => line.trim() && !line.trim().startsWith('#'))
          .forEach(line => {
            const parts = line.trim().split('|');
            if (parts.length >= 2) {
              const type = parts[0].trim().toLowerCase();
              const url = parts[1].trim();
              
              if (type === 'mega' || type === 'media' || type === 'launcher') {
                downloadLinks[type as 'mega' | 'media' | 'launcher'] = url;
              }
            }
          });

        return NextResponse.json({
          success: true,
          data: downloadLinks
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: []
    });
  } catch (error) {
    console.error('Error getting download URLs:', error);
    return NextResponse.json({
      success: true,
      data: []
    });
  }
}

