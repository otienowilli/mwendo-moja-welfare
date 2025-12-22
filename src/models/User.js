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
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true,
});

// Hash password before saving (if password field is provided)
User.beforeCreate(async (user) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(10);
    user.password_hash = await bcrypt.hash(user.password, salt);
  }
});

// Also hash password on update if it changes
User.beforeUpdate(async (user) => {
  const passwordToHash = user.password || user.password_hash;
  if (passwordToHash && (user.changed('password') || user.changed('password_hash'))) {
    const salt = await bcrypt.genSalt(10);
    user.password_hash = await bcrypt.hash(passwordToHash, salt);
  }
});

// Method to compare passwords
User.prototype.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password_hash);
};

module.exports = User;

