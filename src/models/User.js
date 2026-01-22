const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password: {
    type: DataTypes.VIRTUAL,
    set(value) {
      this.setDataValue('password', value);
    },
  },
  role: {
    type: DataTypes.ENUM('admin', 'treasurer', 'secretary'),
    allowNull: false,
  },
  full_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  password_reset_token: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  password_reset_expires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true,
});

// Note: Password hashing is now handled in the controller
// to avoid double-hashing issues

// Method to compare passwords
User.prototype.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password_hash);
};

module.exports = User;

