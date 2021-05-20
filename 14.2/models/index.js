// import all models
const Post = require('./Post');
const User = require('./User');
const Vote = require('./Vote');
const Comment = require('./Comment');

// defines the relationship between User and Post models
// 1 User can have many Posts, but 1 Post must map to 1 User
User.hasMany(Post, {
  foreignKey: 'user_id'// links Post.user_id (the foreign primary key) to User.id (User's primary key)
});

// reverse association
Post.belongsTo(User, {
  foreignKey: 'user_id',// note how here the foreignKey refers to Post as well, aka the child
  onDelete: 'SET NULL'
});

// these two belongsToMany methods allow the User and Post models to query each other's information in the context of a vote by establishing a many-to-many relationship btwn the 2
// what this does is allow us to see all posts a user has voted on (query User), and how many votes a user creates (query Post)
User.belongsToMany(Post, {
  through: Vote,// we specify User and Post are connected through Vote
  as: 'voted_posts',

  foreignKey: 'user_id',// Vote.user_id is the key that connects to User
  onDelete: 'SET NULL'
});

Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id',// and Vote.post_id then connects to Post, linking User and Post together through Vote
  onDelete: 'SET NULL'
});

// next 4 functions directly connect Post and Vote, and Vote and User, so we can use the relay system established above. 
// These are the roads, those are the routes
Vote.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Post.hasMany(Vote, {
  foreignKey: 'post_id'
});

// a comment can be by 1 user on 1 post, but a single post can have many comments as a single user can make many comment
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Vote, Comment };
