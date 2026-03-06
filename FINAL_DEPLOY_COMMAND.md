# 🚀 FINAL DEPLOYMENT COMMAND

## ✅ YOU ARE HERE

You're in the cPanel Terminal on the server at: `/home/gmooutas/public_html`

The `client/dist/` folder exists with all the frontend files!

---

## 🔧 RUN THIS COMMAND IN cPANEL TERMINAL

Copy and paste this exact command:

```bash
cp -r client/dist/* . && rm -rf client && ls -la index.html assets/ vite.svg && curl http://localhost:8000/api/health
```

---

## ✅ WHAT THIS DOES

1. Copies all files from `client/dist/` to the root directory
2. Deletes the `client` folder
3. Lists the files to verify they're in place
4. Checks if the backend is running

---

## ✅ EXPECTED OUTPUT

```
-rw-r--r-- 1 gmooutas gmooutas  453 Mar  6 12:21 index.html
drwxr-xr-x 4 gmooutas gmooutas  128 Mar  6 12:21 assets
-rw-r--r-- 1 gmooutas gmooutas 1.5K Mar  6 12:21 vite.svg
{"status":"Server is running"}
```

---

## 🌐 THEN TEST IN BROWSER

1. Open: **https://mwendomojawelfare.co.ke**
2. Login: `gregorykundu@gmail.com` / `kundu@mwendo2024`
3. Navigate to **Contributions** page

---

## ✅ ADMIN CREDENTIALS

```
Email: gregorykundu@gmail.com
Password: kundu@mwendo2024
```

---

**Status**: Ready to Deploy
**Date**: March 6, 2026

