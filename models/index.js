const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// link user and post with a foreign key constraint, cascade on deletion
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// link user and comment with a foreign key constraint, cascade on deletion
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// link comment and post with a foreign key constraint, cascade on deletion
Comment.hasMany(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});
  
// posts are made by the user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// comments are made by the user
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// export user post and comment
module.exports = { User, Post, Comment };
