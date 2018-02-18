var models = require('../database/models.js');
var moment = require('moment');
var config = require('../../config');
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
    data_regist_building_get: data_regist_building_get,
    visiting_time_get: visiting_time_get,
    visiting_time_add: visiting_time_add
};

console.log('[Building API] Ready.');

function building_add(req, res) {
    console.log('[Building API] Create Building.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        }
        else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    var newRecord = new models.Building({
                        Name: req.body.building_name,
                        Description: req.body.description,
                        Date_Build: req.body.date_build,
                        Location: req.body.location,
                        Visiting_Time: req.body.visiting_time
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
                    console.log("Building already registered");
                    res.json({
                        message: 'Object already created'
                    })
                }
            }
            );
        }
    });
};


function building_energy_month_add(req, res) {
    console.log('[Building API] Add Energy Month.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        }
        else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Area does not exist");
                    res.status(503).json("Building does not exist")
                }
                else {
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
            }
            );
        }
    });
};


function building_energy_year_add(req, res) {
    console.log('[Building API] Add Energy Year.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        }
        else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Area does not exist");
                    res.status(503).json("Building does not exist")
                }
                else {
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
            }
            );
        }
    });
};


function building_security_add(req, res) {
    console.log('[Area API] Add Building Security.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        }
        else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Building does not exist");
                    res.status(503).json("Building does not exist")
                }
                else {
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
            }
            );
        }

    });
};


function interested_persons_buildings_week_add(req, res) {
    console.log('[Area API] Add Building Interest Week.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        }
        else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Building does not exist");
                    res.status(503).json("Building does not exist")
                }
                else {




                    models.Panel.findOne({ Name: req.body.panel_name }, function (err, panel) {
                        if (panel == null) {
                            console.log("Panel does not exist");
                            res.json({
                                message: 'Panel does not exist'
                            })
                        }
                        else {
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
            }
            );
        }
    });
};


function interested_persons_buildings_month_add(req, res) {
    console.log('[Area API] Add Building Interest Month.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        }
        else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Building does not exist");
                    res.status(503).json("Building does not exist")
                }
                else {




                    models.Panel.findOne({ Name: req.body.panel_name }, function (err, panel) {
                        if (panel == null) {
                            console.log("Building does not exist");
                            res.status(503).json("Building does not exist")
                        }
                        else {
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
            }
            );
        }
    });
};


function interested_persons_buildings_year_add(req, res) {
    console.log('[Area API] Add Building Interest Year.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        }
        else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Building does not exist");
                    res.status(503).json("Building does not exist")
                }
                else {




                    models.Panel.findOne({ Name: req.body.panel_name }, function (err, panel) {
                        if (panel == null) {
                            console.log("Building does not exist");
                            res.status(503).json("Building does not exist")
                        }
                        else {
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
            }
            );
        }
    });
};


function data_regist_building_month_add(req, res) {
    console.log('[Building Node API] Add Data Month.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        }
        else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Mobile Node does not exist");
                    res.status(503).json("Mobile Node does not exist")
                }
                else {


                    models.Data_Type.findOne({ Name: req.body.data_type }, function (err, data_type) {
                        if (data_type == null) {
                            console.log("Data Type does not exist");
                            res.status(503).json("Data Type does not exist")
                        }

                        else {
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
            }
            );
        }
    });
};


function data_regist_building_year_add(req, res) {
    console.log('[Building Node API] Add Data Year.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        }
        else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Mobile Node does not exist");
                    res.status(503).json("Mobile Node does not exist")
                }
                else {


                    models.Data_Type.findOne({ Name: req.body.data_type }, function (err, data_type) {
                        if (data_type == null) {
                            console.log("Data Type does not exist");
                            res.status(503).json("Data Type does not exist")
                        }

                        else {
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
            }
            );
        }
    });
};


function data_regist_building_add(req, res) {
    console.log('[Building Node API] Add Data.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        }
        else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Mobile Node does not exist");
                    res.status(503).json("Mobile Node does not exist")
                }
                else {


                    models.Data_Type.findOne({ Name: req.body.data_type }, function (err, data_type) {
                        if (data_type == null) {
                            console.log("Data Type does not exist");
                            res.status(503).json("Data Type does not exist")
                        }

                        else {
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
            }
            );
        }
    });
};

function data_regist_building_get(req, res) {
    console.log('[Building Node API] Get Data.');
    models.Building.findOne({ Name: req.swagger.params.name.value }, function (err, building) {
        if (building == null) {
            console.log("Building does not exist");
            res.status(503).json("Building does not exist")
        }
        else {
            models.Data_Type.findOne({ Name: req.swagger.params.data_type.value }, function (err, data_type) {
                if (data_type == null) {
                    console.log("Data Type does not exist");
                    res.status(503).json("Data Type does not exist")
                }

                else {
                    models.Data_Regist_Building.findOne({ Building_ID: building._id, Data_Type_ID: data_type._id }, function (err, data_regist) {
                        if (data_regist == null) {
                            console.log("Data_regist does not exist");
                            res.status(503).json("Data_regist does not exist");
                        }
                        else {
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
        }
        else {
            if (building.Visiting_Time == null) {
                res.status(503).json("Visiting time does not exist")
            }
            else {
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
        }
        else {
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
        }
        else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Building does not exist");
                    res.status(503).json("Building does not exist")
                }
                else {
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
            }
            );
        }

    });
};


function building_week_persons_add(req, res) {
    console.log('[Area API] Add Building Week Persons.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        }
        else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Building does not exist");
                    res.status(503).json("Building does not exist")
                }
                else {
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
            }
            );
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
        }
        else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Building does not exist");
                    res.status(503).json("Building does not exist")
                }
                else {
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
            }
            );
        }

    });
};


function building_year_persons_add(req, res) {
    console.log('[Area API] Add Building Year Persons.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        }
        else {
            models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                if (building == null) {
                    console.log("Building does not exist");
                    res.status(503).json("Building does not exist")
                }
                else {
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
            }
            );
        }
    });
};
