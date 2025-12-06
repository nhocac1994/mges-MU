'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loadConfigFromAPI } from '@/lib/config-loader';
import { getSiteConfig } from '@/lib/config';

interface ConfigContextType {
  config: any;
  loading: boolean;
  refreshConfig: () => Promise<void>;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: ReactNode }) {
  // Hiển thị config tĩnh ngay lập tức, không chờ API
  const defaultConfig = getSiteConfig();
  const [config, setConfig] = useState(defaultConfig);
  const [loading, setLoading] = useState(false); // Bắt đầu với false vì đã có config tĩnh

  const loadConfig = async () => {
    try {
      // Load config từ API trong background, không block UI
      const apiConfig = await loadConfigFromAPI();
      if (apiConfig) {
        // Merge config từ API với config mặc định để đảm bảo có đầy đủ thông tin
        // Đặc biệt quan trọng cho payment config
        const mergedConfig = {
          ...defaultConfig,
          ...apiConfig,
          // Merge payment config riêng để đảm bảo không mất thông tin
          payment: {
            ...defaultConfig.payment,
            ...(apiConfig.payment || {})
          }
        };
        setConfig(mergedConfig);
      }
    } catch (error) {
      // Giữ config tĩnh nếu API lỗi, không cần thông báo
      console.error('Failed to load config from API, using default config:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load config trong background, không block rendering
    loadConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, loading, refreshConfig: loadConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  // Fallback về config tĩnh nếu context chưa sẵn sàng (SSR hoặc chưa mount)
  if (context === undefined) {
    const fallbackConfig = getSiteConfig();
    return {
      config: fallbackConfig,
      loading: true,
      refreshConfig: async () => {}
    };
  }
  return context;
}

