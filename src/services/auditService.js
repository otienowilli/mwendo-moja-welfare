/**
 * Audit Service
 * System audit logging and tracking
 */

const fs = require('fs');
const path = require('path');

class AuditService {
  constructor() {
    this.auditDir = path.join(__dirname, '../logs/audit');
    this.ensureAuditDir();
    this.auditLog = [];
  }

  ensureAuditDir() {
    if (!fs.existsSync(this.auditDir)) {
      fs.mkdirSync(this.auditDir, { recursive: true });
    }
  }

  async logAction(userId, action, resource, details = {}) {
    try {
      const auditEntry = {
        id: `audit_${Date.now()}`,
        timestamp: new Date().toISOString(),
        userId,
        action,
        resource,
        details,
        ipAddress: details.ipAddress || 'unknown',
        userAgent: details.userAgent || 'unknown',
      };

      this.auditLog.push(auditEntry);

      // Write to file
      const logFile = path.join(
        this.auditDir,
        `audit_${new Date().toISOString().split('T')[0]}.log`
      );

      fs.appendFileSync(
        logFile,
        JSON.stringify(auditEntry) + '\n'
      );

      console.log(`Audit logged: ${action} on ${resource}`);

      return { success: true, auditId: auditEntry.id };
    } catch (error) {
      console.error('Audit logging error:', error);
      return { success: false, error: error.message };
    }
  }

  async logLogin(userId, ipAddress, userAgent) {
    return await this.logAction(userId, 'LOGIN', 'AUTH', {
      ipAddress,
      userAgent,
    });
  }

  async logLogout(userId, ipAddress) {
    return await this.logAction(userId, 'LOGOUT', 'AUTH', { ipAddress });
  }

  async logMemberCreated(userId, memberId, memberData) {
    return await this.logAction(userId, 'CREATE', 'MEMBER', {
      memberId,
      memberData,
    });
  }

  async logMemberUpdated(userId, memberId, changes) {
    return await this.logAction(userId, 'UPDATE', 'MEMBER', {
      memberId,
      changes,
    });
  }

  async logMemberDeleted(userId, memberId) {
    return await this.logAction(userId, 'DELETE', 'MEMBER', { memberId });
  }

  async logLoanCreated(userId, loanId, loanData) {
    return await this.logAction(userId, 'CREATE', 'LOAN', {
      loanId,
      loanData,
    });
  }

  async logLoanApproved(userId, loanId, approvalData) {
    return await this.logAction(userId, 'APPROVE', 'LOAN', {
      loanId,
      approvalData,
    });
  }

  async logLoanRejected(userId, loanId, reason) {
    return await this.logAction(userId, 'REJECT', 'LOAN', {
      loanId,
      reason,
    });
  }

  async logContributionRecorded(userId, contributionId, amount) {
    return await this.logAction(userId, 'CREATE', 'CONTRIBUTION', {
      contributionId,
      amount,
    });
  }

  async logPaymentProcessed(userId, paymentId, amount, method) {
    return await this.logAction(userId, 'PROCESS', 'PAYMENT', {
      paymentId,
      amount,
      method,
    });
  }

  async getAuditLog(filters = {}) {
    try {
      let logs = [...this.auditLog];

      if (filters.userId) {
        logs = logs.filter((log) => log.userId === filters.userId);
      }

      if (filters.action) {
        logs = logs.filter((log) => log.action === filters.action);
      }

      if (filters.resource) {
        logs = logs.filter((log) => log.resource === filters.resource);
      }

      if (filters.startDate) {
        logs = logs.filter(
          (log) => new Date(log.timestamp) >= new Date(filters.startDate)
        );
      }

      if (filters.endDate) {
        logs = logs.filter(
          (log) => new Date(log.timestamp) <= new Date(filters.endDate)
        );
      }

      return { success: true, logs };
    } catch (error) {
      console.error('Get audit log error:', error);
      return { success: false, error: error.message };
    }
  }

  async getAuditStats() {
    try {
      const stats = {
        totalActions: this.auditLog.length,
        actionsByType: {},
        actionsByResource: {},
        actionsByUser: {},
      };

      this.auditLog.forEach((log) => {
        stats.actionsByType[log.action] =
          (stats.actionsByType[log.action] || 0) + 1;
        stats.actionsByResource[log.resource] =
          (stats.actionsByResource[log.resource] || 0) + 1;
        stats.actionsByUser[log.userId] =
          (stats.actionsByUser[log.userId] || 0) + 1;
      });

      return { success: true, stats };
    } catch (error) {
      console.error('Get audit stats error:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new AuditService();

