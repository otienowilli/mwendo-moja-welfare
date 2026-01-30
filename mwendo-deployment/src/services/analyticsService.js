/**
 * Analytics Service
 * System analytics and reporting
 */

class AnalyticsService {
  constructor() {
    this.metrics = {
      members: {},
      loans: {},
      contributions: {},
      payments: {},
      system: {},
    };
  }

  async trackMemberMetrics(members) {
    try {
      this.metrics.members = {
        total: members.length,
        active: members.filter((m) => m.status === 'active').length,
        inactive: members.filter((m) => m.status === 'inactive').length,
        suspended: members.filter((m) => m.status === 'suspended').length,
        byJoinDate: this.groupByDate(members, 'joinDate'),
      };

      return { success: true, metrics: this.metrics.members };
    } catch (error) {
      console.error('Member metrics error:', error);
      return { success: false, error: error.message };
    }
  }

  async trackLoanMetrics(loans) {
    try {
      this.metrics.loans = {
        total: loans.length,
        approved: loans.filter((l) => l.status === 'approved').length,
        pending: loans.filter((l) => l.status === 'pending').length,
        rejected: loans.filter((l) => l.status === 'rejected').length,
        repaid: loans.filter((l) => l.status === 'repaid').length,
        defaulted: loans.filter((l) => l.status === 'defaulted').length,
        totalAmount: loans.reduce((sum, l) => sum + (l.amount || 0), 0),
        averageAmount: loans.length > 0
          ? loans.reduce((sum, l) => sum + (l.amount || 0), 0) / loans.length
          : 0,
      };

      return { success: true, metrics: this.metrics.loans };
    } catch (error) {
      console.error('Loan metrics error:', error);
      return { success: false, error: error.message };
    }
  }

  async trackContributionMetrics(contributions) {
    try {
      this.metrics.contributions = {
        total: contributions.length,
        totalAmount: contributions.reduce(
          (sum, c) => sum + (c.amount || 0),
          0
        ),
        averageAmount: contributions.length > 0
          ? contributions.reduce((sum, c) => sum + (c.amount || 0), 0) /
            contributions.length
          : 0,
        byMonth: this.groupByMonth(contributions, 'date'),
      };

      return { success: true, metrics: this.metrics.contributions };
    } catch (error) {
      console.error('Contribution metrics error:', error);
      return { success: false, error: error.message };
    }
  }

  async trackPaymentMetrics(payments) {
    try {
      this.metrics.payments = {
        total: payments.length,
        totalAmount: payments.reduce((sum, p) => sum + (p.amount || 0), 0),
        byMethod: this.groupByProperty(payments, 'method'),
        byStatus: this.groupByProperty(payments, 'status'),
      };

      return { success: true, metrics: this.metrics.payments };
    } catch (error) {
      console.error('Payment metrics error:', error);
      return { success: false, error: error.message };
    }
  }

  async getSystemMetrics() {
    try {
      const metrics = {
        timestamp: new Date(),
        members: this.metrics.members,
        loans: this.metrics.loans,
        contributions: this.metrics.contributions,
        payments: this.metrics.payments,
      };

      return { success: true, metrics };
    } catch (error) {
      console.error('System metrics error:', error);
      return { success: false, error: error.message };
    }
  }

  async getDashboardData() {
    try {
      return {
        success: true,
        data: {
          members: this.metrics.members,
          loans: this.metrics.loans,
          contributions: this.metrics.contributions,
          payments: this.metrics.payments,
          summary: {
            totalMembers: this.metrics.members.total || 0,
            totalLoans: this.metrics.loans.total || 0,
            totalContributions: this.metrics.contributions.totalAmount || 0,
            totalPayments: this.metrics.payments.totalAmount || 0,
          },
        },
      };
    } catch (error) {
      console.error('Dashboard data error:', error);
      return { success: false, error: error.message };
    }
  }

  groupByDate(items, dateField) {
    const grouped = {};
    items.forEach((item) => {
      const date = new Date(item[dateField]).toISOString().split('T')[0];
      grouped[date] = (grouped[date] || 0) + 1;
    });
    return grouped;
  }

  groupByMonth(items, dateField) {
    const grouped = {};
    items.forEach((item) => {
      const date = new Date(item[dateField]);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      grouped[month] = (grouped[month] || 0) + (item.amount || 0);
    });
    return grouped;
  }

  groupByProperty(items, property) {
    const grouped = {};
    items.forEach((item) => {
      const value = item[property];
      grouped[value] = (grouped[value] || 0) + 1;
    });
    return grouped;
  }
}

module.exports = new AnalyticsService();

