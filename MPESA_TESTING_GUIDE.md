# M-Pesa Payment Collection - Testing Guide

## Complete End-to-End Testing

This guide walks through testing the entire M-Pesa payment collection feature.

## Prerequisites

- Backend running on port 8000
- Frontend built and running
- Admin user logged in
- At least 2 active members with phone numbers
- M-Pesa credentials configured in .env

## Test Scenario 1: Create and Send Campaign

### Step 1: Create a Payment Campaign (Admin)

1. Log in as admin (williamodwori / Admin@2024Mwendo)
2. Navigate to **Admin → Payment Campaigns**
3. Click **+ Create Campaign**
4. Fill in the form:
   ```
   Title: "Monthly Contribution - February 2024"
   Description: "Collect monthly contributions via M-Pesa"
   Campaign Type: CONTRIBUTION
   Amount: 1000
   Vote Head: Monthly Contribution (or any)
   Start Date: 2024-02-01
   End Date: 2024-02-28
   ```
5. Click **Create Campaign**
6. **Expected Result**: Campaign created with status "draft"

### Step 2: Send Payment Prompts (Admin)

1. In the campaigns list, find your newly created campaign
2. Click **Send Prompts**
3. Confirm the action
4. **Expected Result**: 
   - Message: "Prompts sent to X members"
   - Campaign status changes to "active"
   - target_members and responses_received updated

## Test Scenario 2: Member Receives & Confirms Payment

### Step 3: Member Views Pending Payments

1. Log out and log in as a regular member
2. Navigate to **M-Pesa Payments** in sidebar
3. **Expected Result**: 
   - See the payment campaign you created
   - Status shows "prompted"
   - Amount shows 1000 KES

### Step 4: Member Confirms Payment

1. Click **Confirm Payment** button
2. Enter test M-Pesa details:
   ```
   Receipt: LHD1234567890
   Transaction ID: LHD1234567890
   ```
3. Click **Confirm**
4. **Expected Result**:
   - Success message appears
   - Payment status changes to "completed"
   - Payment date is recorded

## Test Scenario 3: Verify Contribution Recording

### Step 5: Check Contribution Was Recorded

1. Navigate to **Contributions**
2. Look for a new contribution with:
   - Amount: 1000 KES
   - Payment Method: mpesa
   - Reference: LHD1234567890
   - Status: confirmed
3. **Expected Result**: Contribution appears in the list

## Test Scenario 4: Admin Views Campaign Results

### Step 6: Admin Reviews Campaign

1. Log back in as admin
2. Go to **Admin → Payment Campaigns**
3. Click **View** on the campaign
4. **Expected Result**:
   - Campaign shows:
     - Status: active
     - Target Members: (number of active members)
     - Responses Received: 1 (or more if multiple members confirmed)
     - Total Collected: 1000 (or more)
   - Payment requests table shows all members and their statuses

## Test Scenario 5: Multiple Members

### Step 7: Test with Multiple Members

1. Create another campaign
2. Send prompts
3. Log in as different members
4. Each member confirms payment
5. **Expected Result**:
   - Campaign totals update correctly
   - All contributions are recorded
   - Campaign shows all responses

## Test Scenario 6: Error Handling

### Step 8: Test Error Cases

**Invalid Receipt Format**
1. Try to confirm with empty receipt
2. **Expected Result**: Error message "Please enter both M-Pesa receipt and transaction ID"

**Duplicate Confirmation**
1. Try to confirm same payment twice
2. **Expected Result**: Error message or payment already completed

**Invalid Campaign**
1. Try to send prompts to non-existent campaign
2. **Expected Result**: Error message "Campaign not found"

## Test Scenario 7: UI/UX Testing

### Step 9: Test User Interface

**Admin Dashboard**
- [ ] Campaign form validates required fields
- [ ] Success/error messages display correctly
- [ ] Table shows all campaigns
- [ ] Send Prompts button only shows for draft campaigns
- [ ] View button navigates to campaign details

**Member Interface**
- [ ] Pending payments list loads
- [ ] Refresh button works
- [ ] Confirm form appears when clicking button
- [ ] Form validates input
- [ ] Status badges display correctly
- [ ] Completed payments show receipt info

## Test Scenario 8: Performance Testing

### Step 10: Load Testing

1. Create a campaign
2. Send prompts to all members (50+)
3. **Expected Result**:
   - All prompts sent successfully
   - No timeout errors
   - Response time < 5 seconds

## Checklist

- [ ] Campaign creation works
- [ ] Campaign sending works
- [ ] Member receives payment prompt
- [ ] Member can confirm payment
- [ ] Contribution is recorded
- [ ] Admin can view results
- [ ] Error handling works
- [ ] UI is responsive
- [ ] All validations work
- [ ] Performance is acceptable

## Debugging

### Check Backend Logs
```bash
tail -100 /tmp/mwendo-backend.log
```

### Check Frontend Console
Press F12 in browser and check Console tab for errors

### Test API Directly
```bash
# Get campaigns
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/payment-campaigns

# Get pending payments
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/mpesa-payments/pending
```

## Success Criteria

✅ All test scenarios pass
✅ No console errors
✅ No backend errors
✅ All data is correctly recorded
✅ UI is responsive and user-friendly
✅ Performance is acceptable

