const express = require('express');
const {
  createVoteHead,
  getAllVoteHeads,
  getVoteHeadById,
  updateVoteHead,
  deactivateVoteHead,
} = require('../controllers/voteHeadController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// All vote head routes require authentication
router.use(authMiddleware);

/**
 * @route POST /api/vote-heads
 * @desc Create new vote head
 * @access Admin
 */
router.post('/', roleMiddleware(['admin']), createVoteHead);

/**
 * @route GET /api/vote-heads
 * @desc Get all vote heads
 * @access Admin, Treasurer, Secretary
 */
router.get('/', getAllVoteHeads);

/**
 * @route GET /api/vote-heads/:id
 * @desc Get vote head by ID
 * @access Admin, Treasurer, Secretary
 */
router.get('/:id', getVoteHeadById);

/**
 * @route PUT /api/vote-heads/:id
 * @desc Update vote head
 * @access Admin
 */
router.put('/:id', roleMiddleware(['admin']), updateVoteHead);

/**
 * @route PUT /api/vote-heads/:id/deactivate
 * @desc Deactivate vote head
 * @access Admin
 */
router.put('/:id/deactivate', roleMiddleware(['admin']), deactivateVoteHead);

module.exports = router;

