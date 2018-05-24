var models = require('../database/models.js');
var moment = require('moment');
var config = require('../../config');
var ObjectId = require('mongodb').ObjectID;
var jsonwebtoken = require('jsonwebtoken');


console.log('[Area and Building API] Ready.');

module.exports = {
    areas_and_buildings_top_visits_add: areas_and_buildings_top_visits_add,
    areas_and_buildings_top_visits_get: areas_and_buildings_top_visits_get,
    areas_and_buildings_level_occupation_add: areas_and_buildings_level_occupation_add,
    areas_and_buildings_level_occupation_schedule_add: areas_and_buildings_level_occupation_schedule_add,
    areas_and_buildings_level_occupation_get: areas_and_buildings_level_occupation_get,
    areas_and_buildings_waiting_time_get: areas_and_buildings_waiting_time_get,
    areas_and_buildings_level_occupation_schedule_get: areas_and_buildings_level_occupation_schedule_get,
    areas_and_buildings_zone_add: areas_and_buildings_zone_add,
    areas_and_buildings_zone_get: areas_and_buildings_zone_get
};


function areas_and_buildings_top_visits_add(req, res) {
    console.log('[Area and Building API] Add Top.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session");
        }
        else {
            //Building = 0 Area = 1
            if (req.body.type == 1) {
                models.Area.findOne({ Area_Name: req.body.area_name }, function (err, area) {
                    if (area == null) {
                        console.log("Area does not exist");
                        res.status(503).json("Area does not exist")
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
                                });
                            }

                        });
                    }
                }
                );
            }
            else {
                if (req.body.type == 0) {
                    models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                        if (building == null) {
                            console.log("Building does not exist");
                            res.status(503).json("Building does not exist")
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
                                    });
                                }

                            });
                        }
                    }
                    );
                }
                else {
                    console.log("Type error");
                    res.status(503).json("Type is not valid")
                }
            }
        }
    });
};


function areas_and_buildings_zone_add(req, res) {
    console.log('[Area and Building API] Add Zone.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session");
        }
        else {
            //Building = 0 Area = 1
            if (req.body.type == 1) {
                models.Area.findOne({ Area_Name: req.body.area_name }, function (err, area) {
                    if (area == null) {
                        console.log("Area does not exist");
                        res.status(503).json("Area does not exist")
                    }
                    else {
                        models.Zone.findOne({ Name: req.body.name }, function (err, zone) {
                            if (zone == null) {
                                var newRecord = new models.Zone({
                                    Name: req.body.name,
                                    Area_ID: area._id,
                                    Description: req.body.description,
                                    Location: req.body.location,
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
                                        });
                                    }

                                });
                            }
                            else {
                                console.log("Zone already registered");
                                res.json({
                                    message: 'Object already created'
                                });
                            }
                        });


                    }
                }
                );
            }
            else {
                if (req.body.type == 0) {
                    models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                        if (building == null) {
                            console.log("Building does not exist");
                            res.status(503).json("Building does not exist")
                        }
                        else {
                            models.Zone.findOne({ Name: req.body.name }, function (err, zone) {
                                if (zone == null) {
                                    var newRecord = new models.Zone({
                                        Name: req.body.name,
                                        Building_ID: building._id,
                                        Description: req.body.description,
                                        Location: req.body.location,
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
                                            });
                                        }

                                    });
                                }
                                else {
                                    console.log("Zone already registered");
                                    res.json({
                                        message: 'Object already created'
                                    });
                                }
                            });
                        }
                    }
                    );
                }
                else {
                    console.log("Type error");
                    res.status(503).json("Type is not valid")
                }
            }
        }
    });
};

function areas_and_buildings_zone_get(req, res) {
    models.Zone.find(function (err, zones) {
        if (zones != null) {
            res.status(200).send(zones);
        }
        else {
            if (err) {
                console.log("No content");
                res.status(204).json("No content");
            }
            else {
                console.log("DB error");
                res.status(500).json("DB Error");
            }
        }
    });
}


