const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Member = require('./Member');

const Loan = sequelize.define('Loan', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  member_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Member,
      key: 'id',
    },
  },
  loan_type: {
    type: DataTypes.ENUM('emergency', 'development', 'business'),
    allowNull: false,
  },
  principal_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  interest_rate: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  loan_duration_months: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  disbursement_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  maturity_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'disbursed', 'completed', 'defaulted'),
    allowNull: false,
    defaultValue: 'pending',
  },
  approved_by: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  approval_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  purpose: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  guarantor_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'loans',
});

module.exports = Loan;

