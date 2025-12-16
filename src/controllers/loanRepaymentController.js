const LoanRepayment = require('../models/LoanRepayment');
const Loan = require('../models/Loan');
const MemberSharesSavings = require('../models/MemberSharesSavings');

const recordRepayment = async (req, res) => {
  try {
    const {
      loan_id,
      principal_paid,
      interest_paid,
      payment_method,
      reference_number,
      notes,
    } = req.body;

    // Validate required fields
    if (!loan_id || !principal_paid || !interest_paid) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    // Check loan exists
    const loan = await Loan.findByPk(loan_id);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    const total_paid = parseFloat(principal_paid) + parseFloat(interest_paid);

    const repayment = await LoanRepayment.create({
      loan_id,
      repayment_date: new Date(),
      principal_paid,
      interest_paid,
      total_paid,
      payment_method: payment_method || 'cash',
      reference_number,
      status: 'pending',
      recorded_by: req.user.id,
      notes,
    });

    res.status(201).json({
      message: 'Repayment recorded successfully',
      repayment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const confirmRepayment = async (req, res) => {
  try {
    const { id } = req.params;

    const repayment = await LoanRepayment.findByPk(id);
    if (!repayment) {
      return res.status(404).json({ error: 'Repayment not found' });
    }

    await repayment.update({ status: 'confirmed' });

    // Update member shares/savings
    const loan = await Loan.findByPk(repayment.loan_id);
    const memberSavings = await MemberSharesSavings.findOne({
      where: { member_id: loan.member_id },
    });

    if (memberSavings) {
      await memberSavings.increment('total_loans_repaid', {
        by: repayment.principal_paid,
      });
      await memberSavings.decrement('outstanding_loan_balance', {
        by: repayment.principal_paid,
      });
    }

    res.json({
      message: 'Repayment confirmed successfully',
      repayment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLoanRepayments = async (req, res) => {
  try {
    const { loan_id } = req.params;
    const { status } = req.query;

    const where = { loan_id };
    if (status) where.status = status;

    const repayments = await LoanRepayment.findAll({
      where,
      order: [['repayment_date', 'DESC']],
    });

    const totalRepaid = repayments.reduce((sum, r) => sum + parseFloat(r.total_paid), 0);

    res.json({
      count: repayments.length,
      totalRepaid,
      repayments,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLoanBalance = async (req, res) => {
  try {
    const { loan_id } = req.params;

    const loan = await Loan.findByPk(loan_id);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    const repayments = await LoanRepayment.findAll({
      where: { loan_id, status: 'confirmed' },
    });

    const totalRepaid = repayments.reduce((sum, r) => sum + parseFloat(r.principal_paid), 0);
    const balance = parseFloat(loan.principal_amount) - totalRepaid;

    res.json({
      loan_id,
      principal_amount: loan.principal_amount,
      total_repaid: totalRepaid,
      outstanding_balance: balance,
      repayment_count: repayments.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  recordRepayment,
  confirmRepayment,
  getLoanRepayments,
  getLoanBalance,
};

