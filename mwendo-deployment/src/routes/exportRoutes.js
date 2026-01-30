/**
 * Export Routes
 * PDF and Excel export endpoints
 */

const express = require('express');
const router = express.Router();
const exportService = require('../services/exportService');
const authMiddleware = require('../middleware/auth');
const { Member, Loan, Contribution } = require('../models');

/**
 * POST /api/export/members
 * Export members to Excel
 */
router.post('/members', authMiddleware, async (req, res) => {
  try {
    const members = await Member.findAll();

    const result = await exportService.exportMembersReport(members);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Members report exported successfully',
        data: result,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Failed to export members report',
        error: result.error,
      });
    }
  } catch (error) {
    console.error('Export members error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

/**
 * POST /api/export/loans
 * Export loans to Excel
 */
router.post('/loans', authMiddleware, async (req, res) => {
  try {
    const loans = await Loan.findAll();

    const result = await exportService.exportLoansReport(loans);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Loans report exported successfully',
        data: result,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Failed to export loans report',
        error: result.error,
      });
    }
  } catch (error) {
    console.error('Export loans error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

/**
 * POST /api/export/contributions
 * Export contributions to Excel
 */
router.post('/contributions', authMiddleware, async (req, res) => {
  try {
    const contributions = await Contribution.findAll();

    const result = await exportService.exportContributionsReport(contributions);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Contributions report exported successfully',
        data: result,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Failed to export contributions report',
        error: result.error,
      });
    }
  } catch (error) {
    console.error('Export contributions error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

/**
 * POST /api/export/financial-statement
 * Export financial statement to PDF
 */
router.post('/financial-statement', authMiddleware, async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    const financialData = {
      startDate,
      endDate,
      totalContributions: 0,
      totalLoans: 0,
      totalRepayments: 0,
      generatedAt: new Date(),
    };

    const result = await exportService.exportFinancialStatement(financialData);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Financial statement exported successfully',
        data: result,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Failed to export financial statement',
        error: result.error,
      });
    }
  } catch (error) {
    console.error('Export financial statement error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

/**
 * GET /api/export/files
 * List all export files
 */
router.get('/files', authMiddleware, async (req, res) => {
  try {
    const result = await exportService.listExportFiles();

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Export files retrieved successfully',
        data: result.files,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Failed to retrieve export files',
        error: result.error,
      });
    }
  } catch (error) {
    console.error('List export files error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

/**
 * DELETE /api/export/files/:filename
 * Delete export file
 */
router.delete('/files/:filename', authMiddleware, async (req, res) => {
  try {
    const { filename } = req.params;

    const result = await exportService.deleteExportFile(filename);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Export file deleted successfully',
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Failed to delete export file',
        error: result.error,
      });
    }
  } catch (error) {
    console.error('Delete export file error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

module.exports = router;

