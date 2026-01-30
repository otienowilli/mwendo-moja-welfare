# M-Pesa Payment Collection - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Configure M-Pesa (2 minutes)

Edit `.env` file and add:
```env
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_BUSINESS_SHORT_CODE=174379
MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_URL=https://mwendomojawelfare.co.ke/api/mpesa-payments/callback
MPESA_ENVIRONMENT=sandbox
```

Get credentials from: https://developer.safaricom.co.ke

### Step 2: Restart Backend (1 minute)

```bash
# SSH to TrueHost
ssh user@mwendomojawelfare.co.ke

# Kill old process
pkill -f "node src/server.js"

# Start new process
cd ~/public_html
nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &
```

### Step 3: Build Frontend (1 minute)

```bash
cd client
npm run build
```

### Step 4: Test the Feature (1 minute)

1. Log in as admin
2. Go to **Admin → Payment Campaigns**
3. Create a campaign
4. Send prompts
5. Log in as member
6. Go to **M-Pesa Payments**
7. Confirm payment

## 📋 Admin Workflow

```
1. Create Campaign
   ↓
2. Send Prompts to Members
   ↓
3. Members Receive STK Push
   ↓
4. Members Confirm Payment
   ↓
5. View Results & Collected Amount
```

## 👤 Member Workflow

```
1. Receive M-Pesa STK Push
   ↓
2. Enter M-Pesa PIN
   ↓
3. Go to M-Pesa Payments
   ↓
4. Confirm Payment
   ↓
5. Payment Recorded as Contribution
```

## 🔧 Configuration Options

| Variable | Description | Example |
|----------|-------------|---------|
| MPESA_CONSUMER_KEY | Daraja API key | abc123... |
| MPESA_CONSUMER_SECRET | Daraja API secret | xyz789... |
| MPESA_BUSINESS_SHORT_CODE | Business code | 174379 |
| MPESA_PASSKEY | M-Pesa passkey | bfb279f9... |
| MPESA_CALLBACK_URL | Callback endpoint | https://domain.com/api/mpesa-payments/callback |
| MPESA_ENVIRONMENT | sandbox or production | sandbox |

## 📱 Test Phone Numbers (Sandbox)

- 254708374149
- 254701234567
- 254712345678

## 💡 Tips

1. **Sandbox Testing**: Use MPESA_ENVIRONMENT=sandbox for testing
2. **Test Amounts**: Use amounts between 1-150,000 KES
3. **Rate Limiting**: Max 10 prompts per minute per phone
4. **Callback URL**: Must be publicly accessible
5. **Phone Format**: Must be 254XXXXXXXXX format

## ❌ Common Issues

**"Invalid credentials"**
- Check MPESA_CONSUMER_KEY and MPESA_CONSUMER_SECRET
- Verify they match your Daraja app

**"STK Push failed"**
- Check phone number format (254XXXXXXXXX)
- Verify amount is 1-150,000 KES
- Check rate limiting

**"Callback not received"**
- Verify callback URL is correct
- Check firewall/security settings
- Ensure URL is publicly accessible

## 📚 Full Documentation

- **Setup**: See `MPESA_CONFIGURATION_GUIDE.md`
- **Testing**: See `MPESA_TESTING_GUIDE.md`
- **Details**: See `MPESA_IMPLEMENTATION_SUMMARY.md`

## 🆘 Support

1. Check backend logs: `tail -100 /tmp/mwendo-backend.log`
2. Check frontend console: Press F12
3. Review documentation files
4. Contact Safaricom support: support@safaricom.co.ke

## ✅ Checklist

- [ ] M-Pesa credentials obtained
- [ ] .env file updated
- [ ] Backend restarted
- [ ] Frontend built
- [ ] Admin can create campaigns
- [ ] Admin can send prompts
- [ ] Members can view payments
- [ ] Members can confirm payments
- [ ] Contributions are recorded
- [ ] All tests pass

**You're ready to go! 🎉**

