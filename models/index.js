const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

/* A user can make many posts. But a post only belongs to a single user, 
and never many users. By this relationship definition, we know we have a 
one-to-many relationship*/

User.hasMany(Post, {
    foreignKey: 'userId',
});

Post.belongsTo(User, {
    foreignKey: 'userId',
});

Comment.belongsTo(User, {
    foreignKey: 'userId',
});

Post.hasMany(Comment, {
    foreignKey: 'userId',
});






module.exports = {
    User,
    Comment,
    Post
};