# 🖥️ cPANEL TERMINAL - UPLOAD & DEPLOY

## ✅ STEP 1: Access cPanel Terminal

1. Go to: **https://mwendomojawelfare.co.ke:2083**
2. Look for **Terminal** in the left menu (under "Advanced" section)
3. Click **Terminal**
4. You should see a command prompt

---

## 📤 STEP 2: Upload File via Terminal

In the terminal, run this command to create the file on the server:

```bash
cat > /home/gmooutas/public_html/frontend-dist.zip << 'EOF'
```

Then you'll need to paste the file content. However, this is complex.

---

## ✅ EASIER STEP 2: Check if File Already Exists

Run this command first:

```bash
ls -lh ~/public_html/frontend-dist.zip
```

If it shows the file exists, skip to STEP 3.

If it says "No such file", we need to upload it differently.

---

## 🚀 STEP 3: Deploy (If File Exists)

Run this command:

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

**Status**: Ready to Use Terminal
**Date**: March 6, 2026

