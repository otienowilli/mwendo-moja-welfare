# 📦 UPLOAD DATABASE TO TRUEHOST

The database file contains all your data (members, contributions, loans, etc.) and the admin user.

## Step 1: Upload Database File

1. Go to **cPanel File Manager**: https://mwendomojawelfare.co.ke:2083
2. Navigate to `public_html`
3. Upload this file from your local machine:
   - `/Users/blessedwilliams/MWENDO MOJA WELFARE/mwendo_moja.db`

## Step 2: Verify Upload

In **cPanel Terminal**, run:

```bash
ls -lh ~/public_html/mwendo_moja.db
```

Should show: `-rw-r--r-- 1 gmooutas gmooutas 136K ... mwendo_moja.db`

## Step 3: Restart Backend Server

```bash
pkill -f "node src/server.js"
sleep 2
cd ~/public_html
nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &
sleep 3
curl http://localhost:8000/api/health
```

## Step 4: Test Login

Visit: **http://mwendomojawelfare.co.ke:8000**

Login with:
- Username: williamodwori
- Password: Admin@2024Mwendo

You should now see the dashboard with data! 🎉

