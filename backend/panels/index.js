var app = module.exports = require('express')();
var models = require('../database/models.js');
var moment = require('moment');
var jwt = require('express-jwt');
var config = require('../config');
var jsonwebtoken = require('jsonwebtoken');
var async = require('async');

app.post('/api/panel/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Panel API] Create Panel.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Panel.findOne({Name: req.body.panel_name}, function (err, panel) {
                    if (panel == null) {
                        var newRecord = new models.Panel({
                            Name: req.body.panel_name,
                            Description: req.body.description,
                            Location : req.body.location
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
                        console.log("Panel already registered");
                        res.json({
                            message: 'Object already created'
                        })
                    }
                }
            );
        }

    });
});


app.post('/api/panel/panel_visitors_week/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Panel API] Add Visitors Week.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Panel.findOne({Name: req.body.panel_name}, function (err, panel) {
                    if (panel == null) {
                        console.log("Panel does not exist");
                        res.json({
                            message: 'Panel does not exist'
                        })
                    }
                    else {
                        var newRecord = new models.Panel_Visitors_Week({
                            Panel_ID: panel._id,
                            Visitors: req.body.visitors,
                            Week: req.body.week,
                            Month: req.body.month,
                            Year: req.body.year
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


app.post('/api/panel/panel_visitors_month/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Panel API] Add Visitors Month.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Panel.findOne({Name: req.body.panel_name}, function (err, panel) {
                    if (panel == null) {
                        console.log("Panel does not exist");
                        res.json({
                            message: 'Panel does not exist'
                        })
                    }
                    else {
                        var newRecord = new models.Panel_Visitors_Month({
                            Panel_ID: panel._id,
                            Visitors: req.body.visitors,
                            Month: req.body.month,
                            Year: req.body.year
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


app.post('/api/panel/panel_visitors_year/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Panel API] Add Visitors Year.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Panel.findOne({Name: req.body.panel_name}, function (err, panel) {
                    if (panel == null) {
                        console.log("Panel does not exist");
                        res.json({
                            message: 'Panel does not exist'
                        })
                    }
                    else {
                        var newRecord = new models.Panel_Visitors_Year({
                            Panel_ID: panel._id,
                            Visitors: req.body.visitors,
                            Year: req.body.year
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