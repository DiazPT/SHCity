var models = require('../database/models.js');
var moment = require('moment');
var config = require('../../config');
var ObjectId = require('mongodb').ObjectID;
var jsonwebtoken = require('jsonwebtoken');



module.exports = {
    area_add: area_add,
    area_visitors_week_add: area_visitors_week_add,
    area_visitors_month_add: area_visitors_month_add,
    area_visitors_year_add: area_visitors_year_add,
    area_traffic_week_add: area_traffic_week_add,
    area_traffic_month_add: area_traffic_month_add,
    area_traffic_year_add: area_traffic_year_add,
    area_security_add: area_security_add,
    area_get: area_get,
    area_visitors_week_get: area_visitors_week_get,
    area_visitors_month_get: area_visitors_month_get,
    area_visitors_year_get: area_visitors_year_get,
    area_traffic_week_get: area_traffic_week_get,
    area_traffic_month_get: area_traffic_month_get,
    area_traffic_year_get: area_traffic_year_get,
    area_security_get: area_security_get
};


console.log('[Area API] Ready.');

/* Logs a area creation */
function area_add(req, res) {
    console.log('[Area API] Create Area.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session");
        }
        else {
            models.Area.findOne({ Area_Name: req.body.area_name }, function (err, area) {
                if (area == null) {
                    var newRecord = new models.Area({
                        Area_Name: req.body.area_name,
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
                    console.log("Area already registered");
                    res.json({
                        message: 'Object already created'
                    })
                }
            }
            );
        }

    });
};

function area_get(req, res) {
    models.Area.find(function (err, areas) {
        if (areas != null) {
            res.status(200).send(areas);
        }
        else {
            if (err) {
                console.log("DB error");
                res.status(500).json("DB Error");
            }
            else {
                console.log("No content");
                res.status(204).json("No content");
            }
        }
    });

};

