var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('resources');

var service = {};

service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function getAll() {
    var deferred = Q.defer();

    db.resources.find().toArray(function(err, resourceArray) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        if (resourceArray) {
            // return resources
            deferred.resolve(resourceArray);
        } else {
            // resources not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.resources.findById(_id, function (err, resource) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve(resource);
    });

    return deferred.promise;
}

function create(resource) {
    var deferred = Q.defer();

    db.resources.insert(
        resource,
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function update(resourceContent) {
    var deferred = Q.defer();

    var _id = resourceContent.resourceData._id;
    var comment = resourceContent.resourceData.comment;
    var author = resourceContent.userData.username;

    db.resources.update(
        { _id: mongo.helper.toObjectID(_id) },
        { $push: {comments: {body: comment, author: author}}, $inc: {replies: 1} },
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.resources.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}