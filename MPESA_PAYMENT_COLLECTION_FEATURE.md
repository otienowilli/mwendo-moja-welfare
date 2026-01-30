# M-Pesa Payment Collection Feature

## Overview

This feature allows admins to send M-Pesa payment prompts to all members for collection of contributions, loan repayments, or welfare payments. Members receive an STK Push prompt on their phone to enter their M-Pesa PIN and complete the payment.

## Files Created

### 1. **Models**

#### `/src/models/PaymentCampaign.js`
- Tracks payment collection campaigns created by admins
- Fields: title, description, campaign_type, amount, vote_head_id, status, target_members, responses_received, total_collected
- Status: draft → active → completed/cancelled

#### `/src/models/MpesaPaymentRequest.js`
- Tracks individual M-Pesa payment requests sent to members
- Fields: campaign_id, member_id, phone_number, amount, checkout_request_id, status, mpesa_receipt, mpesa_transaction_id, payment_date
- Status: pending → prompted → completed/failed/cancelled

### 2. **Controllers**

#### `/src/controllers/paymentCampaignController.js`
- `createCampaign()` - Admin creates a new payment campaign
- `sendPaymentPrompts()` - Sends M-Pesa STK Push to all active members
- `getAllCampaigns()` - Get all campaigns
- `getCampaignDetails()` - Get campaign with payment requests

### 3. **Routes**

#### `/src/routes/paymentCampaignRoutes.js` (Admin Only)
- `POST /api/payment-campaigns` - Create campaign
- `POST /api/payment-campaigns/:campaign_id/send-prompts` - Send prompts
- `GET /api/payment-campaigns` - Get all campaigns
- `GET /api/payment-campaigns/:campaign_id` - Get campaign details

#### `/src/routes/mpesaPaymentRoutes.js` (Member)
- `GET /api/mpesa-payments/pending` - Get pending payment requests
- `POST /api/mpesa-payments/:request_id/confirm` - Confirm payment
- `POST /api/mpesa-payments/:request_id/callback` - M-Pesa callback

## How It Works

### Admin Flow
1. Admin creates a payment campaign with title, amount, and dates
2. Admin sends prompts to all active members
3. System sends M-Pesa STK Push to each member's phone
4. Admin can view campaign status and payment responses

### Member Flow
1. Member receives M-Pesa STK Push prompt on phone
2. Member enters M-Pesa PIN to complete payment
3. Payment is automatically recorded as a contribution
4. Member can view pending payment requests

## API Usage Examples

### Create Campaign
```bash
POST /api/payment-campaigns
{
  "title": "Monthly Contribution Collection",
  "description": "Collect monthly contributions",
  "campaign_type": "CONTRIBUTION",
  "amount": 1000,
  "vote_head_id": "uuid",
  "start_date": "2024-02-01",
  "end_date": "2024-02-28"
}
```

### Send Prompts
```bash
POST /api/payment-campaigns/{campaign_id}/send-prompts
```

### Get Pending Payments (Member)
```bash
GET /api/mpesa-payments/pending
```

## Integration Points

- Uses existing `mpesaService.js` for STK Push
- Automatically records contributions in `MemberContribution` table
- Integrates with existing vote heads system
- Uses existing authentication and role-based access control

## Configuration Required

Update `.env` with M-Pesa credentials:
```
MPESA_CONSUMER_KEY=your_key
MPESA_CONSUMER_SECRET=your_secret
MPESA_BUSINESS_SHORT_CODE=174379
MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_URL=https://mwendomojawelfare.co.ke/api/mpesa-payments/callback
```

## Status

✅ Backend implementation complete
⏳ Frontend UI pending (admin dashboard and member interface)
⏳ Testing pending

