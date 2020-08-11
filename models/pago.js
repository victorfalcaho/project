const { Sequelize } = require('sequelize');

const sequelize = require('../database/database');

const Pago = sequelize.define('pago', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  total: Sequelize.INTEGER,
});

module.exports = Pago;
