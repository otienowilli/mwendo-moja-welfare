# 🚀 FINAL FRESH START - COMPLETE SOLUTION

The problem: LiteSpeed is serving directory listing instead of proxying to Node.js.

## Solution: Let Node.js serve everything directly on port 8000

Run these commands in **cPanel Terminal** one by one:

### Step 1: Kill any running processes
```bash
pkill -f "node src/server.js"
sleep 1
```

### Step 2: Remove .htaccess (it doesn't work with LiteSpeed)
```bash
rm -f ~/public_html/.htaccess
```

### Step 3: Verify the structure
```bash
cd ~/public_html
ls -la client/dist/
```

You should see: `index.html`, `vite.svg`, `assets/`

### Step 4: Start Node.js server
```bash
cd ~/public_html
nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &
sleep 3
curl http://localhost:8000/api/health
```

Should return: `{"status":"Server is running"}`

### Step 5: Contact TrueHost Support

Tell them:
```
I have a Node.js application running on port 8000.
I need to access it via https://mwendomojawelfare.co.ke (port 443)

Can you configure LiteSpeed to reverse proxy port 443 to localhost:8000?
Or can you help me run Node.js on port 80/443 directly?
```

### Step 6: Temporary workaround - Access via port 8000

Until TrueHost configures the proxy, you can access the app at:
```
http://mwendomojawelfare.co.ke:8000
```

Login with:
- Username: williamodwori
- Password: Admin@2024Mwendo

