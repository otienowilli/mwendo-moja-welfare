const MemberContribution = require('../models/MemberContribution');
const Member = require('../models/Member');
const VoteHead = require('../models/VoteHead');
const MemberSharesSavings = require('../models/MemberSharesSavings');
const GroupFinancial = require('../models/GroupFinancial');

const recordContribution = async (req, res) => {
  try {
    const {
      member_id,
      vote_head_id,
      amount,
      payment_method,
      reference_number,
      notes,
    } = req.body;

    // Validate required fields
    if (!member_id || !vote_head_id || !amount) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    // Validate amount is positive
    if (amount <= 0) {
      return res.status(400).json({ error: 'Amount must be positive' });
    }

    // Check member exists
    const member = await Member.findByPk(member_id);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    // Check vote head exists
    const voteHead = await VoteHead.findByPk(vote_head_id);
    if (!voteHead) {
      return res.status(404).json({ error: 'Vote head not found' });
    }

    // Create contribution
    const contribution = await MemberContribution.create({
      member_id,
      vote_head_id,
      amount,
      payment_method: payment_method || 'cash',
      reference_number,
      status: 'pending',
      recorded_by: req.user.id,
      notes,
    });

    res.status(201).json({
      message: 'Contribution recorded successfully',
      contribution,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const confirmContribution = async (req, res) => {
  try {
    const { id } = req.params;

    const contribution = await MemberContribution.findByPk(id);
    if (!contribution) {
      return res.status(404).json({ error: 'Contribution not found' });
    }

    // Update contribution status
    await contribution.update({ status: 'confirmed' });

    // Update member shares/savings
    const memberSavings = await MemberSharesSavings.findOne({
      where: { member_id: contribution.member_id },
    });

    if (memberSavings) {
      await memberSavings.increment('total_contributions', {
        by: contribution.amount,
      });
    }

    // Update group financials
    const currentYear = new Date().getFullYear();
    let groupFinancial = await GroupFinancial.findOne({
      where: { financial_year: currentYear },
    });

    if (!groupFinancial) {
      groupFinancial = await GroupFinancial.create({
        financial_year: currentYear,
      });
    }

    await groupFinancial.increment('total_contributions', {
      by: contribution.amount,
    });

    res.json({
      message: 'Contribution confirmed successfully',
      contribution,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMemberContributions = async (req, res) => {
  try {
    const { member_id } = req.params;
    const { status } = req.query;

    const where = { member_id };
    if (status) where.status = status;

    const contributions = await MemberContribution.findAll({
      where,
      include: [
        { model: VoteHead, attributes: ['name', 'description'] },
      ],
      order: [['contribution_date', 'DESC']],
    });

    const total = contributions.reduce((sum, c) => sum + parseFloat(c.amount), 0);

    res.json({
      count: contributions.length,
      total,
      contributions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getContributionSummary = async (req, res) => {
  try {
    const { member_id } = req.params;

    const memberSavings = await MemberSharesSavings.findOne({
      where: { member_id },
    });

    if (!memberSavings) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.json({
      member_id,
      total_contributions: memberSavings.total_contributions,
      total_shares: memberSavings.total_shares,
      total_savings: memberSavings.total_savings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllContributions = async (req, res) => {
  try {
    const contributions = await MemberContribution.findAll({
      include: [
        { model: Member, attributes: ['id', 'full_name', 'membership_card_number'] },
        { model: VoteHead, attributes: ['id', 'name'] },
      ],
      order: [['created_at', 'DESC']],
    });

    res.json({
      data: contributions,
      count: contributions.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  recordContribution,
  confirmContribution,
  getMemberContributions,
  getContributionSummary,
  getAllContributions,
};

