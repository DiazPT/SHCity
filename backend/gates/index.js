var app = module.exports = require('express')();
var models = require('../database/models.js');
var moment = require('moment');
var jwt = require('express-jwt');
var config = require('../config');
var jsonwebtoken = require('jsonwebtoken');
var async = require('async');

app.post('/api/gate/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Gate API] Create Gate.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Gates.findOne({Name: req.body.gate_name}, function (err, gate) {
                    if (gate == null) {
                        var newRecord = new models.Gate({
                            Name: req.body.gate_name,
                            Description: req.body.description
                        });
                        console.log(newRecord);

                        newRecord.save(function (err) {
                            if (err) {
                                console.error("Error on saving new record");
                                console.error(err); // log error to Terminal


                            } else {
                                console.log("Created a new record!");
                                //recordCreated(newRecord);
                                res.json({
                                    message: 'Object created'
                                })
                            }

                        });
                    }
                    else {
                        console.log("Gate already registered");
                        res.json({
                            message: 'Object already created'
                        })
                    }
                }
            );
        }

    });
});


app.post('/api/gate/vehicle_affluence/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Gate API] Add Vehicle affluence.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Gate.findOne({Name: req.body.gate_name}, function (err, gate) {
                    if (gate == null) {
                        console.log("Gate does not exist");
                        res.json({
                            message: 'Gate does not exist'
                        })
                    }
                    else {
                        var newRecord = new models.Vehicle_Affluence({
                            Gate_ID: gate._id,
                            Schedule: req.body.schedule,
                            Flow_Cars: req.body.flow_cars,
                            Date: req.body.date
                        });
                        console.log(newRecord);

                        newRecord.save(function (err) {
                            if (err) {
                                console.error("Error on saving new record");
                                console.error(err); // log error to Terminal


                            } else {
                                console.log("Created a new record!");
                                //recordCreated(newRecord);
                                res.json({
                                    message: 'Object created'
                                })
                            }

                        });
                    }
                }
            );
        }

    });
});