const Sequelize = require('sequelize');
// when we use connection.js, all of the data from .env will be made available at process.env.<variable name>
require('dotenv').config();

// create connection to our database, pass in your MySQL information for username and password
// new Sequelize accepts the database name, MySQL username, and MySQL password respectively
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });

module.exports = sequelize;
