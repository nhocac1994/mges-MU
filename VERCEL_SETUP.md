# 🚀 Hướng Dẫn Setup Vercel Environment Variables

## ⚠️ Vấn Đề

Khi deploy lên Vercel, nếu không set biến môi trường `NEXT_PUBLIC_API_URL`, code sẽ fallback về `localhost:55777` và không thể kết nối đến server thực tế.

## ✅ Giải Pháp: Set Environment Variables trong Vercel

### Bước 1: Vào Vercel Dashboard

1. Đăng nhập vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project `mu-dautruongss1` (hoặc tên project của bạn)

### Bước 2: Vào Settings > Environment Variables

1. Click vào tab **Settings**
2. Click vào **Environment Variables** ở menu bên trái

### Bước 3: Thêm Biến Môi Trường

Thêm biến môi trường sau:

**Key:** `NEXT_PUBLIC_API_URL`  
**Value:** `http://mutruyenkyss1.com:55777` (hoặc domain/IP thực tế của bạn)

**Lưu ý:**
- ✅ Chọn tất cả các môi trường: **Production**, **Preview**, **Development**
- ✅ Nếu dùng HTTPS, đổi thành `https://mutruyenkyss1.com:55777`
- ✅ Nếu server không có port public, có thể bỏ `:55777`

### Bước 4: Redeploy

Sau khi thêm biến môi trường:

1. Vào tab **Deployments**
2. Click vào 3 chấm (⋯) của deployment mới nhất
3. Chọn **Redeploy**
4. Hoặc push một commit mới để trigger auto-deploy

## 🔍 Kiểm Tra

Sau khi deploy xong, kiểm tra:

1. Vào trang web trên Vercel
2. Mở Developer Tools (F12)
3. Vào tab **Console** hoặc **Network**
4. Kiểm tra xem API calls có đi đến đúng domain không

## 📝 Ví Dụ Giá Trị Biến Môi Trường

### Nếu dùng HTTP:
```
NEXT_PUBLIC_API_URL=http://mutruyenkyss1.com:55777
```

### Nếu dùng HTTPS:
```
NEXT_PUBLIC_API_URL=https://mutruyenkyss1.com:55777
```

### Nếu dùng IP (không khuyến khích):
```
NEXT_PUBLIC_API_URL=http://103.110.85.229:55777
```

## ⚠️ Lưu Ý Bảo Mật

- Biến `NEXT_PUBLIC_*` sẽ bị expose trong client-side bundle
- Nếu muốn ẩn IP, nên dùng domain thay vì IP trực tiếp
- Cân nhắc dùng reverse proxy (như Nginx) để ẩn port

## 🐛 Troubleshooting

### Vẫn không kết nối được?

1. **Kiểm tra biến môi trường đã được set chưa:**
   - Vào Vercel Dashboard > Settings > Environment Variables
   - Đảm bảo `NEXT_PUBLIC_API_URL` đã được thêm

2. **Kiểm tra giá trị có đúng không:**
   - Không có khoảng trắng thừa
   - Đúng protocol (http/https)
   - Đúng port

3. **Kiểm tra server có accessible không:**
   ```bash
   curl http://mutruyenkyss1.com:55777/health
   ```

4. **Kiểm tra CORS:**
   - Server backend cần cho phép requests từ domain Vercel
   - Thêm domain Vercel vào CORS whitelist

5. **Redeploy lại:**
   - Sau khi thêm/sửa biến môi trường, cần redeploy
   - Biến môi trường chỉ có hiệu lực sau khi rebuild

---

**Sau khi setup xong, website sẽ kết nối được đến server backend!** ✅

