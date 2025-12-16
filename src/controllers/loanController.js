const Loan = require('../models/Loan');
const LoanRepayment = require('../models/LoanRepayment');
const Member = require('../models/Member');
const MemberSharesSavings = require('../models/MemberSharesSavings');

const applyForLoan = async (req, res) => {
  try {
    const {
      member_id,
      loan_type,
      principal_amount,
      interest_rate,
      loan_duration_months,
      purpose,
      guarantor_id,
    } = req.body;

    // Validate required fields
    if (!member_id || !loan_type || !principal_amount || !interest_rate || !loan_duration_months) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    // Validate member exists
    const member = await Member.findByPk(member_id);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    // Calculate maturity date
    const disbursement_date = new Date();
    const maturity_date = new Date(disbursement_date);
    maturity_date.setMonth(maturity_date.getMonth() + loan_duration_months);

    const loan = await Loan.create({
      member_id,
      loan_type,
      principal_amount,
      interest_rate,
      loan_duration_months,
      disbursement_date,
      maturity_date,
      status: 'pending',
      purpose,
      guarantor_id,
    });

    res.status(201).json({
      message: 'Loan application submitted successfully',
      loan,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const approveLoan = async (req, res) => {
  try {
    const { id } = req.params;

    const loan = await Loan.findByPk(id);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    await loan.update({
      status: 'approved',
      approved_by: req.user.id,
      approval_date: new Date(),
    });

    res.json({
      message: 'Loan approved successfully',
      loan,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const disburseLoan = async (req, res) => {
  try {
    const { id } = req.params;

    const loan = await Loan.findByPk(id);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    if (loan.status !== 'approved') {
      return res.status(400).json({ error: 'Loan must be approved before disbursement' });
    }

    await loan.update({
      status: 'disbursed',
      disbursement_date: new Date(),
    });

    // Update member shares/savings
    const memberSavings = await MemberSharesSavings.findOne({
      where: { member_id: loan.member_id },
    });

    if (memberSavings) {
      await memberSavings.increment('total_loans_taken', {
        by: loan.principal_amount,
      });
      await memberSavings.increment('outstanding_loan_balance', {
        by: loan.principal_amount,
      });
    }

    res.json({
      message: 'Loan disbursed successfully',
      loan,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLoanById = async (req, res) => {
  try {
    const { id } = req.params;

    const loan = await Loan.findByPk(id, {
      include: [{ model: Member, attributes: ['full_name', 'membership_card_number'] }],
    });

    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    res.json(loan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMemberLoans = async (req, res) => {
  try {
    const { member_id } = req.params;
    const { status } = req.query;

    const where = { member_id };
    if (status) where.status = status;

    const loans = await Loan.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      count: loans.length,
      loans,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  applyForLoan,
  approveLoan,
  disburseLoan,
  getLoanById,
  getMemberLoans,
};

