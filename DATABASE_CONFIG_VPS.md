# Cấu hình Database SQL Server cho VPS

## Thông tin Database:
- **Server:** YOUR_VPS_IP\\SQLEXPRESS (Thay YOUR_VPS_IP bằng IP thực của VPS)
- **Database:** MuOnline
- **User:** sa
- **Password:** YOUR_DB_PASSWORD (Thay bằng password thực)
- **Port:** 1433

## Cách cấu hình:

### 1. Tạo file `.env.local` trong thư mục gốc:
```bash
# Database Configuration
DB_SERVER=YOUR_VPS_IP\\SQLEXPRESS
DB_NAME=MuOnline
DB_USERNAME=sa
DB_PASSWORD=YOUR_DB_PASSWORD
DB_PORT=1433
NEXT_TELEMETRY_DISABLED=1
```

### 2. Kiểm tra kết nối:
- Đảm bảo SQL Server đang chạy
- Kiểm tra port 1433 có mở không
- Test connection với SQL Server Management Studio

### 3. Troubleshooting:
- Nếu lỗi "Login failed", kiểm tra username/password
- Nếu lỗi "Connection timeout", kiểm tra firewall
- Nếu lỗi "Server not found", kiểm tra tên server
- Nếu lỗi "Instance not found", kiểm tra SQL Server Browser service

### 4. Test API:
```bash
curl http://localhost:3000/api/test-db
```

## Lưu ý:
- Đảm bảo SQL Server cho phép SQL Server Authentication
- Kiểm tra SQL Server Browser service đang chạy
- Cấu hình firewall cho port 1433
- Kiểm tra SQL Server Express instance name