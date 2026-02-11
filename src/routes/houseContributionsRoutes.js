const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const {
  getHouseContributions,
  getContributionsByHouse,
  saveHouseContribution,
  deleteHouseContribution,
} = require('../controllers/houseContributionsController');

// Get all house contributions
router.get('/', authenticateToken, getHouseContributions);

// Get contributions by house number
router.get('/house/:houseNumber', authenticateToken, getContributionsByHouse);

// Save (create or update) house contribution
router.post('/', authenticateToken, saveHouseContribution);

// Delete house contribution
router.delete('/:id', authenticateToken, deleteHouseContribution);

module.exports = router;

