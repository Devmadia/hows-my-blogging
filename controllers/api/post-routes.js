const router = require("express").Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', withAuth, (req, res) => {
    console.log('======================');
    Post.findAll({
        attributes: [
          'id', 
          'post_url', 
          'title', 
          'created_at'
        ],
        order: [['created_at', 'DESC']],
        /* order property is assigned a nested array that orders by created_at column in descending order
        to display latest articles first */
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get-one query that will be used as a request parameter
router.get('/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_url', 'title', 'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id', 
                    'post_url', 
                    'title', 
                    'created_at'
                  ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
              model: User,
              attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Create a POST
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Update a post's title
router.put('/:id', withAuth, (req, res) => {
    Post.update(
      {
        title: req.body.title,
        content: req.body.content
      },
      {
          where: {
              id: req.params.id
          }
      }
    )
    .then((dbPostData) => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Delete a Post
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;
