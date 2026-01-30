# 🚀 CPANEL DEPLOYMENT - STEP BY STEP

## ✅ YOU ARE HERE: cPanel File Manager

Your account: `gmooutas`
Location: `/home/gmooutas`

---

## 📋 STEP 1: Navigate to public_html

1. In cPanel File Manager, **double-click** `public_html` folder
2. You should now be in `/home/gmooutas/public_html`

---

## 📦 STEP 2: Upload Deployment Package

### Option A: Upload ZIP File (Easiest)

1. Click **Upload** button (top left)
2. Select file: `mwendo-deployment.zip` from your computer
3. Wait for upload to complete
4. Right-click the zip file
5. Click **Extract**
6. Wait for extraction
7. Delete the zip file

### Option B: Upload Folder Directly

1. Click **Upload** button
2. Select all files from `mwendo-deployment/` folder
3. Upload all files

---

## ✅ STEP 3: Verify Files Uploaded

After extraction, you should see in `public_html`:
- ✅ `src/` folder
- ✅ `public/` folder (frontend)
- ✅ `package.json`
- ✅ `package-lock.json`
- ✅ `.env` file
- ✅ `ecosystem.config.js`
- ✅ `frontend-server.js`
- ✅ `logs/` folder
- ✅ `uploads/` folder

---

## ⚙️ STEP 4: Install Dependencies

1. In cPanel, go to **Terminal** (or SSH)
2. Run these commands:

```bash
cd ~/public_html
npm install --production
```

Wait for installation to complete (5-10 minutes)

---

## 🚀 STEP 5: Install PM2

```bash
npm install -g pm2
```

---

## ▶️ STEP 6: Start Services

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## ✅ STEP 7: Verify Services

```bash
pm2 list
pm2 logs
```

---

## 🌐 STEP 8: Test Your System

Open browser and go to:
```
https://yourdomain.com
```

Login with:
- Username: `williamodwori`
- Password: `Admin@2024Mwendo`

---

## 📊 MONITORING

```bash
# View logs
pm2 logs

# Restart services
pm2 restart all

# Stop services
pm2 stop all
```

---

## 🆘 TROUBLESHOOTING

If services don't start:
```bash
pm2 logs
```

Check the error messages and let me know!

