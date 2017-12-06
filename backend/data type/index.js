var app = module.exports = require('express')();
var models = require('../database/models.js');
var moment = require('moment');
var jwt = require('express-jwt');
var config = require('../config');
var jsonwebtoken = require('jsonwebtoken');
var async = require('async');


console.log('[Data Type API] Ready.');

app.post('/api/data_type/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Data Type API] Create Data Type.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Data_Type.findOne({Name: req.body.data_type_name}, function (err, data_type) {
                    if (data_type == null) {
                        var newRecord = new models.Data_Type({
                            Name: req.body.data_type_name,
                            Description: req.body.description,
                            Unit : req.body.unit
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
                        console.log("Data Type already registered");
                        res.json({
                            message: 'Object already created'
                        })
                    }
                }
            );
        }

    });
});