const router = require("express").Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection.js');

// GET /api/user -- this is equivalent of "SELECT * FROM users;"
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    User.findAll({
      attributes: { exclude: ['password'] }
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/user/1 -- this is equivalent of "SELECT * FROM users WHERE id = 1"
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
            model: Post,
            attributes: ['id', 'title', 'post_url', 'created_at']
            },
            {
                model      : Comment,
                attributes : [ 'id', 'comment_text', 'created_at' ],
                include    : {
                    model      : Post,
                    attributes : [ 'title' ]
                }
            }
        ]
    })
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST api/user -- create a user after signing up
router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.userId = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
    
            res.json(dbUserData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT /api/user/1 to update a user by id
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
          id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE api/user/1 - to delete a user by id reference
router.delete("/user/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;