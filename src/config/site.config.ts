// Site Configuration - Thay đổi thông tin tại đây mà không cần sửa mã nguồn
export const siteConfig = {
  // Thông tin game
  nameGame: "MuOnline.com",
  gameTitle: "Mu Online Season 1",
  gameSubtitle: "Hành trình huyền thoại bắt đầu",
  
  // Thông tin server
  serverName: "MuOnline.com",
  serverVersion: "Season 1",
  serverIP: "127.0.0.1",
  serverPort: "55900",
  
  // Links mạng xã hội
  linkFacebook: "https://facebook.com/MuOnline.com",
  linkDiscord: "https://discord.gg/MuOnline.com",
  linkYoutube: "https://youtube.com/@MuOnline.com",
  linkZalo: "https://zalo.me/MuOnline.com",
  linkTikTok: "https://www.tiktok.com/@MuOnline.com",
  
  // Thông tin liên hệ
  email: "support@MuOnline.com",
  phone: "0123456789",
  address: "Việt Nam",
  adminZalo: "0123456789",
  
  // Thông tin chuyển khoản
  payment: {
    bankAccount: "0123456789",
    accountHolder: "NGUYEN a",
    bankName: "MB-BANK",
    // Có thể dùng đường dẫn local (ví dụ: "/qrcode.jpeg") hoặc URL (ví dụ: "https://example.com/qrcode.jpg")
    qrCodeImage: "/qrcode.jpeg"
  },
  
  // Thông tin website
  websiteUrl: "https://MuOnline.com",
  websiteName: "MuOnline.com",
  
  // Thông tin game settings
  expRate: "100x",
  dropRate: "50%",
  resetLevel: 400,
  maxReset: 999,
  
  // Thông tin events
  eventStartDate: "2025-10-10",
  eventStartTime: "13:00",
  
  // SEO & Meta
  metaDescription: "MuOnline.com - Server Mu Online Season 1 với tỷ lệ exp cao, drop rate tốt. Game MMORPG miễn phí, PvP, Guild System, Events đặc biệt.",
  metaKeywords: [
    "Mu Online",
    "Mu Online Season 1",
    "MuOnline.com",
    "Server Mu Online",
    "Game Mu Online Việt Nam"
  ],
  
  // Images
  logoImage: "/MuOnline.com.png",
  bannerImage: "/Panael-mu.JPEG",
  favicon: "/favicon.ico",
  
  // Colors theme
  primaryColor: "#FFD700",
  secondaryColor: "#FFA500",
  accentColor: "#FF0000",
  
  // Features
  features: {
    pvp: true,
    guild: true,
    events: true,
    reset: true,
    chaosMix: true
  }
};

// Export type for TypeScript
export type SiteConfig = typeof siteConfig;

