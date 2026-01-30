# 🚀 FRESH DEPLOYMENT GUIDE - START FROM SCRATCH

## Overview
This guide will deploy the MWENDO MOJA Welfare system to TrueHost from scratch, cleanly and properly.

**Server Details:**
- Domain: `mwendomojawelfare.co.ke`
- cPanel Username: `gmooutas`
- Server: TrueHost (LiteSpeed Web Server)
- Home Directory: `/home/gmooutas`
- Public HTML: `/home/gmooutas/public_html`

---

## STEP 1: Clean Up Server (5 minutes)

In **cPanel Terminal**, run:

```bash
# Remove all old files from public_html
cd ~/public_html
rm -rf * .htaccess .env .git

# Verify it's empty
ls -la
```

You should see only `cgi-bin` directory.

---

## STEP 2: Upload Backend Files (10 minutes)

1. Go to **cPanel File Manager**
2. Navigate to `public_html`
3. Upload these files from your local machine:
   - `backend-deploy.zip` (contains src/, package.json, .env)
   - `frontend-dist.zip` (contains dist/ folder)

---

## STEP 3: Extract Files (5 minutes)

In **cPanel Terminal**, run:

```bash
cd ~/public_html

# Extract backend
unzip -o backend-deploy.zip

# Extract frontend
unzip -o frontend-dist.zip

# Verify structure
ls -la
```

You should see: `src/`, `dist/`, `node_modules/`, `package.json`, `.env`

---

## STEP 4: Install Dependencies (5 minutes)

```bash
cd ~/public_html
npm install --production
```

---

## STEP 5: Start Backend Server (2 minutes)

```bash
cd ~/public_html
nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &
```

Verify it's running:
```bash
curl http://localhost:8000/api/health
```

Should return: `{"status":"Server is running"}`

---

## STEP 6: Configure Reverse Proxy (5 minutes)

Create `.htaccess` file:

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

## STEP 7: Login to System

Visit: `https://mwendomojawelfare.co.ke`

**Admin Credentials:**
- Username: `williamodwori`
- Password: `Admin@2024Mwendo`

---

## ✅ SYSTEM IS LIVE!

Your MWENDO MOJA Welfare Management System is now deployed and ready to use! 🎉

