const express = require('express');
const {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deactivateMember,
} = require('../controllers/memberController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// All member routes require authentication
router.use(authMiddleware);

/**
 * @route POST /api/members
 * @desc Create new member
 * @access Admin, Secretary
 */
router.post('/', roleMiddleware(['admin', 'secretary']), createMember);

/**
 * @route GET /api/members
 * @desc Get all active members
 * @access Admin, Secretary, Treasurer
 */
router.get('/', getAllMembers);

/**
 * @route GET /api/members/:id
 * @desc Get member by ID
 * @access Admin, Secretary, Treasurer
 */
router.get('/:id', getMemberById);

/**
 * @route PUT /api/members/:id
 * @desc Update member
 * @access Admin, Secretary
 */
router.put('/:id', roleMiddleware(['admin', 'secretary']), updateMember);

/**
 * @route PUT /api/members/:id/deactivate
 * @desc Deactivate member
 * @access Admin
 */
router.put('/:id/deactivate', roleMiddleware(['admin']), deactivateMember);

module.exports = router;