function area_visitors_week_add(req, res) {
    console.log('[Area API] Add Visitors Week.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session");
        }
        else {
            models.Area.findOne({ Area_Name: req.body.area_name }, function (err, area) {
                if (area == null) {
                    console.log("Area does not exist");
                    res.status(503).json("Area does not exist");
                }
                else {
                    var newRecord = new models.Area_Visitors_Week({
                        Area_ID: area._id,
                        Description: req.body.description,
                        Percent_Person_Area: req.body.percent_person_area,
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


function area_visitors_week_get(req, res) {
    models.Area.findOne({ Area_Name: req.get("area_name") }, function (err, area) {
        if (area == null) {
            console.log("Area does not exist");
            res.status(503).json("Area does not exist")
        }
        else {
            //ano primeiro, de seguida mes e depois dia
            if (req.get("date") == null) {
                date_search = "1980/01/01";
            }
            else {
                date_search = req.get("date");
            }
            models.Area_Visitors_Week.find({ Area_ID: area._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, visitors) {
                if (visitors != null) { 
                    res.status(200).send(visitors);

                }
                else {
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

function area_visitors_month_add(req, res) {
    console.log('[Area API] Add Visitors Month.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session");
        }
        else {
            models.Area.findOne({ Area_Name: req.body.area_name }, function (err, area) {
                if (area == null) {
                    console.log("Area does not exist");
                    res.status(503).json("Area does not exist");
                }
                else {
                    var newRecord = new models.Area_Visitors_Month({
                        Area_ID: area._id,
                        Description: req.body.description,
                        Percent_Person_Area: req.body.percent_person_area,
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

function area_visitors_month_get(req, res) {
    models.Area.findOne({ Area_Name: req.get("area_name") }, function (err, area) {
        if (area == null) {
            console.log("Area does not exist");
            res.status(503).json("Area does not exist")
        }
        else {
            //ano primeiro, de seguida mes e depois dia
            if (req.get("date") == null) {
                date_search = "1980/01/01";
            }
            else {
                date_search = req.get("date");
            }
            models.Area_Visitors_Month.find({ Area_ID: area._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, visitors) {
                if (visitors != null) {
                    res.status(200).send(visitors);

                }
                else {
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

function area_visitors_year_add(req, res) {
    console.log('[Area API] Add Visitors Year.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session");
        }
        else {
            models.Area.findOne({ Area_Name: req.body.area_name }, function (err, area) {
                if (area == null) {
                    console.log("Area does not exist");
                    res.status(503).json("Area does not exist");
                }
                else {
                    var newRecord = new models.Area_Visitors_Year({
                        Area_ID: area._id,
                        Description: req.body.description,
                        Percent_Person_Area: req.body.percent_person_area,
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

function area_visitors_year_get(req, res) {
    models.Area.findOne({ Area_Name: req.get("area_name") }, function (err, area) {
        if (area == null) {
            console.log("Area does not exist");
            res.status(503).json("Area does not exist")
        }
        else {
            //ano primeiro, de seguida mes e depois dia
            if (req.get("date") == null) {
                date_search = "1980/01/01";
            }
            else {
                date_search = req.get("date");
            }
            models.Area_Visitors_Year.find({ Area_ID: area._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, visitors) {
                if (visitors != null) {
                    res.status(200).send(visitors);

                }
                else {
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

function area_traffic_week_add(req, res) {
    console.log('[Area API] Add Traffic Week.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session");
        }
        else {
            models.Area.findOne({ Area_Name: req.body.area_name1 }, function (err, area1) {
                if (area1 == null) {
                    console.log("Area does not exist");
                    res.status(503).json("Area1 does not exist");
                }
                else {
                    models.Area.findOne({ Area_Name: req.body.area_name2 }, function (err, area2) {
                        if (area2 == null) {
                            console.log("Area does not exist");
                            res.status(503).json("Area2 does not exist");
                        }

                        else {
                            var newRecord = new models.Area_Traffic_Week({
                                Area1_ID: area1._id,
                                Area2_ID: area2._id,
                                Flow_Persons: req.body.flow_persons,
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

function area_traffic_week_get(req, res) {
    models.Area.findOne({ Area_Name: req.get("area_name") }, function (err, area) {
        if (area == null) {
            console.log("Area does not exist");
            res.status(503).json("Area does not exist")
        }
        else {
            //ano primeiro, de seguida mes e depois dia
            if (req.get("date") == null) {
                date_search = "1980/01/01";
            }
            else {
                date_search = req.get("date");
            }
            models.Area_Traffic_Week.find({ Area_ID: area._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, traffics) {
                if (traffics != null) {
                    res.status(200).send(traffics);

                }
                else {
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

function area_traffic_month_add(req, res) {
    console.log('[Area API] Add Traffic Month.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session");
        } else {
            models.Area.findOne({ Area_Name: req.body.area_name1 }, function (err, area1) {
                if (area1 == null) {
                    console.log("Area does not exist");
                    res.status(503).json("Area1 does not exist");
                }
                else {
                    models.Area.findOne({ Area_Name: req.body.area_name2 }, function (err, area2) {
                        if (area2 == null) {
                            console.log("Area does not exist");
                            res.status(503).json("Area2 does not exist");
                        }

                        else {
                            var newRecord = new models.Area_Traffic_Month({
                                Area1_ID: area1._id,
                                Area2_ID: area2._id,
                                Flow_Persons: req.body.flow_persons,
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

function area_traffic_month_get(req, res) {
    models.Area.findOne({ Area_Name: req.get("area_name") }, function (err, area) {
        if (area == null) {
            console.log("Area does not exist");
            res.status(503).json("Area does not exist")
        }
        else {
            //ano primeiro, de seguida mes e depois dia
            if (req.get("date") == null) {
                date_search = "1980/01/01";
            }
            else {
                date_search = req.get("date");
            }
            models.Area_Traffic_Month.find({ Area_ID: area._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, traffics) {
                if (traffics != null) {
                    res.status(200).send(traffics);

                }
                else {
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
}

function area_traffic_year_add(req, res) {
    console.log('[Area API] Add Traffic Year.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session");
        }
        else {
            models.Area.findOne({ Area_Name: req.body.area_name1 }, function (err, area1) {
                if (area1 == null) {
                    console.log("Area does not exist");
                    res.status(503).json("Area1 does not exist");
                }
                else {
                    models.Area.findOne({ Area_Name: req.body.area_name2 }, function (err, area2) {
                        if (area2 == null) {
                            console.log("Area does not exist");
                            res.status(503).json("Area2 does not exist");
                        }

                        else {
                            var newRecord = new models.Area_Traffic_Year({
                                Area1_ID: area1._id,
                                Area2_ID: area2._id,
                                Flow_Persons: req.body.flow_persons,
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

function area_traffic_year_get(req, res) {
    models.Area.findOne({ Area_Name: req.get("area_name") }, function (err, area) {
        if (area == null) {
            console.log("Area does not exist");
            res.status(503).json("Area does not exist")
        }
        else {
            //ano primeiro, de seguida mes e depois dia
            if (req.get("date") == null) {
                date_search = "1980/01/01";
            }
            else {
                date_search = req.get("date");
            }
            models.Area_Traffic_Year.find({ Area_ID: area._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, traffics) {
                if (traffics != null) {
                    res.status(200).send(traffics);

                }
                else {
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


function area_security_add(req, res) {
    console.log('[Area API] Add Area Security.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session");
        }
        else {
            models.Area.findOne({ Area_Name: req.body.area_name }, function (err, area) {
                if (area == null) {
                    console.log("Area does not exist");
                    res.status(503).json("Area does not exist");
                }
                else {
                    var newRecord = new models.Area_Security({
                        Area_ID: area._id,
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

function area_security_get(req, res) {
    models.Area.findOne({ Area_Name: req.get("area_name") }, function (err, area) {
        if (area == null) {
            console.log("Area does not exist");
            res.status(503).json("Area does not exist")
        }
        else {
            //ano primeiro, de seguida mes e depois dia
            if (req.get("date") == null) {
                date_search = "1980/01/01";
            }
            else {
                date_search = req.get("date");
            }
            models.Area_Security.find({ Area_ID: area._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, security_events) {
                if (security_events != null) {
                    res.status(200).send(security_events);

                }
                else {
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
