# 📱 Create Your First Daraja App - Step by Step

## You Are Here: Daraja Dashboard

You're logged in and on the **"My Apps"** page. You should see:
- "Mh, it's kinda empty over here"
- "Start your journey today by 'Creating an App'"

---

## Step 1: Click "Create an App" Button

Look for and click the **"Create an App"** or **"+ Create New App"** button.

This should be:
- A blue button
- Usually in the top right or center of the page
- Says "Create an App" or similar

---

## Step 2: Fill in App Details

You'll see a form with fields. Fill in:

### **App Name** (Required)
```
MWENDO MOJA Welfare
```

### **Description** (Required)
```
M-Pesa payment collection system for welfare group members
```

### **App Type** (Required)
Select one of:
- **Web Application** ← Choose this
- Mobile Application
- Desktop Application

### **Category** (if asked)
- Finance
- Payment
- Or similar

### **Website/URL** (if asked)
```
https://mwendomojawelfare.co.ke
```

---

## Step 3: Accept Terms & Create

1. Check any **"I agree to terms"** checkbox if present
2. Click **"Create App"** or **"Submit"** button
3. Wait for confirmation

---

## Step 4: You'll See Your Credentials

After creating, you should see a page with:

### 🔑 **Copy These Exactly:**

#### **1. Consumer Key**
- Long string of letters and numbers
- Example: `abc123def456ghi789jkl012mno345pqr`
- **Copy this** ← Important!

#### **2. Consumer Secret**
- Another long string
- Example: `xyz789uvw456rst123opq890lmn567ijk`
- **Copy this** ← Important!

#### **3. Business Short Code**
- For Sandbox: `174379`
- **Copy this** ← Important!

#### **4. Passkey**
- Long alphanumeric string
- Example: `bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919`
- **Copy this** ← Important!

---

## Step 5: Update Your .env File

Open: `/Users/blessedwilliams/MWENDO MOJA WELFARE/.env`

Add these lines (replace with your actual values):

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

1. Go back to your app in Daraja
2. Look for **"Settings"** or **"Configuration"**
3. Find **"Callback URL"** or **"Webhook URL"** field
4. Enter:
   ```
   https://mwendomojawelfare.co.ke/api/mpesa-payments/callback
   ```
5. Save

---

## Step 7: Test with Sandbox

Your app is now in **Sandbox Mode** (testing).

Test phone numbers you can use:
- `254708374149`
- `254701234567`
- `254712345678`

Test amounts: `1` to `150000` KES

**No real money is deducted!**

---

## Step 8: Restart Backend

After updating .env:

```bash
# SSH to TrueHost
ssh user@mwendomojawelfare.co.ke

# Kill old process
pkill -f "node src/server.js"

# Start new process
cd ~/public_html
nohup node src/server.js > /tmp/mwendo-backend.log 2>&1 &

# Verify
curl http://localhost:8000/api/health
```

---

## ✅ Checklist

- [ ] Logged into Daraja dashboard
- [ ] Clicked "Create an App"
- [ ] Filled in app details
- [ ] Created app successfully
- [ ] Copied Consumer Key
- [ ] Copied Consumer Secret
- [ ] Copied Business Short Code (174379)
- [ ] Copied Passkey
- [ ] Updated .env file
- [ ] Set callback URL in Daraja
- [ ] Restarted backend
- [ ] Ready to test!

---

## 🆘 If You Get Stuck

**Can't find "Create an App" button?**
- Look for a blue button or "+" icon
- Check top right corner
- Try refreshing the page

**Can't see credentials after creating?**
- Go to "My Apps"
- Click on your app name
- Look for "Credentials" or "Settings" tab

**Need help?**
- Daraja Support: support@safaricom.co.ke
- Daraja Docs: https://developer.safaricom.co.ke/docs

---

**Once you complete these steps, your M-Pesa payment collection feature will be LIVE!** 🚀

