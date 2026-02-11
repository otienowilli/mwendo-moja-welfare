const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const {
  getHouseContributions,
  getContributionsByHouse,
  saveHouseContribution,
  deleteHouseContribution,
} = require('../controllers/houseContributionsController');

// Get all house contributions
router.get('/', authMiddleware, getHouseContributions);

// Get contributions by house number
router.get('/house/:houseNumber', authMiddleware, getContributionsByHouse);

// Save (create or update) house contribution
router.post('/', authMiddleware, saveHouseContribution);

// Delete house contribution
router.delete('/:id', authMiddleware, deleteHouseContribution);

module.exports = router;

