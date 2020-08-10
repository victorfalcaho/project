const { Sequelize } = require('sequelize');

const sequelize = require('../database/database');

const Usuario = sequelize.define('usuario', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  usuario: Sequelize.STRING,
  contrasenia: Sequelize.STRING,
  tipo: Sequelize.INTEGER,
});

module.exports = Usuario;
