/**
 * Admin Routes
 * System administration endpoints
 */

const express = require('express');
const router = express.Router();
const adminService = require('../services/adminService');
const auditService = require('../services/auditService');
const analyticsService = require('../services/analyticsService');
const authMiddleware = require('../middleware/auth');

// Middleware to check admin role
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Admin access required',
    });
  }
};

/**
 * GET /api/admin/status
 * Get system status
 */
router.get('/status', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const result = await adminService.getSystemStatus();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

/**
 * GET /api/admin/config
 * Get system configuration
 */
router.get('/config', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const result = await adminService.getSystemConfig();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

/**
 * PUT /api/admin/config
 * Update system configuration
 */
router.put('/config', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const result = await adminService.updateSystemConfig(req.body);
    await auditService.logAction(req.user.id, 'UPDATE', 'SYSTEM_CONFIG', req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

/**
 * POST /api/admin/maintenance/enable
 * Enable maintenance mode
 */
router.post('/maintenance/enable', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    const result = await adminService.enableMaintenanceMode(message);
    await auditService.logAction(req.user.id, 'ENABLE', 'MAINTENANCE_MODE', { message });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

/**
 * POST /api/admin/maintenance/disable
 * Disable maintenance mode
 */
router.post('/maintenance/disable', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const result = await adminService.disableMaintenanceMode();
    await auditService.logAction(req.user.id, 'DISABLE', 'MAINTENANCE_MODE');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

/**
 * POST /api/admin/backup
 * Create system backup
 */
router.post('/backup', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const result = await adminService.createBackup();
    await auditService.logAction(req.user.id, 'CREATE', 'BACKUP');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

/**
 * POST /api/admin/backup/restore
 * Restore system backup
 */
router.post('/backup/restore', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { backupId } = req.body;
    const result = await adminService.restoreBackup(backupId);
    await auditService.logAction(req.user.id, 'RESTORE', 'BACKUP', { backupId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

/**
 * GET /api/admin/health
 * Get system health
 */
router.get('/health', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const result = await adminService.getSystemHealth();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

/**
 * GET /api/admin/audit-logs
 * Get audit logs
 */
router.get('/audit-logs', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const filters = req.query;
    const result = await auditService.getAuditLog(filters);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

/**
 * GET /api/admin/analytics
 * Get system analytics
 */
router.get('/analytics', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const result = await analyticsService.getSystemMetrics();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

module.exports = router;

