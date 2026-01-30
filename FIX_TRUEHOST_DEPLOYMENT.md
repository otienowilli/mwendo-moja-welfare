# 🔧 Fix TrueHost Deployment - Proper File Organization

## Problem

Files are mixed together in `public_html`:
- Backend files (src, node_modules, package.json)
- Frontend files (client, dist)
- Zip files (backend-deploy.zip, frontend-dist.zip)

This causes conflicts and confusion.

---

## Solution: Proper Deployment Structure

### Step 1: Clean Up Server

SSH to TrueHost and run:

```bash
# Kill backend
pkill -f "node src/server.js"

# Go to public_html
cd ~/public_html

# Remove everything
rm -rf *
rm -rf .*

# Verify it's empty
ls -la
```

---

### Step 2: Deploy Backend Only

```bash
# Go to public_html
cd ~/public_html

# Extract backend
unzip backend-deploy.zip

# Install dependencies
npm install --production

# Start backend on port 8000
nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &

# Verify
sleep 3
curl http://localhost:8000/api/health
```

---

### Step 3: Deploy Frontend to Separate Directory

```bash
# Go to home directory
cd ~

# Create frontend directory
mkdir -p public_html_frontend

# Extract frontend
cd public_html_frontend
unzip ~/public_html/frontend-dist.zip

# Or copy from dist folder
cp -r ~/public_html/dist/* .
```

---

### Step 4: Configure LiteSpeed Reverse Proxy

Edit `.htaccess` in `~/public_html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # Proxy API requests to Node.js backend
  RewriteRule ^api/(.*)$ http://localhost:8000/api/$1 [P,L]
  
  # Proxy other requests to frontend
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
</IfModule>
```

---

### Step 5: Serve Frontend from LiteSpeed

Configure LiteSpeed to serve frontend files:

1. Go to cPanel → LiteSpeed Web Server Console
2. Set document root to: `/home/username/public_html_frontend`
3. Or use static file serving for frontend

---

### Step 6: Verify Deployment

```bash
# Check backend
curl http://localhost:8000/api/health

# Check frontend
curl https://mwendomojawelfare.co.ke

# Check logs
tail -50 /tmp/mwendo-backend.log
```

---

## Recommended Structure

```
~/public_html/
├── src/                    (Backend code)
├── node_modules/           (Backend dependencies)
├── package.json
├── package-lock.json
├── mwendo_moja.db         (Database)
├── .env                    (Configuration)
├── .htaccess               (Reverse proxy)
└── uploads/                (User uploads)

~/public_html_frontend/
├── index.html
├── assets/
├── vite.svg
└── (other frontend files)
```

---

## Alternative: Single Directory (Simpler)

If you want everything in one place:

```bash
# In ~/public_html
cd ~/public_html

# Extract backend
unzip backend-deploy.zip

# Extract frontend to public subdirectory
mkdir -p public
cd public
unzip ~/frontend-dist.zip
cd ..

# Configure .htaccess to serve frontend from public/
# And proxy API to Node.js
```

---

## Quick Fix (Immediate)

If you just want to get it working now:

```bash
# SSH to TrueHost
ssh user@mwendomojawelfare.co.ke

# Kill old process
pkill -f "node src/server.js"

# Clean up
cd ~/public_html
rm -rf client node_modules *.zip

# Install dependencies
npm install --production

# Start backend
nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &

# Verify
sleep 3
curl http://localhost:8000/api/health
```

---

## Checklist

- [ ] Backend killed
- [ ] public_html cleaned
- [ ] Backend extracted
- [ ] Dependencies installed
- [ ] Backend started
- [ ] Health check passes
- [ ] Frontend deployed
- [ ] Reverse proxy configured
- [ ] Website accessible
- [ ] API working

---

## Support

- Check logs: `tail -100 /tmp/mwendo-backend.log`
- Check processes: `ps aux | grep node`
- Check ports: `netstat -tlnp | grep 8000`

---

**Follow these steps to fix the deployment!** 🚀

