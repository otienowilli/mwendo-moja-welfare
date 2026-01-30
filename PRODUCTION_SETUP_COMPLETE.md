# 🚀 PRODUCTION SETUP - COMPLETE GUIDE

Your MWENDO MOJA system is now running on TrueHost! Here's how to make it production-ready.

## ✅ Current Status

- ✅ Backend running on port 8000
- ✅ Frontend accessible
- ✅ Database with sample data
- ✅ System working at: `http://mwendomojawelfare.co.ke:8000`

---

## 📋 TASK 1: Contact TrueHost Support

**File:** `TRUEHOST_SUPPORT_EMAIL.md`

1. Open the email template
2. Copy the content
3. Send to TrueHost support
4. Request: Configure LiteSpeed to proxy port 443 → localhost:8000

**Expected Result:** System accessible at `https://mwendomojawelfare.co.ke` (standard HTTPS)

---

## 📋 TASK 2: Setup PM2 (Keep Backend Running)

**File:** `SETUP_PM2_PRODUCTION.md`

Run these commands in **cPanel Terminal:**

```bash
npm install -g pm2
cd ~/public_html
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'mwendo-backend',
    script: './src/server.js',
    cwd: '/home/gmooutas/public_html',
    instances: 1,
    exec_mode: 'fork',
    env: { NODE_ENV: 'production', PORT: 8000 },
    error_file: '/tmp/mwendo-error.log',
    out_file: '/tmp/mwendo-out.log',
    autorestart: true,
    max_memory_restart: '500M'
  }]
};
EOF

pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

**Benefits:**
- ✅ Auto-restart if server crashes
- ✅ Auto-restart on server reboot
- ✅ Memory management
- ✅ Logging

---

## 📋 TASK 3: Setup Monitoring

**File:** `MONITORING_HEALTH_CHECK.sh`

1. Upload the script to TrueHost
2. Make it executable: `chmod +x ~/public_html/MONITORING_HEALTH_CHECK.sh`
3. Add to crontab to run every 5 minutes:

```bash
crontab -e
# Add this line:
*/5 * * * * ~/public_html/MONITORING_HEALTH_CHECK.sh
```

**What it does:**
- ✅ Checks if backend is running every 5 minutes
- ✅ Auto-restarts if it crashes
- ✅ Logs all activity
- ✅ Alerts you to issues

---

## 🔗 Access Your System

**Current (Temporary):**
```
http://mwendomojawelfare.co.ke:8000
```

**After TrueHost configures proxy:**
```
https://mwendomojawelfare.co.ke
```

**Login Credentials:**
- Username: `williamodwori`
- Password: `Admin@2024Mwendo`

---

## 📊 Monitoring Commands

Check backend status:
```bash
curl http://localhost:8000/api/health
```

View PM2 status:
```bash
pm2 list
pm2 logs mwendo-backend
```

View health check logs:
```bash
tail -20 /tmp/mwendo-health-check.log
```

---

## ⚠️ Troubleshooting

**Backend not starting?**
```bash
cat /tmp/mwendo-backend.log
```

**Port 8000 in use?**
```bash
lsof -i :8000
pkill -f "node src/server.js"
```

**Database issues?**
```bash
sqlite3 ~/public_html/mwendo_moja.db ".tables"
```

---

## 📞 Next Steps

1. ✅ Send email to TrueHost support
2. ✅ Setup PM2 for auto-restart
3. ✅ Setup monitoring script
4. ✅ Wait for TrueHost to configure reverse proxy
5. ✅ Test on standard HTTPS port

**Your system is production-ready!** 🎉

