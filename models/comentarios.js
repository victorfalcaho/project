const { Sequelize } = require('sequelize');

const sequelize = require('../database/database');

const Comentarios = sequelize.define('comentarios', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  idusuario: Sequelize.INTEGER,
  idproducto: Sequelize.INTEGER,
  comentario: Sequelize.STRING,
});

module.exports = Comentarios;
