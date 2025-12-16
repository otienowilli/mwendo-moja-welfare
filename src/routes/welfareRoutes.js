const express = require('express');
const {
  reportIncident,
  approveIncident,
  processPayment,
  getMemberIncidents,
  addBeneficiary,
  getMemberBeneficiaries,
} = require('../controllers/welfareController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// All welfare routes require authentication
router.use(authMiddleware);

/**
 * @route POST /api/welfare/incidents
 * @desc Report welfare incident
 * @access Admin, Secretary
 */
router.post('/incidents', roleMiddleware(['admin', 'secretary']), reportIncident);

/**
 * @route PUT /api/welfare/incidents/:id/approve
 * @desc Approve welfare incident
 * @access Admin, Treasurer
 */
router.put('/incidents/:id/approve', roleMiddleware(['admin', 'treasurer']), approveIncident);

/**
 * @route PUT /api/welfare/incidents/:id/pay
 * @desc Process welfare payment
 * @access Admin, Treasurer
 */
router.put('/incidents/:id/pay', roleMiddleware(['admin', 'treasurer']), processPayment);

/**
 * @route GET /api/welfare/members/:member_id/incidents
 * @desc Get member welfare incidents
 * @access Admin, Treasurer, Secretary
 */
router.get('/members/:member_id/incidents', getMemberIncidents);

/**
 * @route POST /api/welfare/beneficiaries
 * @desc Add member beneficiary
 * @access Admin, Secretary
 */
router.post('/beneficiaries', roleMiddleware(['admin', 'secretary']), addBeneficiary);

/**
 * @route GET /api/welfare/members/:member_id/beneficiaries
 * @desc Get member beneficiaries
 * @access Admin, Treasurer, Secretary
 */
router.get('/members/:member_id/beneficiaries', getMemberBeneficiaries);

module.exports = router;

