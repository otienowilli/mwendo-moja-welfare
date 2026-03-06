# 🚀 TERMINAL DEPLOYMENT - FAST & EASY

## 📋 STEPS TO DEPLOY VIA TERMINAL

### STEP 1: Open cPanel Terminal
1. Go to cPanel: https://mwendomojawelfare.co.ke:2083
2. Login: Williamsotie / 0nXk5{H{$TC
3. Click **Terminal** (or **SSH Terminal**)
4. You should see a command prompt

---

## 🔧 COPY & PASTE THESE COMMANDS

### Command 1: Navigate to public_html
```bash
cd ~/public_html
```

### Command 2: Extract frontend-dist.zip (if not already extracted)
```bash
unzip -o frontend-dist.zip
```

### Command 3: Move files from dist to root
```bash
cp -r client/dist/* .
```

### Command 4: Delete client folder
```bash
rm -rf client
```

### Command 5: Delete frontend-dist.zip
```bash
rm -f frontend-dist.zip
```

### Command 6: Verify files are in root
```bash
ls -la index.html assets/ vite.svg
```

Expected output:
```
-rw-r--r-- ... index.html
drwxr-xr-x ... assets
-rw-r--r-- ... vite.svg
```

### Command 7: Verify backend is running
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

## ✅ DEPLOYMENT COMPLETE!

After running these commands:

1. Open browser: **https://mwendomojawelfare.co.ke**
2. You should see login page (no more 404!)
3. Login with:
   - Email: `gregorykundu@gmail.com`
   - Password: `kundu@mwendo2024`

---

## 🎯 QUICK COPY-PASTE SCRIPT

Run all commands at once:

```bash
cd ~/public_html && \
unzip -o frontend-dist.zip && \
cp -r client/dist/* . && \
rm -rf client && \
rm -f frontend-dist.zip && \
ls -la index.html assets/ vite.svg && \
curl http://localhost:8000/api/health
```

---

## ✅ STATUS

- ✅ Admin credentials updated
- ✅ Frontend package ready
- ✅ Backend running
- ✅ Database connected
- ✅ Ready to deploy!

---

**Status**: Ready to Deploy
**Date**: March 6, 2026

