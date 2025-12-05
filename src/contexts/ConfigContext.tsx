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
  const [config, setConfig] = useState(getSiteConfig());
  const [loading, setLoading] = useState(false); // Bắt đầu với false vì đã có config tĩnh

  const loadConfig = async () => {
    try {
      // Load config từ API trong background, không block UI
      const apiConfig = await loadConfigFromAPI();
      if (apiConfig) {
        setConfig(apiConfig);
      }
    } catch (error) {
      // Giữ config tĩnh nếu API lỗi, không cần thông báo
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

