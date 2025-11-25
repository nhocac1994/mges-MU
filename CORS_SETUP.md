# 🔧 Hướng Dẫn Cấu Hình CORS cho C# Backend

## ⚠️ Vấn Đề

Backend C# hiện tại chỉ cho phép kết nối từ `localhost`, chưa cho phép kết nối từ domain `mutruyenkyss1.com` (hoặc domain Vercel). Cần cấu hình CORS để cho phép các domain này.

## ✅ Giải Pháp: Cấu Hình CORS trong C# Backend

### Cách 1: Cấu Hình trong Program.cs (ASP.NET Core 6+)

Mở file `Program.cs` (hoặc `Startup.cs` nếu dùng .NET 5) và thêm cấu hình CORS:

```csharp
using Microsoft.AspNetCore.Cors;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ Cấu hình CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",                    // Local development
            "https://mu-dautruongss1.vercel.app",     // Vercel preview
            "https://mu-dautruongss1-s3hw.vercel.app", // Vercel production
            "https://mutruyenkyss1.com",               // Production domain
            "http://mutruyenkyss1.com"                 // HTTP (nếu cần)
        )
        .AllowAnyMethod()                              // Cho phép tất cả methods (GET, POST, PUT, DELETE, etc.)
        .AllowAnyHeader()                              // Cho phép tất cả headers
        .AllowCredentials();                           // Cho phép credentials (cookies, auth headers)
    });
    
    // Hoặc cho phép tất cả origins (không khuyến khích cho production)
    // options.AddPolicy("AllowAllOrigins", policy =>
    // {
    //     policy.AllowAnyOrigin()
    //           .AllowAnyMethod()
    //           .AllowAnyHeader();
    // });
});

var app = builder.Build();

// ✅ Áp dụng CORS middleware
app.UseCors("AllowSpecificOrigins");

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

### Cách 2: Cấu Hình trong Startup.cs (.NET 5)

Nếu bạn dùng .NET 5 hoặc cũ hơn với `Startup.cs`:

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();
        
        // ✅ Cấu hình CORS
        services.AddCors(options =>
        {
            options.AddPolicy("AllowSpecificOrigins", policy =>
            {
                policy.WithOrigins(
                    "http://localhost:3000",
                    "https://mu-dautruongss1.vercel.app",
                    "https://mu-dautruongss1-s3hw.vercel.app",
                    "https://mutruyenkyss1.com",
                    "http://mutruyenkyss1.com"
                )
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
            });
        });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseHttpsRedirection();
        
        // ✅ Áp dụng CORS - PHẢI đặt trước UseRouting và UseEndpoints
        app.UseCors("AllowSpecificOrigins");
        
        app.UseRouting();
        app.UseAuthorization();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
```

### Cách 3: Cấu Hình từ appsettings.json

Bạn cũng có thể đọc danh sách allowed origins từ `appsettings.json`:

**appsettings.json:**
```json
{
  "Cors": {
    "AllowedOrigins": [
      "http://localhost:3000",
      "https://mu-dautruongss1.vercel.app",
      "https://mu-dautruongss1-s3hw.vercel.app",
      "https://mutruyenkyss1.com",
      "http://mutruyenkyss1.com"
    ]
  },
  "ConnectionStrings": {
    // ...
  },
  "Server": {
    "Port": 55777
  }
}
```

**Program.cs:**
```csharp
var builder = WebApplication.CreateBuilder(args);

// Đọc allowed origins từ config
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins(allowedOrigins ?? new[] { "http://localhost:3000" })
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// ... rest of the code
```

## 🔍 Kiểm Tra CORS Headers

Sau khi cấu hình, kiểm tra bằng cách:

1. **Test từ browser console:**
```javascript
fetch('http://mutruyenkyss1.com:55777/api/config', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

2. **Test bằng curl:**
```bash
curl -H "Origin: https://mutruyenkyss1.com" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     http://mutruyenkyss1.com:55777/api/config \
     -v
```

3. **Kiểm tra response headers:**
   - Phải có: `Access-Control-Allow-Origin: https://mutruyenkyss1.com`
   - Phải có: `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
   - Phải có: `Access-Control-Allow-Headers: Content-Type, Authorization`

## ⚠️ Lưu Ý Quan Trọng

### 1. Thứ Tự Middleware
CORS middleware **PHẢI** được đặt trước các middleware khác:
```csharp
app.UseCors("AllowSpecificOrigins");  // ✅ Đặt đầu tiên
app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();
```

### 2. AllowCredentials vs AllowAnyOrigin
- Nếu dùng `AllowCredentials()`, **KHÔNG THỂ** dùng `AllowAnyOrigin()`
- Phải chỉ định rõ từng origin trong `WithOrigins()`

### 3. HTTPS vs HTTP
- Nếu frontend dùng HTTPS, backend cũng nên dùng HTTPS
- Hoặc cấu hình cả HTTP và HTTPS trong allowed origins

### 4. Wildcard Subdomains
Nếu muốn cho phép tất cả subdomains của Vercel:
```csharp
policy.WithOrigins("https://*.vercel.app")
```
Nhưng cách này không được hỗ trợ trực tiếp. Phải list từng domain.

## 🚀 Sau Khi Cấu Hình

1. **Restart backend C#:**
   ```bash
   # Dừng service
   sudo systemctl stop muonlineapi  # Linux
   # hoặc
   sc stop MuOnlineAPI  # Windows
   
   # Start lại
   sudo systemctl start muonlineapi  # Linux
   # hoặc
   sc start MuOnlineAPI  # Windows
   ```

2. **Test kết nối:**
   - Mở website trên Vercel
   - Mở Developer Tools (F12)
   - Kiểm tra tab Network xem có lỗi CORS không

3. **Kiểm tra logs:**
   - Xem logs của backend C# để đảm bảo requests đang đến được

## 🐛 Troubleshooting

### Vẫn bị lỗi CORS?

1. **Kiểm tra domain có đúng không:**
   - Domain trong CORS config phải khớp chính xác với domain frontend
   - Bao gồm cả protocol (http/https) và port (nếu có)

2. **Kiểm tra thứ tự middleware:**
   - CORS phải được gọi trước UseRouting và UseEndpoints

3. **Kiểm tra preflight requests:**
   - Browser sẽ gửi OPTIONS request trước
   - Đảm bảo OPTIONS request được xử lý đúng

4. **Kiểm tra firewall:**
   - Đảm bảo port 55777 đã được mở
   - Kiểm tra firewall không chặn requests từ Vercel

5. **Test trực tiếp:**
   ```bash
   # Test từ server
   curl -I -X OPTIONS \
        -H "Origin: https://mutruyenkyss1.com" \
        -H "Access-Control-Request-Method: GET" \
        http://localhost:55777/api/config
   ```

---

**Sau khi cấu hình xong, frontend trên Vercel sẽ kết nối được đến backend C#!** ✅

