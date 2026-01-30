# 🚨 BACKEND DOWN - Troubleshooting Guide

## 📱 Why It Works on Phone But Not Computer

**The Issue:**
- ✅ Phone can access: `http://mwendomojawelfare.co.ke:8000`
- ❌ Computer cannot access: `http://mwendomojawelfare.co.ke:8000`

**Possible Causes:**
1. Backend process crashed or stopped
2. Port 8000 is blocked on computer's network
3. Browser cache issue
4. DNS resolution issue
5. Firewall blocking on computer

---

## 🔧 IMMEDIATE ACTION - SSH to TrueHost

**Open cPanel Terminal and run:**

```bash
# 1. Check if backend is running
ps aux | grep "node src/server.js" | grep -v grep

# 2. If nothing shows, backend is DOWN - restart it
pkill -9 -f "node src/server.js"
sleep 2
cd ~/public_html
nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &
sleep 3

# 3. Verify it started
curl http://localhost:8000/api/health

# 4. Check logs for errors
tail -50 /tmp/mwendo-backend.log
```

---

## 🖥️ COMPUTER-SPECIFIC FIXES

### Fix 1: Clear Browser Cache
1. **Firefox:** `Ctrl+Shift+Delete` → Clear All
2. **Chrome:** `Ctrl+Shift+Delete` → Clear All
3. Restart browser
4. Try: `http://mwendomojawelfare.co.ke:8000`

### Fix 2: Try Different Network
- Try on different WiFi network
- Try on mobile hotspot
- Try on wired connection

### Fix 3: Check DNS
```bash
# On your computer:
nslookup mwendomojawelfare.co.ke
ping mwendomojawelfare.co.ke
```

### Fix 4: Disable VPN/Proxy
- If using VPN, disable it
- If using proxy, disable it
- Try again

### Fix 5: Check Firewall
- Disable firewall temporarily
- Try accessing the site
- Re-enable firewall

---

## 📊 WHAT TO CHECK ON TRUEHOST

**Run in cPanel Terminal:**

```bash
# Check if process is running
ps aux | grep node

# Check if port 8000 is listening
lsof -i :8000

# Check logs
tail -100 /tmp/mwendo-backend.log

# Check disk space
df -h

# Check memory
free -h

# Check if database exists
ls -lh ~/public_html/mwendo_moja.db
```

---

## ✅ EXPECTED OUTPUT

**If backend is running:**
```
curl http://localhost:8000/api/health
{"status":"Server is running"}
```

**If backend is down:**
```
curl: (7) Failed to connect to localhost port 8000: Connection refused
```

---

## 🆘 NEXT STEPS

1. **SSH to TrueHost** via cPanel Terminal
2. **Run diagnostic commands** above
3. **Share the output** with me
4. **I'll help you fix it**

---

## 💡 PREVENTION

To prevent this in future:
- Setup PM2 (auto-restart on crash)
- Setup monitoring script (auto-restart every 5 min)
- See: `SETUP_PM2_PRODUCTION.md`

---

**Tell me what you see when you run the commands!** 📝

