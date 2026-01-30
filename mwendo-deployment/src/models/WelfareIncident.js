const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Member = require('./Member');

const WelfareIncident = sequelize.define('WelfareIncident', {
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
  incident_type: {
    type: DataTypes.ENUM('death', 'illness', 'accident', 'emergency', 'other'),
    allowNull: false,
  },
  incident_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  amount_approved: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  amount_paid: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM('reported', 'approved', 'paid', 'rejected'),
    allowNull: false,
    defaultValue: 'reported',
  },
  approved_by: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  approval_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  payment_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  reported_by: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'welfare_incidents',
});

module.exports = WelfareIncident;

