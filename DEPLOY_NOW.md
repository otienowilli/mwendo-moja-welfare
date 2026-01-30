# 🚀 DEPLOY NOW - QUICK ACTION GUIDE

## ⚡ 3 STEPS TO COMPLETE DEPLOYMENT

### STEP 1: Upload .htaccess (5 min)
1. Open cPanel File Manager
2. Go to `public_html`
3. Upload `.htaccess` file from your local machine
4. This enables API proxy

### STEP 2: Start Backend Server (2 min)
Open cPanel Terminal and run:
```bash
cd ~/public_html
nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &
```

Verify:
```bash
curl http://localhost:8000/api/health
```

### STEP 3: Login & Test (1 min)
Visit: https://mwendomojawelfare.co.ke

Login:
- Email: williamodwori2021@gmail.com
- Password: Admin@2024Mwendo

---

## ✅ DEPLOYMENT COMPLETE!

Your system is now LIVE and ready to use! 🎉

### Admin Access
- **Username:** williamodwori
- **Email:** williamodwori2021@gmail.com
- **Password:** Admin@2024Mwendo
- **Role:** Admin

### Features Available
- Member Management
- Contributions Tracking
- Loan Management
- Welfare Module
- Reports & Analytics
- User Management
- Password Reset

---

## 🆘 TROUBLESHOOTING

**Backend not starting?**
```bash
tail -50 /tmp/mwendo-backend.log
```

**Login not working?**
- Check .htaccess is uploaded
- Verify backend is running
- Check browser console (F12)

**Database issues?**
```bash
sqlite3 ~/public_html/mwendo_moja.db
SELECT * FROM users;
.exit
```

