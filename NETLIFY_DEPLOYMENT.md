# Netlify Deployment Guide

## Cấu hình cho Netlify Static Site

### 1. Build Settings
- **Build Command:** `npm run build:static`
- **Publish Directory:** `out`
- **Node Version:** 18

### 2. Environment Variables
Không cần environment variables cho static site.

### 3. Redirects
- Tất cả routes sẽ redirect về `/index.html`
- Favicon và static files được cache 1 năm

### 4. Limitations
- ❌ Không có API routes (login, register, database)
- ❌ Không có server-side rendering
- ✅ Chỉ có static pages (home, info, download, donate, news)

### 5. Build Process
```bash
npm run build:static
# Tạo thư mục 'out' với static files
```

### 6. Deploy
1. Connect GitHub repository
2. Set build command: `npm run build:static`
3. Set publish directory: `out`
4. Deploy

## Static Pages Available
- `/` - Home page
- `/info` - Server information
- `/download` - Download page
- `/donate` - Donate page
- `/news` - News page
- `/news/guide` - Guide page
- `/news/events` - Events page
- `/news/roadmap` - Roadmap page
- `/news/opening` - Opening page
- `/news/update` - Update page
- `/register` - Registration page (static form)
- `/login` - Login page (static form)
- `/myaccount` - Account page (static form)

## Notes
- Forms sẽ không hoạt động (chỉ hiển thị)
- Cần backend server riêng cho database operations
- Phù hợp cho landing page và marketing site
