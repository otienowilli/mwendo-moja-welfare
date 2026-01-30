const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Member = sequelize.define('Member', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  membership_card_number: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  national_id: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  middle_name: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  full_name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
    unique: true,
  },
  sex: {
    type: DataTypes.ENUM('Male', 'Female'),
  },
  date_of_birth: {
    type: DataTypes.DATE,
  },
  phone_number: {
    type: DataTypes.STRING(20),
  },
  residence: {
    type: DataTypes.STRING(100),
  },
  role_in_group: {
    type: DataTypes.STRING(50),
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'archived'),
    defaultValue: 'active',
  },
  joined_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'members',
  timestamps: true,
  underscored: true,
});

module.exports = Member;

