# MWENDO MOJA - Hosting & Domain Setup Guide

## 📋 Overview
This guide covers hosting options, domain registration, SSL certificates, and deployment for your MWENDO MOJA Welfare Management System.

---

## 🌐 DOMAIN REGISTRATION

### Recommended Domain Registrars (Kenya-based)
1. **Safaricom Domains** - https://domains.safaricom.co.ke
   - Local support, KES pricing
   - Integration with Safaricom services

2. **Liquid Intelligent Technologies** - https://www.liquid.tech
   - Kenyan company, reliable
   - Good for .co.ke domains

3. **Afriregister** - https://www.afriregister.com
   - African registrar
   - Competitive pricing

4. **Namecheap** - https://www.namecheap.com
   - International, affordable
   - Good support

### Domain Options
- **mwendomoja.com** - Primary domain
- **mwendomoja.co.ke** - Kenya-specific
- **welfare.mwendomoja.com** - Subdomain for app

### Steps to Register
1. Check domain availability
2. Register for 1-3 years
3. Configure DNS records (we'll do this after choosing hosting)
4. Set up email forwarding

---

## 🏢 HOSTING OPTIONS

### Option 1: HEROKU (Easiest for Beginners)
**Cost:** $7-50/month
**Pros:** Easy deployment, automatic SSL, good for Node.js
**Cons:** Can be expensive at scale

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create mwendo-moja

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret_key
heroku config:set DATABASE_URL=your_db_url

# Deploy
git push heroku main
```

### Option 2: RAILWAY (Modern Alternative)
**Cost:** $5-50/month
**Pros:** Simple, good pricing, GitHub integration
**Cons:** Smaller community

1. Go to https://railway.app
2. Connect GitHub account
3. Select repository
4. Configure environment variables
5. Deploy automatically

### Option 3: RENDER
**Cost:** Free tier available, $7+/month paid
**Pros:** Free tier, easy deployment, good for small projects
**Cons:** Free tier has limitations

1. Visit https://render.com
2. Connect GitHub
3. Create new Web Service
4. Select repository
5. Configure build & start commands

### Option 4: DIGITAL OCEAN (Recommended for Production)
**Cost:** $5-40/month
**Pros:** Full control, good performance, affordable
**Cons:** Requires more setup

**Setup Steps:**
1. Create account at https://digitalocean.com
2. Create Droplet (Ubuntu 22.04, 2GB RAM minimum)
3. SSH into server
4. Install Node.js, PostgreSQL, Nginx
5. Clone repository
6. Configure environment variables
7. Use PM2 for process management
8. Set up Nginx as reverse proxy

### Option 5: AWS (Enterprise)
**Cost:** $10-100+/month
**Pros:** Scalable, reliable, many services
**Cons:** Complex setup, steeper learning curve

Services needed:
- EC2 (compute)
- RDS (database)
- S3 (file storage)
- CloudFront (CDN)

### Option 6: LINODE (Good Balance)
**Cost:** $5-40/month
**Pros:** Good performance, affordable, simple
**Cons:** Less automation than Heroku

---

## 🔒 SSL CERTIFICATES

### Free Option: Let's Encrypt
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

### Paid Options
- Comodo SSL: $50-200/year
- DigiCert: $100-300/year
- GlobalSign: $80-250/year

---

## 🔧 DNS CONFIGURATION

### Common DNS Records to Add
```
Type    Name              Value
A       @                 your_server_ip
A       www               your_server_ip
CNAME   api               your_server_ip
MX      @                 mail.yourdomain.com
TXT     @                 v=spf1 include:sendgrid.net ~all
```

---

## 📦 DEPLOYMENT CHECKLIST

- [ ] Domain registered
- [ ] Hosting provider selected
- [ ] Database configured
- [ ] Environment variables set
- [ ] SSL certificate installed
- [ ] DNS records configured
- [ ] Email service configured (SendGrid)
- [ ] SMS service configured (Twilio)
- [ ] M-Pesa integration tested
- [ ] Backups configured
- [ ] Monitoring set up
- [ ] CDN configured (optional)

---

## 🚀 RECOMMENDED SETUP FOR KENYA

**Best Option: Digital Ocean + Namecheap**

1. **Domain:** mwendomoja.co.ke (Namecheap)
2. **Hosting:** Digital Ocean Droplet ($5/month)
3. **Database:** Digital Ocean Managed PostgreSQL ($15/month)
4. **Email:** SendGrid (free tier available)
5. **SMS:** Twilio (pay-as-you-go)
6. **SSL:** Let's Encrypt (free)

**Total Cost:** ~$20-30/month

---

## 📞 NEXT STEPS

1. Choose hosting provider
2. Register domain
3. Configure DNS
4. Deploy application
5. Set up monitoring
6. Configure backups

Need help with any specific step?

