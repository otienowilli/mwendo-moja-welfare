/**
 * Payment Campaign Routes
 * Admin routes for M-Pesa payment collection campaigns
 */

const express = require('express');
const router = express.Router();
const {
  createCampaign,
  sendPaymentPrompts,
  getAllCampaigns,
  getCampaignDetails,
} = require('../controllers/paymentCampaignController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

/**
 * @route POST /api/payment-campaigns
 * @desc Create a new payment campaign
 * @access Admin only
 * @body {
 *   "title": "Monthly Contribution Collection",
 *   "description": "Collect monthly contributions via M-Pesa",
 *   "campaign_type": "CONTRIBUTION",
 *   "amount": 1000,
 *   "vote_head_id": "uuid",
 *   "start_date": "2024-02-01",
 *   "end_date": "2024-02-28"
 * }
 */
router.post('/', roleMiddleware(['admin']), createCampaign);

/**
 * @route POST /api/payment-campaigns/:campaign_id/send-prompts
 * @desc Send M-Pesa payment prompts to all members
 * @access Admin only
 */
router.post('/:campaign_id/send-prompts', roleMiddleware(['admin']), sendPaymentPrompts);

/**
 * @route GET /api/payment-campaigns
 * @desc Get all payment campaigns
 * @access Admin, Treasurer
 */
router.get('/', roleMiddleware(['admin', 'treasurer']), getAllCampaigns);

/**
 * @route GET /api/payment-campaigns/:campaign_id
 * @desc Get campaign details with payment requests
 * @access Admin, Treasurer
 */
router.get('/:campaign_id', roleMiddleware(['admin', 'treasurer']), getCampaignDetails);

module.exports = router;

