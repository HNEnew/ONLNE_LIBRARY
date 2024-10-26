const { Sequelize } = require('sequelize');
require('dotenv').config()

console.log('Database password:', process.env.DB_PASS);

const sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
