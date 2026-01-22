# 🚀 MWENDO MOJA WELFARE - TRUEHOST DEPLOYMENT GUIDE

## 📋 Pre-Deployment Checklist

Before deploying to TrueHost, you need:

- [ ] TrueHost account with SSH access
- [ ] Domain name (e.g., mwendomojawelfare.co.ke)
- [ ] cPanel access
- [ ] Node.js installed on server (v18+)
- [ ] npm installed on server

---

## 🔧 STEP 1: Prepare Production Environment

### 1.1 Create Production .env File

Create `.env.production` in the root directory:

```bash
# Server Configuration
PORT=8000
NODE_ENV=production

# Database Configuration
USE_SQLITE=true
DB_PATH=./mwendo_moja.db

# JWT Configuration
JWT_SECRET=your_strong_secret_key_here_change_this
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_DIR=./uploads

# SMS Configuration (Optional)
SMS_ENABLED=false

# M-Pesa Configuration (Optional)
MPESA_ENABLED=false

# Email Configuration (Optional)
EMAIL_ENABLED=false
```

---

## 🏗️ STEP 2: Build Frontend for Production

```bash
cd client
npm run build
```

This creates `client/dist/` with optimized static files.

---

## 📦 STEP 3: Create Deployment Package

```bash
# Create deployment folder
mkdir mwendo-deployment
cd mwendo-deployment

# Copy necessary files
cp -r ../src ./
cp -r ../client/dist ./public
cp ../package.json ./
cp ../package-lock.json ./
cp ../.env.production ./.env
cp ../src/server.js ./
cp ../frontend-server.js ./
cp ../ecosystem.config.js ./

# Create uploads directory
mkdir uploads
```

---

## 🌐 STEP 4: Upload to TrueHost

### Via cPanel File Manager:
1. Login to cPanel
2. Go to File Manager
3. Navigate to `public_html`
4. Upload the deployment package
5. Extract the files

### Via SSH (Recommended):
```bash
scp -r mwendo-deployment/* username@yourdomain.com:~/public_html/
```

---

## ⚙️ STEP 5: Configure on TrueHost Server

### SSH into Server:
```bash
ssh username@yourdomain.com
cd ~/public_html
```

### Install Dependencies:
```bash
npm install --production
```

### Install PM2 (Process Manager):
```bash
npm install -g pm2
```

### Start Services:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## ✅ STEP 6: Verify Deployment

### Check Services:
```bash
pm2 list
pm2 logs
```

### Test API:
```bash
curl https://yourdomain.com/api/health
```

### Test Frontend:
```
https://yourdomain.com
```

---

## 🔒 STEP 7: Configure SSL/HTTPS

1. Go to cPanel → SSL/TLS
2. Install AutoSSL certificate
3. Update CORS_ORIGIN in .env to use https://

---

## 📊 Monitoring & Maintenance

### View Logs:
```bash
pm2 logs backend
pm2 logs frontend
```

### Restart Services:
```bash
pm2 restart all
```

### Stop Services:
```bash
pm2 stop all
```

### Update Code:
```bash
git pull origin main
npm install
npm run build
pm2 restart all
```

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 8000 in use | Change PORT in .env |
| Database not found | Check DB_PATH in .env |
| Frontend not loading | Verify client/dist exists |
| API not responding | Check pm2 logs |
| SSL errors | Renew certificate in cPanel |

---

## ✨ Status: READY FOR DEPLOYMENT

All files are prepared. Follow the steps above to deploy to TrueHost!

