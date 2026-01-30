# 🚀 SIMPLE FRESH START - FINAL APPROACH

The issue: LiteSpeed doesn't use .htaccess files. We need to serve everything directly from Node.js.

## Solution: Move dist folder inside src and restart

Run these commands in **cPanel Terminal**:

```bash
cd ~/public_html

# Move the frontend build into the src directory where Node.js expects it
mv client/dist src/public

# Verify it's there
ls -la src/public/

# Kill any running Node processes
pkill -f "node src/server.js"
sleep 1

# Start the server fresh
cd ~/public_html
nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &
sleep 3

# Test it
curl http://localhost:8000/api/health
```

Then visit: **https://mwendomojawelfare.co.ke**

The Node.js server will now serve the frontend directly!

