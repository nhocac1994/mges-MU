# 🔔 Hướng Dẫn Push Notifications

## 📋 Tổng Quan

Hệ thống push notifications cho phép:
- ✅ Tự động gửi thông báo khi đến giờ sự kiện (nếu user đã cho phép)
- ✅ Gửi thông báo từ file `notification.txt` theo thời gian định sẵn
- ✅ Server C# có thể gửi thông báo đến các user đã đăng ký (có key)
- ✅ Nhận thông báo ngay cả khi đóng trình duyệt (nếu có push subscription)

## 📝 Format notification.txt

### Cấu trúc
```
id | title | sendTime | message
```

### Giải thích
- **id**: ID của thông báo (số hoặc string)
- **title**: Tiêu đề thông báo
- **sendTime**: Thời gian gửi
  - Format `HH:mm` - Gửi hàng ngày vào giờ đó
  - Format `YYYY-MM-DD HH:mm` - Gửi một lần vào thời điểm cụ thể
- **message**: Nội dung thông báo

### Ví dụ
```
# Notifications Configuration
# Format: id | title | sendTime | message
1 | Sự kiện Double EXP | 12:00 | Sự kiện Double EXP đã bắt đầu! Hãy tham gia ngay!
2 | Thông báo bảo trì | 2025-01-15 02:00 | Server sẽ bảo trì từ 2:00 đến 4:00 sáng
3 | Event cuối tuần | 18:00 | Event đặc biệt cuối tuần đã bắt đầu!
```

## 🔑 Push Subscription (Key)

### Cách hoạt động

1. **Khi user đăng ký:**
   - Frontend tạo push subscription (key) từ browser
   - Key được gửi đến server C# qua API `/api/push/subscribe`
   - Server C# lưu key vào database

2. **Khi server gửi thông báo:**
   - Server C# gọi API với danh sách keys
   - Mỗi key sẽ nhận được push notification
   - Nếu không có key, user chỉ nhận thông báo khi mở trình duyệt

3. **Khi đóng trình duyệt:**
   - Nếu có push subscription (key): ✅ Nhận thông báo ngay cả khi đóng
   - Nếu không có key: ❌ Chỉ nhận khi mở trình duyệt

## 🛠️ API Endpoints

### 1. Đăng ký Push Subscription
```
POST /api/push/subscribe
Body: {
  subscription: {
    endpoint: string,
    keys: {
      p256dh: string,
      auth: string
    }
  }
}
```

### 2. Hủy đăng ký
```
DELETE /api/push/subscribe
Body: {
  subscriptionId: string
}
```

### 3. Lấy danh sách notifications
```
GET /api/notifications/list
Response: {
  success: true,
  notifications: [...], // Notifications cần gửi ngay
  allNotifications: [...] // Tất cả notifications
}
```

### 4. Server C# gửi push notifications
```
POST /api/push/send
Body: {
  title: string,
  message: string,
  url?: string,
  subscriptions: [...] // Danh sách subscription keys
}
```

## 🔧 Cấu hình Server C#

Server C# cần implement các endpoints:

1. **POST /api/push/subscribe**
   - Nhận subscription từ frontend
   - Lưu vào database với format:
     ```json
     {
       "subscriptionId": "endpoint-url",
       "endpoint": "https://...",
       "p256dh": "...",
       "auth": "...",
       "createdAt": "2025-01-01T00:00:00Z"
     }
     ```

2. **POST /api/push/send**
   - Nhận danh sách subscriptions
   - Gửi push notifications đến từng subscription
   - Sử dụng Web Push Protocol với VAPID keys

3. **GET /api/config-files/notification.txt**
   - Trả về nội dung file notification.txt

## 📱 Frontend Components

### PushNotificationButton
- Component để user đăng ký push notifications
- Tự động hiển thị trong EventCountdown
- Yêu cầu notification permission trước khi subscribe

### Service Worker
- Check events mỗi phút
- Check notifications từ notification.txt mỗi phút
- Xử lý push messages từ server
- Hiển thị notifications ngay cả khi app đóng

## ⚙️ Environment Variables

Cần thêm vào `.env.local`:
```
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your-vapid-public-key
```

VAPID key được tạo từ server C# và cần match với private key trên server.

## 🧪 Testing

1. **Test notifications từ notification.txt:**
   - Tạo file `notification.txt` với time slot gần thời gian hiện tại
   - Service worker sẽ tự động check và gửi thông báo

2. **Test push từ server:**
   - Đăng ký push subscription
   - Server C# gửi push notification đến subscription key
   - Thông báo sẽ hiển thị ngay cả khi đóng trình duyệt

## 📌 Lưu ý

- Push notifications chỉ hoạt động với HTTPS (hoặc localhost)
- Cần VAPID keys từ server C# để gửi push notifications
- Nếu không có push subscription, user vẫn nhận thông báo khi mở trình duyệt
- Service worker check notifications mỗi phút

