# 🗄️ Hướng Dẫn Cấu Hình Database

## 📋 **Yêu cầu:**
- SQL Server Express hoặc SQL Server
- Database MuOnline đã tạo sẵn
- Bảng MEMB_INFO đã tồn tại

## ⚙️ **Cấu hình .env.local:**

```bash
# Database Configuration
DB_SERVER=your_server_ip_or_localhost
DB_NAME=MuOnline
DB_USERNAME=sa
DB_PASSWORD=your_password
DB_PORT=1433
DB_INSTANCE=SQLEXPRESS

# Next.js Configuration
NEXT_TELEMETRY_DISABLED=1
```

## 🔧 **Các bước cấu hình:**

### **1. Cài đặt SQL Server Express:**
- Tải từ: https://www.microsoft.com/en-us/sql-server/sql-server-downloads
- Cài đặt với instance name: `SQLEXPRESS`
- Enable TCP/IP protocol
- Restart SQL Server service

### **2. Tạo Database:**
```sql
CREATE DATABASE MuOnline;
USE MuOnline;

-- Tạo bảng MEMB_INFO nếu chưa có
CREATE TABLE MEMB_INFO (
    memb___id VARCHAR(10) NOT NULL PRIMARY KEY,
    memb__pwd VARCHAR(10) NOT NULL,
    memb_name VARCHAR(10) NOT NULL,
    sno__numb VARCHAR(20) NOT NULL,
    mail_addr VARCHAR(50) NOT NULL,
    tel__numb VARCHAR(20) NOT NULL,
    fpas_ques VARCHAR(50) NOT NULL,
    fpas_answ VARCHAR(50) NOT NULL,
    appl_days DATETIME NOT NULL,
    bloc_code VARCHAR(10) NOT NULL,
    ctl1_code VARCHAR(10) NOT NULL,
    AccountLevel INT NOT NULL,
    AccountExpireDate DATETIME NOT NULL
);
```

### **3. Cấu hình Firewall:**
```bash
# Windows
netsh advfirewall firewall add rule name="SQL Server" dir=in action=allow protocol=TCP localport=1433

# Linux
sudo ufw allow 1433
```

### **4. Test kết nối:**
```bash
# Test từ command line
sqlcmd -S localhost\SQLEXPRESS -U sa -P your_password

# Test từ Node.js
npm run dev
# Truy cập: http://localhost:3000/register
```

## 🚨 **Lưu ý bảo mật:**
- Không commit file .env.local vào Git
- Sử dụng mật khẩu mạnh cho database
- Cấu hình firewall phù hợp
- Backup database thường xuyên

## 🔍 **Troubleshooting:**

### **Lỗi kết nối:**
- Kiểm tra SQL Server service đang chạy
- Kiểm tra port 1433 có mở không
- Kiểm tra username/password
- Kiểm tra instance name

### **Lỗi timeout:**
- Tăng connectionTimeout trong database.ts
- Kiểm tra network latency
- Kiểm tra SQL Server performance

## 📞 **Hỗ trợ:**
Nếu gặp vấn đề, hãy kiểm tra:
1. SQL Server Configuration Manager
2. Windows Event Viewer
3. SQL Server Error Logs
4. Network connectivity
