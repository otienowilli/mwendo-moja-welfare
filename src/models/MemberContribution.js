const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Member = require('./Member');
const VoteHead = require('./VoteHead');

const MemberContribution = sequelize.define('MemberContribution', {
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
  vote_head_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: VoteHead,
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
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'member_contributions',
});

module.exports = MemberContribution;

