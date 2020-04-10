const bcrypt = require('bcrypt');
var request = require('request');
var config = require('../config/config');

var passwordHash = function (password, cb) {
    bcrypt.hash(password, config.saltRounds, function(err, hash) {
        if(err){
            cb(err);
        }else{
            cb(null, hash);
        }
    });
}
exports.passwordHash = passwordHash;

var captchaChecker = function (token, cb) {
    let url = config.captchaUrl;
    url.replace("SECRET_KEY", config.captchaKey);
    url.replace("TOKEN", config.token);
    request.post(url, function(err, response) {
        if(err){
            cb(err);
        }else{
            if(response && response.score >= config.botScore){
                cb(null, response);
            }else{
                cb(response);
            }
        }
    });
}
exports.captchaChecker = captchaChecker;