var app = module.exports = require('express')();
var models = require('../database/models.js');
var moment = require('moment');
var jwt = require('express-jwt');
var config = require('../config');
var jsonwebtoken = require('jsonwebtoken');
var async = require('async');

function token_true(name, token_received) {

    models.Producer.findOne({username: name, token: token_received}, function (err, Producer) {

        if (Producer == Null) {
            return true;
        }
        else
            return false;

    });
};

/* Logs a producer in */
app.post('/api/area/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Monitoring API] TO DO: Log a user/producer in.');
    recordmodel.Producer.findOne({username: req.body.username, token: req.body.token}, function (err, Producer) {
        if (err) {
            console.error("Server error creating user!");
            res.json({
                message: 'Error 404',
            });
        }

        else {
            var token = jsonwebtoken.sign({
                username: req.body.username,
                role: 2,
            }, config.token.secret, { // get secret from config
                expiresIn: config.token.expired // expires in 1 day
            })

            res.json({
                token: token,
                message: 'Login producer'
            })


        }
    });
});