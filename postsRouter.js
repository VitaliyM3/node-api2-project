const express = require('express');
const db = require('./data/db.js');

const router = express.Router();



router.post('/', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
        db.insert(req.body)
            .then( post => {
                res.status(201).json(post);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error: "There was an error while saving the post to the database" });
            });
    };
});

router.post('/:id/comments', (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const comment = { ...req.body, post_id: id };
    if (!text) {
        res.status(400.).json({  errorMessage: "Please provide text for the comment." } );
    } else {
        db.findById(id)
            .then(post => {
                if(!post.length) {
                    res.status(404).json({ message: "The post with the specified ID does not exist." });
                } else {
                    db.insertComment(comment)
                        .then(comment => {
                            res.status(201).json(comment);
                        })
                        .catch(error => {
                            res.status(500).json({ error: "There was an error while saving the comment to the database" });
                        });
                }
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }
});

router.get('/', (req, res) => {
    db.find(req.query)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The posts information could not be retrieved."
            });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(post => {
            if (!post) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                return res.status(200).json(post);
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The post information could not be retrieved." })
        });

});

router.get('/:id/comments', (req, res) => {
    const {id} = req.params;
    db.findPostComments(id)
    .then(post => {
        if (post.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            return res.status(200).json(post)
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "The comments information could not be retrieved." })
    });

});

router.put('/:id', (req, res) => {
    const post = req.body;
    const{ id } = req.params;
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
        db.update(id, post)
            .then(updated => {
                if (updated) {
                    res.status(200).json(updated);
                } else {
                    res.status(404).json({ message: "The post with the specified ID does not exist." });
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error: "The post information could not be modified." })
            })
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(post => {
            if (post) {
                res.status(200).json({ message: "The post was deleted" })
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The post could not be removed" })
        })
});

module.exports = router;