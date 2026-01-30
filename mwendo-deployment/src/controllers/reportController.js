const Member = require('../models/Member');
const MemberContribution = require('../models/MemberContribution');
const Loan = require('../models/Loan');
const LoanRepayment = require('../models/LoanRepayment');
const WelfareIncident = require('../models/WelfareIncident');
const MemberSharesSavings = require('../models/MemberSharesSavings');
const GroupFinancial = require('../models/GroupFinancial');

const getMemberReport = async (req, res) => {
  try {
    const { member_id } = req.params;

    const member = await Member.findByPk(member_id, {
      include: [{ model: MemberSharesSavings }],
    });

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    const contributions = await MemberContribution.findAll({
      where: { member_id },
    });

    const loans = await Loan.findAll({
      where: { member_id },
    });

    const incidents = await WelfareIncident.findAll({
      where: { member_id },
    });

    res.json({
      member: member.toJSON(),
      contributions: {
        count: contributions.length,
        total: contributions.reduce((sum, c) => sum + parseFloat(c.amount), 0),
      },
      loans: {
        count: loans.length,
        total: loans.reduce((sum, l) => sum + parseFloat(l.principal_amount), 0),
      },
      incidents: {
        count: incidents.length,
        approved: incidents.filter(i => i.status === 'approved').length,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGroupFinancialReport = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const groupFinancial = await GroupFinancial.findOne({
      where: { financial_year: currentYear },
    });

    if (!groupFinancial) {
      return res.json({
        financial_year: currentYear,
        total_shares: 0,
        total_savings: 0,
        total_contributions: 0,
        total_loans_disbursed: 0,
        total_loans_repaid: 0,
        total_interest_earned: 0,
        total_expenses: 0,
      });
    }

    res.json(groupFinancial.toJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getContributionReport = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    const where = {};
    if (start_date && end_date) {
      where.contribution_date = {
        [require('sequelize').Op.between]: [new Date(start_date), new Date(end_date)],
      };
    }

    const contributions = await MemberContribution.findAll({
      where,
      include: [
        { model: Member, attributes: ['full_name', 'membership_card_number'] },
      ],
      order: [['contribution_date', 'DESC']],
    });

    const total = contributions.reduce((sum, c) => sum + parseFloat(c.amount), 0);
    const byStatus = {};
    contributions.forEach(c => {
      byStatus[c.status] = (byStatus[c.status] || 0) + 1;
    });

    res.json({
      period: { start_date, end_date },
      total_contributions: total,
      count: contributions.length,
      by_status: byStatus,
      contributions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLoanReport = async (req, res) => {
  try {
    const loans = await Loan.findAll({
      include: [{ model: Member, attributes: ['full_name', 'membership_card_number'] }],
    });

    const totalDisbursed = loans.reduce((sum, l) => sum + parseFloat(l.principal_amount), 0);
    const byStatus = {};
    loans.forEach(l => {
      byStatus[l.status] = (byStatus[l.status] || 0) + 1;
    });

    res.json({
      total_loans: loans.length,
      total_disbursed: totalDisbursed,
      by_status: byStatus,
      loans,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWelfareReport = async (req, res) => {
  try {
    const incidents = await WelfareIncident.findAll({
      include: [{ model: Member, attributes: ['full_name', 'membership_card_number'] }],
    });

    const totalApproved = incidents
      .filter(i => i.status === 'approved')
      .reduce((sum, i) => sum + parseFloat(i.amount_approved || 0), 0);

    const totalPaid = incidents
      .filter(i => i.status === 'paid')
      .reduce((sum, i) => sum + parseFloat(i.amount_paid || 0), 0);

    const byType = {};
    incidents.forEach(i => {
      byType[i.incident_type] = (byType[i.incident_type] || 0) + 1;
    });

    res.json({
      total_incidents: incidents.length,
      total_approved: totalApproved,
      total_paid: totalPaid,
      by_type: byType,
      incidents,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMemberListReport = async (req, res) => {
  try {
    const members = await Member.findAll({
      where: { status: 'active' },
      include: [{ model: MemberSharesSavings }],
      order: [['full_name', 'ASC']],
    });

    res.json({
      total_members: members.length,
      members,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getMemberReport,
  getGroupFinancialReport,
  getContributionReport,
  getLoanReport,
  getWelfareReport,
  getMemberListReport,
};

