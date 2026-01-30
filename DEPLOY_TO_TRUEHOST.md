# 🚀 Deploy to TrueHost - Step by Step

## 📦 Files Ready for Deployment

- ✅ `backend-deploy.zip` (129 KB) - Backend code + M-Pesa config
- ✅ `frontend-dist.zip` (200 KB) - Built React frontend
- ✅ M-Pesa credentials configured
- ✅ Database ready

---

## 🔧 Phase 1: Upload Files to TrueHost (5 min)

### Option A: Using cPanel File Manager

1. Go to: **https://mwendomojawelfare.co.ke:2083** (cPanel)
2. Login with your credentials
3. Click **File Manager**
4. Navigate to **public_html**
5. Upload both files:
   - `backend-deploy.zip`
   - `frontend-dist.zip`

### Option B: Using SCP (Command Line)

```bash
scp backend-deploy.zip user@mwendomojawelfare.co.ke:~/public_html/
scp frontend-dist.zip user@mwendomojawelfare.co.ke:~/public_html/
```

---

## 🧹 Phase 2: Cleanup (5 min)

Open **cPanel Terminal** or SSH:

```bash
ssh user@mwendomojawelfare.co.ke
```

Kill old backend:
```bash
pkill -f "node src/server.js"
sleep 2
```

Clean public_html:
```bash
cd ~/public_html
rm -rf src client node_modules dist *.md *.log
ls -la  # Should only show zip files
```

---

## 📥 Phase 3: Deploy Backend (5 min)

Extract backend:
```bash
cd ~/public_html
unzip -o backend-deploy.zip
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

**Expected**: `{"status":"Server is running"}`

---

## 🎨 Phase 4: Deploy Frontend (5 min)

Extract frontend:
```bash
cd ~/public_html
unzip -o frontend-dist.zip
cp -r client/dist/* .
rm -rf client
```

Verify files:
```bash
ls -la index.html
ls -la assets/
```

---

## 🔗 Phase 5: Configure Reverse Proxy (2 min)

Create `.htaccess` in `~/public_html`:

```bash
cat > .htaccess << 'EOF'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Proxy API to Node.js backend
  RewriteRule ^api/(.*)$ http://localhost:8000/api/$1 [P,L]
  
  # Serve static files
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Proxy everything else to frontend
  RewriteRule ^(.*)$ - [L]
</IfModule>
```

---

## ✅ Phase 6: Verify Deployment (2 min)

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

## 🧪 Phase 7: Test Live Website (5 min)

1. Go to: **https://mwendomojawelfare.co.ke**
2. Login with:
   - Username: `williamodwori`
   - Password: `Admin@2024Mwendo`
3. Check:
   - ✅ Dashboard loads
   - ✅ Members page works
   - ✅ Contributions page works
   - ✅ Admin pages work
   - ✅ M-Pesa Payments visible

---

## 🆘 Troubleshooting

**Backend won't start?**
```bash
tail -100 /tmp/mwendo-backend.log
```

**Port 8000 in use?**
```bash
pkill -9 -f "node src/server.js"
cd ~/public_html && nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &
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

## ✅ Deployment Checklist

- [ ] Files uploaded to TrueHost
- [ ] Old backend killed
- [ ] public_html cleaned
- [ ] Backend extracted
- [ ] Dependencies installed
- [ ] Backend started
- [ ] Backend health check passes
- [ ] Frontend extracted
- [ ] .htaccess created
- [ ] Website loads
- [ ] Login works
- [ ] All features work
- [ ] M-Pesa configured

---

## 📊 Total Time: ~25 minutes

**Your system will be LIVE with M-Pesa payment collection!** 🎉

---

**Ready? Start with Phase 1!** 🚀

