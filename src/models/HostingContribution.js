const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Member = require('./Member');
const HostingEvent = require('./HostingEvent');

const HostingContribution = sequelize.define('HostingContribution', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  hosting_event_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: HostingEvent,
      key: 'id',
    },
  },
  member_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Member,
      key: 'id',
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  contribution_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
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
}, {
  timestamps: true,
  tableName: 'hosting_contributions',
});

module.exports = HostingContribution;

