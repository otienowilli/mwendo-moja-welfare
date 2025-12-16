# MWENDO MOJA Welfare Management System - DEPLOYMENT GUIDE

**Status:** Production Ready ✅
**Date:** December 16, 2024

---

## 🚀 QUICK START DEPLOYMENT

### Prerequisites
- Node.js 16+ installed
- PostgreSQL 12+ installed
- Git installed
- GitHub account with repository access
- Twilio account (for SMS)
- Safaricom M-Pesa account (for payments)
- SendGrid account (for emails)

### Environment Setup

1. **Clone Repository**
```bash
git clone https://github.com/Otiwilli/mwendo-moja-welfare.git
cd "MWENDO MOJA WELFARE"
```

2. **Install Dependencies**
```bash
npm install
cd client && npm install && cd ..
```

3. **Create .env File**
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mwendo_moja
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=24h

# Twilio SMS
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
SMS_ENABLED=true

# M-Pesa
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_BUSINESS_SHORT_CODE=174379
MPESA_PASSKEY=your_passkey
MPESA_ENABLED=true

# SendGrid Email
SENDGRID_API_KEY=your_api_key
SENDGRID_FROM_EMAIL=noreply@mwendomoja.com
EMAIL_ENABLED=true

# Application
NODE_ENV=production
PORT=5000
CLIENT_URL=http://localhost:3000
```

4. **Setup Database**
```bash
# Create database
createdb mwendo_moja

# Run migrations (if available)
npm run migrate
```

5. **Start Application**
```bash
# Development
npm run dev

# Production with PM2
npm install -g pm2
pm2 start src/server.js --name "mwendo-moja"
pm2 save
pm2 startup
```

---

## 🐳 DOCKER DEPLOYMENT

### Build Docker Image
```bash
docker build -t mwendo-moja:latest .
```

### Run Docker Container
```bash
docker run -d \
  --name mwendo-moja \
  -p 5000:5000 \
  -e DB_HOST=postgres \
  -e DB_NAME=mwendo_moja \
  -e JWT_SECRET=your_secret \
  mwendo-moja:latest
```

### Docker Compose
```bash
docker-compose up -d
```

---

## 🔒 SECURITY CHECKLIST

- ✅ Change default passwords
- ✅ Enable HTTPS/SSL
- ✅ Configure firewall rules
- ✅ Setup rate limiting
- ✅ Enable CORS properly
- ✅ Validate all inputs
- ✅ Use environment variables
- ✅ Enable audit logging
- ✅ Setup backup system
- ✅ Monitor system health

---

## 📊 MONITORING & MAINTENANCE

### Health Check
```bash
curl http://localhost:5000/api/health
```

### View Logs
```bash
pm2 logs mwendo-moja
```

### System Status
```bash
pm2 status
```

### Create Backup
```bash
curl -X POST http://localhost:5000/api/admin/backup \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🔄 CONTINUOUS DEPLOYMENT

### GitHub Actions Setup
1. Create `.github/workflows/deploy.yml`
2. Configure deployment triggers
3. Setup production environment
4. Enable auto-deployment

### Rollback Procedure
```bash
git revert <commit-hash>
git push origin main
pm2 restart mwendo-moja
```

---

## 📈 PERFORMANCE OPTIMIZATION

### Database Optimization
- Create indexes on frequently queried columns
- Optimize queries
- Enable connection pooling
- Regular maintenance

### Application Optimization
- Enable caching
- Compress responses
- Minimize bundle size
- Optimize images

### Server Optimization
- Configure Nginx
- Enable gzip compression
- Setup CDN
- Monitor resources

---

## 🆘 TROUBLESHOOTING

### Port Already in Use
```bash
lsof -i :5000
kill -9 <PID>
```

### Database Connection Error
```bash
# Check PostgreSQL status
psql -U postgres -d mwendo_moja

# Verify credentials in .env
```

### PM2 Issues
```bash
pm2 kill
pm2 start src/server.js --name "mwendo-moja"
```

---

## 📞 SUPPORT

For issues or questions:
1. Check documentation files
2. Review error logs
3. Check GitHub issues
4. Contact development team

---

**Deployment Status:** READY ✅
**Production Ready:** YES
**Next Step:** Deploy to production server

