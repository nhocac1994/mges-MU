import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:55777';

/**
 * API endpoint để trả về manifest.json động từ config server
 */
export async function GET() {
  try {
    // Load config từ backend C#
    const response = await fetch(`${API_URL}/api/config-files/config.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(5000),
    });

    let config: any;

    if (response.ok) {
      const result = await response.json();
      
      if (result.success && result.data && result.data.content) {
        let configData = result.data.content;
        
        if (typeof configData === 'string') {
          try {
            configData = JSON.parse(configData);
          } catch (e) {

            throw new Error('Invalid JSON format from backend');
          }
        }
        
        config = configData;
      } else {
        throw new Error('Backend response missing content');
      }
    } else {
      throw new Error(`Backend returned ${response.status}`);
    }

    // Fallback về config tĩnh nếu API lỗi
    if (!config) {
      const { getSiteConfig } = await import('@/lib/config');
      config = getSiteConfig();
    }

    // Tạo manifest động từ config
    const manifest = {
      name: `${config.nameGame} - ${config.gameTitle}`,
      short_name: config.nameGame.replace(/\./g, '').substring(0, 12) || 'MuOnline',
      description: config.metaDescription || 'Server Mu Online Season 1 với tỷ lệ exp cao, drop rate tốt. Cộng đồng game thủ Việt Nam hàng đầu.',
      start_url: '/',
      display: 'standalone',
      background_color: '#000000',
      theme_color: '#1e40af',
      orientation: 'portrait-primary',
      scope: '/',
      lang: 'vi',
      dir: 'ltr',
      categories: ['games', 'entertainment'],
      icons: [
        {
          src: '/icon.jpg',
          sizes: '192x192',
          type: 'image/jpeg',
          purpose: 'any maskable'
        },
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/favicon/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png'
        }
      ],
      screenshots: [
        {
          src: '/Panael-mu.JPEG',
          sizes: '1280x720',
          type: 'image/jpeg',
          form_factor: 'wide'
        }
      ],
      shortcuts: [
        {
          name: 'Xếp hạng',
          short_name: 'Rankings',
          description: 'Xem bảng xếp hạng',
          url: '/rankings',
          icons: [
            {
              src: '/icon.jpg',
              sizes: '96x96'
            }
          ]
        },
        {
          name: 'Tải game',
          short_name: 'Download',
          description: 'Tải client game',
          url: '/download',
          icons: [
            {
              src: '/icon.jpg',
              sizes: '96x96'
            }
          ]
        },
        {
          name: 'Đăng nhập',
          short_name: 'Login',
          description: 'Đăng nhập vào game',
          url: '/login',
          icons: [
            {
              src: '/icon.jpg',
              sizes: '96x96'
            }
          ]
        }
      ],
      related_applications: [],
      prefer_related_applications: false,
      edge_side_panel: {
        preferred_width: 400
      },
      launch_handler: {
        client_mode: 'navigate-existing'
      }
    };

    return NextResponse.json(manifest, {
      headers: {
        'Content-Type': 'application/manifest+json',
        'Cache-Control': 'public, max-age=3600', // Cache 1 giờ
      },
    });
  } catch (error: any) {

    // Fallback về config tĩnh
    const { getSiteConfig } = await import('@/lib/config');
    const config = getSiteConfig();

    const manifest = {
      name: `${config.nameGame} - ${config.gameTitle}`,
      short_name: config.nameGame.replace(/\./g, '').substring(0, 12) || 'MuOnline',
      description: config.metaDescription || 'Server Mu Online Season 1 với tỷ lệ exp cao, drop rate tốt. Cộng đồng game thủ Việt Nam hàng đầu.',
      start_url: '/',
      display: 'standalone',
      background_color: '#000000',
      theme_color: '#1e40af',
      orientation: 'portrait-primary',
      scope: '/',
      lang: 'vi',
      dir: 'ltr',
      categories: ['games', 'entertainment'],
      icons: [
        {
          src: '/icon.jpg',
          sizes: '192x192',
          type: 'image/jpeg',
          purpose: 'any maskable'
        },
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/favicon/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png'
        }
      ],
      screenshots: [
        {
          src: '/Panael-mu.JPEG',
          sizes: '1280x720',
          type: 'image/jpeg',
          form_factor: 'wide'
        }
      ],
      shortcuts: [
        {
          name: 'Xếp hạng',
          short_name: 'Rankings',
          description: 'Xem bảng xếp hạng',
          url: '/rankings',
          icons: [
            {
              src: '/icon.jpg',
              sizes: '96x96'
            }
          ]
        },
        {
          name: 'Tải game',
          short_name: 'Download',
          description: 'Tải client game',
          url: '/download',
          icons: [
            {
              src: '/icon.jpg',
              sizes: '96x96'
            }
          ]
        },
        {
          name: 'Đăng nhập',
          short_name: 'Login',
          description: 'Đăng nhập vào game',
          url: '/login',
          icons: [
            {
              src: '/icon.jpg',
              sizes: '96x96'
            }
          ]
        }
      ],
      related_applications: [],
      prefer_related_applications: false,
      edge_side_panel: {
        preferred_width: 400
      },
      launch_handler: {
        client_mode: 'navigate-existing'
      }
    };

    return NextResponse.json(manifest, {
      headers: {
        'Content-Type': 'application/manifest+json',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }
}

