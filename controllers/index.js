const router = require('express').Router();

// API routes
const apiRoutes = require('./api/');
const userRoutes = require('./api/user-routes.js');
const postRoutes = require('./api//post-routes');
const commentRoutes = require('./api//comment-routes');

router.use('/api', apiRoutes);

module.exports = router;
