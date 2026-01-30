const express = require('express');
const {
  recordContribution,
  confirmContribution,
  getMemberContributions,
  getContributionSummary,
  getAllContributions,
} = require('../controllers/contributionController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// All contribution routes require authentication
router.use(authMiddleware);

/**
 * @route GET /api/contributions
 * @desc Get all contributions
 * @access Admin, Treasurer, Secretary
 */
router.get('/', getAllContributions);

/**
 * @route POST /api/contributions
 * @desc Record new contribution
 * @access Admin, Treasurer, Secretary
 */
router.post('/', roleMiddleware(['admin', 'treasurer', 'secretary']), recordContribution);

/**
 * @route PUT /api/contributions/:id/confirm
 * @desc Confirm contribution
 * @access Admin, Treasurer
 */
router.put('/:id/confirm', roleMiddleware(['admin', 'treasurer']), confirmContribution);

/**
 * @route GET /api/members/:member_id/contributions
 * @desc Get member contributions
 * @access Admin, Treasurer, Secretary
 */
router.get('/member/:member_id', getMemberContributions);

/**
 * @route GET /api/members/:member_id/contribution-summary
 * @desc Get member contribution summary
 * @access Admin, Treasurer, Secretary
 */
router.get('/member/:member_id/summary', getContributionSummary);

module.exports = router;

