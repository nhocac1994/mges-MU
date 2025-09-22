import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MuDauTruongSS1.Net - Mu Online Season 1",
  description: "Server Mu Online Season 1 với tỷ lệ exp cao, drop rate tốt. Cộng đồng game thủ Việt Nam hàng đầu.",
  keywords: ["Mu Online", "Season 1", "Game", "Vietnam", "Server", "Gaming"],
  authors: [{ name: "MuDauTruongSS1 Team" }],
  creator: "MuDauTruongSS1.Net",
  publisher: "MuDauTruongSS1.Net",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mudautruongss1.net'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "MuDauTruongSS1.Net - Mu Online Season 1",
    description: "Server Mu Online Season 1 với tỷ lệ exp cao, drop rate tốt. Cộng đồng game thủ Việt Nam hàng đầu.",
    url: 'https://mudautruongss1.net',
    siteName: 'MuDauTruongSS1.Net',
    images: [
      {
        url: '/icon.jpg',
        width: 1200,
        height: 630,
        alt: 'MuDauTruongSS1.Net - Mu Online Season 1',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "MuDauTruongSS1.Net - Mu Online Season 1",
    description: "Server Mu Online Season 1 với tỷ lệ exp cao, drop rate tốt. Cộng đồng game thủ Việt Nam hàng đầu.",
    images: ['/icon.jpg'],
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
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/favicon.ico'
  },
  manifest: '/site.webmanifest',
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
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-touch-icon-57x57.png" />
        
        {/* Android Chrome Icons */}
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon/android-chrome-512x512.png" />
        
        {/* Manifest and Meta */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-TileImage" content="/apple-touch-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
