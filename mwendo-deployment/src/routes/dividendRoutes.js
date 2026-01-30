const express = require('express');
const {
  calculateDividends,
  getMemberDividend,
} = require('../controllers/dividendController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// All dividend routes require authentication
router.use(authMiddleware);

/**
 * @route POST /api/dividends/calculate
 * @desc Calculate dividends for all members
 * @access Admin, Treasurer
 * @body {
 *   "financial_year": 2024
 * }
 */
router.post('/calculate', roleMiddleware(['admin', 'treasurer']), calculateDividends);

/**
 * @route GET /api/dividends/members/:member_id/:financial_year
 * @desc Get member dividend for specific year
 * @access Admin, Treasurer, Secretary
 */
router.get('/members/:member_id/:financial_year', getMemberDividend);

module.exports = router;

