# Truehost Complete Setup Guide

## 🎯 Your Situation
- ✅ Backend is working
- ❌ Frontend is not working
- 📦 System uploaded from GitHub

## 🔴 Root Cause
**The frontend has NOT been built!**

The React app needs to be compiled into static files before it can be served.

---

## ✅ Solution: 5-Step Fix

### Step 1: SSH into Server
```bash
ssh username@yourdomain.com
cd ~/public_html/mwendo-moja-welfare
```

### Step 2: Install Frontend Dependencies
```bash
cd client
npm install
```

### Step 3: Build Frontend (CRITICAL!)
```bash
npm run build
```

**This creates `client/dist` folder with all static files**

### Step 4: Start Frontend Server
```bash
cd ..
node frontend-server.js
```

### Step 5: Test in Browser
```
https://yourdomain.com
```

---

## 📋 What Each File Does

| File | Purpose |
|------|---------|
| `src/server.js` | Backend API server (port 8000) |
| `frontend-server.js` | Frontend server (port 3000) |
| `client/dist/` | Built React app (created by npm run build) |
| `client/src/` | React source code |

---

## 🚀 Permanent Setup (Recommended)

### Install PM2
```bash
npm install -g pm2
```

### Create ecosystem.config.js
```bash
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'src/server.js',
      env: { NODE_ENV: 'production', PORT: 8000 }
    },
    {
      name: 'frontend',
      script: 'frontend-server.js',
      env: { NODE_ENV: 'production', FRONTEND_PORT: 3000 }
    }
  ]
};
EOF
```

### Start Servers
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### View Status
```bash
pm2 list
pm2 logs
```

---

## 🌐 Nginx Configuration

### Create Config
```bash
sudo nano /etc/nginx/sites-available/mwendo-moja
```

### Add Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        proxy_pass http://localhost:8000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### Enable & Test
```bash
sudo ln -s /etc/nginx/sites-available/mwendo-moja /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 📝 Environment Setup

### Root .env
```env
NODE_ENV=production
PORT=8000
FRONTEND_PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mwendo_moja
DB_USER=mwendo_user
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
CLIENT_URL=https://yourdomain.com
```

### client/.env
```env
VITE_API_URL=https://yourdomain.com/api
```

**After updating, rebuild:**
```bash
cd client && npm run build && cd ..
```

---

## 🔍 Troubleshooting

### Check if dist folder exists
```bash
ls -la client/dist/
```

### Check if servers running
```bash
pm2 list
# or
ps aux | grep node
```

### Check logs
```bash
pm2 logs
# or
tail -f /var/log/nginx/error.log
```

### Test backend
```bash
curl http://localhost:8000/api/health
```

### Test frontend
```bash
curl http://localhost:3000
```

---

## 📊 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Blank page | Run `npm run build` in client folder |
| Cannot GET / | Frontend server not running |
| API not working | Check VITE_API_URL in client/.env |
| Port in use | Kill process: `lsof -i :3000` then `kill -9 <PID>` |
| 502 Bad Gateway | Backend not running or Nginx misconfigured |

---

## ✅ Verification Checklist

- [ ] SSH into server
- [ ] Navigate to project
- [ ] Run `cd client && npm install`
- [ ] Run `npm run build`
- [ ] Verify `client/dist` exists
- [ ] Run `cd .. && node frontend-server.js`
- [ ] Test yourdomain.com in browser
- [ ] Install PM2
- [ ] Create ecosystem.config.js
- [ ] Run `pm2 start ecosystem.config.js`
- [ ] Configure Nginx
- [ ] Test again

---

## 🎯 Expected Results

When working:
- ✅ yourdomain.com loads
- ✅ Login page displays
- ✅ Can login with credentials
- ✅ Dashboard loads
- ✅ API calls work
- ✅ No console errors

---

## 📞 Quick Commands

```bash
# Build frontend
cd client && npm install && npm run build && cd ..

# Start with PM2
npm install -g pm2
pm2 start ecosystem.config.js

# View logs
pm2 logs

# Restart
pm2 restart all

# Stop
pm2 stop all

# Check status
pm2 list
```

---

## 🚀 You're Ready!

Your MWENDO MOJA system should now be working on Truehost!

**Start with:** TRUEHOST_QUICK_FIX.md (5 minutes)
**Full guide:** TRUEHOST_FRONTEND_SETUP.md
**Diagnostics:** bash diagnose.sh

