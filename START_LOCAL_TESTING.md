# 🚀 Start Local Testing - M-Pesa Payment Collection

## ✅ Servers Already Running

Your local servers are already running:

- **Backend**: http://localhost:8000 ✅
- **Frontend**: http://localhost:5173 ✅
- **Database**: SQLite ✅

---

## 🧪 Quick Start Testing

### Step 1: Open Frontend
Go to: **http://localhost:5173**

You should see the login page.

---

### Step 2: Login as Admin
```
Username: williamodwori
Password: Admin@2024Mwendo
```

Click **Login**

You should see the dashboard.

---

### Step 3: Create a Test Campaign
1. Click **Admin** in sidebar
2. Click **Payment Campaigns**
3. Click **+ Create Campaign**
4. Fill in:
   - Title: "Test Campaign"
   - Amount: 100
   - Type: CONTRIBUTION
   - Click **Create Campaign**

**Expected**: Campaign created with status "draft"

---

### Step 4: Send Prompts
1. Click **Send Prompts** on your campaign
2. Confirm

**Expected**: Message "Prompts sent to X members"

---

### Step 5: Test as Member
1. Logout (top right)
2. Login as any member
3. Click **M-Pesa Payments**
4. Click **Confirm Payment**
5. Enter:
   - Receipt: `LHD1234567890`
   - Transaction ID: `LHD1234567890`
6. Click **Confirm**

**Expected**: Payment confirmed, status changes to "completed"

---

### Step 6: Verify Contribution
1. Click **Contributions**
2. Look for new contribution with:
   - Amount: 100 KES
   - Method: mpesa
   - Status: confirmed

**Expected**: Contribution appears in list

---

### Step 7: Check Admin Results
1. Logout and login as admin
2. Go to **Admin → Payment Campaigns**
3. Click **View** on campaign

**Expected**: 
- Responses Received: 1+
- Total Collected: 100+

---

## 📋 Full Testing Guide

For complete testing with all 9 scenarios, see:
**`LOCAL_TESTING_GUIDE.md`**

---

## 🔍 Check Logs

### Backend Logs
```bash
tail -50 /tmp/mwendo-backend.log
```

### Frontend Console
Press **F12** in browser → **Console** tab

---

## ✅ Checklist

- [ ] Frontend loads at localhost:5173
- [ ] Admin can login
- [ ] Admin can create campaign
- [ ] Admin can send prompts
- [ ] Member can view payments
- [ ] Member can confirm payment
- [ ] Contribution recorded
- [ ] Campaign totals updated
- [ ] No errors in console
- [ ] No errors in backend logs

---

## 🎯 Success = Ready for TrueHost

Once all tests pass locally:
1. All features work ✅
2. No errors ✅
3. Data persists ✅
4. Ready to deploy to TrueHost ✅

---

## 📚 Documentation

- `LOCAL_TESTING_GUIDE.md` - Complete 9 test scenarios
- `MPESA_READY_TO_TEST.md` - M-Pesa testing details
- `COMPLETE_DEPLOYMENT_GUIDE.md` - TrueHost deployment

---

**Start testing now at http://localhost:5173** 🚀

