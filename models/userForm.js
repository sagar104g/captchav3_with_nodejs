var mongoQuery = require('../services/mongoQueries');
var config = require('../config/config');
var utils = require('../utils/util');

var ipFilter = function (req, cb) {
    var ip = req.headers['x-forwarded-for'] || 
        req.connection.remoteAddress || 
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);
    let findQuery = {"ip": ip};
    mongoQuery.findMany(config["mongo_chat-db"].database, 'ipCollection', findQuery, function (err, result) {
        if(err){
            cb(err);
        }else{
            let response = result ?  result.length : null; 
            cb(null, response);
        }
    });
}
exports.ipFilter = ipFilter;

var formSaver = function (req, cb) {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let findObject = {"email": email};
    mongoQuery.findOne(config["mongo_chat-db"].database, 'userData', findObject, function(err, result){
        if(err){
            cb(err);
        }else{
            if(result){
                cb(null, {"duplicate":true});
            }else{
                utils.passwordHash(password, function(err, hash){
                    if(err){
                        cb(err);
                    }else{
                        let insertObject = {
                        "name": name,
                        "email": email,
                        "password": hash
                        };
                        mongoQuery.insertOne(config["mongo_chat-db"].database, 'userData', insertObject, function(err, result){
                            if(err){
                                cb(err);
                            }else{
                                cb(null,{"duplicate":false});
                            }
                        })
                    }
                })
            }
        }
    });
}
exports.formSaver = formSaver;

var ipSaver = function (req, cb) {
    let ip = req.headers['x-forwarded-for'] || 
        req.connection.remoteAddress || 
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);
    let insertObject = {"ip": ip, "createdAt": new Date()};
    mongoQuery.insertOne(config["mongo_chat-db"].database, 'ipCollection', insertObject, function(err, result){
        if(err){
            cb(err);
        }else{
            cb(null, result);
        }
    })
}
exports.ipSaver = ipSaver;