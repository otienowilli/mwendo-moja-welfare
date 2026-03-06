# 🚀 LIVE DEPLOYMENT GUIDE - FIX 404 ERROR

## 📋 Problem
You're seeing a **404 Not Found** error on https://mwendomojawelfare.co.ke

**Reason**: Frontend files haven't been deployed to the live server yet.

---

## ✅ Solution: Deploy Frontend Files

### STEP 1: Login to cPanel
1. Go to: **https://mwendomojawelfare.co.ke:2083**
2. Username: `Williamsotie`
3. Password: `0nXk5{H{$TC`

### STEP 2: Open File Manager
1. Click **File Manager** in cPanel
2. Navigate to **public_html** folder
3. You should see the current files/folders

### STEP 3: Upload frontend-dist.zip
1. Click **Upload** button
2. Select file: `frontend-dist.zip` from your Mac
   - Location: `/Users/blessedwilliams/MWENDO MOJA WELFARE/frontend-dist.zip`
   - Size: 202 KB
3. Wait for upload to complete (should be quick)

### STEP 4: Extract the ZIP File
1. Right-click on `frontend-dist.zip`
2. Select **Extract** from context menu
3. Click **Extract File(s)** button
4. Wait for extraction to complete

### STEP 5: Move Files to Root
After extraction, you'll have a `client/dist/` folder:

1. Open the `client` folder
2. Open the `dist` folder inside it
3. Select all files inside `dist` (Ctrl+A)
4. Cut the files (Ctrl+X)
5. Navigate back to `public_html` root
6. Paste files (Ctrl+V)
7. Click **Move** when prompted

### STEP 6: Verify Files in Root
You should now see in `public_html`:
- ✅ `index.html` (main file)
- ✅ `assets/` folder (CSS, JS)
- ✅ `vite.svg` (logo)

### STEP 7: Clean Up
1. Delete the `client` folder
2. Delete the `frontend-dist.zip` file
3. Verify `index.html` is in the root

### STEP 8: Verify Backend is Running
Open cPanel **Terminal** and run:
```bash
curl http://localhost:8000/api/health
```

Expected output:
```json
{"status":"Server is running"}
```

If not running, start it:
```bash
cd ~/public_html
nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &
sleep 3
curl http://localhost:8000/api/health
```

---

## ✅ STEP 9: Test on Live Server

1. Open browser: **https://mwendomojawelfare.co.ke**
2. You should see the login page (no more 404!)
3. Login with your credentials
4. Navigate to **Contributions** page
5. Verify form displays with all 15 fields
6. Test adding a contribution

---

## 🎯 What Gets Deployed

✅ Contributions page with professional form
✅ 15 input fields for vote heads
✅ Professional table display
✅ Edit/Delete functionality
✅ Print-friendly reports
✅ Automatic total calculation

---

## 🆘 Troubleshooting

### Still seeing 404?
- Hard refresh browser (Ctrl+Shift+R)
- Clear browser cache
- Try incognito mode
- Verify `index.html` is in `public_html` root

### Form doesn't appear?
- Refresh page
- Check browser console (F12)
- Verify backend: `curl http://localhost:8000/api/health`

### Data doesn't save?
- Check backend logs: `tail -50 /tmp/mwendo-backend.log`
- Verify backend running

---

## ✅ DEPLOYMENT COMPLETE!

After following these steps, your system will be LIVE!

**Live URL**: https://mwendomojawelfare.co.ke
**Contributions Page**: https://mwendomojawelfare.co.ke/contributions

---

**Status**: Ready to Deploy
**Date**: March 6, 2026

