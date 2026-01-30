# 📤 HOW TO UPLOAD DEPLOYMENT PACKAGE

## 📍 YOU ARE HERE
- cPanel File Manager is open
- You can see folders: `public_html`, `mwendo-moja`, etc.

---

## 🎯 WHAT TO DO NOW

### STEP 1: Download Deployment Package to Your Computer

The file is ready on your local machine:
```
/Users/blessedwilliams/MWENDO MOJA WELFARE/mwendo-deployment.zip
```

**File Size:** 327 KB (very small, fast upload)

---

### STEP 2: Navigate to public_html in cPanel

1. In cPanel File Manager, **double-click** the `public_html` folder
2. You should now be inside `public_html`

---

### STEP 3: Upload the ZIP File

1. Click the **Upload** button (usually top-left corner)
2. A file browser will open
3. Navigate to: `/Users/blessedwilliams/MWENDO MOJA WELFARE/`
4. Select: `mwendo-deployment.zip`
5. Click **Open** or **Upload**
6. Wait for upload to complete (should be fast - only 327 KB)

---

### STEP 4: Extract the ZIP File

1. In cPanel File Manager, find `mwendo-deployment.zip`
2. Right-click on it
3. Select **Extract** (or **Decompress**)
4. Wait for extraction to complete
5. You should now see folders: `src/`, `public/`, etc.

---

### STEP 5: Delete the ZIP File

1. Right-click `mwendo-deployment.zip`
2. Click **Delete**
3. Confirm deletion

---

## ✅ AFTER UPLOAD

You should see in `public_html`:
```
public_html/
├── src/
├── public/
├── package.json
├── package-lock.json
├── .env
├── ecosystem.config.js
├── frontend-server.js
├── logs/
└── uploads/
```

---

## 🚀 NEXT STEPS

Once uploaded and extracted:

1. Open **Terminal** in cPanel
2. Run:
```bash
cd ~/public_html
npm install --production
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

3. Test at: `https://yourdomain.com`

---

## 💡 TIPS

- Upload is fast (only 327 KB)
- Extraction takes 1-2 minutes
- Don't close cPanel during upload/extraction
- If upload fails, try again - it's reliable

**Ready? Start uploading now!**

