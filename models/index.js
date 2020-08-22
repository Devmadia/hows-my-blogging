const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

/* A user can make many posts. But a post only belongs to a single user, 
and never many users. By this relationship definition, we know we have a 
one-to-many relationship*/

Post.belongsTo(User, {});
Post.hasMany(Comment, {});
Comment.belongsTo(User, {});

module.exports = {
    User,
    Comment,
    Post
};