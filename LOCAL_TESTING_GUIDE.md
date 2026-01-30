# 🧪 Local Testing Guide - M-Pesa Payment Collection

## ✅ Local Servers Running

- **Backend**: http://localhost:8000 ✅
- **Frontend**: http://localhost:5173 ✅
- **Database**: SQLite (mwendo_moja.db) ✅

---

## Test Scenario 1: Admin Creates Campaign

### Step 1: Open Frontend
1. Go to: **http://localhost:5173**
2. You should see login page

### Step 2: Login as Admin
- Username: `williamodwori`
- Password: `Admin@2024Mwendo`
- Click **Login**

### Step 3: Navigate to Payment Campaigns
1. Click **Admin** in sidebar
2. Click **Payment Campaigns**
3. You should see empty campaigns list

### Step 4: Create Campaign
1. Click **+ Create Campaign**
2. Fill in form:
   ```
   Title: "Test Campaign - Local"
   Description: "Testing M-Pesa locally"
   Campaign Type: CONTRIBUTION
   Amount: 100
   Vote Head: (select any)
   Start Date: Today
   End Date: Tomorrow
   ```
3. Click **Create Campaign**

**Expected Result**: 
- ✅ Campaign created
- ✅ Status: "draft"
- ✅ Campaign appears in list

---

## Test Scenario 2: Admin Sends Prompts

### Step 1: Send Prompts
1. Find your campaign in list
2. Click **Send Prompts**
3. Confirm action

**Expected Result**:
- ✅ Success message: "Prompts sent to X members"
- ✅ Campaign status changes to "active"
- ✅ target_members and responses_received updated

---

## Test Scenario 3: Member Views Pending Payments

### Step 1: Logout
1. Click profile icon (top right)
2. Click **Logout**

### Step 2: Login as Member
1. Username: (use any member's username)
2. Password: (their password)
3. Click **Login**

### Step 3: View Pending Payments
1. Click **M-Pesa Payments** in sidebar
2. You should see your campaign

**Expected Result**:
- ✅ Campaign visible
- ✅ Status: "prompted"
- ✅ Amount: 100 KES
- ✅ Phone number shown

---

## Test Scenario 4: Member Confirms Payment

### Step 1: Confirm Payment
1. Click **Confirm Payment** button
2. Fill in test data:
   ```
   M-Pesa Receipt: LHD1234567890
   Transaction ID: LHD1234567890
   ```
3. Click **Confirm**

**Expected Result**:
- ✅ Success message
- ✅ Payment status changes to "completed"
- ✅ Payment date recorded

---

## Test Scenario 5: Verify Contribution Recorded

### Step 1: Check Contributions
1. Click **Contributions** in sidebar
2. Look for new contribution

**Expected Result**:
- ✅ New contribution appears
- ✅ Amount: 100 KES
- ✅ Payment Method: mpesa
- ✅ Reference: LHD1234567890
- ✅ Status: confirmed

---

## Test Scenario 6: Admin Views Results

### Step 1: Logout and Login as Admin
1. Logout
2. Login as admin (williamodwori)

### Step 2: View Campaign Results
1. Go to **Admin → Payment Campaigns**
2. Click **View** on your campaign

**Expected Result**:
- ✅ Campaign status: active
- ✅ Target Members: (number)
- ✅ Responses Received: 1+
- ✅ Total Collected: 100+
- ✅ Payment requests table shows all members

---

## Test Scenario 7: Check Backend Logs

### Step 1: View Backend Logs
Open terminal and run:
```bash
# Check for M-Pesa related logs
tail -50 /tmp/mwendo-backend.log | grep -i mpesa

# Or view all logs
tail -100 /tmp/mwendo-backend.log
```

**Expected Result**:
- ✅ No errors
- ✅ Campaign creation logged
- ✅ Payment request creation logged
- ✅ Contribution recording logged

---

## Test Scenario 8: Check Frontend Console

### Step 1: Open Browser Console
1. Press **F12** in browser
2. Go to **Console** tab

### Step 2: Check for Errors
- Should see no red errors
- May see some warnings (OK)

**Expected Result**:
- ✅ No JavaScript errors
- ✅ API calls successful
- ✅ Data loading correctly

---

## Test Scenario 9: Test with Multiple Members

### Step 1: Create Multiple Campaigns
1. Create 2-3 more campaigns
2. Send prompts to each

### Step 2: Test with Different Members
1. Login as different members
2. Confirm payments for each
3. Verify contributions recorded

**Expected Result**:
- ✅ All campaigns work
- ✅ All members can confirm
- ✅ All contributions recorded
- ✅ Campaign totals correct

---

## Troubleshooting

### Backend not responding?
```bash
# Check if running
ps aux | grep "node src/server.js"

# Check logs
tail -100 /tmp/mwendo-backend.log

# Restart
pkill -f "node src/server.js"
cd /Users/blessedwilliams/MWENDO\ MOJA\ WELFARE
node src/server.js
```

### Frontend not loading?
```bash
# Check if running
ps aux | grep "npm run dev"

# Restart
cd /Users/blessedwilliams/MWENDO\ MOJA\ WELFARE/client
npm run dev
```

### API errors?
1. Check browser console (F12)
2. Check backend logs
3. Verify .env has M-Pesa credentials

---

## ✅ Testing Checklist

- [ ] Backend running on port 8000
- [ ] Frontend running on port 5173
- [ ] Admin can login
- [ ] Admin can create campaign
- [ ] Admin can send prompts
- [ ] Member can view payments
- [ ] Member can confirm payment
- [ ] Contribution recorded
- [ ] Campaign totals updated
- [ ] No console errors
- [ ] No backend errors
- [ ] Multiple members work
- [ ] All data persists

---

## 🎯 Success Criteria

✅ All 9 test scenarios pass
✅ No errors in console
✅ No errors in backend logs
✅ Data correctly recorded in database
✅ UI is responsive
✅ All features work as expected

---

**Start with Test Scenario 1 and work through all scenarios!** 🚀

