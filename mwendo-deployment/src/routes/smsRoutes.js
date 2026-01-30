/**
 * SMS Routes
 * API endpoints for SMS notifications
 */

const express = require('express');
const router = express.Router();
const smsService = require('../services/smsService');
const authMiddleware = require('../middleware/auth');

/**
 * POST /api/sms/send
 * Send SMS to a single recipient
 */
router.post('/send', authMiddleware, async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;

    // Validation
    if (!phoneNumber || !message) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and message are required',
      });
    }

    // Send SMS
    const result = await smsService.sendSMS(phoneNumber, message);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'SMS sent successfully',
        data: result,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Failed to send SMS',
        error: result.error,
      });
    }
  } catch (error) {
    console.error('SMS send error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

/**
 * POST /api/sms/send-templated
 * Send templated SMS
 */
router.post('/send-templated', authMiddleware, async (req, res) => {
  try {
    const { phoneNumber, templateName, variables } = req.body;

    // Validation
    if (!phoneNumber || !templateName) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and template name are required',
      });
    }

    // Send templated SMS
    const result = await smsService.sendTemplatedSMS(
      phoneNumber,
      templateName,
      variables || {}
    );

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Templated SMS sent successfully',
        data: result,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Failed to send templated SMS',
        error: result.error,
      });
    }
  } catch (error) {
    console.error('Templated SMS send error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

/**
 * POST /api/sms/send-bulk
 * Send SMS to multiple recipients
 */
router.post('/send-bulk', authMiddleware, async (req, res) => {
  try {
    const { phoneNumbers, message } = req.body;

    // Validation
    if (!phoneNumbers || !Array.isArray(phoneNumbers) || !message) {
      return res.status(400).json({
        success: false,
        message: 'Phone numbers array and message are required',
      });
    }

    // Send bulk SMS
    const results = await smsService.sendBulkSMS(phoneNumbers, message);

    const successful = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    return res.status(200).json({
      success: true,
      message: `Bulk SMS sent: ${successful} successful, ${failed} failed`,
      data: {
        total: results.length,
        successful,
        failed,
        results,
      },
    });
  } catch (error) {
    console.error('Bulk SMS send error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

/**
 * GET /api/sms/status/:messageSid
 * Get SMS status
 */
router.get('/status/:messageSid', authMiddleware, async (req, res) => {
  try {
    const { messageSid } = req.params;

    if (!messageSid) {
      return res.status(400).json({
        success: false,
        message: 'Message SID is required',
      });
    }

    const status = await smsService.getSMSStatus(messageSid);

    if (status.success === false) {
      return res.status(400).json({
        success: false,
        message: 'Failed to get SMS status',
        error: status.error,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'SMS status retrieved successfully',
      data: status,
    });
  } catch (error) {
    console.error('SMS status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

/**
 * GET /api/sms/templates
 * Get available SMS templates
 */
router.get('/templates', authMiddleware, (req, res) => {
  try {
    const smsConfig = require('../config/smsConfig');
    const templates = Object.keys(smsConfig.templates).map((key) => ({
      name: key,
      subject: smsConfig.templates[key].subject,
      body: smsConfig.templates[key].body,
    }));

    return res.status(200).json({
      success: true,
      message: 'SMS templates retrieved successfully',
      data: templates,
    });
  } catch (error) {
    console.error('SMS templates error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

module.exports = router;

