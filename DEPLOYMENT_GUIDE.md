# 🚀 Hướng dẫn triển khai Mu Online Website

## 📋 Tổng quan dự án
- **Framework**: React Next.js 14
- **Database**: SQL Server (VPS)
- **Deployment**: Vercel
- **Features**: Authentication, Account Management, News System, Ranking

## 🔧 Bước 1: Tạo Repository trên GitHub

### 1.1 Truy cập GitHub
- Đăng nhập vào [GitHub.com](https://github.com)
- Click nút **"New repository"** (màu xanh lá)

### 1.2 Cấu hình Repository
- **Repository name**: `mu-online-react`
- **Description**: `Mu Online website built with React Next.js - Server management, authentication, and game features`
- **Visibility**: Public
- **KHÔNG** tích các tùy chọn:
  - ❌ Add a README file
  - ❌ Add .gitignore  
  - ❌ Choose a license

### 1.3 Tạo Repository
- Click **"Create repository"**
- GitHub sẽ hiển thị URL repository

## 🔗 Bước 2: Kết nối với GitHub

### 2.1 Thêm Remote Origin
```bash
# Thay YOUR_USERNAME bằng tên GitHub của bạn
git remote add origin https://github.com/YOUR_USERNAME/mu-online-react.git

# Kiểm tra remote đã được thêm
git remote -v
```

### 2.2 Push Code lên GitHub
```bash
# Push code lên GitHub
git push -u origin main

# Kiểm tra trạng thái
git status
```

## 🚀 Bước 3: Triển khai trên Vercel

### 3.1 Truy cập Vercel
- Đăng nhập vào [Vercel.com](https://vercel.com)
- Click **"New Project"**

### 3.2 Import từ GitHub
- Chọn **"Import Git Repository"**
- Tìm và chọn repository `mu-online-react`
- Click **"Import"**

### 3.3 Cấu hình Project
- **Project Name**: `mu-online-react` (hoặc tên bạn muốn)
- **Framework Preset**: Next.js (tự động detect)
- **Root Directory**: `./` (mặc định)
- **Build Command**: `npm run build` (mặc định)
- **Output Directory**: `.next` (mặc định)

### 3.4 Environment Variables
Thêm các biến môi trường trong Vercel Dashboard:

```
DB_SERVER=your_sql_server_ip
DB_NAME=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_PORT=1433
```

### 3.5 Deploy
- Click **"Deploy"**
- Vercel sẽ tự động build và deploy
- Thời gian deploy: ~2-3 phút

## 🔧 Bước 4: Cấu hình Database

### 4.1 SQL Server trên VPS
Đảm bảo SQL Server đã được cấu hình:
- ✅ Port 1433 đã mở
- ✅ Remote connections enabled
- ✅ Firewall rules configured
- ✅ Database đã tạo
- ✅ Table `MEMB_INFO` đã tạo

### 4.2 Test Connection
- Truy cập: `https://your-domain.vercel.app/test-db`
- Kiểm tra kết nối database

## 📱 Bước 5: Kiểm tra Website

### 5.1 Các trang chính
- **Home**: `https://your-domain.vercel.app/`
- **Info**: `https://your-domain.vercel.app/info`
- **Download**: `https://your-domain.vercel.app/download`
- **Donate**: `https://your-domain.vercel.app/donate`
- **News**: `https://your-domain.vercel.app/news`

### 5.2 Authentication
- **Register**: `https://your-domain.vercel.app/register`
- **Login**: `https://your-domain.vercel.app/login`
- **My Account**: `https://your-domain.vercel.app/myaccount`

### 5.3 API Endpoints
- **Test DB**: `https://your-domain.vercel.app/api/test-db`
- **Register**: `https://your-domain.vercel.app/api/register`
- **Login**: `https://your-domain.vercel.app/api/login`
- **Ranking**: `https://your-domain.vercel.app/api/ranking`

## 🛠️ Troubleshooting

### Lỗi Database Connection
```bash
# Kiểm tra SQL Server
telnet your_sql_server_ip 1433

# Kiểm tra firewall
netsh advfirewall firewall show rule name="SQL Server"
```

### Lỗi Build trên Vercel
```bash
# Kiểm tra dependencies
npm install

# Test build locally
npm run build
```

### Lỗi Environment Variables
- Kiểm tra tên biến môi trường
- Đảm bảo không có khoảng trắng
- Redeploy sau khi thay đổi

## 📊 Monitoring

### Vercel Analytics
- Truy cập Vercel Dashboard
- Xem Analytics và Performance
- Monitor errors và logs

### Database Monitoring
- Kiểm tra connection logs
- Monitor query performance
- Backup database định kỳ

## 🔄 Updates

### Cập nhật Code
```bash
# Thay đổi code
git add .
git commit -m "Update description"
git push origin main

# Vercel sẽ tự động redeploy
```

### Cập nhật Database
- Backup trước khi thay đổi
- Test trên staging environment
- Deploy production

## 📞 Support

### Vercel Support
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

### Next.js Support
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js GitHub](https://github.com/vercel/next.js)

### SQL Server Support
- [Microsoft SQL Server Docs](https://docs.microsoft.com/en-us/sql/)
- [SQL Server Community](https://docs.microsoft.com/en-us/answers/topics/sql-server.html)

---

## ✅ Checklist Triển khai

- [ ] Tạo GitHub repository
- [ ] Push code lên GitHub
- [ ] Tạo Vercel project
- [ ] Cấu hình Environment Variables
- [ ] Deploy thành công
- [ ] Test database connection
- [ ] Test tất cả pages
- [ ] Test authentication
- [ ] Test API endpoints
- [ ] Monitor performance

---

**🎉 Chúc mừng! Website Mu Online đã sẵn sàng hoạt động!**
