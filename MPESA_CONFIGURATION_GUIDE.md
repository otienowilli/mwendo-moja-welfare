# M-Pesa Configuration Guide

## Overview

This guide explains how to configure M-Pesa STK Push integration for the MWENDO MOJA Welfare system.

## Prerequisites

1. **Safaricom Daraja Account** - Register at https://developer.safaricom.co.ke
2. **Business Short Code** - Your M-Pesa business short code (e.g., 174379 for sandbox)
3. **Consumer Key & Secret** - From your Daraja app credentials
4. **Passkey** - Your M-Pesa passkey for STK Push

## Step 1: Get Daraja Credentials

1. Go to https://developer.safaricom.co.ke
2. Sign up or log in
3. Create a new app
4. Copy your:
   - **Consumer Key**
   - **Consumer Secret**
   - **Business Short Code** (if using production)

## Step 2: Update .env File

Edit `/Users/blessedwilliams/MWENDO MOJA WELFARE/.env` and add/update:

```env
# M-Pesa Configuration
MPESA_CONSUMER_KEY=your_consumer_key_here
MPESA_CONSUMER_SECRET=your_consumer_secret_here
MPESA_BUSINESS_SHORT_CODE=174379
MPESA_PASSKEY=your_passkey_here
MPESA_CALLBACK_URL=https://mwendomojawelfare.co.ke/api/mpesa-payments/callback
MPESA_ENVIRONMENT=sandbox  # Change to 'production' for live
```

## Step 3: Configure Callback URL

1. In Daraja dashboard, set your callback URL to:
   ```
   https://mwendomojawelfare.co.ke/api/mpesa-payments/callback
   ```

2. For local testing, use ngrok:
   ```bash
   ngrok http 8000
   # Then use: https://your-ngrok-url.ngrok.io/api/mpesa-payments/callback
   ```

## Step 4: Test the Integration

### Admin: Create a Payment Campaign

1. Log in as admin
2. Go to **Admin → Payment Campaigns**
3. Click **+ Create Campaign**
4. Fill in:
   - **Title**: "Test Campaign"
   - **Amount**: 100 (KES)
   - **Campaign Type**: CONTRIBUTION
   - **Start Date**: Today
   - **End Date**: Tomorrow
5. Click **Create Campaign**

### Admin: Send Payment Prompts

1. Click **Send Prompts** on the campaign
2. System will send M-Pesa STK Push to all active members
3. Check the campaign details to see responses

### Member: Receive & Confirm Payment

1. Member receives M-Pesa STK Push on their phone
2. Member enters M-Pesa PIN to complete payment
3. Member goes to **M-Pesa Payments** in sidebar
4. Clicks **Confirm Payment**
5. Enters M-Pesa receipt and transaction ID
6. Payment is recorded as a contribution

## Sandbox vs Production

### Sandbox (Testing)
- Business Short Code: 174379
- Test phone numbers: 254708374149, 254701234567
- No real money is deducted
- Use for development and testing

### Production (Live)
- Use your actual business short code
- Real phone numbers
- Real money is deducted
- Requires Safaricom approval

## Troubleshooting

### "Invalid credentials" error
- Check MPESA_CONSUMER_KEY and MPESA_CONSUMER_SECRET
- Ensure they match your Daraja app

### "Callback URL not configured" error
- Update callback URL in Daraja dashboard
- Ensure URL is publicly accessible

### "STK Push failed" error
- Check phone number format (must be 254XXXXXXXXX)
- Verify amount is between 1 and 150,000 KES
- Check rate limiting (max 10 per minute per phone)

### Payment not recorded
- Check if callback URL is receiving requests
- Verify M-Pesa receipt format
- Check backend logs for errors

## API Endpoints

### Admin Endpoints
- `POST /api/payment-campaigns` - Create campaign
- `POST /api/payment-campaigns/:id/send-prompts` - Send STK Push
- `GET /api/payment-campaigns` - List campaigns
- `GET /api/payment-campaigns/:id` - Campaign details

### Member Endpoints
- `GET /api/mpesa-payments/pending` - Pending payments
- `POST /api/mpesa-payments/:id/confirm` - Confirm payment
- `POST /api/mpesa-payments/:id/callback` - M-Pesa callback

## Security Notes

1. **Never commit .env** - Keep credentials private
2. **Use HTTPS** - Always use HTTPS in production
3. **Validate inputs** - All inputs are validated server-side
4. **Rate limiting** - Built-in rate limiting prevents abuse
5. **Token expiry** - Access tokens expire after 1 hour

## Support

For issues with Daraja API:
- Visit: https://developer.safaricom.co.ke/docs
- Email: support@safaricom.co.ke

For system issues:
- Check backend logs: `tail -100 /tmp/mwendo-backend.log`
- Check frontend console: Press F12 in browser

