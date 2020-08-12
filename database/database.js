const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'project_final',
  'administrador@mysql-server-utm',
  'Contrasenia1',
  {
    dialect: 'mysql',
    host: 'mysql-server-utm.mysql.database.azure.com',
    logging: false,
  }
);

module.exports = sequelize;
