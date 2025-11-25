# 🔧 Cấu Hình .env.local cho Next.js

## 📝 Tạo File .env.local

Tạo file `.env.local` trong thư mục gốc của dự án Next.js với nội dung:

```bash
# Backend C# API URL
# Backend chạy trên VPS: 103.110.85.229:55777
NEXT_PUBLIC_API_URL=http://103.110.85.229:55777

# Next.js Configuration
NEXT_TELEMETRY_DISABLED=1
```

## 📍 Vị Trí File

```
mu-online-react/
├── .env.local          ← Tạo file này
├── package.json
├── src/
└── ...
```

## ✅ Sau Khi Tạo File

1. **Restart Next.js dev server**:
   ```bash
   # Dừng server hiện tại (Ctrl+C)
   npm run dev
   ```

2. **Kiểm tra**:
   - File `src/lib/api-client.ts` sẽ tự động sử dụng URL từ `.env.local`
   - API calls sẽ đi tới: `http://103.110.85.229:55777`

## 🧪 Test

Mở browser console và chạy:

```javascript
fetch('http://103.110.85.229:55777/health')
  .then(r => r.json())
  .then(console.log);
```

---

**File .env.local đã sẵn sàng để tạo!** ✅

