const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Loan = require('./Loan');

const LoanRepayment = sequelize.define('LoanRepayment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  loan_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Loan,
      key: 'id',
    },
  },
  repayment_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  principal_paid: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  interest_paid: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  total_paid: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.ENUM('cash', 'mpesa', 'bank_transfer', 'cheque'),
    allowNull: false,
    defaultValue: 'cash',
  },
  reference_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'rejected'),
    allowNull: false,
    defaultValue: 'pending',
  },
  recorded_by: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'loan_repayments',
});

module.exports = LoanRepayment;

