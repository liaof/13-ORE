const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our Post model
class Post extends Model {
  static upvote(body, models) {// we can use Post.upvote() as if it were any other Sqequelize's built in methods
    // the following code is almost the same as post_routes.js Post.findAll, because it used to be in post_routes.js Post.upvote
    return models.Vote.create({
      user_id: body.user_id,
      post_id: body.post_id
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id
        },
        attributes: [
          'id',
          'post_url',
          'title',
          'created_at',
          [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
          {
            model: models.Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: models.User,
              attributes: ['username']
            }
          }
        ]
      });
    });
  }
}

// create fields/columns for Post model
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
  {// config metadata, including the naming conventions
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

module.exports = Post;
