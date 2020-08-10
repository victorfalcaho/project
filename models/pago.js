const { Sequelize } = require('sequelize');

const sequelize = require('../database/database');

const Pago = sequelize.define('pago', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id: Sequelize.STRING,
  total: Sequelize.INTERGER,
  usuario: Sequelize.STRING,
});

module.exports = Pago;
