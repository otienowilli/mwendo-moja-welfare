const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Member = require('./Member');

const HostingEvent = sequelize.define('HostingEvent', {
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
  event_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  event_type: {
    type: DataTypes.ENUM('wedding', 'funeral', 'birthday', 'graduation', 'other'),
    allowNull: false,
  },
  event_location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  expected_guests: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'scheduled',
  },
  total_collected: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  created_by: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'hosting_events',
});

module.exports = HostingEvent;

