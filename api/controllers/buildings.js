var models = require('../database/models.js');
var moment = require('moment');
var config = require('../../config');
var ObjectId = require('mongodb').ObjectID;
var jsonwebtoken = require('jsonwebtoken');


module.exports = {
    building_add: building_add,
    building_energy_month_add: building_energy_month_add,
    building_energy_year_add: building_energy_year_add,
    interested_persons_buildings_week_add: interested_persons_buildings_week_add,
    interested_persons_buildings_month_add: interested_persons_buildings_month_add,
    interested_persons_buildings_year_add: interested_persons_buildings_year_add,
    data_regist_building_month_add: data_regist_building_month_add,
    data_regist_building_year_add: data_regist_building_year_add,
    data_regist_building_add: data_regist_building_add,
    building_daily_persons_add: building_daily_persons_add,
    building_week_persons_add: building_week_persons_add,
    building_month_persons_add: building_month_persons_add,
    building_year_persons_add: building_year_persons_add,
    building_security_add: building_security_add,
    building_get: building_get,
    building_energy_month_get: building_energy_month_get,
    building_energy_year_get: building_energy_year_get,
    interested_persons_buildings_week_get: interested_persons_buildings_week_get,
    interested_persons_buildings_month_get: interested_persons_buildings_month_get,
    interested_persons_buildings_year_get: interested_persons_buildings_year_get,
    data_regist_building_month_get: data_regist_building_month_get,
    data_regist_building_year_get: data_regist_building_year_get,
    building_daily_persons_get: building_daily_persons_get,
    building_week_persons_get: building_week_persons_get,
    building_month_persons_get: building_month_persons_get,
    building_year_persons_get: building_year_persons_get,
    building_security_get: building_security_get,
    data_regist_building_get: data_regist_building_get,
    visiting_time_get: visiting_time_get,
    visiting_time_add: visiting_time_add,
    building_update: building_update,
    building_daily_regist: building_daily_regist
};

console.log('[Building API] Ready.');

function building_add(req, res) {
    console.log('[Building API] Create Building.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        } else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    var newRecord = new models.Building({
                        Name: req.body.building_name,
                        Description: req.body.description,
                        Date_Build: req.body.date_build,
                        Location: req.body.location,
                        Latitude: req.body.latitude,
                        Longitude: req.body.longitude,
                        Visiting_Time: req.body.visiting_time,
                        Id_2D: req.body.id_2d,
                        Id_3D: req.body.id_3d,
                        Street: req.body.street,
                        Number: req.body.number,
                        City: req.body.city,
                        Postal_code: req.body.postal_code,
                        Current_Use: req.body.current_use,
                        Class: req.body.class,
                        Function: req.body.function,
                        Number_of_bu: req.body.number_of_bu,
                        Number_of_dw: req.body.number_of_dw,
                        Gross_floor_area: req.body.gross_floor_area,
                        Area: req.body.area,
                        Yoc: req.body.yoc,
                        Inhabitants: req.body.inhabitants,
                        Monument: req.body.monument,
                        app_occupation: req.body.app_occupation,
                        app_waitingtime: req.body.app_waitingtime,
                        app_temperature: req.body.app_temperature,
                        app_visittime: req.body.app_visittime,
                        app_co2: req.body.app_co2,
                        app_humidity: req.body.app_humidity
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
                } else {
                    console.log("Building already registered");
                    res.json({
                        message: 'Object already created'
                    });
                }
            });
        }
    });
};

