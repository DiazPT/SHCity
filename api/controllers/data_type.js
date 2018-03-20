var models = require('../database/models.js');
var moment = require('moment');
var config = require('../../config');
var jsonwebtoken = require('jsonwebtoken');



console.log('[Data Type API] Ready.');


module.exports = {
    data_type_add: data_type_add,
    data_type_get: data_type_get
};

function data_type_add(req, res) {
    console.log('[Data Type API] Create Data Type.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(503).json("Invalid session");
        }
        else {
            models.Data_Type.findOne({ Name: req.body.data_type_name }, function (err, data_type) {
                if (data_type == null) {
                    var newRecord = new models.Data_Type({
                        Name: req.body.data_type_name,
                        Description: req.body.description,
                        Unit: req.body.unit
                    });
                    console.log(newRecord);

                    newRecord.save(function (err) {
                        if (err) {
                            console.error("Error on saving new record");
                            console.error(err); // log error to Terminal
                            res.status(503).json("Error");

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
                    res.status(503).json("Object already created")
                }
            }
            );
        }

    });
};

function data_type_get(req, res) {

};