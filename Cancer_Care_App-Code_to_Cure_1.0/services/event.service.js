var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('events');

var service = {};

service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function getAll() {
    var deferred = Q.defer();

    db.events.find().toArray(function(err, eventArray) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        if (eventArray) {
            // return events
            deferred.resolve(eventArray);
        } else {
            // events not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(eventContent) {
    var deferred = Q.defer();
    
    var title = eventContent.eventData.title;
    var description = eventContent.eventData.description;
    var organizer = eventContent.userData.username;
    var startDate = eventContent.eventData.startDate;
    var endDate = eventContent.eventData.endDate;
    var startTime = eventContent.eventData.startTime;
    var endTime = eventContent.eventData.endTime;
    var street = eventContent.eventData.address.street;
    var city = eventContent.eventData.address.city;
    var state = eventContent.eventData.address.state;
    var zipcode = eventContent.eventData.address.zipcode;

    db.events.insert(
        {title: title, description: description, organizer: organizer, 
            startDate: startDate, endDate: endDate, startTime: startTime, 
            endTime: endTime, address: {street: street, city: city, 
                state: state, zipcode: zipcode}, going: 0, attending: []},
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.events.findById(_id, function (err, event) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve(event);
    });

    return deferred.promise;
}

function update(eventContent) {
    var deferred = Q.defer();

    var _id = eventContent.eventData._id;
    var attendee = eventContent.userData.username;

    db.events.update(
        { _id: mongo.helper.toObjectID(_id) },
        { $push: {attending: attendee}, $inc: {going: 1} },
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.events.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}