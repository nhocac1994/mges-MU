# 🚀 Hướng Dẫn Deploy Lên Netlify

## 📋 Yêu Cầu
- Tài khoản GitHub
- Tài khoản Netlify (miễn phí)
- Code đã được push lên GitHub

## 🔧 Bước 1: Chuẩn Bị Code

### 1.1. Push code lên GitHub
```bash
# Tạo repository mới trên GitHub
# Sau đó chạy các lệnh sau:

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/mu-online-react.git
git push -u origin main
```

### 1.2. Kiểm tra file cấu hình
- ✅ `netlify.toml` đã được tạo
- ✅ `package.json` có script build
- ✅ `.env.local` có cấu hình database

## 🌐 Bước 2: Deploy Trên Netlify

### 2.1. Đăng nhập Netlify
1. Truy cập: https://netlify.com
2. Đăng nhập bằng GitHub
3. Click "New site from Git"

### 2.2. Kết nối Repository
1. Chọn "GitHub" làm provider
2. Tìm và chọn repository `mu-online-react`
3. Click "Deploy site"

### 2.3. Cấu hình Build Settings
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: 18

## 🔐 Bước 3: Cấu Hình Environment Variables

### 3.1. Vào Site Settings
1. Vào dashboard của site trên Netlify
2. Click "Site settings"
3. Click "Environment variables"

### 3.2. Thêm các biến môi trường
```
DB_SERVER=your_sql_server_ip
DB_NAME=your_database_name
DB_USERNAME=sa
DB_PASSWORD=your_secure_password
DB_PORT=1433
NEXTAUTH_URL=https://your-site-name.netlify.app
NEXTAUTH_SECRET=your-secret-key-here
```

## 🚀 Bước 4: Deploy

### 4.1. Trigger Deploy
1. Click "Deploys" tab
2. Click "Trigger deploy" > "Deploy site"
3. Chờ quá trình build hoàn thành

### 4.2. Kiểm tra kết quả
1. Truy cập URL của site
2. Test các chức năng:
   - ✅ Trang chủ hiển thị
   - ✅ Đăng ký tài khoản
   - ✅ Đăng nhập
   - ✅ Kết nối database

## 🔧 Bước 5: Cấu Hình Domain (Tùy chọn)

### 5.1. Custom Domain
1. Vào "Domain settings"
2. Click "Add custom domain"
3. Nhập domain của bạn
4. Cấu hình DNS theo hướng dẫn

### 5.2. SSL Certificate
- Netlify tự động cấp SSL miễn phí
- HTTPS sẽ được kích hoạt tự động

## 📊 Bước 6: Monitoring & Analytics

### 6.1. Netlify Analytics
- Vào "Analytics" tab để xem thống kê
- Theo dõi traffic và performance

### 6.2. Function Logs
- Vào "Functions" tab để xem logs
- Kiểm tra lỗi nếu có

## 🛠️ Troubleshooting

### Lỗi Build
```bash
# Kiểm tra logs trong Netlify dashboard
# Thường do:
- Thiếu dependencies
- Lỗi syntax trong code
- Environment variables chưa được set
```

### Lỗi Database Connection
```bash
# Kiểm tra:
- Environment variables đã được set chưa
- Database server có accessible từ Netlify không
- Firewall settings trên VPS
```

### Lỗi 404
```bash
# Kiểm tra:
- netlify.toml configuration
- Next.js routing
- Static files
```

## 📱 Mobile App (Tương lai)

### PWA Support
- Thêm service worker
- Cấu hình manifest.json
- Offline support

### App Store Deployment
- Build cho iOS/Android
- Deploy lên App Store/Play Store

## 🔄 Auto Deploy

### GitHub Integration
- Mỗi khi push code lên GitHub
- Netlify sẽ tự động deploy
- Không cần thao tác thủ công

### Branch Deploy
- Deploy từ branch khác
- Preview trước khi merge
- Staging environment

## 📞 Support

### Netlify Support
- Documentation: https://docs.netlify.com
- Community: https://community.netlify.com
- Status: https://status.netlify.com

### Database Support
- Kiểm tra kết nối từ VPS
- Firewall settings
- SQL Server configuration

---

## ✅ Checklist Deploy

- [ ] Code đã push lên GitHub
- [ ] Netlify site đã được tạo
- [ ] Environment variables đã được set
- [ ] Build thành công
- [ ] Site hoạt động bình thường
- [ ] Database connection OK
- [ ] Đăng ký/đăng nhập hoạt động
- [ ] Tất cả trang hiển thị đúng

---

**🎉 Chúc mừng! Website đã được deploy thành công lên Netlify!**
