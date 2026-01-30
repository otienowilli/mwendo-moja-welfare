# 🚀 MWENDO MOJA WELFARE - LIVE DEPLOYMENT ON TRUEHOST

## 👤 Your Account
- **Name:** William Otieno
- **Email:** williamodwori2021@gmail.com
- **System:** MWENDO MOJA Welfare Management

---

## 📋 STEP 1: Login to TrueHost cPanel

1. Go to: `https://yourdomain.com:2083` or `https://your-ip:2083`
2. Username: (Your TrueHost username - check welcome email)
3. Password: 5~pZis+g8q0

---

## 📦 STEP 2: Upload Deployment Package

### Option A: Using cPanel File Manager (Easiest)

1. In cPanel, click **File Manager**
2. Navigate to **public_html**
3. Click **Upload** button
4. Upload `mwendo-deployment.zip` (327 KB)
5. Right-click the zip file → **Extract**
6. Delete the zip file after extraction

### Option B: Using SSH (Faster)

```bash
# On your local machine
scp mwendo-deployment.zip username@yourdomain.com:~/public_html/

# Then SSH in and extract
ssh username@yourdomain.com
cd ~/public_html
unzip mwendo-deployment.zip
rm mwendo-deployment.zip
```

---

## ⚙️ STEP 3: Install Dependencies

In cPanel Terminal or via SSH:

```bash
cd ~/public_html/mwendo-deployment
npm install --production
```

---

## 🚀 STEP 4: Install PM2 (Process Manager)

```bash
npm install -g pm2
```

---

## ▶️ STEP 5: Start Services

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## ✅ STEP 6: Verify Services

```bash
pm2 list
pm2 logs
```

---

## 🌐 STEP 7: Configure Domain

Update `.env` file:

```bash
nano .env
```

Change:
```
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
JWT_SECRET=your_strong_random_secret_here
```

Restart:
```bash
pm2 restart all
```

---

## 🔒 STEP 8: Setup SSL/HTTPS

1. In cPanel → **SSL/TLS**
2. Click **Manage SSL sites**
3. Install AutoSSL certificate
4. Wait for certificate to install

---

## ✨ STEP 9: Test Live System

1. Open browser: `https://yourdomain.com`
2. Login with:
   - Username: `williamodwori`
   - Password: `Admin@2024Mwendo`

---

## 📊 Monitoring

```bash
# View logs
pm2 logs

# Restart services
pm2 restart all

# Stop services
pm2 stop all
```

---

## 🆘 Need Help?

If you get stuck, provide:
1. Your domain name
2. Error messages from `pm2 logs`
3. Any issues you encounter

