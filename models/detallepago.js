const { Sequelize } = require('sequelize');

const sequelize = require('../database/database');

const DetallePago = sequelize.define('pago', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  idpago: Sequelize.INTERGER,
  producto: Sequelize.STRING,
  precio: Sequelize.INTERGER,
  descripcion: Sequelize.STRING,
  tipodepago: Sequelize.STRING,
  autor: Sequelize.STRING,
  tecnologia: Sequelize.STRING,
});

module.exports = DetallePago;
