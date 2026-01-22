# Fix Build Errors - Complete Guide

## 🔍 Common Build Errors & Solutions

### Error 1: "Cannot find module 'react'"

**Cause:** Dependencies not installed

**Fix:**
```bash
cd client
npm install
npm run build
```

---

### Error 2: "ENOENT: no such file or directory"

**Cause:** Missing files or wrong directory

**Fix:**
```bash
# Check you're in client directory
pwd
# Should show: .../client

# Check files exist
ls -la src/
# Should show: main.jsx, App.jsx, index.css

# Install and build
npm install
npm run build
```

---

### Error 3: "Vite not found"

**Cause:** Vite not installed

**Fix:**
```bash
cd client
npm install
# This installs vite from package.json
npm run build
```

---

### Error 4: "Port already in use"

**Cause:** Another process using port 3000

**Fix:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
FRONTEND_PORT=3001 node frontend-server.js
```

---

### Error 5: "Cannot GET /"

**Cause:** Frontend server not running or dist folder missing

**Fix:**
```bash
# Check if dist exists
ls -la client/dist/

# If not, build it
cd client && npm run build && cd ..

# Start server
node frontend-server.js
```

---

### Error 6: "API calls failing"

**Cause:** Wrong API URL in client/.env

**Fix:**
```bash
# Check client/.env
cat client/.env

# Should have:
VITE_API_URL=https://yourdomain.com/api

# Rebuild after changing
cd client && npm run build && cd ..
```

---

### Error 7: "Blank page in browser"

**Cause:** Multiple possible issues

**Fix:**
```bash
# 1. Check browser console (F12)
# Look for JavaScript errors

# 2. Check if dist exists
ls -la client/dist/

# 3. Check if server running
ps aux | grep frontend-server

# 4. Check server logs
pm2 logs
# or check terminal output

# 5. Rebuild
cd client && npm run build && cd ..
```

---

### Error 8: "Module not found: './pages/Login'"

**Cause:** File doesn't exist or wrong path

**Fix:**
```bash
# Check file exists
ls -la client/src/pages/Login.jsx

# Check spelling matches exactly
# React is case-sensitive!
```

---

### Error 9: "SyntaxError in JSX"

**Cause:** Invalid JSX syntax

**Fix:**
```bash
# Check the error message for line number
# Open that file and fix syntax

# Common issues:
# - Missing closing tag: <div> needs </div>
# - Missing return statement
# - Invalid JavaScript in JSX
```

---

### Error 10: "npm ERR! code ERESOLVE"

**Cause:** Dependency conflict

**Fix:**
```bash
# Clear cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Build
npm run build
```

---

## 🔧 Complete Build Process

### Step 1: Clean Everything
```bash
cd client
rm -rf node_modules dist package-lock.json
cd ..
```

### Step 2: Fresh Install
```bash
cd client
npm install
```

### Step 3: Build
```bash
npm run build
```

### Step 4: Verify
```bash
ls -la dist/
# Should show: index.html, assets/
```

### Step 5: Start Server
```bash
cd ..
node frontend-server.js
```

---

## 📋 Troubleshooting Checklist

- [ ] In client directory: `pwd` shows `.../client`
- [ ] Dependencies installed: `ls node_modules` shows files
- [ ] Build succeeded: `ls dist/` shows index.html
- [ ] Server running: `ps aux | grep frontend-server`
- [ ] Port available: `lsof -i :3000` shows nothing
- [ ] API URL correct: `cat .env` shows right URL
- [ ] No console errors: F12 in browser shows no red errors

---

## 🆘 If Still Not Working

### Get Full Error Message
```bash
# Run build with verbose output
cd client
npm run build 2>&1 | tee build.log

# Check the log file
cat build.log
```

### Check All Logs
```bash
# Frontend server logs
pm2 logs

# Nginx logs (if using)
tail -f /var/log/nginx/error.log

# System logs
dmesg | tail -20
```

### Test Each Component
```bash
# Test backend
curl http://localhost:8000/api/health

# Test frontend server
curl http://localhost:3000

# Test from browser
# Open: https://yourdomain.com
# Press F12 for console
# Check for errors
```

---

## 🎯 Quick Fix Commands

```bash
# Complete rebuild
cd client && rm -rf node_modules dist && npm install && npm run build && cd ..

# Start fresh
node frontend-server.js

# Check everything
bash diagnose.sh

# View all logs
pm2 logs
```

---

## ✅ Success Indicators

✅ `npm run build` completes without errors
✅ `client/dist/` folder exists with files
✅ `node frontend-server.js` starts without errors
✅ Browser shows login page at yourdomain.com
✅ No red errors in browser console (F12)
✅ API calls work

Your frontend should now work! 🎉

