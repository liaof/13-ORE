const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create our User model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    // this.password = password of request account
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// initialize the model's data and configuration
// first param is an object that wil define the columns and data types for those columns
// 2nd param is an object that accepts certain options for the table
// see: https://sequelize.org/v5/manual/models-definition.html#configuration
User.init(
  {
    // define an id column
    id: {
      type: DataTypes.INTEGER,// use the special Sequelize DataTypes object provide what type of data it is
      allowNull: false,// this is the equivalent of SQL's `NOT NULL` option
      primaryKey: true,// instruct that this is the Primary Key
      autoIncrement: true// turn on auto increment
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,// there cannot be any duplicate email values in this table
      validate: {// check if our input is an email
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]// this means the password must be at least four characters long
      }
    }
  },
  {
    hooks: {// to use hooks, we must pass in an object labelled 'hooks' to the User.init() function
      // set up beforeCreate lifecycle "hook" functionality
      // The '*'async' keyword is used as a prefix to the function that contains the asynchronous function. 'await' can be used to
      // prefix the asynchonous function itself which hashes the value from the response and re-assigns it to the newUserData.password
      async beforeCreate(newUserData) {
        // first param is password from userData object, 2nd is the saltRound value (number of types hashed before final result)
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // set up beforeUpdate lifecycle "hook" functionality
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;