function building_update(req, res) {
    var objForUpdate = {};

    if (req.body.building_name) objForUpdate.Name = req.body.building_name;
    if (req.body.id_2d) objForUpdate.Id_2D = req.body.id_2d;
    if (req.body.id_3d) objForUpdate.Id_3D = req.body.id_3d;
    if (req.body.description) objForUpdate.Description = req.body.description;
    if (req.body.date_build) objForUpdate.Date_Build = req.body.date_build;
    if (req.body.location) objForUpdate.Location = req.body.location;
    if (req.body.latitude) objForUpdate.Latitude = req.body.latitude;
    if (req.body.longitude) objForUpdate.Longitude = req.body.longitude;
    if (req.body.street) objForUpdate.Street = req.body.street;
    if (req.body.number) objForUpdate.Number = req.body.number;
    if (req.body.city) objForUpdate.City = req.body.city;
    if (req.body.postal_code) objForUpdate.Postal_code = req.body.postal_code;
    if (req.body.current_use) objForUpdate.Current_Use = req.body.current_Use;
    if (req.body.class) objForUpdate.Class = req.body.class;
    if (req.body.function) objForUpdate.Function = req.body.function;
    if (req.body.number_of_bu) objForUpdate.Number_of_bu = req.body.number_of_bu;
    if (req.body.number_of_dw) objForUpdate.Number_of_dw = req.body.number_of_dw;
    if (req.body.gross_floor_area) objForUpdate.Gross_floor_area = req.body.gross_floor_area;
    if (req.body.area) objForUpdate.Area = req.body.area;
    if (req.body.yoc) objForUpdate.Yoc = req.body.yoc;
    if (req.body.inhabitants) objForUpdate.Inhabitants = req.body.inhabitants;
    if (req.body.monument) objForUpdate.Monument = req.body.monument;
    if (req.body.visiting_time) objForUpdate.Visiting_Time = req.body.visiting_Time;
    if (req.body.app_occupation) objForUpdate.app_occupation = req.body.app_occupation;
    if (req.body.app_waitingtime) objForUpdate.app_waitingtime = req.body.app_waitingtime;
    if (req.body.app_temperature) objForUpdate.app_temperature = req.body.app_temperature;
    if (req.body.app_visittime) objForUpdate.app_visittime = req.body.app_visittime;
    if (req.body.app_co2) objForUpdate.app_co2 = req.body.app_co2;
    if (req.body.app_humidity) objForUpdate.app_humidity = req.body.app_humidity;

    console.log()
    var setObj = { $set: objForUpdate };

    models.Building.update({ Name: req.body.building_name }, {$set: objForUpdate}, function (err, result) {
        if (err) { console.log("database error" + err); res.status(500).json("DB Error"); }
        else {
            res.json({
                message: 'Object Updated'
            })
        }
    });

};

function building_daily_regist(req, res) {


    var date_search = new Date(req.swagger.params.initial_date.value);
    var date_search_after = new Date(req.swagger.params.initial_date.value);
    date_search_after.setTime(date_search.getTime() + 86400000);
    var month = parseInt(date_search_after.getMonth())+1;
    date_final = date_search_after.getFullYear() + "/" + month + "/" +date_search_after.getDate() + "/"


    models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
        models.Data_Regist_Mobile.find({
            Building_ID: building._id, _id: { $gt: objectIdWithTimestamp(req.swagger.params.date.value), $lt: objectIdWithTimestamp(date_final) }, function(err, data) {
                var temperature;
                var co2;
                var visiting_time;
                var i = 0;
                while(i < data.lenght){
                    if(data[i].Data_Type_ID == "5a69b4247151bc0a04cfe8de"){
                        co2 = data[i].Value;
                    }
                    if(data[i].Data_Type_ID == "5a69c18b99508406c03b789e"){
                        temperature = data[i].Value;
                    }
                    if(data[i].Data_Type_ID == "5a88302d1a9ebb1c803e1fca"){
                        visiting_time = data[i].Value;
                    }
                    i++;
                }
                var data_to_send;
                data_to_send.id_2d = building.Id_2D;
                data_to_send.building_name = building.Name;
                data_to_send.date = req.swagger.params.date.value;
                data_to_send.temperature = temperature;
                data_to_send.co2 = co2;
                data_to_send.visiting_time = visiting_time;
                res.send(data_to_send);
            }

        });
    });


};

function objectIdWithTimestamp(timestamp) {
    // Convert string date to Date object (otherwise assume timestamp is a date)
    if (typeof (timestamp) == 'string') {
        timestamp = new Date(timestamp);
    }

    // Convert date object to hex seconds since Unix epoch
    var hexSeconds = Math.floor(timestamp / 1000).toString(16);

    // Create an ObjectId with that hex timestamp
    var constructedObjectId = ObjectId(hexSeconds + "0000000000000000");

    return constructedObjectId
}

