// import the Sequelize constructor from the library, and use it to create a new connection to the database
const Sequelize = require('sequelize');
// when we use connection.js, all of the data from .env will be made available at process.env.<variable name>
require('dotenv').config();

let sequelize;
// create connection to our database, pass in your MySQL information for username and password
// new Sequelize accepts the database name, MySQL username, and MySQL password respectively
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}

module.exports = sequelize;
