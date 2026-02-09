1# 🚀 START THE BACKEND SERVER

## ⚠️ Problem
The frontend is working, but the backend API server is NOT running!

That's why you're getting the JSON error.

---

## ✅ Solution: Start Backend via cPanel Terminal

### Step 1: Open cPanel Terminal

1. Go to cPanel: `https://mwendomojawelfare.co.ke:2083`
2. Login with: `Williamsotie` / `0nXk5{H{$TC`
3. Click **Terminal** (or **SSH Terminal**)
4. You should see a command prompt

---

### Step 2: Install Dependencies

Copy and paste this command:

```bash
cd ~/public_html && npm install --production
```

Wait for it to complete (5-10 minutes)

---

### Step 3: Install PM2

Copy and paste:

```bash
npm install -g pm2
```

---

### Step 4: Start Backend Server

Copy and paste:

```bash
pm2 start src/server.js --name "mwendo-backend"
```

---

### Step 5: Save PM2 Configuration

Copy and paste:

```bash
pm2 save
pm2 startup
```

---

### Step 6: Verify Backend is Running

Copy and paste:

```bash
pm2 list
```

You should see:
```
mwendo-backend    online
```

---

### Step 7: Check Backend Health

Visit: `https://mwendomojawelfare.co.ke/api/health`

You should see:
```json
{"status":"Server is running"}
```

---

### Step 8: Test Login Again

1. Go to: `https://mwendomojawelfare.co.ke`
2. Login with:
   - Username: `williamodwori`
   - Password: `Admin@2024Mwendo`
3. You should see the DASHBOARD!

---

## 🆘 If Something Goes Wrong

Check logs:
```bash
pm2 logs mwendo-backend
```

Restart:
```bash
pm2 restart mwendo-backend
```

---

## ✨ Once Backend is Running

Your system will be FULLY LIVE! 🎉