function building_get(req, res) {
    models.Building.find(function (err, buildings) {
        if (buildings != null) {
            res.status(200).send(buildings);
        } else {
            if (err) {
                console.log("No content");
                res.status(204).json("No content");
            } else {
                console.log("DB error");
                res.status(500).json("DB Error");
            }
        }
    });
}

function building_energy_month_add(req, res) {
    console.log('[Building API] Add Energy Month.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        } else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Building does not exist");
                    res.status(503).json("Building does not exist")
                } else {
                    var newRecord = new models.Building_Energy_Monthly({
                        Building_ID: building._id,
                        Description: req.body.description,
                        E_Consume: req.body.consume,
                        E_Consume_Cost: req.body.consume_cost,
                        E_Consume_Heating: req.body.consume_heating,
                        E_Consume_Heating_Cost: req.body.consume_heating_cost,
                        E_Consume_Ilumination: req.body.consume_ilumination,
                        E_Consume_Ilumination_Cost: req.body.consume_ilumination_cost,
                        E_Consume_Ilumination_Exterior: req.body.consume_ilumination_ext,
                        E_Consume_Ilumination_Exterior_Cost: req.body.consume_ilumination_ext_cost,
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
    });
};

function building_energy_month_get(req, res) {
    models.Building.findOne({ Name: req.swagger.params.building_name.value }, function (err, building) {
        if (building == null) {
            console.log("Building does not exist");
            res.status(503).json("Building does not exist")
        } else {
            //ano primeiro, de seguida mes e depois dia
            if (req.swagger.params.date.value == null) {
                date_search = "1980/01/01";
            } else {
                date_search = req.swagger.params.date.value;
            }
            models.Building_Energy_Monthly.find({ Building_ID: building._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, energy_building) {
                if (energy_building != null) {
                    res.status(200).send(energy_building);

                } else {
                    if (err) {
                        console.log("DB error");
                        res.status(500).json("DB Error");
                    } else {
                        console.log("No content");
                        res.status(204).json("No content");
                    }
                }
            });
        }
    });
};


function building_energy_year_add(req, res) {
    console.log('[Building API] Add Energy Year.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        } else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Area does not exist");
                    res.status(503).json("Building does not exist")
                } else {
                    var newRecord = new models.Building_Energy_Anual({
                        Building_ID: building._id,
                        Description: req.body.description,
                        E_Consume: req.body.consume,
                        E_Consume_Metro: req.body.consume_metro,
                        E_Consume_Person: req.body.consume_person,
                        E_Consume_Degree_Day: req.body.consume_degree,
                        E_Consume_Cost: req.body.consume_cost,
                        E_Consume_Heating: req.body.consume_heating,
                        E_Consume_Heating_Metro: req.body.consume_heating_metro,
                        E_Consume_Heating_Person: req.body.consume_heating_person,
                        E_Consume_Heating_Metro_Degree_Day: req.body.consume_heating_degree,
                        E_Consume_Heating_Cost: req.body.consume_heating_cost,
                        E_Consume_Ilumination: req.body.consume_ilumination,
                        E_Consume_Ilumination_Metro: req.body.consume_ilumination_metro,
                        E_Consume_Ilumination_Person: req.body.consume_ilumination_person,
                        E_Consume_Ilumination_Cost: req.body.consume_ilumination_cost,
                        E_Consume_Ilumination_Exterior: req.body.consume_ilumination_ext,
                        E_Consume_Ilumination_Exterior_Cost: req.body.consume_ilumination_ext_cost,
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
    });
};

function building_energy_year_get(req, res) {
    models.Building.findOne({ Name: req.swagger.params.building_name.value }, function (err, building) {
        if (building == null) {
            console.log("Building does not exist");
            res.status(503).json("Building does not exist")
        } else {
            //ano primeiro, de seguida mes e depois dia
            if (req.swagger.params.date.value == null) {
                date_search = "1980/01/01";
            } else {
                date_search = req.swagger.params.date.value;
            }
            models.Building_Energy_Anual.find({ Building_ID: building._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, energy_building) {
                if (energy_building != null) {
                    res.status(200).send(energy_building);

                } else {
                    if (err) {
                        console.log("DB error");
                        res.status(500).json("DB Error");
                    } else {
                        console.log("No content");
                        res.status(204).json("No content");
                    }
                }
            });
        }
    });
};


function building_security_add(req, res) {
    console.log('[Area API] Add Building Security.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        } else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Building does not exist");
                    res.status(503).json("Building does not exist")
                } else {
                    var newRecord = new models.Building_Security({
                        Building_ID: building._id,
                        Type_Incident: req.body.type_incident,
                        Description: req.body.description,
                        Analyzed: req.body.analyzed,
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

    });
};

function building_security_get(req, res) {
    models.Building.findOne({ Name: req.swagger.params.building_name.value }, function (err, building) {
        if (building == null) {
            console.log("Building does not exist");
            res.status(503).json("Building does not exist")
        } else {
            //ano primeiro, de seguida mes e depois dia
            if (req.swagger.params.date.value == null) {
                date_search = "1980/01/01";
            } else {
                date_search = req.swagger.params.date.value;
            }
            models.Building_Security.find({ Building_ID: building._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, security_event) {
                if (security_event != null) {
                    res.status(200).send(security_event);

                } else {
                    if (err) {
                        console.log("DB error");
                        res.status(500).json("DB Error");
                    } else {
                        console.log("No content");
                        res.status(204).json("No content");
                    }
                }
            });
        }
    });
};


function interested_persons_buildings_week_add(req, res) {
    console.log('[Area API] Add Building Interest Week.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        } else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Building does not exist");
                    res.status(503).json("Building does not exist")
                } else {




                    models.Panel.findOne({ Name: req.body.panel_name }, function (err, panel) {
                        if (panel == null) {
                            console.log("Panel does not exist");
                            res.json({
                                message: 'Panel does not exist'
                            })
                        } else {
                            var newRecord = new models.Interested_Persons_Buildings_Week({
                                Building_ID: building._id,
                                Selected_Panel_ID: panel._id,
                                Traffic_Area: req.body.traffic,
                                Number_Tickets: req.body.tickets,
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
                    });
                }
            });
        }
    });
};

function interested_persons_buildings_week_get(req, res) {
    models.Building.findOne({ Name: req.swagger.params.building_name.value }, function (err, building) {
        if (building == null) {
            console.log("Building does not exist");
            res.status(503).json("Building does not exist")
        } else {
            //ano primeiro, de seguida mes e depois dia
            if (req.swagger.params.date.value == null) {
                date_search = "1980/01/01";
            } else {
                date_search = req.swagger.params.date.value;
            }
            models.Interested_Persons_Buildings_Week.find({ Building_ID: building._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, building_persons) {
                if (building_persons != null) {
                    res.status(200).send(building_persons);

                } else {
                    if (err) {
                        console.log("DB error");
                        res.status(500).json("DB Error");
                    } else {
                        console.log("No content");
                        res.status(204).json("No content");
                    }
                }
            });
        }
    });
};

function interested_persons_buildings_month_add(req, res) {
    console.log('[Area API] Add Building Interest Month.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        } else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Building does not exist");
                    res.status(503).json("Building does not exist")
                } else {




                    models.Panel.findOne({ Name: req.body.panel_name }, function (err, panel) {
                        if (panel == null) {
                            console.log("Building does not exist");
                            res.status(503).json("Building does not exist")
                        } else {
                            var newRecord = new models.Interested_Persons_Buildings_Month({
                                Building_ID: building._id,
                                Selected_Panel_ID: panel._id,
                                Traffic_Area: req.body.traffic,
                                Number_Tickets: req.body.tickets,
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
            });
        }
    });
};

function interested_persons_buildings_month_get(req, res) {
    models.Building.findOne({ Name: req.swagger.params.building_name.value }, function (err, building) {
        if (building == null) {
            console.log("Building does not exist");
            res.status(503).json("Building does not exist")
        } else {
            //ano primeiro, de seguida mes e depois dia
            if (req.swagger.params.date.value == null) {
                date_search = "1980/01/01";
            } else {
                date_search = req.swagger.params.date.value;
            }
            models.Interested_Persons_Buildings_Month.find({ Building_ID: building._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, building_persons) {
                if (building_persons != null) {
                    res.status(200).send(building_persons);

                } else {
                    if (err) {
                        console.log("DB error");
                        res.status(500).json("DB Error");
                    } else {
                        console.log("No content");
                        res.status(204).json("No content");
                    }
                }
            });
        }
    });
};

function interested_persons_buildings_year_add(req, res) {
    console.log('[Area API] Add Building Interest Year.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        } else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Building does not exist");
                    res.status(503).json("Building does not exist")
                } else {




                    models.Panel.findOne({ Name: req.body.panel_name }, function (err, panel) {
                        if (panel == null) {
                            console.log("Building does not exist");
                            res.status(503).json("Building does not exist")
                        } else {
                            var newRecord = new models.Interested_Persons_Buildings_Year({
                                Building_ID: building._id,
                                Selected_Panel_ID: panel._id,
                                Traffic_Area: req.body.traffic,
                                Number_Tickets: req.body.tickets,
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
            });
        }
    });
};

function interested_persons_buildings_year_get(req, res) {
    models.Building.findOne({ Name: req.swagger.params.building_name.value }, function (err, building) {
        if (building == null) {
            console.log("Building does not exist");
            res.status(503).json("Building does not exist")
        } else {
            //ano primeiro, de seguida mes e depois dia
            if (req.swagger.params.date.value == null) {
                date_search = "1980/01/01";
            } else {
                date_search = req.swagger.params.date.value;
            }
            models.Interested_Persons_Buildings_Year.find({ Building_ID: building._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, building_persons) {
                if (building_persons != null) {
                    res.status(200).send(building_persons);

                } else {
                    if (err) {
                        console.log("DB error");
                        res.status(500).json("DB Error");
                    } else {
                        console.log("No content");
                        res.status(204).json("No content");
                    }
                }
            });
        }
    });
};


function data_regist_building_month_add(req, res) {
    console.log('[Building Node API] Add Data Month.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        } else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Mobile Node does not exist");
                    res.status(503).json("Mobile Node does not exist")
                } else {


                    models.Data_Type.findOne({ Name: req.body.data_type }, function (err, data_type) {
                        if (data_type == null) {
                            console.log("Data Type does not exist");
                            res.status(503).json("Data Type does not exist")
                        } else {
                            var newRecord = new models.Data_Regist_Building_Month({
                                Data_Type_ID: data_type._id,
                                Building_ID: building._id,
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
            });
        }
    });
};

function data_regist_building_month_get(req, res) {
    models.Building.findOne({ Name: req.swagger.params.building_name.value }, function (err, building) {
        if (building == null) {
            console.log("Building does not exist");
            res.status(503).json("Building does not exist")
        } else {
            //ano primeiro, de seguida mes e depois dia
            if (req.swagger.params.date.value == null) {
                date_search = "1980/01/01";
            } else {
                date_search = req.swagger.params.date.value;
            }
            models.Data_Type.findOne({ Name: req.swagger.params.data_type.value }, function (err, data_type) {
                if (data_type == null) {
                    console.log("Data Type does not exist");
                    res.status(503).json("Data Type does not exist")
                }
                models.Data_Regist_Building_Month.find({ Data_Type_ID: data_type._id, Building_ID: building._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, building_data) {
                    if (building_data != null) {
                        res.status(200).send(building_data);

                    } else {
                        if (err) {
                            console.log("DB error");
                            res.status(500).json("DB Error");
                        } else {
                            console.log("No content");
                            res.status(204).json("No content");
                        }
                    }
                });
            });
        }
    });
};

function data_regist_building_year_add(req, res) {
    console.log('[Building Node API] Add Data Year.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        } else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Mobile Node does not exist");
                    res.status(503).json("Mobile Node does not exist")
                } else {


                    models.Data_Type.findOne({ Name: req.body.data_type }, function (err, data_type) {
                        if (data_type == null) {
                            console.log("Data Type does not exist");
                            res.status(503).json("Data Type does not exist")
                        } else {
                            var newRecord = new models.Data_Regist_Building_Year({
                                Data_Type_ID: data_type._id,
                                Building_ID: building._id,
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
            });
        }
    });
};

function data_regist_building_year_get(req, res) {
    models.Building.findOne({ Name: req.swagger.params.building_name.value }, function (err, building) {
        if (building == null) {
            console.log("Building does not exist");
            res.status(503).json("Building does not exist")
        } else {
            //ano primeiro, de seguida mes e depois dia
            if (req.swagger.params.date.value == null) {
                date_search = "1980/01/01";
            } else {
                date_search = req.swagger.params.date.value;
            }
            models.Data_Type.findOne({ Name: req.swagger.params.data_type.value }, function (err, data_type) {
                if (data_type == null) {
                    console.log("Data Type does not exist");
                    res.status(503).json("Data Type does not exist")
                }
                models.Data_Regist_Building_Year.find({ Data_Type_ID: data_type._id, Building_ID: building._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, building_data) {
                    if (building_data != null) {
                        res.status(200).send(building_data);

                    } else {
                        if (err) {
                            console.log("DB error");
                            res.status(500).json("DB Error");
                        } else {
                            console.log("No content");
                            res.status(204).json("No content");
                        }
                    }
                });
            });
        }
    });
};

function data_regist_building_add(req, res) {
    console.log('[Building Node API] Add Data.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        } else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Mobile Node does not exist");
                    res.status(503).json("Mobile Node does not exist")
                } else {


                    models.Data_Type.findOne({ Name: req.body.data_type }, function (err, data_type) {
                        if (data_type == null) {
                            console.log("Data Type does not exist");
                            res.status(503).json("Data Type does not exist")
                        } else {
                            var newRecord = new models.Data_Regist_Building({
                                Data_Type_ID: data_type._id,
                                Building_ID: building._id,
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
            });
        }
    });
};


function data_regist_building_get(req, res) {
    console.log('[Building Node API] Get Data.');
    models.Building.findOne({ Name: req.swagger.params.name.value }, function (err, building) {
        if (building == null) {
            console.log("Building does not exist");
            res.status(503).json("Building does not exist")
        } else {
            models.Data_Type.findOne({ Name: req.swagger.params.data_type.value }, function (err, data_type) {
                if (data_type == null) {
                    console.log("Data Type does not exist");
                    res.status(503).json("Data Type does not exist")
                } else {
                    models.Data_Regist_Building.findOne({ Building_ID: building._id, Data_Type_ID: data_type._id }, function (err, data_regist) {
                        if (data_regist == null) {
                            console.log("Data_regist does not exist");
                            res.status(503).json("Data_regist does not exist");
                        } else {
                            data_send = data_regist.Value;
                            res.json({
                                message: data_send
                            });
                        }
                    });
                }
            });
        }
    });
};


function visiting_time_get(req, res) {
    console.log('[Building Node API] Get Data.');
    models.Building.findOne({ Name: req.swagger.params.name.value }, function (err, building) {
        if (building == null) {
            console.log("Building does not exist");
            res.status(503).json("Building does not exist")
        } else {
            if (building.Visiting_Time == null) {
                res.status(503).json("Visiting time does not exist")
            } else {
                data_send = building.Visiting_Time;
                res.json({
                    message: data_send
                });
            }
        }
    });
};


function visiting_time_add(req, res) {
    console.log('[Building Node API] Send Data.');
    models.Building.findOne({ Name: req.swagger.params.name.value }, function (err, building) {
        if (building == null) {
            console.log("Building does not exist");
            res.status(503).json("Building does not exist");
        } else {
            models.building.replaceOne({ Name: building.name }, { Visiting_Time: req.body.visiting_time }, function (err, building) {
                if (err) {
                    res.status(503).json("Error in db");
                }
                if (building != null) {
                    console.log("Updated record!");
                    //recordCreated(newRecord);
                    res.json({
                        message: 'Object updated'
                    })
                }
            });
        }
    });
};


function building_daily_persons_add(req, res) {
    console.log('[Area API] Add Building Daily Persons.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        } else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Building does not exist");
                    res.status(503).json("Building does not exist")
                } else {
                    var newRecord = new models.Building_Daily_Persons({
                        Building_ID: building._id,
                        Value: req.body.value,
                        Day: req.body.day,
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
            });
        }

    });
};

function building_daily_persons_get(req, res) {
    models.Building.findOne({ Name: req.swagger.params.building_name.value }, function (err, building) {
        if (building == null) {
            console.log("Building does not exist");
            res.status(503).json("Building does not exist")
        } else {
            //ano primeiro, de seguida mes e depois dia
            if (req.swagger.params.date.value == null) {
                date_search = "1980/01/01";
            } else {
                date_search = req.swagger.params.date.value;
            }
            models.Building_Daily_Persons.find({ Building_ID: building._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, building_persons) {
                if (building_persons != null) {
                    res.status(200).send(building_persons);

                } else {
                    if (err) {
                        console.log("DB error");
                        res.status(500).json("DB Error");
                    } else {
                        console.log("No content");
                        res.status(204).json("No content");
                    }
                }
            });
        }
    });
};

function building_week_persons_add(req, res) {
    console.log('[Area API] Add Building Week Persons.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        } else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Building does not exist");
                    res.status(503).json("Building does not exist")
                } else {
                    var newRecord = new models.Building_Week_Persons({
                        Building_ID: building._id,
                        Value: req.body.value,
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
            });
        }

    });
};

function building_week_persons_get(req, res) {
    models.Building.findOne({ Name: req.swagger.params.building_name.value }, function (err, building) {
        if (building == null) {
            console.log("Building does not exist");
            res.status(503).json("Building does not exist")
        } else {
            //ano primeiro, de seguida mes e depois dia
            if (req.swagger.params.date.value == null) {
                date_search = "1980/01/01";
            } else {
                date_search = req.swagger.params.date.value;
            }
            models.Building_Week_Persons.find({ Building_ID: building._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, building_persons) {
                if (building_persons != null) {
                    res.status(200).send(building_persons);

                } else {
                    if (err) {
                        console.log("DB error");
                        res.status(500).json("DB Error");
                    } else {
                        console.log("No content");
                        res.status(204).json("No content");
                    }
                }
            });
        }
    });
};


function building_month_persons_add(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Area API] Add Building Month Persons.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        } else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Building does not exist");
                    res.status(503).json("Building does not exist")
                } else {
                    var newRecord = new models.Building_Month_Persons({
                        Building_ID: building._id,
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

    });
};