//Por terminar!
function areas_and_buildings_top_visits_get(req, res) {
    console.log('[Area and Building API] Get Top.');
    var i = 0;
    var area_name = null;
    var n = 0;
    var building_name = null;
    //Building = 0 Area = 1
    if (req.swagger.params.type.value == 1) {
        models.Area.find(function (err, areas) {
            if (areas != null) {
                models.Top_Visits.find({ Area_ID: { $ne: null } }, function (err, top) {
                    for (i = 0; i++; i != top.length()) {
                        while (area_name == null) {
                            if (top[i].Area_ID == areas[n]._id) {
                                area_name == areas[n].Area_Name;
                            }
                            n++;
                        }
                        top[i].Area_ID = area_name;
                        area_name = null;
                        n = 0;
                    }
                });
            }
            else {
                if (err) {
                    console.log("No content");
                    res.status(204).json("No content");
                }
                else {
                    console.log("DB error");
                    res.status(500).json("DB Error");
                }
            }
        });

    }
    if (req.swagger.params.type.value == 0) {
        models.Building.find(function (err, buildings) {
            if (areas != null) {
                models.Top_Visits.find({ Building_ID: { $ne: null } }, function (err, top) {
                    for (i = 0; i++; i != top.length()) {
                        while (building_name == null) {
                            if (top[i].Building_ID == buildings[n]._id) {
                                building_name == areas[n].Building_ID;
                            }
                            n++;
                        }
                        top[i].Building_ID = building_name;
                        building_name = null;
                        n = 0;
                    }
                });
            }
            else {
                if (err) {
                    console.log("No content");
                    res.status(204).json("No content");
                }
                else {
                    console.log("DB error");
                    res.status(500).json("DB Error");
                }
            }
        });
    }
    if (req.swagger.params.type.value != 1 && req.swagger.params.type.value != 0) {
        console.log("Type error");
        res.status(503).json("Type is not valid");
    }
};


function areas_and_buildings_level_occupation_get(req, res) {
    console.log('[Area and Building API] Get Occupation.');

    //Building = 0 Area = 1
    //console.log(req.swagger.params.type.value);
    if (req.swagger.params.type.value == 1) {
        models.Area.findOne({ Area_Name: req.swagger.params.area_name.value }, function (err, area) {
            if (area == null) {
                console.log("Area does not exist");
                res.status(503).json("Area does not exist")
            }
            else {

                models.Level_Occupation.findOne({ Area_ID: area._id }, { sort: { 'created_at': -1 } }, function (err, occupation) {
                    if (occupation == null) {
                        console.log("Building does not exist");
                        res.status(503).json("Building does not exist")
                    }
                    else {
                        occupation_final = occupation.Occupation;
                        res.json({
                            message: occupation_final

                        });
                    }
                }).sort({ _id: -1 }).limit(1);




            }
        }
        );
    }
    else {
        if (req.swagger.params.type.value == 0) {
            models.Building.findOne({ Name: req.swagger.params.name.value }, function (err, building) {
                if (building == null) {
                    console.log("Building does not exist");
                    res.status(503).json("Building does not exist")
                }
                else {
                    models.Level_Occupation.findOne({ Building_ID: building._id }, function (err, occupation) {
                        if (occupation == null) {
                            console.log("Building does not exist");
                            res.status(503).json("Building does not exist")
                        }
                        else {
                            occupation_final = occupation.Occupation;
                            res.json({
                                message: occupation_final

                            });
                        }
                    }).sort({ _id: -1 }).limit(1);

                }
            }
            );
        }
        else {
            console.log("Type error");
            res.status(503).json("Type is not valid");
        }
    }
};

function areas_and_buildings_waiting_time_get(req, res) {
    console.log('[Area and Building API] Get Waiting time.');

    //Building = 0 Area = 1
    console.log(req.swagger.params.type.value);
    if (req.swagger.params.type.value == 1) {
        models.Area.findOne({ Area_Name: req.swagger.params.area_name.value }, function (err, area) {
            if (area == null) {
                console.log("Area does not exist");
                res.status(503).json("Area does not exist")
            }
            else {

                models.Level_Occupation.findOne({ Area_ID: area._id }, function (err, occupation) {
                    if (occupation == null) {
                        console.log("Building does not exist");
                        res.status(503).json("Building does not exist")
                    }
                    else {
                        waiting_avg_time = occupation.Average_Waiting_Time;
                        res.json({
                            message: waiting_avg_time

                        });
                    }
                }).sort({ _id: -1 }).limit(1);




            }
        }
        );
    }
    else {
        if (req.swagger.params.type.value == 0) {

            models.Building.findOne({ Name: req.swagger.params.name.value }, function (err, building) {
                if (building == null) {
                    console.log("Building does not exist");
                    res.status(503).json("Building does not exist")
                }
                else {
                    console.log(building);
                    models.Level_Occupation.findOne({ Building_ID: building._id }, function (err, occupation) {
                        if (occupation == null) {
                            console.log("Building does not exist");
                            res.status(503).json("No occupation found")
                        }
                        else {
                            console.log(occupation);
                            waiting_avg_time = occupation.Average_Waiting_Time;
                            res.json({
                                message: waiting_avg_time

                            });
                        }
                    }).sort({ _id: -1 }).limit(1);

                }
            }
            );
        }
        else {
            console.log("Type error");
            res.status(503).json("Type is not valid");
        }
    }
};

