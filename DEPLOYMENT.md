# 🚀 Hướng dẫn Deploy lên Vercel

## 📋 Yêu cầu trước khi deploy

### 1. Chuẩn bị Database
- SQL Server đã được cài đặt và chạy
- Database đã được tạo
- User có quyền truy cập database

### 2. Chuẩn bị Environment Variables
Tạo file `.env.local` trong thư mục gốc với nội dung:

```env
# Database Configuration
DB_SERVER=your_sql_server_ip
DB_NAME=your_database_name
DB_USERNAME=sa
DB_PASSWORD=your_secure_password
DB_PORT=1433

# Next.js Configuration
NEXT_TELEMETRY_DISABLED=1
```

## 🚀 Deploy lên Vercel

### Bước 1: Push code lên GitHub
```bash
git add .
git commit -m "Initial commit - Mu Online Website"
git push origin main
```

### Bước 2: Deploy trên Vercel
1. Truy cập [vercel.com](https://vercel.com)
2. Đăng nhập bằng GitHub
3. Click "New Project"
4. Import repository từ GitHub
5. Cấu hình Environment Variables:
   - `DB_SERVER`: IP của SQL Server
   - `DB_NAME`: Tên database của bạn
   - `DB_USERNAME`: sa
   - `DB_PASSWORD`: Mật khẩu SQL Server
   - `DB_PORT`: 1433
6. Click "Deploy"

### Bước 3: Cấu hình Database
1. Đảm bảo SQL Server cho phép kết nối từ bên ngoài
2. Mở port 1433 trên firewall
3. Cấu hình SQL Server Authentication

## 🔒 Bảo mật

### Environment Variables được bảo vệ:
- ✅ `.env.local` không được commit
- ✅ Thông tin database chỉ lưu trên Vercel
- ✅ Không có hardcode thông tin nhạy cảm

### Security Features:
- ✅ Content Security Policy (CSP)
- ✅ XSS Protection
- ✅ Clickjacking Protection
- ✅ Rate Limiting
- ✅ CAPTCHA Protection

## 📝 Lưu ý quan trọng

1. **KHÔNG BAO GIỜ** commit file `.env.local`
2. **KHÔNG BAO GIỜ** hardcode thông tin database trong code
3. Luôn sử dụng Environment Variables
4. Kiểm tra `.gitignore` trước khi commit

## 🛠️ Troubleshooting

### Lỗi kết nối database:
1. Kiểm tra IP SQL Server
2. Kiểm tra port 1433
3. Kiểm tra firewall
4. Kiểm tra SQL Server configuration

### Lỗi build:
1. Kiểm tra Node.js version
2. Kiểm tra dependencies
3. Kiểm tra TypeScript errors

## 📞 Hỗ trợ

Nếu gặp vấn đề, hãy kiểm tra:
1. Logs trên Vercel Dashboard
2. Database connection
3. Environment Variables
4. Network connectivity
