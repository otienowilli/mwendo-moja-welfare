# 🚀 DEPLOYMENT INSTRUCTIONS - FOLLOW THESE STEPS EXACTLY

## Files Ready for Upload
✅ `backend-deploy.zip` (122 KB) - Backend code, config, dependencies list
✅ `frontend-dist.zip` (197 KB) - Built React frontend

Both files are in: `/Users/blessedwilliams/MWENDO MOJA WELFARE/`

---

## STEP 1: Clean Server (Run in cPanel Terminal)

```bash
cd ~/public_html
rm -rf * .htaccess .env .git 2>/dev/null
ls -la
```

Expected: Only `cgi-bin` directory should remain

---

## STEP 2: Upload Files via cPanel File Manager

1. Go to: https://mwendomojawelfare.co.ke:2083 (cPanel)
2. Login with your credentials
3. Click **File Manager**
4. Navigate to `public_html`
5. Upload these 2 files:
   - `backend-deploy.zip`
   - `frontend-dist.zip`

---

## STEP 3: Extract Files (Run in cPanel Terminal)

```bash
cd ~/public_html
unzip -o backend-deploy.zip
unzip -o frontend-dist.zip
ls -la
```

Expected: See `src/`, `dist/`, `package.json`, `.env`

---

## STEP 4: Install Dependencies (Run in cPanel Terminal)

```bash
cd ~/public_html
npm install --production
```

---

## STEP 5: Start Backend Server (Run in cPanel Terminal)

```bash
cd ~/public_html
nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &
sleep 2
curl http://localhost:8000/api/health
```

Expected: `{"status":"Server is running"}`

---

## STEP 6: Create .htaccess (Run in cPanel Terminal)

```bash
cat > ~/public_html/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ http://localhost:8000/$1 [P,L]
</IfModule>

<IfModule mod_proxy.c>
  ProxyRequests Off
  ProxyPreserveHost On
  ProxyPassMatch ^/(.*)$ http://localhost:8000/$1
  ProxyPassReverseMatch ^/(.*)$ http://localhost:8000/$1
</IfModule>
EOF
```

---

## STEP 7: Test Login

Visit: **https://mwendomojawelfare.co.ke**

Login with:
- **Username:** williamodwori
- **Password:** Admin@2024Mwendo

---

## ✅ DONE!

System is now LIVE! 🎉

