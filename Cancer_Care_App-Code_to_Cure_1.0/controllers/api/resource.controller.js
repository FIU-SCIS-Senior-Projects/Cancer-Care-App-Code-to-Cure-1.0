var config = require('config.json');
var express = require('express');
var router = express.Router();
var resourceService = require('services/resource.service');


// routes
router.get('/', getAllResources);
router.get('/:_id', getById);
router.post('/', create);
router.put('/:_id', update);
router.delete('/:_id', deleteResource);

module.exports = router;

function getAllResources(req, res) {
    resourceService.getAll()
        .then(function (resourceArray) {
            if (resourceArray) {
                res.send(resourceArray);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getById(req, res) {
    resourceService.getById(req.params._id)
        .then(function (resource) {
            res.send(resource);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function create(req, res) {
    resourceService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    resourceService.update(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteResource(req, res) {

    resourceService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

