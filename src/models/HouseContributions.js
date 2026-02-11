const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Member = require('./Member');

const HouseContributions = sequelize.define('HouseContributions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  member_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Member,
      key: 'id',
    },
  },
  house_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  // Vote Head Columns - REG, ENTRY, CARD, SHAR, SAVI, ADMN, S/FUND, FINE, UNIF, MERR, ANNIV, SINDI, MEAL, JIKON
  reg: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  entry: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  card: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  shar: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  savi: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  admn: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  s_fund: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  fine: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  unif: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  merr: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  anniv: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  sindi: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  meal: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  jikon: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  contribution_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  recorded_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'house_contributions',
  timestamps: true,
  underscored: true,
});

// Association
HouseContributions.belongsTo(Member, { foreignKey: 'member_id' });

module.exports = HouseContributions;

