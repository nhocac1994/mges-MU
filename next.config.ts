import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true, // Disable image optimization for static files
  },
  serverExternalPackages: ['mssql'],
  async rewrites() {
    return [
      {
        source: '/manifest.json',
        destination: '/api/manifest',
      },
    ];
  },
};

export default nextConfig;
