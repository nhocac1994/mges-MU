# Hướng Dẫn Sử Dụng Site Configuration

## Tổng Quan

Hệ thống config cho phép bạn thay đổi thông tin website mà không cần sửa mã nguồn. Chỉ cần chỉnh sửa file config và website sẽ tự động cập nhật.

## File Config

File config chính: `src/config/site.config.ts`

## Cách Sử Dụng

### 1. Thay Đổi Thông Tin Cơ Bản

Mở file `src/config/site.config.ts` và chỉnh sửa:

```typescript
export const siteConfig = {
  nameGame: "MuDauTruongSS1.net",        // Tên game/server
  gameTitle: "Mu Online Season 1",        // Tiêu đề game
  serverName: "MuDauTruongSS1.net",      // Tên server
  websiteUrl: "https://mudautruongss1.net", // URL website
  // ...
}
```

### 2. Thay Đổi Links Mạng Xã Hội

```typescript
linkFacebook: "https://facebook.com/MuDauTruongSS1",
linkDiscord: "https://discord.gg/mudautruongss1",
linkYoutube: "https://youtube.com/@MuDauTruongSS1",
linkZalo: "https://zalo.me/mudautruongss1",
```

### 3. Thay Đổi Thông Tin Liên Hệ

```typescript
email: "support@mudautruongss1.net",
phone: "0123456789",
address: "Việt Nam",
```

### 4. Thay Đổi Thông Tin Server

```typescript
serverIP: "127.0.0.1",
serverPort: "55900",
expRate: "100x",
dropRate: "50%",
```

## Sử Dụng Config Trong Code

### Import Config

```typescript
import { getSiteConfig } from '@/lib/config';

const config = getSiteConfig();
```

### Sử Dụng Trong Component

```typescript
'use client';

import { getSiteConfig } from '@/lib/config';

export default function MyComponent() {
  const config = getSiteConfig();
  
  return (
    <div>
      <h1>{config.nameGame}</h1>
      <a href={config.linkFacebook}>Facebook</a>
    </div>
  );
}
```

### Sử Dụng Trong Server Component

```typescript
import { getSiteConfig } from '@/lib/config';

export default function MyServerComponent() {
  const config = getSiteConfig();
  
  return <h1>{config.nameGame}</h1>;
}
```

### Lấy Config Từ API

```typescript
// Client-side
const response = await fetch('/api/config');
const { data } = await response.json();
console.log(data.nameGame);
```

## Các Trường Config Có Sẵn

### Thông Tin Game
- `nameGame`: Tên game/server
- `gameTitle`: Tiêu đề game
- `gameSubtitle`: Phụ đề
- `serverName`: Tên server
- `serverVersion`: Phiên bản server

### Links Mạng Xã Hội
- `linkFacebook`: Link Facebook
- `linkDiscord`: Link Discord
- `linkYoutube`: Link YouTube
- `linkZalo`: Link Zalo

### Thông Tin Liên Hệ
- `email`: Email hỗ trợ
- `phone`: Số điện thoại
- `address`: Địa chỉ

### Thông Tin Website
- `websiteUrl`: URL website
- `websiteName`: Tên website

### Game Settings
- `expRate`: Tỷ lệ exp
- `dropRate`: Tỷ lệ drop
- `resetLevel`: Level reset
- `maxReset`: Reset tối đa

### Events
- `eventStartDate`: Ngày bắt đầu event
- `eventStartTime`: Giờ bắt đầu event

### SEO & Meta
- `metaDescription`: Mô tả SEO
- `metaKeywords`: Từ khóa SEO

### Images
- `logoImage`: Đường dẫn logo
- `bannerImage`: Đường dẫn banner
- `favicon`: Đường dẫn favicon

### Colors
- `primaryColor`: Màu chính
- `secondaryColor`: Màu phụ
- `accentColor`: Màu nhấn

### Features
- `features.pvp`: Bật/tắt PvP
- `features.guild`: Bật/tắt Guild
- `features.events`: Bật/tắt Events
- `features.reset`: Bật/tắt Reset
- `features.chaosMix`: Bật/tắt ChaosMix

## Lưu Ý

1. **Sau khi thay đổi config**, cần restart Next.js server để áp dụng thay đổi
2. **Kiểm tra syntax** trước khi lưu file config
3. **Backup config** trước khi thay đổi lớn
4. **Test kỹ** sau khi thay đổi để đảm bảo không có lỗi

## Mở Rộng Trong Tương Lai

- Lưu config vào database
- Tạo admin panel để chỉnh sửa config qua web
- Hỗ trợ nhiều ngôn ngữ
- Cache config để tăng performance

