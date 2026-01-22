# Truehost Frontend Setup - Complete Guide

## 🔴 Problem: Frontend Not Working

The frontend needs to be **built** before it can be served. Here's how to fix it:

---

## ✅ Step 1: SSH into Your Truehost Server

```bash
ssh username@your_domain.com
# or
ssh username@your_server_ip
```

---

## ✅ Step 2: Navigate to Project Directory

```bash
cd /path/to/mwendo-moja-welfare
# Usually something like:
# cd ~/public_html/mwendo-moja-welfare
# or
# cd /home/username/mwendo-moja-welfare
```

---

## ✅ Step 3: Build the Frontend

The frontend is a React app that needs to be built before serving:

```bash
# Navigate to client directory
cd client

# Install dependencies (if not done)
npm install

# Build for production
npm run build

# This creates a 'dist' folder with optimized files
```

**Expected Output:**
```
✓ 1234 modules transformed
dist/index.html                    0.50 kB
dist/assets/index-abc123.js        150.00 kB
dist/assets/index-def456.css       25.00 kB
```

---

## ✅ Step 4: Verify Build Succeeded

```bash
# Check if dist folder exists
ls -la dist/

# You should see:
# index.html
# assets/ (folder with JS and CSS files)
```

---

## ✅ Step 5: Start Frontend Server

Go back to project root:

```bash
cd ..

# Start frontend server
node frontend-server.js
```

**Expected Output:**
```
✓ Frontend server running on http://localhost:3000
✓ Backend API running on http://localhost:8000/api
✓ React app built and ready
```

---

## ✅ Step 6: Configure Nginx (Recommended)

Create/edit Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/mwendo-moja
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:8000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/mwendo-moja /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## ✅ Step 7: Use PM2 for Process Management

Install PM2 globally:

```bash
npm install -g pm2
```

Create PM2 ecosystem file:

```bash
nano ecosystem.config.js
```

Add this:

```javascript
module.exports = {
  apps: [
    {
      name: 'mwendo-backend',
      script: 'src/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 8000
      }
    },
    {
      name: 'mwendo-frontend',
      script: 'frontend-server.js',
      env: {
        NODE_ENV: 'production',
        FRONTEND_PORT: 3000
      }
    }
  ]
};
```

Start both servers:

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## ✅ Step 8: Update Environment Variables

Create/update `.env` file:

```bash
nano .env
```

Add:

```env
NODE_ENV=production
PORT=8000
FRONTEND_PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mwendo_moja
DB_USER=mwendo_user
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
CLIENT_URL=https://yourdomain.com
```

---

## ✅ Step 9: Update Frontend API URL

Create `.env` in client directory:

```bash
cd client
nano .env
```

Add:

```env
VITE_API_URL=https://yourdomain.com/api
```

**Rebuild frontend:**

```bash
npm run build
```

---

## ✅ Step 10: Verify Everything

### Check if servers are running:
```bash
pm2 list
```

### Test frontend:
```bash
curl http://localhost:3000
```

### Test backend:
```bash
curl http://localhost:8000/api/health
```

### Test from browser:
```
https://yourdomain.com
```

---

## 🆘 Troubleshooting

### Frontend shows blank page
- Check browser console for errors (F12)
- Verify `npm run build` completed successfully
- Check if `client/dist` folder exists
- Verify `VITE_API_URL` is correct

### "Cannot GET /"
- Frontend server not running
- Check: `pm2 list`
- Restart: `pm2 restart mwendo-frontend`

### API calls failing
- Check backend is running: `pm2 list`
- Verify `VITE_API_URL` in client/.env
- Check Nginx configuration
- Test: `curl http://localhost:8000/api/health`

### Port already in use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

---

## 📋 Complete Setup Checklist

- [ ] SSH into Truehost server
- [ ] Navigate to project directory
- [ ] Run `cd client && npm install`
- [ ] Run `npm run build`
- [ ] Verify `dist` folder created
- [ ] Update client/.env with API URL
- [ ] Go back to root: `cd ..`
- [ ] Install PM2: `npm install -g pm2`
- [ ] Create ecosystem.config.js
- [ ] Run `pm2 start ecosystem.config.js`
- [ ] Configure Nginx
- [ ] Test frontend in browser
- [ ] Test API calls
- [ ] Enable PM2 startup

---

## 🚀 Quick Commands Summary

```bash
# Build frontend
cd client && npm install && npm run build && cd ..

# Start with PM2
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# View logs
pm2 logs

# Restart servers
pm2 restart all

# Stop servers
pm2 stop all
```

---

## ✅ Success Indicators

✅ Frontend loads at yourdomain.com
✅ Login page displays
✅ Can login with credentials
✅ Dashboard loads
✅ API calls work
✅ No console errors
✅ HTTPS working (if configured)

Your frontend should now be working! 🎉

