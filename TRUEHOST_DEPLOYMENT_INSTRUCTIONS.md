# 🚀 MWENDO MOJA WELFARE - TRUEHOST DEPLOYMENT INSTRUCTIONS

## ✅ DEPLOYMENT PACKAGE READY

The deployment package is located in: `/mwendo-deployment/`

### Package Contents:
- ✅ Backend code (`src/`)
- ✅ Frontend build (`public/`)
- ✅ Configuration files (`.env`, `ecosystem.config.js`)
- ✅ Frontend server (`frontend-server.js`)
- ✅ Dependencies (`package.json`, `package-lock.json`)
- ✅ Directories for logs and uploads

---

## 📋 DEPLOYMENT STEPS

### STEP 1: SSH into TrueHost Server

```bash
ssh username@yourdomain.com
cd ~/public_html
```

### STEP 2: Upload Files

**Option A: Using SCP (Recommended)**
```bash
# From your local machine
scp -r mwendo-deployment/* username@yourdomain.com:~/public_html/
```

**Option B: Using cPanel File Manager**
1. Login to cPanel
2. Go to File Manager
3. Navigate to `public_html`
4. Upload the `mwendo-deployment` folder
5. Extract files

### STEP 3: Install Dependencies

```bash
cd ~/public_html
npm install --production
```

### STEP 4: Install PM2 (Process Manager)

```bash
npm install -g pm2
```

### STEP 5: Start Services

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### STEP 6: Verify Services

```bash
pm2 list
pm2 logs
```

---

## 🌐 CONFIGURE DOMAIN

### Update .env File

Edit `.env` and update:
```bash
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
JWT_SECRET=your_strong_random_secret_here
```

### Restart Services

```bash
pm2 restart all
```

---

## 🔒 CONFIGURE SSL/HTTPS

1. Go to cPanel → SSL/TLS
2. Install AutoSSL certificate
3. Verify HTTPS works: `https://yourdomain.com`

---

## ✅ VERIFY DEPLOYMENT

### Test API
```bash
curl https://yourdomain.com/api/health
```

### Test Frontend
```
https://yourdomain.com
```

### Login Credentials
- Username: `williamodwori`
- Password: `Admin@2024Mwendo`

---

## 📊 MONITORING

### View Logs
```bash
pm2 logs backend
pm2 logs frontend
```

### Restart Services
```bash
pm2 restart all
```

### Stop Services
```bash
pm2 stop all
```

---

## 🆘 TROUBLESHOOTING

| Issue | Solution |
|-------|----------|
| Port 8000 in use | Change PORT in .env |
| Database not found | Check DB_PATH in .env |
| Frontend not loading | Verify public/ folder exists |
| API not responding | Check pm2 logs |
| SSL errors | Renew certificate in cPanel |

---

## ✨ DEPLOYMENT COMPLETE!

Your MWENDO MOJA Welfare system is now live on TrueHost!

