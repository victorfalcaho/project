const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../database/database');

const Pago = sequelize.define('pago', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  total: Sequelize.INTEGER,
  updatedAt: {
    type: DataTypes.DATEONLY,
  },
  createdAt: {
    type: DataTypes.DATEONLY,
  },
});

module.exports = Pago;
