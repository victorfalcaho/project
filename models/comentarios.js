const { Sequelize } = require('sequelize');

const sequelize = require('../database/database');

const Comentarios = sequelize.define('comentarios', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  comentario: Sequelize.STRING,
});

module.exports = Comentarios;
