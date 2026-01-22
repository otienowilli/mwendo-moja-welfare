# Hosting & Domain - Quick Start Checklist

## 🎯 Your Action Plan

### Phase 1: Planning (Today)
- [ ] Read HOSTING_COMPARISON.md
- [ ] Decide on hosting provider
- [ ] Decide on domain name
- [ ] Estimate budget

### Phase 2: Domain Registration (Day 1)
- [ ] Register domain at Namecheap or Safaricom
- [ ] Note domain registrar login
- [ ] Verify domain ownership email
- [ ] Get domain nameservers

### Phase 3: Hosting Setup (Day 1-2)
- [ ] Create hosting account (Digital Ocean recommended)
- [ ] Create server/droplet
- [ ] Get server IP address
- [ ] SSH into server
- [ ] Run initial setup commands

### Phase 4: Application Deployment (Day 2-3)
- [ ] Clone repository
- [ ] Install dependencies
- [ ] Configure environment variables
- [ ] Setup database
- [ ] Build frontend
- [ ] Start application with PM2

### Phase 5: Domain Configuration (Day 3)
- [ ] Update DNS A records
- [ ] Point domain to server IP
- [ ] Wait for DNS propagation (24-48 hours)
- [ ] Verify domain resolves

### Phase 6: SSL & Security (Day 4)
- [ ] Install Let's Encrypt certificate
- [ ] Configure Nginx with SSL
- [ ] Test HTTPS connection
- [ ] Setup firewall rules

### Phase 7: Go Live (Day 5)
- [ ] Test all features
- [ ] Configure monitoring
- [ ] Setup backups
- [ ] Monitor logs
- [ ] Announce to users

---

## 📊 Recommended Setup

```
┌─────────────────────────────────────┐
│   Domain: mwendomoja.co.ke          │
│   Registrar: Namecheap              │
│   Cost: $15-25/year                 │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Hosting: Digital Ocean            │
│   Droplet: Ubuntu 22.04, 1GB RAM    │
│   Region: Frankfurt                 │
│   Cost: $5/month                    │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Database: PostgreSQL (local)      │
│   Process Manager: PM2              │
│   Web Server: Nginx                 │
│   SSL: Let's Encrypt (free)         │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Total Monthly Cost: $5-20         │
│   Total Annual Cost: $60-240        │
└─────────────────────────────────────┘
```

---

## 💰 Cost Breakdown

| Item | Cost | Frequency |
|------|------|-----------|
| Domain (.co.ke) | $20 | Annual |
| Hosting (Digital Ocean) | $5 | Monthly |
| Database (included) | $0 | - |
| SSL Certificate | $0 | - |
| Email (SendGrid) | $0-20 | Monthly |
| SMS (Twilio) | Pay-as-you-go | - |
| **Total** | **$25-45/month** | - |

---

## 🚀 Quick Commands Reference

### Digital Ocean Setup
```bash
# SSH into server
ssh root@your_ip

# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Install Nginx
apt install -y nginx

# Install PM2
npm install -g pm2
```

### Application Deployment
```bash
# Clone repo
git clone https://github.com/otienowilli/mwendo-moja-welfare.git
cd mwendo-moja-welfare

# Install dependencies
npm install && cd client && npm install && cd ..

# Build frontend
cd client && npm run build && cd ..

# Create .env file
nano .env

# Start application
pm2 start src/server.js --name "mwendo-moja"
pm2 save
```

### SSL Setup
```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get certificate
certbot certonly --nginx -d yourdomain.com

# Auto-renewal
systemctl enable certbot.timer
```

---

## 📞 Support Resources

### Documentation Files Created
1. **HOSTING_AND_DOMAIN_GUIDE.md** - Overview of all options
2. **HOSTING_COMPARISON.md** - Detailed comparison
3. **DIGITALOCEAN_DEPLOYMENT.md** - Step-by-step Digital Ocean guide
4. **DOMAIN_SETUP_GUIDE.md** - Domain registration & DNS setup
5. **HOSTING_QUICKSTART.md** - This file

### External Resources
- Digital Ocean Docs: https://docs.digitalocean.com
- Let's Encrypt: https://letsencrypt.org
- Namecheap Support: https://www.namecheap.com/support
- Nginx Docs: https://nginx.org/en/docs

---

## ❓ FAQ

**Q: Which hosting should I choose?**
A: Digital Ocean for production, Railway/Render for testing

**Q: How long does DNS propagation take?**
A: Usually 24-48 hours, sometimes instant

**Q: Can I change hosting later?**
A: Yes, just update DNS records

**Q: Is SSL certificate really free?**
A: Yes, Let's Encrypt is free and automatic

**Q: What if I need more resources?**
A: Digital Ocean allows easy scaling (upgrade droplet)

---

## 🎓 Learning Path

1. Read HOSTING_COMPARISON.md (15 min)
2. Read DIGITALOCEAN_DEPLOYMENT.md (20 min)
3. Read DOMAIN_SETUP_GUIDE.md (15 min)
4. Follow step-by-step deployment (2-3 hours)
5. Test and monitor (ongoing)

---

## ✅ Success Criteria

- [ ] Domain registered and resolving
- [ ] Application accessible via domain
- [ ] HTTPS working (green lock)
- [ ] Database connected
- [ ] All features working
- [ ] Monitoring configured
- [ ] Backups enabled

---

## 🎉 You're Ready!

You now have all the information needed to:
1. Register a domain
2. Choose hosting
3. Deploy your application
4. Go live with MWENDO MOJA

**Next Step:** Choose your hosting provider and start with Phase 1!

Questions? Check the detailed guides above.

