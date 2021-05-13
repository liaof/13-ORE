const User = require('./User');
const Post = require('./Post');


// defines the relationship between User and Post models
// 1 User can have many Posts, but 1 Post must map to 1 User
User.hasMany(Post, {
    foreignKey: 'user_id'// links Post.user_id (the foreign primary key) to User.id (User's primary key)
});

// reverse association
Post.belongsTo(User, {
    foreignKey: 'user_id',// note how here the foreignKey refers to Post as well, aka the child
});

module.exports = { User , Post};
