var app = module.exports = require('express')();
var models = require('../database/models.js');
var moment = require('moment');
var jwt = require('express-jwt');
var config = require('../config');
var jsonwebtoken = require('jsonwebtoken');
var async = require('async');


console.log('[Area and Building API] Ready.');


app.post('/api/areas_and_buildings/top_visits/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Area and Building API] Add Top.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            //Building = 0 Area = 1
            if(req.body.type == 1){
                models.Area.findOne({Area_Name: req.body.area_name}, function (err, area) {
                        if (area == null) {
                            console.log("Area does not exist");
                            res.json({
                                message: 'Area does not exist'
                            })
                        }
                        else {
                            var newRecord = new models.Top_Visits({
                                Top: req.body.top,
                                Area_ID: area._id
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
            else{
                if(req.body.type == 0){
                    models.Building.findOne({Name: req.body.building_name}, function (err, building) {
                            if (building == null) {
                                console.log("Building does not exist");
                                res.json({
                                    message: 'Building does not exist'
                                })
                            }
                            else {
                                var newRecord = new models.Top_Visits({
                                    Top: req.body.top,
                                    Building_ID: building._id
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
                else{
                    console.log("Type error");
                    res.json({
                        message: 'Type is not valid'
                    })
                }
            }
        }
    });
});


app.post('/api/areas_and_buildings/level_occupation/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Area and Building API] Add Occupation.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            //Building = 0 Area = 1
            if(req.body.type == 1){
                models.Area.findOne({Area_Name: req.body.area_name}, function (err, area) {
                        if (area == null) {
                            console.log("Area does not exist");
                            res.json({
                                message: 'Area does not exist'
                            })
                        }
                        else {
                            var newRecord = new models.Level_Occupation({
                                Area_ID: area._id,
                                Occupation: req.body.occupation,
                                Date : req.body.date
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
            else{
                if(req.body.type == 0){
                    models.Building.findOne({Name: req.body.building_name}, function (err, building) {
                            if (building == null) {
                                console.log("Building does not exist");
                                res.json({
                                    message: 'Building does not exist'
                                })
                            }
                            else {
                                var newRecord = new models.Level_Occupation({
                                    Building_ID: building._id,
                                    Occupation: req.body.occupation,
                                    Date : req.body.date
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
                else{
                    console.log("Type error");
                    res.json({
                        message: 'Type is not valid'
                    })
                }
            }
        }
    });
});


app.post('/api/areas_and_buildings/level_occupation_schedule/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Area and Building API] Add Occupation schedule.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            //Building = 0 Area = 1
            if(req.body.type == 1){
                models.Area.findOne({Area_Name: req.body.area_name}, function (err, area) {
                        if (area == null) {
                            console.log("Area does not exist");
                            res.json({
                                message: 'Area does not exist'
                            })
                        }
                        else {
                            var newRecord = new models.Level_Occupation({
                                Area_ID: area._id,
                                Occupation: req.body.occupation,
                                Schedule : req.body.schedule,
                                Date : req.body.date
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
            else{
                if(req.body.type == 0){
                    models.Building.findOne({Name: req.body.building_name}, function (err, building) {
                            if (building == null) {
                                console.log("Building does not exist");
                                res.json({
                                    message: 'Building does not exist'
                                })
                            }
                            else {
                                var newRecord = new models.Level_Occupation({
                                    Building_ID: building._id,
                                    Occupation: req.body.occupation,
                                    Schedule : req.body.schedule,
                                    Date : req.body.date
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
                else{
                    console.log("Type error");
                    res.json({
                        message: 'Type is not valid'
                    })
                }
            }
        }
    });
});