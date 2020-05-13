const express = require('express');
const db = require('./data/db.js');

const router = express.Router();



router.post('/', (req, res) => {
    let post = req.body;

});

router.post('/:id/comments', (req, res) => {

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

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

module.exports = router;