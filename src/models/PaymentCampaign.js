/**
 * Payment Campaign Model
 * Tracks M-Pesa payment collection campaigns sent to members
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PaymentCampaign = sequelize.define('PaymentCampaign', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Campaign title (e.g., "Monthly Contribution Collection")',
  },
  description: {
    type: DataTypes.TEXT,
    comment: 'Campaign description',
  },
  campaign_type: {
    type: DataTypes.ENUM('CONTRIBUTION', 'LOAN_REPAYMENT', 'WELFARE', 'CUSTOM'),
    defaultValue: 'CONTRIBUTION',
    comment: 'Type of payment being collected',
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Amount to be collected from each member',
  },
  vote_head_id: {
    type: DataTypes.UUID,
    comment: 'Vote head ID if this is a contribution campaign',
  },
  status: {
    type: DataTypes.ENUM('draft', 'active', 'completed', 'cancelled'),
    defaultValue: 'draft',
    comment: 'Campaign status',
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'Campaign start date',
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'Campaign end date',
  },
  target_members: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Number of members targeted',
  },
  responses_received: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Number of members who responded',
  },
  total_collected: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0,
    comment: 'Total amount collected so far',
  },
  created_by: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'Admin user who created the campaign',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'payment_campaigns',
  timestamps: true,
  underscored: true,
});

module.exports = PaymentCampaign;

