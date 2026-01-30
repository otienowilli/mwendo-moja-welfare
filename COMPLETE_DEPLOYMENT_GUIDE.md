# 📋 Complete Deployment Guide - TrueHost

## Current Status

✅ M-Pesa credentials configured
✅ Backend code ready
✅ Frontend code ready
✅ Database ready
❌ Files mixed on TrueHost (needs cleanup)

---

## Problem on TrueHost

Current structure in `public_html`:
```
public_html/
├── src/                    (Backend)
├── client/                 (Frontend source)
├── node_modules/           (Dependencies)
├── dist/                   (Frontend built)
├── backend-deploy.zip
├── frontend-dist.zip
├── mwendo_moja.db
└── package.json
```

**Issue**: Files are mixed, causing confusion and conflicts.

---

## Solution: Clean Deployment

### Phase 1: Cleanup (5 min)

SSH to TrueHost:
```bash
ssh user@mwendomojawelfare.co.ke
```

Kill backend:
```bash
pkill -f "node src/server.js"
sleep 2
```

Clean public_html:
```bash
cd ~/public_html
rm -rf *
rm -rf .*
ls -la  # Should be empty
```

---

### Phase 2: Deploy Backend (5 min)

Extract backend:
```bash
cd ~/public_html
unzip backend-deploy.zip
```

Install dependencies:
```bash
npm install --production
```

Start backend:
```bash
nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &
sleep 3
curl http://localhost:8000/api/health
```

Expected: `{"status":"Server is running"}`

---

### Phase 3: Deploy Frontend (5 min)

Option A - Copy to public_html:
```bash
cd ~/public_html
unzip frontend-dist.zip
cp -r dist/* .
rm -rf dist client
```

Option B - Separate directory:
```bash
mkdir -p ~/public_html_frontend
cd ~/public_html_frontend
unzip ~/frontend-dist.zip
```

---

### Phase 4: Configure Reverse Proxy (2 min)

Create `.htaccess` in `~/public_html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Proxy API to Node.js
  RewriteRule ^api/(.*)$ http://localhost:8000/api/$1 [P,L]
  
  # Serve static files
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Proxy to frontend
  RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
</IfModule>
```

---

### Phase 5: Verify (2 min)

Check backend:
```bash
curl http://localhost:8000/api/health
tail -50 /tmp/mwendo-backend.log
ps aux | grep "node src/server.js"
```

Check website:
```bash
curl https://mwendomojawelfare.co.ke
```

---

## Final Verification

1. **Visit**: https://mwendomojawelfare.co.ke
2. **Login**:
   - Username: `williamodwori`
   - Password: `Admin@2024Mwendo`
3. **Check Features**:
   - Dashboard loads ✓
   - Members page works ✓
   - Contributions page works ✓
   - Admin pages work ✓
   - M-Pesa Payments visible ✓

---

## Troubleshooting

**Backend won't start?**
```bash
tail -100 /tmp/mwendo-backend.log
```

**Port 8000 in use?**
```bash
netstat -tlnp | grep 8000
pkill -9 -f "node src/server.js"
```

**Frontend not loading?**
```bash
ls -la ~/public_html/index.html
cat ~/public_html/.htaccess
```

**API not responding?**
```bash
curl http://localhost:8000/api/health
ps aux | grep node
```

---

## Checklist

- [ ] SSH to TrueHost
- [ ] Killed backend
- [ ] Cleaned public_html
- [ ] Extracted backend
- [ ] Installed npm dependencies
- [ ] Started backend
- [ ] Backend health check passes
- [ ] Deployed frontend
- [ ] Created .htaccess
- [ ] Website loads
- [ ] Login works
- [ ] All features work
- [ ] M-Pesa configured

---

## Total Time: ~20 minutes

This will get your system LIVE with M-Pesa payment collection!

---

**Ready? Start with Phase 1!** 🚀

