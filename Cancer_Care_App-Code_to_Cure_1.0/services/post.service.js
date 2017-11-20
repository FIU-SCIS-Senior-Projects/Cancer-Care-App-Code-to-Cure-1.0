var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('posts');

var service = {};

service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;

module.exports = service;

function getAll() {
    var deferred = Q.defer();

    db.posts.find().toArray(function(err, postArray) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        if (postArray) {
            // return posts
            deferred.resolve(postArray);
        } else {
            // posts not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.posts.findById(_id, function (err, post) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve(post);
    });

    return deferred.promise;
}

function create(postContent) {
    var deferred = Q.defer();
    
    var title = postContent.postData.title;
    var body = postContent.postData.body;
    var author = postContent.userData.username;

    db.posts.insert(
        {title: title, body: body, author: author, replies: 0, comments: []},
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function update(postContent) {
    var deferred = Q.defer();

    var _id = postContent.postData._id;
    var comment = postContent.postData.comment;
    var author = postContent.userData.username;

    db.posts.update(
        { _id: mongo.helper.toObjectID(_id) },
        { $push: {comments: {body: comment, author: author}}, $inc: {replies: 1} },
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}