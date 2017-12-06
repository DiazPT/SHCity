var app = module.exports = require('express')();
var models = require('../database/models.js');
var moment = require('moment');
var jwt = require('express-jwt');
var config = require('../config');
var jsonwebtoken = require('jsonwebtoken');
var async = require('async');



console.log('[Mobile Node API] Ready.');

app.post('/api/mobile_node/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Mobile Node API] Create Mobile Node.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Mobile_Node.findOne({Name: req.body.mobile_node_name}, function (err, mobile_node) {
                    if (mobile_node == null) {
                        var newRecord = new models.Mobile_Node({
                            Name: req.body.mobile_node_name,
                            Description: req.body.description,
                            Location: req.body.location
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
                        console.log("Mobile Node already registered");
                        res.json({
                            message: 'Object already created'
                        })
                    }
                }
            );
        }

    });
});


app.post('/api/mobile_node/data_regist_mobile_month/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Mobile Node API] Add Data Month.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Mobile_Node.findOne({Name: req.body.mobile_node_name}, function (err, mobile_node) {
                    if (mobile_node == null) {
                        console.log("Mobile Node does not exist");
                        res.json({
                            message: 'Mobile Node does not exist'
                        })
                    }
                    else {


                        models.Data_Type.findOne({Name: req.body.data_type}, function (err, data_type) {
                            if (data_type == null) {
                                console.log("Data Type does not exist");
                                res.json({
                                    message: 'Data Type does not exist'
                                })
                            }

                            else {
                                var newRecord = new models.Data_Regist_Mobile_Month({
                                    Data_Type_ID: data_type._id,
                                    Mobile_Node_ID: mobile_node._id,
                                    Value: req.body.value,
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
                        });
                    }
                }
            );
        }
    });
});



app.post('/api/mobile_node/data_regist_mobile_year/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Mobile Node API] Add Data Year.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Mobile_Node.findOne({Name: req.body.mobile_node_name}, function (err, mobile_node) {
                    if (mobile_node == null) {
                        console.log("Mobile Node does not exist");
                        res.json({
                            message: 'Mobile Node does not exist'
                        })
                    }
                    else {


                        models.Data_Type.findOne({Name: req.body.data_type}, function (err, data_type) {
                            if (data_type == null) {
                                console.log("Data Type does not exist");
                                res.json({
                                    message: 'Data Type does not exist'
                                })
                            }

                            else {
                                var newRecord = new models.Data_Regist_Mobile_Year({
                                    Data_Type_ID: data_type._id,
                                    Mobile_Node_ID: mobile_node._id,
                                    Value: req.body.value,
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
                        });
                    }
                }
            );
        }
    });
});



app.post('/api/mobile_node/data_regist_mobile/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Mobile Node API] Add Data Year.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Mobile_Node.findOne({Name: req.body.mobile_node_name}, function (err, mobile_node) {
                    if (mobile_node == null) {
                        console.log("Mobile Node does not exist");
                        res.json({
                            message: 'Mobile Node does not exist'
                        })
                    }
                    else {


                        models.Data_Type.findOne({Name: req.body.data_type}, function (err, data_type) {
                            if (data_type == null) {
                                console.log("Data Type does not exist");
                                res.json({
                                    message: 'Data Type does not exist'
                                })
                            }

                            else {
                                var newRecord = new models.Data_Regist_Mobile({
                                    Data_Type_ID: data_type._id,
                                    Mobile_Node_ID: mobile_node._id,
                                    Value: req.body.value,
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
                        });
                    }
                }
            );
        }
    });
});