function areas_and_buildings_level_occupation_add(req, res) {
    console.log('[Area and Building API] Add Occupation.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        }
        else {
            //Building = 0 Area = 1
            if (req.body.type == 1) {
                models.Area.findOne({ Area_Name: req.body.area_name }, function (err, area) {
                    if (area == null) {
                        console.log("Area does not exist");
                        res.status(503).json("Area does not exist");
                    }
                    else {
                        var newRecord = new models.Level_Occupation({
                            Area_ID: area._id,
                            Occupation: req.body.occupation,
                            Average_Waiting_Time: req.body.waiting_time,
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
                                });
                            }

                        });
                    }
                }
                );
            }
            else {
                if (req.body.type == 0) {
                    models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                        if (building == null) {
                            console.log("Building does not exist");
                            res.status(503).json("Building does not exist");
                        }
                        else {
                            var newRecord = new models.Level_Occupation({
                                Building_ID: building._id,
                                Occupation: req.body.occupation,
                                Average_Waiting_Time: req.body.waiting_time,
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
                                    });
                                }

                            });
                        }
                    }
                    );
                }
                else {
                    console.log("Type error");
                    res.status(503).json("Type is not valid");
                }
            }
        }
    });
};


function areas_and_buildings_level_occupation_schedule_add(req, res) {
    console.log('[Area and Building API] Add Occupation schedule.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        }
        else {
            //Building = 0 Area = 1
            if (req.body.type == 1) {
                models.Area.findOne({ Area_Name: req.body.area_name }, function (err, area) {
                    if (area == null) {
                        console.log("Area does not exist");
                        res.status(503).json("Area does not exist");
                    }
                    else {

                        models.Level_Occupation_Schedule.findOne({ Name: req.body.building_name }, function (err, Area_schedule) {

                            if (Area_schedule == null) {
                                var newRecord = new models.Level_Occupation_Schedule({
                                    Area_ID: area._id,
                                    Occupation: req.body.occupation,
                                    Schedule: req.body.schedule,
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
                                        });
                                    }

                                });
                            }
                            else {
                                //eleminar anterior
                            }
                        });
                    }
                }
                );
            }
            else {
                if (req.body.type == 0) {
                    models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                        if (building == null) {
                            console.log("Building does not exist");
                            res.status(503).json("Building does not exist");
                        }
                        else {
                            models.Level_Occupation_Schedule.findOne({ Name: req.body.building_name }, function (err, Building_schedule) {
                                if (Building_schedule == null) {
                                    var newRecord = new models.Level_Occupation_Schedule({
                                        Building_ID: building._id,
                                        Occupation: req.body.occupation,
                                        Schedule: req.body.schedule,
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
                                            });
                                        }

                                    });
                                }
                                else {
                                    //eleminar anterior
                                }
                            });
                        }
                    }
                    );
                }
                else {
                    console.log("Type error");
                    res.status(503).json("Type is not valid")
                }
            }
        }
    });
};

function areas_and_buildings_level_occupation_schedule_get(req, res) {
    console.log('[Area and Building API] Get schedule.');

    //Building = 0 Area = 1
    console.log(req.swagger.params.type.value);
    if (req.swagger.params.type.value == 1) {
        models.Area.findOne({ Area_Name: req.swagger.params.area_name.value }, function (err, area) {
            if (area == null) {
                console.log("Area does not exist");
                res.status(503).json("Area does not exist");
            }
            else {

                models.Level_Occupation_Schedule.findOne({ Area_ID: area._id }, function (err, occupation) {
                    if (occupation == null) {
                        console.log("Building does not exist");
                        res.status(503).json("Schedule does not exist");
                    }
                    else {
                        schedule = occupation.Schedule;
                        res.json({
                            message: schedule

                        });
                    }
                }).sort({ _id: -1 }).limit(1);
            }
        }
        );
    }
    else {
        if (req.swagger.params.type.value == 0) {
            models.Building.findOne({ Name: req.swagger.params.name.value }, function (err, building) {
                if (building == null) {
                    console.log("Building does not exist");
                    res.status(503).json("Building does not exist")
                }
                else {
                    models.Level_Occupation_Schedule.findOne({ Building_ID: building._id }, function (err, occupation) {
                        if (occupation == null) {
                            console.log("Building does not exist");
                            res.status(503).json("Schedule does not exist")
                        }
                        else {
                            schedule = occupation.Schedule;
                            res.json({
                                message: schedule

                            });
                        }
                    }).sort({ _id: -1 }).limit(1);

                }
            }
            );
        }
        else {
            console.log("Type error");
            res.status(503).json("Type is not valid");
        }
    }
};