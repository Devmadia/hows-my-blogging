const router = require('express').Router();

// API routes
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

router.use((req, res) => {
	res.status(404).end();
});

module.exports = router;
