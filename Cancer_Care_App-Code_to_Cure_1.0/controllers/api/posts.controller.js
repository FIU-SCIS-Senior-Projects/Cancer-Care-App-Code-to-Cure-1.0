var config = require('config.json');
var express = require('express');
var router = express.Router();
var postService = require('services/post.service');


// routes
router.get('/', getAllPosts);
router.get('/:_id', getById);
router.post('/', create);
router.put('/:_id', update);
router.delete('/:_id', deletePost);

module.exports = router;

function getAllPosts(req, res) {
    postService.getAll()
        .then(function (postArray) {
            if (postArray) {
                res.send(postArray);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getById(req, res) {
    postService.getById(req.params._id)
        .then(function (post) {
            res.send(post);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function create(req, res) {
    postService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    postService.update(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deletePost(req, res) {

    postService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

