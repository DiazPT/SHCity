var models = require('../database/models.js');
var moment = require('moment');
var config = require('../../config');
var jsonwebtoken = require('jsonwebtoken');



console.log('[Gate API] Ready.');

module.exports = {
    gate_add: gate_add,
    gate_vehicle_affluence_add: gate_vehicle_affluence_add,
    gate_get: gate_get,
    gate_vehicle_affluence_get: gate_vehicle_affluence_get
};


function gate_add(req, res) {
    console.log('[Gate API] Create Gate.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session");
        }
        else {
            //console.log(req.body.gate_name);
            models.Gate.findOne({ Name: req.body.gate_name }, function (err, gate) {
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
                            res.status(503).json("Error")

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
                    res.status(503).json("Object already created");
                }
            }
            );
        }

    });
};

function gate_get(req, res) {

};


function gate_vehicle_affluence_add(req, res) {
    console.log('[Gate API] Add Vehicle affluence.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session");
        }
        else {
            models.Gate.findOne({ Name: req.body.gate_name }, function (err, gate) {
                if (gate == null) {
                    console.log("Gate does not exist");
                    res.status(503).json("Gate does not exist")
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
                            res.status(503).json("Invalid session")

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
};

function gate_vehicle_affluence_get(req, res) {

};