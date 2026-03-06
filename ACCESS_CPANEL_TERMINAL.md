# 🖥️ ACCESS cPANEL TERMINAL - ALTERNATIVE METHODS

Since Site Publisher is deprecated, use one of these methods to access Terminal:

---

## ✅ METHOD 1: SSH Terminal (RECOMMENDED)

### Open SSH Terminal in cPanel:
1. Go to: **https://mwendomojawelfare.co.ke:2083**
2. Login: `Williamsotie` / `0nXk5{H{$TC`
3. Look for **Terminal** or **SSH Terminal** in the left menu
4. Click it to open the terminal interface

---

## ✅ METHOD 2: Use SSH from Your Mac Terminal

Open your Mac's Terminal and run:

```bash
ssh gmooutas@sbg106.ovh.net
```

When prompted for password, enter: `0nXk5{H{$TC`

Then run the deployment command.

---

## ✅ METHOD 3: Use SSH with Key (If Available)

If you have SSH keys set up:

```bash
ssh -i ~/.ssh/id_rsa gmooutas@sbg106.ovh.net
```

---

## 🚀 DEPLOYMENT COMMAND

Once you're in the terminal (any method above), run:

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

After deployment:
1. Open: **https://mwendomojawelfare.co.ke**
2. Login: `gregorykundu@gmail.com` / `kundu@mwendo2024`

---

**Status**: Ready to Deploy
**Date**: March 6, 2026