function building_month_persons_get(req, res) {
    models.Building.findOne({ Name: req.swagger.params.building_name.value }, function (err, building) {
        if (building == null) {
            console.log("Building does not exist");
            res.status(503).json("Building does not exist")
        } else {
            //ano primeiro, de seguida mes e depois dia
            if (req.swagger.params.date.value == null) {
                date_search = "1980/01/01";
            } else {
                date_search = req.swagger.params.date.value;
            }
            models.Building_Month_Persons.find({ Building_ID: building._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, building_persons) {
                if (building_persons != null) {
                    res.status(200).send(building_persons);

                } else {
                    if (err) {
                        console.log("DB error");
                        res.status(500).json("DB Error");
                    } else {
                        console.log("No content");
                        res.status(204).json("No content");
                    }
                }
            });
        }
    });
};


function building_year_persons_add(req, res) {
    console.log('[Area API] Add Building Year Persons.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        } else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Building does not exist");
                    res.status(503).json("Building does not exist")
                } else {
                    var newRecord = new models.Building_Year_Persons({
                        Building_ID: building._id,
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
    });
};

function building_year_persons_get(req, res) {
    models.Building.findOne({ Name: req.swagger.params.building_name.value }, function (err, building) {
        if (building == null) {
            console.log("Building does not exist");
            res.status(503).json("Building does not exist")
        } else {
            //ano primeiro, de seguida mes e depois dia
            if (req.swagger.params.date.value == null) {
                date_search = "1980/01/01";
            } else {
                date_search = req.swagger.params.date.value;
            }
            models.Building_Year_Persons.find({ Building_ID: building._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, building_persons) {
                if (building_persons != null) {
                    res.status(200).send(building_persons);

                } else {
                    if (err) {
                        console.log("DB error");
                        res.status(500).json("DB Error");
                    } else {
                        console.log("No content");
                        res.status(204).json("No content");
                    }
                }
            });
        }
    });
};