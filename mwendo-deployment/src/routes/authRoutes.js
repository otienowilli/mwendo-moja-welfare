const express = require('express');
const { login, register, forgotPassword, resetPassword, changePassword } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

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

/**
 * @route POST /api/auth/forgot-password
 * @desc Request password reset link
 * @access Public
 */
router.post('/forgot-password', forgotPassword);

/**
 * @route POST /api/auth/reset-password
 * @desc Reset password with token
 * @access Public
 */
router.post('/reset-password', resetPassword);

/**
 * @route POST /api/auth/change-password
 * @desc Change password (authenticated user)
 * @access Private
 */
router.post('/change-password', authMiddleware, changePassword);

module.exports = router;

