import type { Metadata } from "next";
import "./globals.css";
import "../styles/mobile.css";
import SecurityGuard from "@/components/SecurityGuard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AutoRequestNotification from "@/components/AutoRequestNotification";
import { ConfigProvider } from "@/contexts/ConfigContext";

// Sử dụng font system thay vì Google Fonts để tránh timeout
const geistSans = {
  variable: "--font-geist-sans",
};

const geistMono = {
  variable: "--font-geist-mono",
};

import { getSiteConfig } from '@/lib/config';

const config = getSiteConfig();

export const metadata: Metadata = {
  title: `${config.nameGame} - ${config.gameTitle} | Server Game MU Online Việt Nam`,
  description: config.metaDescription,
  keywords: config.metaKeywords,
  authors: [{ name: `${config.nameGame} Team` }],
  creator: config.nameGame,
  publisher: config.nameGame,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(config.websiteUrl),
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.json',
  themeColor: '#1e40af',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  openGraph: {
    title: `${config.nameGame} - ${config.gameTitle} | Server Game MU Online Việt Nam`,
    description: config.metaDescription,
    url: config.websiteUrl,
    siteName: config.websiteName,
    images: [
      {
        url: '/Panael-mu.JPEG',
        width: 1200,
        height: 630,
        alt: `${config.nameGame} - ${config.gameTitle} - Hệ thống PvP và chiến đấu`,
      },
      {
        url: '/logoweb.jpg',
        width: 1200,
        height: 630,
        alt: `${config.nameGame} - ${config.gameTitle} - Logo chính thức`,
      },
      {
        url: '/muonline-panael.jpg',
        width: 1200,
        height: 630,
        alt: `${config.nameGame} - ${config.gameTitle} - Khung cảnh game 3D`,
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${config.nameGame} - ${config.gameTitle} | Server Game MU Online`,
    description: "Server Mu Online Season 1 với tỷ lệ exp cao, drop rate tốt. Game MMORPG miễn phí với PvP, Guild System. Tải game ngay!",
    images: ['/Panael-mu.JPEG', '/logoweb.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
      icons: {
        icon: [
          { url: '/favicon.ico', sizes: 'any' },
          { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
          { url: '/favicon.svg', type: 'image/svg+xml' }
        ],
        apple: [
          { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
        ],
        shortcut: '/favicon.ico'
      },
  appleWebApp: {
    title: 'MU',
    statusBarStyle: 'default',
    capable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-touch-icon-57x57.png" />
        
        {/* Android Chrome Icons */}
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        
        {/* Manifest and Meta - Sử dụng API route động (rewrite từ /manifest.json) */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <meta name="msapplication-TileImage" content="/favicon/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={config.nameGame} />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js', { scope: '/' })
                    .then(function(registration) {
                      // Chỉ log khi có lỗi hoặc update, không log mỗi lần load
                      
                      // Kiểm tra và update service worker
                      registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        if (newWorker) {
                          newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                              console.log('🔄 Service worker mới đã sẵn sàng. Đang reload...');
                            } else if (newWorker.state === 'activated') {
                              // Force reload để dùng service worker mới
                              window.location.reload();
                            }
                          });
                        }
                      });
                    })
                    .catch(function(registrationError) {
                      console.error('❌ Service Worker registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConfigProvider>
          <AutoRequestNotification />
          <SecurityGuard />
          <Header />
          {children}
          <Footer />
        </ConfigProvider>
      </body>
    </html>
  );
}
