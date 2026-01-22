# Build React Frontend & Deploy to Truehost

## 🎯 Complete Step-by-Step Guide

---

## STEP 1: Build React Frontend (Local Machine)

### 1.1 Open Terminal
```bash
# Navigate to project root
cd "/Users/blessedwilliams/MWENDO MOJA WELFARE"
```

### 1.2 Navigate to Client Directory
```bash
cd client
```

### 1.3 Install Dependencies
```bash
npm install
```

**Expected Output:**
```
added 200+ packages in 30s
```

### 1.4 Build for Production
```bash
npm run build
```

**Expected Output:**
```
✓ 1234 modules transformed
dist/index.html                    0.50 kB
dist/assets/index-abc123.js        150.00 kB
dist/assets/index-def456.css       25.00 kB
```

### 1.5 Verify Build Succeeded
```bash
ls -la dist/
```

**Should show:**
```
index.html
assets/ (folder)
```

---

## STEP 2: Prepare for Upload

### 2.1 Go Back to Root
```bash
cd ..
```

### 2.2 Create Deployment Package
```bash
# Create a tar file of the dist folder
tar -czf frontend-dist.tar.gz client/dist/
```

**Or just zip it:**
```bash
# On Mac
zip -r frontend-dist.zip client/dist/
```

---

## STEP 3: Upload to Truehost

### 3.1 Via FTP/SFTP

**Using FileZilla or similar:**
1. Connect to Truehost FTP
2. Navigate to: `public_html/mwendo-moja-welfare/`
3. Upload the `frontend-dist.tar.gz` or `frontend-dist.zip`

**Or via Terminal (SFTP):**
```bash
sftp username@yourdomain.com
cd public_html/mwendo-moja-welfare
put frontend-dist.tar.gz
exit
```

### 3.2 Via Git (Recommended)

**If you pushed to GitHub:**
```bash
# SSH into Truehost
ssh username@yourdomain.com

# Navigate to project
cd ~/public_html/mwendo-moja-welfare

# Pull latest code
git pull origin main

# Build on server
cd client
npm install
npm run build
cd ..
```

---

## STEP 4: Extract Files on Truehost

### 4.1 SSH into Truehost
```bash
ssh username@yourdomain.com
```

### 4.2 Navigate to Project
```bash
cd ~/public_html/mwendo-moja-welfare
```

### 4.3 Extract Archive
```bash
# If tar.gz
tar -xzf frontend-dist.tar.gz

# If zip
unzip frontend-dist.zip
```

### 4.4 Verify Files
```bash
ls -la client/dist/
```

**Should show:**
```
index.html
assets/
```

---

## STEP 5: Start Frontend Server

### 5.1 Install PM2 (if not done)
```bash
npm install -g pm2
```

### 5.2 Create ecosystem.config.js
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

### 5.3 Start Both Servers
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 5.4 Verify Running
```bash
pm2 list
```

**Should show both running:**
```
backend    online
frontend   online
```

---

## STEP 6: Configure Nginx (Recommended)

### 6.1 Create Nginx Config
```bash
sudo nano /etc/nginx/sites-available/mwendo-moja
```

### 6.2 Add Configuration
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

### 6.3 Enable & Test
```bash
sudo ln -s /etc/nginx/sites-available/mwendo-moja /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## STEP 7: Test Everything

### 7.1 Test Backend
```bash
curl http://localhost:8000/api/health
```

**Should return:**
```json
{"status":"Server is running"}
```

### 7.2 Test Frontend
```bash
curl http://localhost:3000
```

**Should return HTML content**

### 7.3 Test in Browser
```
https://yourdomain.com
```

**Should show login page**

---

## 📋 Complete Checklist

- [ ] Built frontend locally: `npm run build`
- [ ] Verified dist folder created
- [ ] Uploaded to Truehost
- [ ] Extracted files on server
- [ ] Verified client/dist/ exists
- [ ] Installed PM2
- [ ] Created ecosystem.config.js
- [ ] Started servers: `pm2 start ecosystem.config.js`
- [ ] Configured Nginx
- [ ] Tested backend API
- [ ] Tested frontend server
- [ ] Tested in browser

---

## 🆘 Troubleshooting

### Build Failed Locally
```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Upload Failed
- Use FileZilla for FTP
- Or use Git to pull on server
- Or use SCP: `scp -r client/dist/ username@yourdomain.com:~/public_html/mwendo-moja-welfare/`

### Server Not Starting
```bash
pm2 logs
# Check for errors
```

### Nginx Not Working
```bash
sudo nginx -t
# Check for config errors
```

---

## 🎯 Expected Result

✅ yourdomain.com loads
✅ Login page displays
✅ Can login
✅ Dashboard shows
✅ API calls work
✅ No console errors

Your frontend is now live! 🎉

