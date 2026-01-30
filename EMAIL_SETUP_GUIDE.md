# 📧 EMAIL SETUP GUIDE - Password Reset & Notifications

## ⚠️ CURRENT STATUS

**Password Reset:** ✅ Link generation working
**Email Sending:** ❌ NOT ENABLED (EMAIL_ENABLED=false)

---

## 🔧 SOLUTION: Enable Email Sending

### Option 1: Use Gmail SMTP (Recommended for Testing)

**Step 1: Create Gmail App Password**

1. Go to: https://myaccount.google.com/security
2. Enable 2-Factor Authentication (if not already enabled)
3. Go to: https://myaccount.google.com/apppasswords
4. Select "Mail" and "Windows Computer"
5. Copy the 16-character password

**Step 2: Update .env on TrueHost**

Run in **cPanel Terminal:**

```bash
cat > ~/public_html/.env << 'EOF'
PORT=8000
NODE_ENV=production
USE_SQLITE=true
DB_PATH=./mwendo_moja.db
JWT_SECRET=mwendo_moja_secret_key_development_only
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000,https://mwendomojawelfare.co.ke

# Email Configuration - Gmail SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_16_char_app_password
EMAIL_ENABLED=true

# SendGrid (Optional - leave as is if using Gmail)
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=noreply@mwendomoja.com
EOF
```

**Step 3: Restart Backend**

```bash
pkill -f "node src/server.js"
sleep 2
cd ~/public_html && nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &
sleep 3
curl http://localhost:8000/api/health
```

---

### Option 2: Use SendGrid (Production Recommended)

**Step 1: Create SendGrid Account**

1. Go to: https://sendgrid.com
2. Sign up for free account
3. Create API key
4. Verify sender email

**Step 2: Update .env**

```bash
cat > ~/public_html/.env << 'EOF'
PORT=8000
NODE_ENV=production
USE_SQLITE=true
DB_PATH=./mwendo_moja.db
JWT_SECRET=mwendo_moja_secret_key_development_only
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000,https://mwendomojawelfare.co.ke

# SendGrid Configuration
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@mwendomoja.com
EMAIL_ENABLED=true
EOF
```

**Step 3: Restart Backend**

```bash
pkill -f "node src/server.js"
sleep 2
cd ~/public_html && nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &
```

---

## ✅ TEST EMAIL SENDING

**Test Password Reset:**

1. Go to: `http://mwendomojawelfare.co.ke:8000`
2. Click "Forgot Password"
3. Enter: `williamodwori2021@gmail.com`
4. Check your email inbox (or spam folder)

**Check Backend Logs:**

```bash
tail -50 /tmp/mwendo-backend.log | grep -i email
```

---

## 🐛 TROUBLESHOOTING

**Email not sending?**

1. Check if EMAIL_ENABLED=true in .env
2. Check if SMTP credentials are correct
3. View logs: `tail -50 /tmp/mwendo-backend.log`
4. Check spam folder

**Gmail says "Less secure app access"?**

- Use App Password instead (see Option 1, Step 1)

**SendGrid not working?**

- Verify API key is correct
- Verify sender email is verified in SendGrid
- Check SendGrid dashboard for errors

---

## 📝 WHAT WAS FIXED

✅ Added passwordReset email template
✅ Updated forgotPassword to send emails
✅ Added email service integration
✅ Created this setup guide

**Next:** Configure email credentials and restart backend!

