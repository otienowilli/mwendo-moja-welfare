/**
 * Payment Campaign Controller
 * Admin functionality to send M-Pesa payment prompts to members
 */

const PaymentCampaign = require('../models/PaymentCampaign');
const MpesaPaymentRequest = require('../models/MpesaPaymentRequest');
const Member = require('../models/Member');
const mpesaService = require('../services/mpesaService');
const { v4: uuidv4 } = require('uuid');

// Create a new payment campaign
const createCampaign = async (req, res) => {
  try {
    const { title, description, campaign_type, amount, vote_head_id, start_date, end_date } = req.body;

    if (!title || !amount || !start_date || !end_date) {
      return res.status(400).json({ error: 'Title, amount, start_date, and end_date are required' });
    }

    const campaign = await PaymentCampaign.create({
      title,
      description,
      campaign_type: campaign_type || 'CONTRIBUTION',
      amount,
      vote_head_id,
      start_date,
      end_date,
      status: 'draft',
      created_by: req.user.id,
    });

    res.status(201).json({
      message: 'Payment campaign created successfully',
      campaign,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Send payment prompts to all members
const sendPaymentPrompts = async (req, res) => {
  try {
    const { campaign_id } = req.params;

    const campaign = await PaymentCampaign.findByPk(campaign_id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    if (campaign.status !== 'draft') {
      return res.status(400).json({ error: 'Campaign must be in draft status to send prompts' });
    }

    // Get all active members with phone numbers
    const members = await Member.findAll({
      where: { status: 'active' },
      attributes: ['id', 'full_name', 'phone_number', 'email'],
    });

    if (members.length === 0) {
      return res.status(400).json({ error: 'No active members found' });
    }

    let successCount = 0;
    const paymentRequests = [];

    // Send STK Push to each member
    for (const member of members) {
      if (!member.phone_number) continue;

      try {
        // Initiate M-Pesa STK Push
        const stkResult = await mpesaService.initiateStkPush(
          member.phone_number,
          campaign.amount,
          `${campaign.campaign_type}_${campaign.id}`,
          campaign.title
        );

        if (stkResult.success) {
          // Create payment request record
          const paymentRequest = await MpesaPaymentRequest.create({
            campaign_id,
            member_id: member.id,
            phone_number: member.phone_number,
            amount: campaign.amount,
            checkout_request_id: stkResult.checkoutRequestID,
            status: 'prompted',
            sent_at: new Date(),
          });

          paymentRequests.push(paymentRequest);
          successCount++;
        }
      } catch (error) {
        console.error(`Failed to send prompt to ${member.phone_number}:`, error.message);
      }
    }

    // Update campaign
    await campaign.update({
      status: 'active',
      target_members: members.length,
      responses_received: successCount,
    });

    res.status(200).json({
      message: `Payment prompts sent to ${successCount} members`,
      campaign_id,
      prompts_sent: successCount,
      total_members: members.length,
      payment_requests: paymentRequests,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all campaigns
const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await PaymentCampaign.findAll({
      order: [['created_at', 'DESC']],
    });

    res.json({
      data: campaigns,
      count: campaigns.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get campaign details with payment requests
const getCampaignDetails = async (req, res) => {
  try {
    const { campaign_id } = req.params;

    const campaign = await PaymentCampaign.findByPk(campaign_id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    const paymentRequests = await MpesaPaymentRequest.findAll({
      where: { campaign_id },
      include: [{ model: Member, attributes: ['id', 'full_name', 'phone_number'] }],
    });

    res.json({
      campaign,
      payment_requests: paymentRequests,
      total_requests: paymentRequests.length,
      completed: paymentRequests.filter(r => r.status === 'completed').length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCampaign,
  sendPaymentPrompts,
  getAllCampaigns,
  getCampaignDetails,
};

