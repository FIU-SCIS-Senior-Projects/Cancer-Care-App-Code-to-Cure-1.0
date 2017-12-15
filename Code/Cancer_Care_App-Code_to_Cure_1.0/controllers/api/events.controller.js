var config = require('config.json');
var express = require('express');
var router = express.Router();
var eventService = require('services/event.service');


// routes
router.get('/', getAllEvents);
router.post('/', create);
router.get('/:_id', getById);
router.put('/:_id', update);
router.delete('/:_id', deleteEvent);

module.exports = router;

function getAllEvents(req, res) {
    eventService.getAll()
        .then(function (eventArray) {
            if (eventArray) {
                res.send(eventArray);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function create(req, res) {
    eventService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getById(req, res) {
    eventService.getById(req.params._id)
        .then(function (event) {
            res.send(event);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    eventService.update(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteEvent(req, res) {

    eventService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

