const express = require('express');
const { login, register } = require('../controllers/authController');

const router = express.Router();

/**
 * @route POST /api/auth/login
 * @desc Login user
 * @access Public
 */
router.post('/login', login);

/**
 * @route POST /api/auth/register
 * @desc Register new user (admin only)
 * @access Public (should be restricted in production)
 */
router.post('/register', register);

module.exports = router;

