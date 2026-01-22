# HTTPS Configuration Guide

## Overview

The MWENDO MOJA system now supports HTTPS for secure communication. Both the frontend and backend servers can run with SSL/TLS certificates.

## How It Works

### Development Mode (HTTP)
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`
- No SSL certificates needed
- Set `NODE_ENV=development`

### Production Mode (HTTPS)
- Frontend: `https://yourdomain.com`
- Backend: `https://yourdomain.com/api`
- Requires SSL certificates
- Set `NODE_ENV=production`

---

## Environment Variables

Add these to your `.env` file:

```env
# Server Configuration
NODE_ENV=production
PORT=5000
FRONTEND_PORT=3000

# SSL Certificate Paths (for production)
SSL_CERT_PATH=/etc/letsencrypt/live/yourdomain.com/fullchain.pem
SSL_KEY_PATH=/etc/letsencrypt/live/yourdomain.com/privkey.pem

# Frontend Configuration
CLIENT_URL=https://yourdomain.com
```

---

## Setup Instructions

### Step 1: Get SSL Certificates

#### Option A: Let's Encrypt (Recommended - Free)

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get certificate
certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Certificates will be at:
# /etc/letsencrypt/live/yourdomain.com/fullchain.pem
# /etc/letsencrypt/live/yourdomain.com/privkey.pem
```

#### Option B: Self-Signed Certificate (Testing Only)

```bash
# Generate self-signed certificate
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Use in .env:
SSL_CERT_PATH=/path/to/cert.pem
SSL_KEY_PATH=/path/to/key.pem
```

### Step 2: Update Environment Variables

```bash
# Edit .env file
nano .env

# Add:
NODE_ENV=production
SSL_CERT_PATH=/etc/letsencrypt/live/yourdomain.com/fullchain.pem
SSL_KEY_PATH=/etc/letsencrypt/live/yourdomain.com/privkey.pem
CLIENT_URL=https://yourdomain.com
```

### Step 3: Start Servers

```bash
# Backend
NODE_ENV=production npm start

# Frontend (in another terminal)
NODE_ENV=production node frontend-server.js
```

### Step 4: Verify HTTPS

```bash
# Test backend
curl -k https://localhost:5000/api/health

# Test frontend
curl -k https://localhost:3000
```

---

## Nginx Configuration (Recommended)

For production, use Nginx as a reverse proxy:

```nginx
# /etc/nginx/sites-available/mwendo-moja

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Certificates
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

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
        proxy_pass http://localhost:5000/api/;
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
ln -s /etc/nginx/sites-available/mwendo-moja /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

---

## Auto-Renewal (Let's Encrypt)

```bash
# Enable automatic renewal
systemctl enable certbot.timer

# Test renewal
certbot renew --dry-run

# Manual renewal
certbot renew
```

---

## Troubleshooting

### SSL Certificate Not Found
- Check certificate paths in `.env`
- Verify files exist: `ls -la /etc/letsencrypt/live/yourdomain.com/`
- Server will fall back to HTTP with warning

### HTTPS Connection Refused
- Check firewall: `ufw allow 443/tcp`
- Verify Nginx is running: `systemctl status nginx`
- Check logs: `tail -f /var/log/nginx/error.log`

### Certificate Expired
- Renew: `certbot renew`
- Check expiration: `certbot certificates`

### Mixed Content Error
- Ensure all API calls use HTTPS
- Update `CLIENT_URL` in `.env`
- Check frontend API configuration

---

## Security Best Practices

1. ✅ Always use HTTPS in production
2. ✅ Use Let's Encrypt (free, automatic renewal)
3. ✅ Enable HSTS header
4. ✅ Use strong SSL ciphers
5. ✅ Keep certificates updated
6. ✅ Monitor certificate expiration
7. ✅ Use Nginx as reverse proxy
8. ✅ Enable firewall rules

---

## Testing HTTPS Locally

For development with HTTPS:

```bash
# Generate self-signed certificate
openssl req -x509 -newkey rsa:2048 -keyout localhost-key.pem -out localhost-cert.pem -days 365 -nodes

# Update .env
SSL_CERT_PATH=./localhost-cert.pem
SSL_KEY_PATH=./localhost-key.pem
NODE_ENV=production

# Start servers
npm start
```

Browser will show security warning (expected for self-signed cert).

---

## Summary

✅ Backend supports HTTPS
✅ Frontend supports HTTPS
✅ Automatic fallback to HTTP if certificates missing
✅ Environment-based configuration
✅ Production-ready setup
✅ Let's Encrypt integration ready

Your system is now HTTPS-ready for production deployment!

