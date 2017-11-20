var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

var service = {};

service.authenticate = authenticate;
service.getById = getById;
service.getAll = getAll;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer();

    db.users.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve(jwt.sign({ sub: user._id }, config.secret));
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();

    db.users.find().toArray(function(err, userArray) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        if (userArray) {
            // return user (without hashed password)
            deferred.resolve(userArray);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);

        db.users.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.username !== userParam.username) {
            // username has changed so check if the new username is already taken
            db.users.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            firstName: userParam.firstName,
            lastName: userParam.lastName,
            username: userParam.username,
            email: userParam.email,
            "address.street": userParam.address.street,
            "address.city": userParam.address.city,
            "address.state": userParam.address.state,
            "address.zipcode": userParam.address.zipcode,
            cancerType: userParam.cancerType,
            stage: userParam.stage,
            "metastasis.bone": userParam.metastasis.bone,
            "metastasis.bowel": userParam.metastasis.bowel,
            "metastasis.brain": userParam.metastasis.brain,
            "metastasis.intestines": userParam.metastasis.intestines,
            "metastasis.liver": userParam.metastasis.liver,
            "metastasis.lungs": userParam.metastasis.lungs,
            "metastasis.lymphNodes": userParam.metastasis.lymphNodes,
            "metastasis.skin": userParam.metastasis.skin,
            "metastasis.none": userParam.metastasis.none,
            "metastasis.other": userParam.metastasis.other,
            "treatment.chemotherapy": userParam.treatment.chemotherapy,
            "treatment.hormoneTherapy": userParam.treatment.hormoneTherapy,
            "treatment.immunotherapy": userParam.treatment.immunotherapy,
            "treatment.precisionMedicine": userParam.treatment.precisionMedicine,
            "treatment.radiationTherapy": userParam.treatment.radiationTherapy,
            "treatment.stemCellTransplant": userParam.treatment.stemCellTransplant,
            "treatment.surgery": userParam.treatment.surgery,
            "treatment.targetedTherapy": userParam.treatment.targetedTherapy,
            "treatment.none": userParam.treatment.none,
            "treatment.other": userParam.treatment.other
        };

        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }

        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.users.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}