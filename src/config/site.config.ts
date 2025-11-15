// Site Configuration - Thay đổi thông tin tại đây mà không cần sửa mã nguồn
export const siteConfig = {
  // Thông tin game
  nameGame: "MuDauTruongSS1.net",
  gameTitle: "Mu Online Season 1",
  gameSubtitle: "Hành trình huyền thoại bắt đầu",
  
  // Thông tin server
  serverName: "MuDauTruongSS1.net",
  serverVersion: "Season 1",
  serverIP: "127.0.0.1",
  serverPort: "55900",
  
  // Links mạng xã hội
  linkFacebook: "https://facebook.com/MuDauTruongSS1",
  linkDiscord: "https://discord.gg/mudautruongss1",
  linkYoutube: "https://youtube.com/@MuDauTruongSS1",
  linkZalo: "https://zalo.me/mudautruongss1",
  linkTikTok: "https://www.tiktok.com/@mudautruongss1",
  
  // Thông tin liên hệ
  email: "support@mudautruongss1.net",
  phone: "0123456789",
  address: "Việt Nam",
  
  // Thông tin website
  websiteUrl: "https://mudautruongss1.net",
  websiteName: "MuDauTruongSS1.net",
  
  // Thông tin game settings
  expRate: "100x",
  dropRate: "50%",
  resetLevel: 400,
  maxReset: 999,
  
  // Thông tin events
  eventStartDate: "2025-10-10",
  eventStartTime: "13:00",
  
  // SEO & Meta
  metaDescription: "MuDauTruongSS1.net - Server Mu Online Season 1 với tỷ lệ exp cao, drop rate tốt. Game MMORPG miễn phí, PvP, Guild System, Events đặc biệt.",
  metaKeywords: [
    "Mu Online",
    "Mu Online Season 1",
    "MuDauTruongSS1.net",
    "Server Mu Online",
    "Game Mu Online Việt Nam"
  ],
  
  // Images
  logoImage: "/MU-DAUTRUONG.PNG",
  bannerImage: "/panael-mu.jpg",
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

