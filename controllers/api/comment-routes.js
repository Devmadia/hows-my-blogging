const router = require('express').Router();
const { Comment } = require('../../models');

// GET API Route to gather all comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes : [ 'id', 'comment_text', 'user_id', 'post_id' ]
    })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET API Route for creating comments
router.post('/', withAuth, (req, res) => {
    // check the session
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

// GET API Route for deleting comments
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where : {
            id : req.params.id
        }
    })
    .then((dbCommentData) => {
        if (!dbCommentData) {
            res.status(400).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbCommentData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;