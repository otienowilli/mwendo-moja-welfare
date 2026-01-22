# Truehost Frontend - Quick Fix (5 Minutes)

## 🚨 Frontend Not Working? Follow These Steps

### Step 1: SSH into Your Server
```bash
ssh username@yourdomain.com
```

### Step 2: Go to Project Directory
```bash
cd ~/public_html/mwendo-moja-welfare
# or wherever you uploaded the project
```

### Step 3: Build Frontend (MOST IMPORTANT!)
```bash
cd client
npm install
npm run build
cd ..
```

**This creates the `client/dist` folder that the frontend server needs!**

### Step 4: Start Frontend Server
```bash
node frontend-server.js
```

**You should see:**
```
✓ Frontend server running on http://localhost:3000
✓ Backend API running on http://localhost:8000/api
✓ React app built and ready
```

### Step 5: Test in Browser
```
https://yourdomain.com
```

---

## ✅ If Still Not Working

### Check 1: Is dist folder created?
```bash
ls -la client/dist/
```

**Should show:**
- index.html
- assets/ folder

If NOT, run: `cd client && npm run build`

### Check 2: Is frontend server running?
```bash
ps aux | grep frontend-server
```

If NOT, run: `node frontend-server.js`

### Check 3: Is backend running?
```bash
ps aux | grep "node src/server"
```

If NOT, run: `npm start`

### Check 4: Check logs
```bash
# If using PM2
pm2 logs

# If running directly
# Check terminal output
```

---

## 🔧 Permanent Setup (Using PM2)

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

### Start Both Servers
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

## 🌐 Configure Nginx (Optional but Recommended)

### Create Nginx Config
```bash
sudo nano /etc/nginx/sites-available/mwendo-moja
```

### Add This:
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

### Enable & Restart
```bash
sudo ln -s /etc/nginx/sites-available/mwendo-moja /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 📋 Checklist

- [ ] SSH into server
- [ ] Navigate to project
- [ ] Run `cd client && npm install && npm run build && cd ..`
- [ ] Verify `client/dist` folder exists
- [ ] Run `node frontend-server.js`
- [ ] Test in browser: yourdomain.com
- [ ] Install PM2: `npm install -g pm2`
- [ ] Create ecosystem.config.js
- [ ] Run `pm2 start ecosystem.config.js`
- [ ] Configure Nginx (optional)
- [ ] Test again

---

## 🆘 Still Not Working?

### Run Diagnostic
```bash
bash diagnose.sh
```

### Check Frontend Build
```bash
cd client
npm run build
# Look for errors in output
```

### Check Backend
```bash
curl http://localhost:8000/api/health
# Should return: {"status":"Server is running"}
```

### Check Ports
```bash
lsof -i :3000
lsof -i :8000
```

### View Logs
```bash
pm2 logs
# or
tail -f /var/log/nginx/error.log
```

---

## 💡 Key Points

✅ **Frontend MUST be built** - Run `npm run build`
✅ **Both servers must run** - Backend (8000) + Frontend (3000)
✅ **Use PM2** - For automatic restart and management
✅ **Use Nginx** - For reverse proxy and SSL
✅ **Check logs** - Always check logs for errors

---

## 🎯 Expected Result

When working correctly:
- ✅ yourdomain.com loads
- ✅ Login page displays
- ✅ Can login
- ✅ Dashboard shows
- ✅ No console errors
- ✅ API calls work

**Your frontend should now be working! 🎉**

