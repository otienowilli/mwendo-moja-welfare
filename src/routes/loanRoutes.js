const express = require('express');
const {
  applyForLoan,
  approveLoan,
  disburseLoan,
  getLoanById,
  getMemberLoans,
  getAllLoans,
} = require('../controllers/loanController');
const {
  recordRepayment,
  confirmRepayment,
  getLoanRepayments,
  getLoanBalance,
} = require('../controllers/loanRepaymentController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// All loan routes require authentication
router.use(authMiddleware);

/**
 * @route GET /api/loans
 * @desc Get all loans
 * @access Admin, Treasurer, Secretary
 */
router.get('/', getAllLoans);

/**
 * @route POST /api/loans
 * @desc Apply for loan
 * @access Admin, Secretary
 */
router.post('/', roleMiddleware(['admin', 'secretary']), applyForLoan);

/**
 * @route GET /api/loans/:id
 * @desc Get loan details
 * @access Admin, Treasurer, Secretary
 */
router.get('/:id', getLoanById);

/**
 * @route PUT /api/loans/:id/approve
 * @desc Approve loan
 * @access Admin, Treasurer
 */
router.put('/:id/approve', roleMiddleware(['admin', 'treasurer']), approveLoan);

/**
 * @route PUT /api/loans/:id/disburse
 * @desc Disburse loan
 * @access Admin, Treasurer
 */
router.put('/:id/disburse', roleMiddleware(['admin', 'treasurer']), disburseLoan);

/**
 * @route GET /api/members/:member_id/loans
 * @desc Get member loans
 * @access Admin, Treasurer, Secretary
 */
router.get('/member/:member_id', getMemberLoans);

/**
 * @route POST /api/loans/:id/repayments
 * @desc Record loan repayment
 * @access Admin, Treasurer
 */
router.post('/:id/repayments', roleMiddleware(['admin', 'treasurer']), recordRepayment);

/**
 * @route PUT /api/loans/:id/repayments/:repayment_id/confirm
 * @desc Confirm repayment
 * @access Admin, Treasurer
 */
router.put('/:id/repayments/:repayment_id/confirm', roleMiddleware(['admin', 'treasurer']), confirmRepayment);

/**
 * @route GET /api/loans/:id/repayments
 * @desc Get loan repayments
 * @access Admin, Treasurer, Secretary
 */
router.get('/:id/repayments', getLoanRepayments);

/**
 * @route GET /api/loans/:id/balance
 * @desc Get loan balance
 * @access Admin, Treasurer, Secretary
 */
router.get('/:id/balance', getLoanBalance);

module.exports = router;

