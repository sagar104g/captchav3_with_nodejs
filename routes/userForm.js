var express = require('express');
var router = express.Router();
var utils = require('../utils/util')
var user = require('../models/userForm')

router.post('/submitForm', function(req, res) {
    user.ipFilter(req, function(err, result){
        if(err){
            res.send({"message":"not saved some error happend"});
        }else{
            if(result < 4){
                user.ipSaver(req, function(err, result){
                    if(err){
                        res.send({"message":"not saved some error happend"});
                    }else{
                        user.formSaver(req, function(err, response){
                            if(err){
                                res.send({"message":"not saved some error happend"});
                            }else{
                                if(response.duplicate){
                                res.send({"message": "this email is already registered"});
                                }else{
                                    res.send({"message": "saved sucessFully"});
                                }
                            }
                        })
                    }
                });
            }else{
                res.send({"isCaptchaRequired": true});
            }
        }
    })
});

router.post('/submitFormViaCaptcha', function(req, res) {
    user.ipSaver(req, function(err, result){
        if(err){
            res.send({"message":"not saved some error happend"});
        }else{
            user.formSaver(req, function(err, response){
                if(err){
                    res.send({"message":"not saved some error happend"});
                }else{
                    if(response.duplicate){
                        res.send({"message": "this email is already registered"});
                        }else{
                            res.send({"message": "saved sucessFully with captcha"});
                        }
                }
            })
        }
    })
})
module.exports = router;
