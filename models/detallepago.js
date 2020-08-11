const { Sequelize } = require('sequelize');

const sequelize = require('../database/database');

const DetallePago = sequelize.define('detallepago', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  producto: Sequelize.STRING,
  precio: Sequelize.INTEGER,
  descripcion: Sequelize.STRING,
  tipodepago: Sequelize.STRING,
  autor: Sequelize.STRING,
  tecnologia: Sequelize.STRING,
});

module.exports = DetallePago;
