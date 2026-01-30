const MemberSharesSavings = require('../models/MemberSharesSavings');
const GroupFinancial = require('../models/GroupFinancial');
const Member = require('../models/Member');

const calculateDividends = async (req, res) => {
  try {
    const { financial_year } = req.body;

    if (!financial_year) {
      return res.status(400).json({ error: 'Financial year is required' });
    }

    // Get group financial data
    const groupFinancial = await GroupFinancial.findOne({
      where: { financial_year },
    });

    if (!groupFinancial) {
      return res.status(404).json({ error: 'No financial data for this year' });
    }

    // Get all members with their savings
    const members = await Member.findAll({
      where: { status: 'active' },
      include: [{ model: MemberSharesSavings }],
    });

    // Calculate dividends for each member
    // Formula: (Individual Shares + Individual Savings) × (Interest on Loans + Other Income) / (Total Group Shares + Total Group Savings)
    const totalGroupShares = groupFinancial.total_shares || 0;
    const totalGroupSavings = groupFinancial.total_savings || 0;
    const totalGroupBase = parseFloat(totalGroupShares) + parseFloat(totalGroupSavings);

    const interestOnLoans = groupFinancial.total_interest_earned || 0;
    const otherIncome = 0; // Can be configured
    const totalIncome = parseFloat(interestOnLoans) + otherIncome;

    const dividends = members.map(member => {
      const memberSavings = member.MemberSharesSavings;
      const individualShares = parseFloat(memberSavings?.total_shares || 0);
      const individualSavings = parseFloat(memberSavings?.total_savings || 0);
      const individualBase = individualShares + individualSavings;

      let dividendAmount = 0;
      if (totalGroupBase > 0) {
        dividendAmount = (individualBase * totalIncome) / totalGroupBase;
      }

      return {
        member_id: member.id,
        member_name: member.full_name,
        membership_card: member.membership_card_number,
        individual_shares: individualShares,
        individual_savings: individualSavings,
        individual_base: individualBase,
        dividend_amount: parseFloat(dividendAmount.toFixed(2)),
      };
    });

    const totalDividends = dividends.reduce((sum, d) => sum + d.dividend_amount, 0);

    res.json({
      financial_year,
      calculation_date: new Date(),
      group_financial: {
        total_shares: totalGroupShares,
        total_savings: totalGroupSavings,
        total_base: totalGroupBase,
        interest_on_loans: interestOnLoans,
        other_income: otherIncome,
        total_income: totalIncome,
      },
      dividends,
      summary: {
        total_members: dividends.length,
        total_dividends: parseFloat(totalDividends.toFixed(2)),
        average_dividend: parseFloat((totalDividends / dividends.length).toFixed(2)),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMemberDividend = async (req, res) => {
  try {
    const { member_id, financial_year } = req.params;

    const member = await Member.findByPk(member_id, {
      include: [{ model: MemberSharesSavings }],
    });

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    const groupFinancial = await GroupFinancial.findOne({
      where: { financial_year },
    });

    if (!groupFinancial) {
      return res.status(404).json({ error: 'No financial data for this year' });
    }

    const memberSavings = member.MemberSharesSavings;
    const individualShares = parseFloat(memberSavings?.total_shares || 0);
    const individualSavings = parseFloat(memberSavings?.total_savings || 0);
    const individualBase = individualShares + individualSavings;

    const totalGroupShares = groupFinancial.total_shares || 0;
    const totalGroupSavings = groupFinancial.total_savings || 0;
    const totalGroupBase = parseFloat(totalGroupShares) + parseFloat(totalGroupSavings);

    const interestOnLoans = groupFinancial.total_interest_earned || 0;
    const totalIncome = parseFloat(interestOnLoans);

    let dividendAmount = 0;
    if (totalGroupBase > 0) {
      dividendAmount = (individualBase * totalIncome) / totalGroupBase;
    }

    res.json({
      member_id,
      member_name: member.full_name,
      financial_year,
      individual_shares: individualShares,
      individual_savings: individualSavings,
      dividend_amount: parseFloat(dividendAmount.toFixed(2)),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  calculateDividends,
  getMemberDividend,
};

