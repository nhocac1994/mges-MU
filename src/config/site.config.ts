// Site Configuration - Thay đổi thông tin tại đây mà không cần sửa mã nguồn
export const siteConfig = {
  // Thông tin game
  nameGame: "MuTruyenkyss1.com",
  gameTitle: "Mu Truyen Ky Season 1",
  gameSubtitle: "Hành trình huyền thoại bắt đầu",
  
  // Thông tin server
  serverName: "MuTruyenkyss1.com",
  serverVersion: "Season 1",
  serverIP: "127.0.0.1",
  serverPort: "55900",
  
  // Links mạng xã hội
  linkFacebook: "https://facebook.com/MuTruyenkyss1.com",
  linkDiscord: "https://discord.gg/MuOnline.com",
  linkYoutube: "https://youtube.com/@MuTruyenkyss1.com",
  linkZalo: "https://zalo.me/MuTruyenkyss1.com",
  linkTikTok: "https://www.tiktok.com/@MuTruyenkyss1.com",
  
  // Thông tin liên hệ
  email: "support@MuTruyenkyss1.com",
  phone: "0971371678",
  address: "Việt Nam",
  adminZalo: "0971371678",
  
  // Thông tin chuyển khoản
  payment: {
    bankAccount: "0971371678",
    accountHolder: "Bui Hữu Bảo",
    bankName: "MB-BANK",
    // Có thể dùng đường dẫn local (ví dụ: "/qrcode.jpeg") hoặc URL (ví dụ: "https://example.com/qrcode.jpg")
    qrCodeImage: "https://img.vietqr.io/image/MB-0971371678-qr_only.png"
  },
  
  // Thông tin website
  websiteUrl: "https://MuTruyenkyss1.com",
  websiteName: "MuTruyenkyss1.com",
  
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
    "MuTruyenkyss1.com",
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

