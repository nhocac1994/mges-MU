# 🚀 Hướng Dẫn Deploy Lên Netlify

## 📋 Chuẩn bị

### 1. Đảm bảo code đã được commit lên Git
```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

## 🔧 Cách 1: Deploy qua GitHub (Khuyến nghị)

### Bước 1: Đẩy code lên GitHub
1. Tạo repository mới trên GitHub (nếu chưa có)
2. Push code lên GitHub:
```bash
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

### Bước 2: Kết nối với Netlify
1. Đăng nhập vào [Netlify](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Chọn **"GitHub"** và authorize Netlify
4. Chọn repository của bạn

### Bước 3: Cấu hình Build Settings
Netlify sẽ tự động detect cấu hình từ `netlify.toml`, nhưng bạn có thể kiểm tra:

- **Build command:** `npm run build`
- **Publish directory:** `.next` (sẽ được plugin tự động xử lý)
- **Node version:** 18

### Bước 4: Cấu hình Environment Variables
Vào **Site settings** → **Environment variables** và thêm:

```
DB_SERVER=your-database-server
DB_DATABASE=your-database-name
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_PORT=1433
```

⚠️ **Lưu ý:** Nếu database của bạn không cho phép kết nối từ bên ngoài, bạn cần:
- Sử dụng database proxy
- Hoặc deploy backend riêng và chỉ deploy frontend static lên Netlify

### Bước 5: Deploy
1. Click **"Deploy site"**
2. Chờ build hoàn tất (khoảng 2-5 phút)
3. Site sẽ có URL dạng: `https://random-name-123.netlify.app`

## 🔧 Cách 2: Deploy thủ công bằng Netlify CLI

### Bước 1: Cài đặt Netlify CLI
```bash
npm install -g netlify-cli
```

### Bước 2: Đăng nhập
```bash
netlify login
```

### Bước 3: Deploy
```bash
# Build project
npm run build

# Deploy
netlify deploy --prod
```

## 📁 Files cần đẩy lên Netlify

### ✅ Files cần commit (đẩy lên Git):
- ✅ `src/` - Toàn bộ source code
- ✅ `public/` - Static files (images, icons, etc.)
- ✅ `package.json` - Dependencies
- ✅ `package-lock.json` - Lock file
- ✅ `netlify.toml` - Netlify configuration
- ✅ `next.config.ts` - Next.js configuration
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `tailwind.config.js` (nếu có)
- ✅ `postcss.config.mjs` - PostCSS configuration

### ❌ Files KHÔNG cần đẩy (đã có trong .gitignore):
- ❌ `node_modules/` - Sẽ được cài đặt trên Netlify
- ❌ `.next/` - Sẽ được build trên Netlify
- ❌ `.env.local` - Environment variables sẽ cấu hình trên Netlify dashboard
- ❌ `out/` - Build output (nếu có)

## ⚙️ Cấu hình đã được thiết lập

### `netlify.toml` đã được cấu hình:
- ✅ Next.js plugin (`@netlify/plugin-nextjs`)
- ✅ Build command: `npm run build`
- ✅ Node version: 18
- ✅ Headers cho API routes (CORS)
- ✅ Cache headers cho static files

## 🔍 Kiểm tra sau khi deploy

1. **Kiểm tra trang chủ:** `https://your-site.netlify.app`
2. **Kiểm tra API:** `https://your-site.netlify.app/api/config`
3. **Kiểm tra login:** `https://your-site.netlify.app/login`
4. **Kiểm tra console:** Mở DevTools để xem lỗi (nếu có)

## 🐛 Xử lý lỗi thường gặp

### Lỗi: "Module not found"
- Kiểm tra `package.json` có đầy đủ dependencies
- Chạy `npm install` trước khi build

### Lỗi: "Database connection failed"
- Kiểm tra Environment Variables trên Netlify
- Đảm bảo database cho phép kết nối từ IP của Netlify
- Kiểm tra firewall rules

### Lỗi: "Build timeout"
- Tăng build timeout trong Netlify settings
- Tối ưu hóa build process

### Lỗi: "API routes not working"
- Đảm bảo đã cài `@netlify/plugin-nextjs`
- Kiểm tra `netlify.toml` có plugin configuration

## 📝 Lưu ý quan trọng

1. **Database Connection:**
   - Netlify Functions có timeout 10 giây (free plan)
   - Nếu database query lâu, cần optimize hoặc dùng background jobs

2. **Environment Variables:**
   - Không commit `.env.local` lên Git
   - Cấu hình trên Netlify Dashboard

3. **Build Time:**
   - Build lần đầu có thể mất 3-5 phút
   - Các lần sau sẽ nhanh hơn nhờ cache

4. **Custom Domain:**
   - Vào **Domain settings** → **Add custom domain**
   - Cấu hình DNS theo hướng dẫn của Netlify

## 🎉 Hoàn tất!

Sau khi deploy thành công, bạn sẽ có:
- ✅ Website chạy trên Netlify
- ✅ API routes hoạt động
- ✅ Auto-deploy khi push code lên GitHub
- ✅ HTTPS tự động
- ✅ CDN toàn cầu

---

**Cần hỗ trợ?** Kiểm tra logs trên Netlify Dashboard → **Deploys** → Click vào deploy → **View build logs**

