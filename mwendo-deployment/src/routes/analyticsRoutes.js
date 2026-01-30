/**
 * Analytics Routes
 * System analytics and reporting endpoints
 */

const express = require('express');
const router = express.Router();
const analyticsService = require('../services/analyticsService');
const authMiddleware = require('../middleware/auth');
const { Member, Loan, Contribution, Payment } = require('../models');

/**
 * GET /api/analytics/dashboard
 * Get dashboard analytics
 */
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    // Fetch data from database
    const members = await Member.findAll();
    const loans = await Loan.findAll();
    const contributions = await Contribution.findAll();
    const payments = await Payment.findAll();

    // Track metrics
    await analyticsService.trackMemberMetrics(members);
    await analyticsService.trackLoanMetrics(loans);
    await analyticsService.trackContributionMetrics(contributions);
    await analyticsService.trackPaymentMetrics(payments);

    const result = await analyticsService.getDashboardData();

    res.status(200).json(result);
  } catch (error) {
    console.error('Dashboard analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

/**
 * GET /api/analytics/members
 * Get member analytics
 */
router.get('/members', authMiddleware, async (req, res) => {
  try {
    const members = await Member.findAll();
    const result = await analyticsService.trackMemberMetrics(members);

    res.status(200).json(result);
  } catch (error) {
    console.error('Member analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

/**
 * GET /api/analytics/loans
 * Get loan analytics
 */
router.get('/loans', authMiddleware, async (req, res) => {
  try {
    const loans = await Loan.findAll();
    const result = await analyticsService.trackLoanMetrics(loans);

    res.status(200).json(result);
  } catch (error) {
    console.error('Loan analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

/**
 * GET /api/analytics/contributions
 * Get contribution analytics
 */
router.get('/contributions', authMiddleware, async (req, res) => {
  try {
    const contributions = await Contribution.findAll();
    const result = await analyticsService.trackContributionMetrics(contributions);

    res.status(200).json(result);
  } catch (error) {
    console.error('Contribution analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

/**
 * GET /api/analytics/payments
 * Get payment analytics
 */
router.get('/payments', authMiddleware, async (req, res) => {
  try {
    const payments = await Payment.findAll();
    const result = await analyticsService.trackPaymentMetrics(payments);

    res.status(200).json(result);
  } catch (error) {
    console.error('Payment analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

/**
 * GET /api/analytics/system
 * Get system metrics
 */
router.get('/system', authMiddleware, async (req, res) => {
  try {
    const result = await analyticsService.getSystemMetrics();

    res.status(200).json(result);
  } catch (error) {
    console.error('System metrics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

module.exports = router;

