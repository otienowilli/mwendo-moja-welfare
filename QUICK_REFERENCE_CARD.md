# 🎯 QUICK REFERENCE CARD

## 🌐 Access Your System

**Current URL:** `http://mwendomojawelfare.co.ke:8000`
**Login:** williamodwori / Admin@2024Mwendo

---

## 📁 Important Paths on TrueHost

```
/home/gmooutas/public_html/          # Main directory
/home/gmooutas/public_html/src/       # Backend code
/home/gmooutas/public_html/client/    # Frontend
/home/gmooutas/public_html/mwendo_moja.db  # Database
```

---

## 🔧 Essential Commands (Run in cPanel Terminal)

**Check if backend is running:**
```bash
curl http://localhost:8000/api/health
```

**View backend logs:**
```bash
tail -50 /tmp/mwendo-backend.log
```

**Restart backend:**
```bash
pkill -f "node src/server.js"
sleep 2
cd ~/public_html && nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &
```

**Check database:**
```bash
sqlite3 ~/public_html/mwendo_moja.db "SELECT COUNT(*) FROM members;"
```

---

## 📊 PM2 Commands (After Setup)

```bash
pm2 list                    # Show all apps
pm2 logs mwendo-backend     # View logs
pm2 restart mwendo-backend  # Restart app
pm2 stop mwendo-backend     # Stop app
pm2 delete mwendo-backend   # Remove from PM2
```

---

## 📧 Support Email

**To:** TrueHost Support
**Subject:** Configure LiteSpeed Reverse Proxy for Node.js Application
**File:** `TRUEHOST_SUPPORT_EMAIL.md`

---

## 📋 Setup Checklist

- [ ] System is running at `http://mwendomojawelfare.co.ke:8000`
- [ ] Can login with williamodwori / Admin@2024Mwendo
- [ ] Dashboard shows members, contributions, loans
- [ ] Sent email to TrueHost support
- [ ] Setup PM2 for auto-restart
- [ ] Setup monitoring script
- [ ] Waiting for TrueHost to configure reverse proxy
- [ ] System accessible at `https://mwendomojawelfare.co.ke`

---

## 🆘 Emergency Restart

If system is down:

```bash
cd ~/public_html
pkill -f "node src/server.js"
sleep 2
nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &
sleep 3
curl http://localhost:8000/api/health
```

---

## 📞 Contact Info

**TrueHost Support:** support@truehost.co.ke
**Your cPanel:** https://mwendomojawelfare.co.ke:2083
**Username:** gmooutas

