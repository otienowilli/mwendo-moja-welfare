/**
 * M-Pesa Payment Routes
 * Member endpoints for M-Pesa payment processing
 */

const express = require('express');
const router = express.Router();
const MpesaPaymentRequest = require('../models/MpesaPaymentRequest');
const PaymentCampaign = require('../models/PaymentCampaign');
const MemberContribution = require('../models/MemberContribution');
const { authMiddleware } = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

/**
 * @route GET /api/mpesa-payments/pending
 * @desc Get pending M-Pesa payment requests for current member
 * @access Member
 */
router.get('/pending', async (req, res) => {
  try {
    const memberId = req.user.member_id || req.user.id;

    const pendingRequests = await MpesaPaymentRequest.findAll({
      where: { member_id: memberId, status: ['pending', 'prompted'] },
      include: [{ model: PaymentCampaign, attributes: ['id', 'title', 'description', 'campaign_type'] }],
      order: [['created_at', 'DESC']],
    });

    res.json({
      data: pendingRequests,
      count: pendingRequests.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route POST /api/mpesa-payments/:request_id/confirm
 * @desc Confirm M-Pesa payment completion
 * @access Member
 * @body {
 *   "mpesa_receipt": "LHD1234567890",
 *   "mpesa_transaction_id": "LHD1234567890"
 * }
 */
router.post('/:request_id/confirm', async (req, res) => {
  try {
    const { request_id } = req.params;
    const { mpesa_receipt, mpesa_transaction_id } = req.body;

    const paymentRequest = await MpesaPaymentRequest.findByPk(request_id);
    if (!paymentRequest) {
      return res.status(404).json({ error: 'Payment request not found' });
    }

    // Update payment request
    await paymentRequest.update({
      status: 'completed',
      mpesa_receipt,
      mpesa_transaction_id,
      payment_date: new Date(),
    });

    // Get campaign details
    const campaign = await PaymentCampaign.findByPk(paymentRequest.campaign_id);

    // Record contribution if it's a contribution campaign
    if (campaign.campaign_type === 'CONTRIBUTION' && campaign.vote_head_id) {
      await MemberContribution.create({
        member_id: paymentRequest.member_id,
        vote_head_id: campaign.vote_head_id,
        amount: paymentRequest.amount,
        payment_method: 'mpesa',
        reference_number: mpesa_receipt,
        status: 'confirmed',
        recorded_by: req.user.id,
        notes: `M-Pesa payment from campaign: ${campaign.title}`,
      });
    }

    // Update campaign totals
    await campaign.increment('responses_received');
    await campaign.increment('total_collected', { by: paymentRequest.amount });

    res.json({
      message: 'Payment confirmed successfully',
      payment_request: paymentRequest,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route POST /api/mpesa-payments/:request_id/callback
 * @desc M-Pesa callback endpoint (from Safaricom)
 * @access Public (with validation)
 */
router.post('/:request_id/callback', async (req, res) => {
  try {
    const { request_id } = req.params;
    const { Body } = req.body;

    if (!Body || !Body.stkCallback) {
      return res.status(400).json({ error: 'Invalid callback format' });
    }

    const { ResultCode, ResultDesc, CallbackMetadata } = Body.stkCallback;

    const paymentRequest = await MpesaPaymentRequest.findByPk(request_id);
    if (!paymentRequest) {
      return res.status(404).json({ error: 'Payment request not found' });
    }

    if (ResultCode === 0) {
      // Payment successful
      const metadata = CallbackMetadata.Item;
      const mpesaReceipt = metadata.find(item => item.Name === 'MpesaReceiptNumber')?.Value;
      const transactionId = metadata.find(item => item.Name === 'TransactionId')?.Value;

      await paymentRequest.update({
        status: 'completed',
        mpesa_receipt: mpesaReceipt,
        mpesa_transaction_id: transactionId,
        payment_date: new Date(),
      });

      // Record contribution
      const campaign = await PaymentCampaign.findByPk(paymentRequest.campaign_id);
      if (campaign.campaign_type === 'CONTRIBUTION' && campaign.vote_head_id) {
        await MemberContribution.create({
          member_id: paymentRequest.member_id,
          vote_head_id: campaign.vote_head_id,
          amount: paymentRequest.amount,
          payment_method: 'mpesa',
          reference_number: mpesaReceipt,
          status: 'confirmed',
          recorded_by: 'system',
          notes: `M-Pesa auto-recorded from campaign: ${campaign.title}`,
        });
      }

      await campaign.increment('responses_received');
      await campaign.increment('total_collected', { by: paymentRequest.amount });
    } else {
      // Payment failed
      await paymentRequest.update({
        status: 'failed',
        error_message: ResultDesc,
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('M-Pesa callback error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

