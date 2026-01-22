# HTTPS Quick Start Guide

## 🚀 5-Minute Setup

### Step 1: Development (No Setup Needed)
```bash
# Just run normally - uses HTTP
npm start
node frontend-server.js

# Access at:
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

### Step 2: Production Setup

#### Get SSL Certificate
```bash
# Install Certbot
apt install -y certbot

# Get free certificate from Let's Encrypt
certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Certificates saved to:
# /etc/letsencrypt/live/yourdomain.com/fullchain.pem
# /etc/letsencrypt/live/yourdomain.com/privkey.pem
```

#### Update .env
```env
NODE_ENV=production
PORT=5000
FRONTEND_PORT=3000
SSL_CERT_PATH=/etc/letsencrypt/live/yourdomain.com/fullchain.pem
SSL_KEY_PATH=/etc/letsencrypt/live/yourdomain.com/privkey.pem
CLIENT_URL=https://yourdomain.com
```

#### Start Servers
```bash
# Backend
NODE_ENV=production npm start

# Frontend (in another terminal)
NODE_ENV=production node frontend-server.js

# Access at:
# Frontend: https://yourdomain.com
# Backend: https://yourdomain.com/api
```

---

## 🔧 Common Commands

### Test HTTPS Connection
```bash
# Test backend
curl -k https://localhost:5000/api/health

# Test frontend
curl -k https://localhost:3000
```

### Check Certificate
```bash
# View certificate info
certbot certificates

# Check expiration
openssl x509 -in /etc/letsencrypt/live/yourdomain.com/fullchain.pem -noout -dates
```

### Renew Certificate
```bash
# Manual renewal
certbot renew

# Auto-renewal (runs daily)
systemctl enable certbot.timer
```

### View Logs
```bash
# Backend logs
pm2 logs mwendo-moja

# Nginx logs
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

---

## 📋 Environment Variables

```env
# Required for Production
NODE_ENV=production
SSL_CERT_PATH=/path/to/fullchain.pem
SSL_KEY_PATH=/path/to/privkey.pem

# Optional
PORT=5000
FRONTEND_PORT=3000
CLIENT_URL=https://yourdomain.com
```

---

## ✅ Verification

### Development
```bash
# Should show HTTP
npm start
# Output: Server running on port 5000 (Development - HTTP)
```

### Production
```bash
# Should show HTTPS
NODE_ENV=production npm start
# Output: 🔒 HTTPS Server running on port 5000 (Production)
```

---

## 🔒 Security Checklist

- [ ] SSL certificates obtained
- [ ] .env configured with certificate paths
- [ ] NODE_ENV set to production
- [ ] Firewall allows port 443
- [ ] Nginx configured (if using)
- [ ] Auto-renewal enabled
- [ ] Certificate expiration monitored
- [ ] HTTPS working in browser

---

## 🆘 Troubleshooting

### "SSL certificates not found"
- Check certificate paths in .env
- Verify files exist: `ls -la /etc/letsencrypt/live/yourdomain.com/`
- Server will use HTTP as fallback

### "Connection refused"
- Check firewall: `ufw allow 443/tcp`
- Verify server is running: `pm2 list`
- Check logs: `pm2 logs mwendo-moja`

### "Certificate expired"
- Renew: `certbot renew`
- Restart server: `pm2 restart mwendo-moja`

### "Mixed content error"
- Ensure all API calls use HTTPS
- Update CLIENT_URL in .env
- Clear browser cache

---

## 📊 What Changed

### Backend (src/server.js)
- ✅ Added HTTPS support
- ✅ Automatic certificate loading
- ✅ Fallback to HTTP
- ✅ No breaking changes

### Frontend (frontend-server.js)
- ✅ Added HTTPS support
- ✅ Automatic certificate loading
- ✅ Fallback to HTTP
- ✅ No breaking changes

---

## 🎯 Next Steps

1. ✅ Read this guide
2. ✅ Get SSL certificate
3. ✅ Update .env
4. ✅ Test HTTPS
5. ✅ Deploy to production
6. ✅ Enable auto-renewal
7. ✅ Monitor certificate

---

## 💡 Key Points

✅ **Backward Compatible**
- Existing code works unchanged
- HTTP still works in development

✅ **Production Ready**
- HTTPS enabled by default
- Automatic certificate loading
- Graceful error handling

✅ **Easy to Deploy**
- Simple environment variables
- Works with Let's Encrypt
- Nginx-ready

✅ **Secure**
- Industry-standard SSL/TLS
- Encrypted communication
- Best practices

---

## 📞 Need Help?

- **Full Guide:** HTTPS_CONFIGURATION.md
- **Implementation Details:** HTTPS_IMPLEMENTATION_SUMMARY.md
- **Hosting Guide:** HOSTING_DEPLOYMENT_COMPLETE.md

Your system is now HTTPS-ready! 🔒

