/**
 * Config Loader - Load config từ API thay vì file tĩnh
 * Hỗ trợ cache để tăng performance
 */

let configCache: any = null;
let configCacheTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 phút

/**
 * Load config từ API
 */
export async function loadConfigFromAPI(): Promise<any> {
  // Kiểm tra cache
  const now = Date.now();
  if (configCache && (now - configCacheTime) < CACHE_DURATION) {
    return configCache;
  }

  try {
    // Sử dụng endpoint /api/config đã xử lý sẵn format
    const response = await fetch('/api/config', {
      cache: 'no-store', // Không cache để luôn lấy config mới nhất
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    // Endpoint /api/config trả về: { success: true, data: {...config...} }
    if (result.success && result.data) {
      configCache = result.data;
      configCacheTime = now;
      return configCache;
    } else {
      throw new Error('Invalid API response format');
    }
  } catch (error) {
    // Fallback to static config
  }

  // Fallback về config tĩnh nếu API lỗi
  const { siteConfig } = await import('@/config/site.config');
  return siteConfig;
}

/**
 * Load events từ API
 */
export async function loadEventsFromAPI(): Promise<string[]> {
  try {
    const response = await fetch('/api/config-files/event.txt');
    const result = await response.json();
    
    if (result.success && result.data) {
      const content = typeof result.data.content === 'string' 
        ? result.data.content 
        : JSON.stringify(result.data.content);
      
      // Parse events từ text
      return content
        .split('\n')
        .filter((line: string) => line.trim() && !line.trim().startsWith('#'))
        .map((line: string) => line.trim());
    }
  } catch (error) {
    // Error loading events
  }

  return [];
}

/**
 * Load download URLs từ API
 */
export async function loadDownloadUrlsFromAPI(): Promise<string[]> {
  try {
    const response = await fetch('/api/config-files/urldownload.txt');
    const result = await response.json();
    
    if (result.success && result.data) {
      const content = typeof result.data.content === 'string' 
        ? result.data.content 
        : JSON.stringify(result.data.content);
      
      // Parse URLs từ text
      return content
        .split('\n')
        .filter((line: string) => line.trim() && !line.trim().startsWith('#'))
        .map((line: string) => line.trim());
    }
  } catch (error) {
    // Error loading download URLs
  }

  return [];
}

/**
 * Clear config cache (khi admin update config)
 */
export function clearConfigCache() {
  configCache = null;
  configCacheTime = 0;
}

