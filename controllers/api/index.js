const router = require('express').Router();

// API routes
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// this file will serve as a means to collect all of the API routes and package them up

// route for userRoutes
router.use('/user', userRoutes);
// route for postRoutes
router.use('/posts', postRoutes);
// route for commentRoutes
router.use('/comments', commentRoutes);

module.exports = router;