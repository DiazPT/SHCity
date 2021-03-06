'use strict';

var util = require('util');
var models = require('../database/models.js');
var jsonwebtoken = require('jsonwebtoken');
var config = require('../../config');
var moment = require('moment');

module.exports = {
    register_prod: register_prod,
    login_prod: login_prod
};



function register_prod(req, res) {
    // variables defined in the Swagger document can be referenced using req.body.{parameter_name}
    var name = req.body.name || 'stranger';

    console.log('[User API] Register a new user.');

    models.Producer.findOne({Username: req.body.username}, function (err, Producer) {


        if (err) {
            console.error("Server error creating user!");
            res.status(403).json("Error");
        } else {

            var token = jsonwebtoken.sign({
                username: req.body.username,
                role: 1,
            }, config.token.secret, { // get secret from config
                expiresIn: config.token.expired // expires in 1 day
            })

            if (Producer == null && req.body.name != null && req.body.email != null && req.body.username != null && req.body.password != null){
                var newRecord = new models.Producer({
                    Name: req.body.name,
                    Email: req.body.email,
                    Username: req.body.username,
                    Password: req.body.password,
                    Date_registered: moment().locale('pt').format('l') + '    ' + moment().locale('pt').format('LT'),
                    Token: token,
                });


                newRecord.save(function (err) {
                    if (err) {
                        console.error("Error on saving new record");
                        console.error(err); // log error to Terminal
                        res.status(403).json("Error");

                    } else {
                        console.log("Created a new record!");
                        //recordCreated(newRecord);
                        console.log(newRecord);
                        res.json(201);
                    }

                });


                //res.redirect('/viewRecords');
                //redirects client to request the /viewRecords url
            } else {
                res.status(403).json("Error");
                console.error("Missing params");
                //res.redirect('/viewMessage');
            }
        }
    });

    // this sends back a JSON response which is a single string
}


function login_prod(req, res) {

    console.log('[Monitoring API] Log a Producer in.');
    models.Producer.findOne({Username: req.body.username, Password: req.body.password}, function (err, User) {
        if (User == null) {
            res.status(403).json("Error");
        }

        else {
            var token = jsonwebtoken.sign({
                username: req.body.username,
                role: 2,
            }, config.token.secret, { // get secret from config
                expiresIn: config.token.expired // expires in 1 day
            })

            models.Producer.findOne({Username: req.body.username}, function(err, contact) {

                contact.Token = token;
                contact.save(function(err) {
                    if(!err) {
                        console.log("contact " + contact.Username + " created at " + contact.Date_Registered + " updated");
                        res.json(token);
                    }
                    else {
                        console.log("Error: could not save contact " + contact.Username);
                        res.status(403).json("Error");
                    }
                });

            });

        }



    });
}