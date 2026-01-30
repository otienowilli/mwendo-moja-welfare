# 🔍 DIAGNOSE BACKEND - Quick Fix

## ⚠️ ISSUE
Backend is not responding on computer but working on phone (port 8000 issue)

---

## 🔧 QUICK FIX - Run These Commands in cPanel Terminal

### Step 1: Check if backend is running
```bash
ps aux | grep "node src/server.js" | grep -v grep
```

**If you see a process:** Backend is running ✅
**If you see nothing:** Backend is DOWN ❌

---

### Step 2: Check logs for errors
```bash
tail -100 /tmp/mwendo-backend.log
```

Look for any error messages

---

### Step 3: Kill any stuck processes
```bash
pkill -9 -f "node src/server.js"
sleep 2
```

---

### Step 4: Restart backend
```bash
cd ~/public_html
nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &
sleep 3
```

---

### Step 5: Verify it's running
```bash
curl http://localhost:8000/api/health
```

Should return: `{"status":"Server is running"}`

---

### Step 6: Check port 8000
```bash
lsof -i :8000
```

Should show node process listening on port 8000

---

## 📱 Why It Works on Phone But Not Computer

**Possible Reasons:**
1. Browser cache issue on computer
2. DNS resolution different on computer
3. Firewall blocking on computer
4. Network connectivity issue on computer

---

## ✅ SOLUTIONS

### Solution 1: Clear Browser Cache
1. Open Firefox
2. Press `Ctrl+Shift+Delete` (or `Cmd+Shift+Delete` on Mac)
3. Clear cache and cookies
4. Restart browser
5. Try again

### Solution 2: Try Different URL
```
http://mwendomojawelfare.co.ke:8000
http://localhost:8000 (if on same server)
```

### Solution 3: Check Network
```bash
# On your computer, try:
ping mwendomojawelfare.co.ke
nslookup mwendomojawelfare.co.ke
```

### Solution 4: Restart Backend on TrueHost
Follow **Step 1-5** above in cPanel Terminal

---

## 🆘 If Still Not Working

1. Run all steps above
2. Check logs: `tail -100 /tmp/mwendo-backend.log`
3. Share the error message
4. We'll debug from there

---

## 📝 QUICK COMMANDS

```bash
# Check if running
ps aux | grep "node src/server.js" | grep -v grep

# View logs
tail -50 /tmp/mwendo-backend.log

# Restart
pkill -9 -f "node src/server.js"
sleep 2
cd ~/public_html && nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &
sleep 3
curl http://localhost:8000/api/health
```

---

**Run these commands and tell me what you see!** 📝

