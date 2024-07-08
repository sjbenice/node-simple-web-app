const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('User', {
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10000,
  },
});

module.exports = User;
