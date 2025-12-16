const express = require('express');
const {
  getMemberReport,
  getGroupFinancialReport,
  getContributionReport,
  getLoanReport,
  getWelfareReport,
  getMemberListReport,
} = require('../controllers/reportController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// All report routes require authentication
router.use(authMiddleware);

/**
 * @route GET /api/reports/members/:member_id
 * @desc Get member financial report
 * @access Admin, Treasurer, Secretary
 */
router.get('/members/:member_id', getMemberReport);

/**
 * @route GET /api/reports/group-financial
 * @desc Get group financial report
 * @access Admin, Treasurer
 */
router.get('/group-financial', roleMiddleware(['admin', 'treasurer']), getGroupFinancialReport);

/**
 * @route GET /api/reports/contributions
 * @desc Get contributions report
 * @access Admin, Treasurer
 */
router.get('/contributions', roleMiddleware(['admin', 'treasurer']), getContributionReport);

/**
 * @route GET /api/reports/loans
 * @desc Get loans report
 * @access Admin, Treasurer
 */
router.get('/loans', roleMiddleware(['admin', 'treasurer']), getLoanReport);

/**
 * @route GET /api/reports/welfare
 * @desc Get welfare report
 * @access Admin, Treasurer
 */
router.get('/welfare', roleMiddleware(['admin', 'treasurer']), getWelfareReport);

/**
 * @route GET /api/reports/members-list
 * @desc Get members list report
 * @access Admin, Treasurer, Secretary
 */
router.get('/members-list', getMemberListReport);

module.exports = router;

