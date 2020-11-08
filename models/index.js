const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

/* A user can make many posts. But a post only belongs to a single user, 
and never many users. By this relationship definition, we know we have a 
one-to-many relationship*/

User.hasMany(Post, {
    foreignKey: 'user_id',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

module.exports = {
    User,
    Comment,
    Post
};