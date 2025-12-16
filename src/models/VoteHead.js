const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const VoteHead = sequelize.define('VoteHead', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  expected_amount: {
    type: DataTypes.DECIMAL(10, 2),
  },
  duration_months: {
    type: DataTypes.INTEGER,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'vote_heads',
  timestamps: true,
  underscored: true,
});

module.exports = VoteHead;

