/**
 * M-Pesa Payment Request Model
 * Tracks individual M-Pesa payment requests sent to members
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MpesaPaymentRequest = sequelize.define('MpesaPaymentRequest', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  campaign_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'Payment campaign ID',
  },
  member_id: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: 'Member ID',
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Member phone number for M-Pesa',
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Amount requested',
  },
  checkout_request_id: {
    type: DataTypes.STRING,
    comment: 'M-Pesa checkout request ID',
  },
  status: {
    type: DataTypes.ENUM('pending', 'prompted', 'completed', 'failed', 'cancelled'),
    defaultValue: 'pending',
    comment: 'Payment request status',
  },
  mpesa_receipt: {
    type: DataTypes.STRING,
    comment: 'M-Pesa transaction receipt number',
  },
  mpesa_transaction_id: {
    type: DataTypes.STRING,
    comment: 'M-Pesa transaction ID',
  },
  payment_date: {
    type: DataTypes.DATE,
    comment: 'Date payment was completed',
  },
  error_message: {
    type: DataTypes.TEXT,
    comment: 'Error message if payment failed',
  },
  sent_at: {
    type: DataTypes.DATE,
    comment: 'When the prompt was sent to member',
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
  tableName: 'mpesa_payment_requests',
  timestamps: true,
  underscored: true,
});

module.exports = MpesaPaymentRequest;

