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
  const [config, setConfig] = useState(getSiteConfig()); // Fallback về config tĩnh
  const [loading, setLoading] = useState(true);

  const loadConfig = async () => {
    try {
      setLoading(true);
      const apiConfig = await loadConfigFromAPI();
      if (apiConfig) {
        setConfig(apiConfig);
        // Không log config đã load (quá dài)
      }
    } catch (error) {
      console.error('Failed to load config from API:', error);
      // Giữ config tĩnh nếu API lỗi
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

