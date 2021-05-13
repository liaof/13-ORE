const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model {}

// create fields/columns for Post model and initialise
Post.init(
    // this arguement defines the Post schema aka fields and properties
    {
      id: {// the id field is the primary key here
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      post_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isURL: true// make sure is a verified, valid link
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',// create a reference to the User model
          key: 'id'// by matching Post's key to User's id field
        }
      }
    },
    // config metadata, including the naming conventions
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
    }
  );

  module.exports = Post;