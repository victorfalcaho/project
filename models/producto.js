const { Sequelize } = require('sequelize');

const sequelize = require('../database/database');

const Producto = sequelize.define('producto', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  titulo: Sequelize.STRING,
  descripcion: Sequelize.STRING,
  precio: Sequelize.INTEGER,
  estado: Sequelize.INTEGER,
  imagen: Sequelize.STRING,
  autor: Sequelize.STRING,
  tecnologia: Sequelize.STRING,
  zip: Sequelize.STRING,
});

module.exports = Producto;
