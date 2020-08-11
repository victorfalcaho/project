const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node_complete', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
  logging: false,
});

module.exports = sequelize;
