# Frontend Deployment Steps - STEP BY STEP

## Current Status
- ✅ Backend API routes are configured and working
- ✅ Admin user created (gregorykundu@gmail.com / kundu@mwendo2024)
- ✅ Frontend built locally with Contributions page redesign
- ⏳ Frontend files need to be deployed to live server

## STEP-BY-STEP DEPLOYMENT VIA CPANEL TERMINAL

### STEP 1: Delete Old Assets on Live Server

In your cPanel Terminal, run:

```bash
cd ~/public_html
rm -f client/dist/assets/*.js client/dist/assets/*.css
ls -la client/dist/assets/
```

This should show an empty assets folder.

### STEP 2: Copy CSS File

The CSS file is small (29 KB, 1 line). Run this command in cPanel Terminal:

```bash
cat > client/dist/assets/index-CSS_SCnn.css << 'CSSEOF'
[PASTE CSS CONTENT HERE]
CSSEOF
```

### STEP 3: Copy JavaScript File

The JS file is large (660 KB). We'll split it into chunks.

### STEP 4: Copy index.html

```bash
cat > client/dist/index.html << 'HTMLEOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>client</title>
    <script type="module" crossorigin src="/assets/index-BH51ZomM.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-CSS_SCnn.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
HTMLEOF
```

### STEP 5: Verify Files

```bash
ls -lh client/dist/
ls -lh client/dist/assets/
```

### STEP 6: Restart Backend

```bash
pkill -f "node src/server.js"
sleep 2
cd ~/public_html && nohup node src/server.js > /tmp/backend.log 2>&1 &
sleep 2
curl http://localhost:8000/api/health
```

## After Deployment

1. Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
2. Open in Incognito/Private mode
3. Navigate to https://mwendomojawelfare.co.ke
4. Login with: gregorykundu@gmail.com / kundu@mwendo2024
5. Go to Contributions page
6. Verify the page displays correctly

