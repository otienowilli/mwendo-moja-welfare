# 📤 UPLOAD & DEPLOY - TERMINAL METHOD

## ⚠️ ISSUE

The `frontend-dist.zip` file is on your Mac but not on the server yet.

---

## ✅ SOLUTION: Upload via Terminal

You're already connected to the server via SSH. Now we need to upload the file.

---

## 🔧 STEP 1: Exit SSH Session (Temporarily)

In your Mac Terminal, press:
```
Ctrl+D
```

Or type:
```bash
exit
```

This will disconnect from the server.

---

## 📤 STEP 2: Upload File via SCP

In your Mac Terminal, run:

```bash
scp "/Users/blessedwilliams/MWENDO MOJA WELFARE/frontend-dist.zip" gmooutas@sbg106.ovh.net:~/public_html/
```

When prompted for password, enter: `0nXk5{H{$TC`

Wait for upload to complete (should show 100%).

---

## 🔄 STEP 3: Reconnect to Server

```bash
ssh gmooutas@sbg106.ovh.net
```

Password: `0nXk5{H{$TC`

---

## 🚀 STEP 4: Run Deployment Command

Once reconnected, run:

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

## ✅ EXPECTED OUTPUT

```
-rw-r--r-- ... index.html
drwxr-xr-x ... assets
-rw-r--r-- ... vite.svg
{"status":"Server is running"}
```

---

## 🌐 TEST IN BROWSER

1. Open: **https://mwendomojawelfare.co.ke**
2. Login: `gregorykundu@gmail.com` / `kundu@mwendo2024`

---

**Status**: Ready to Upload
**Date**: March 6, 2026

