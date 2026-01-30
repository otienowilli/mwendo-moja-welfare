const express = require('express');
const {
  createHostingEvent,
  recordHostingContribution,
  confirmHostingContribution,
  getHostingEvent,
  getEventContributions,
  completeHostingEvent,
} = require('../controllers/hostingController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// All hosting routes require authentication
router.use(authMiddleware);

/**
 * @route POST /api/hosting/events
 * @desc Create hosting event
 * @access Admin, Secretary
 */
router.post('/events', roleMiddleware(['admin', 'secretary']), createHostingEvent);

/**
 * @route GET /api/hosting/events/:id
 * @desc Get hosting event details
 * @access Admin, Treasurer, Secretary
 */
router.get('/events/:id', getHostingEvent);

/**
 * @route PUT /api/hosting/events/:id/complete
 * @desc Mark hosting event as completed
 * @access Admin, Secretary
 */
router.put('/events/:id/complete', roleMiddleware(['admin', 'secretary']), completeHostingEvent);

/**
 * @route POST /api/hosting/events/:event_id/contributions
 * @desc Record hosting contribution
 * @access Admin, Treasurer, Secretary
 */
router.post('/events/:event_id/contributions', roleMiddleware(['admin', 'treasurer', 'secretary']), recordHostingContribution);

/**
 * @route PUT /api/hosting/contributions/:id/confirm
 * @desc Confirm hosting contribution
 * @access Admin, Treasurer
 */
router.put('/contributions/:id/confirm', roleMiddleware(['admin', 'treasurer']), confirmHostingContribution);

/**
 * @route GET /api/hosting/events/:event_id/contributions
 * @desc Get hosting event contributions
 * @access Admin, Treasurer, Secretary
 */
router.get('/events/:event_id/contributions', getEventContributions);

module.exports = router;

