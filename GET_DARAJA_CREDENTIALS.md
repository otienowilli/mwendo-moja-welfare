# 🔑 How to Get Daraja Credentials from Safaricom

## Step 1: Go to Daraja Portal

Visit: **https://developer.safaricom.co.ke**

You should see the Daraja 3.0 homepage with:
- "Plug and Play into possibilities with Safaricom APIs"
- Options to create sandbox apps and test

---

## Step 2: Create an Account (if you don't have one)

1. Click **"Sign Up"** or **"Register"**
2. Choose: **Company** or **Individual**
3. Fill in your details:
   - Email
   - Password
   - Organization name (if company)
4. Verify your email
5. Log in

---

## Step 3: Create a New App

1. After logging in, go to **"My Apps"** or **"Applications"**
2. Click **"+ Create New App"** or **"New Application"**
3. Fill in:
   - **App Name**: "MWENDO MOJA Welfare"
   - **Description**: "M-Pesa payment collection for welfare group"
   - **App Type**: Select the appropriate type (usually "Web Application")
4. Click **"Create"**

---

## Step 4: Get Your Credentials

After creating the app, you should see:

### 📋 Copy These Values:

1. **Consumer Key** (also called API Key)
   - Long alphanumeric string
   - Example: `abc123def456ghi789jkl012mno345pqr`

2. **Consumer Secret** (also called API Secret)
   - Another long alphanumeric string
   - Example: `xyz789uvw456rst123opq890lmn567ijk`

3. **Business Short Code** (for M-Pesa)
   - For Sandbox: `174379`
   - For Production: Your actual business short code

4. **Passkey** (for STK Push)
   - Long alphanumeric string
   - Example: `bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919`

---

## Step 5: Update Your .env File

Edit `/Users/blessedwilliams/MWENDO MOJA WELFARE/.env` and add:

```env
# M-Pesa Configuration
MPESA_CONSUMER_KEY=paste_your_consumer_key_here
MPESA_CONSUMER_SECRET=paste_your_consumer_secret_here
MPESA_BUSINESS_SHORT_CODE=174379
MPESA_PASSKEY=paste_your_passkey_here
MPESA_CALLBACK_URL=https://mwendomojawelfare.co.ke/api/mpesa-payments/callback
MPESA_ENVIRONMENT=sandbox
```

---

## Step 6: Configure Callback URL in Daraja

1. In your Daraja app settings
2. Find **"Callback URL"** or **"Webhook URL"** section
3. Set it to:
   ```
   https://mwendomojawelfare.co.ke/api/mpesa-payments/callback
   ```
4. Save

---

## Step 7: Test in Sandbox

1. Use test phone numbers:
   - `254708374149`
   - `254701234567`
   - `254712345678`

2. Test amounts: 1-150,000 KES

3. No real money is deducted in sandbox

---

## Step 8: Switch to Production (Later)

When ready for live:

1. Get production credentials from Safaricom
2. Update .env:
   ```env
   MPESA_CONSUMER_KEY=production_key
   MPESA_CONSUMER_SECRET=production_secret
   MPESA_BUSINESS_SHORT_CODE=your_actual_code
   MPESA_PASSKEY=production_passkey
   MPESA_ENVIRONMENT=production
   ```
3. Restart backend

---

## 🆘 Need Help?

- **Daraja Docs**: https://developer.safaricom.co.ke/docs
- **Support**: support@safaricom.co.ke
- **Community**: Visit Daraja Developer Marketplace

---

## ✅ Checklist

- [ ] Created Daraja account
- [ ] Created new app
- [ ] Copied Consumer Key
- [ ] Copied Consumer Secret
- [ ] Copied Business Short Code
- [ ] Copied Passkey
- [ ] Updated .env file
- [ ] Set callback URL in Daraja
- [ ] Ready to test!

---

**Once you have these credentials, your M-Pesa payment collection feature will be ready to use!** 🚀

