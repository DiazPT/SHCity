var app = module.exports = require('express')();
var models = require('../database/models.js');
var moment = require('moment');
var jwt = require('express-jwt');
var config = require('../config');
var jsonwebtoken = require('jsonwebtoken');
var async = require('async');


console.log('[Building API] Ready.');

app.post('/api/building/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Building API] Create Building.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Building.findOne({Name: req.body.building_name}, function (err, building) {
                    if (building == null) {
                        var newRecord = new models.Area({
                            Name: req.body.building_name,
                            Description: req.body.description,
                            Date_Build: req.body.date_build,
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
                        console.log("Building already registered");
                        res.json({
                            message: 'Object already created'
                        })
                    }
                }
            );
        }
    });
});


app.post('/api/building/building_energy_monthly/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Building API] Add Energy Month.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Building.findOne({Name: req.body.building_name}, function (err, building) {
                    if (building == null) {
                        console.log("Area does not exist");
                        res.json({
                            message: 'Area does not exist'
                        })
                    }
                    else {
                        var newRecord = new models.Building_Energy_Monthly({
                            Building_ID: area._id,
                            Description: req.body.description,
                            E_Consume : req.body.consume,
                            E_Consume_Cost : req.body.consume_cost,
                            E_Consume_Heating : req.body.consume_heating,
                            E_Consume_Heating_Cost : req.body.consume_heating_cost,
                            E_Consume_Ilumination : req.body.consume_ilumination,
                            E_Consume_Ilumination_Cost : req.body.consume_ilumination_cost,
                            E_Consume_Ilumination_Exterior : req.body.consume_ilumination_ext,
                            E_Consume_Ilumination_Exterior_Cost : req.body.consume_ilumination_ext_cost,
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


app.post('/api/building/building_energy_anual/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Building API] Add Energy Year.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Building.findOne({Name: req.body.building_name}, function (err, building) {
                    if (building == null) {
                        console.log("Area does not exist");
                        res.json({
                            message: 'Area does not exist'
                        })
                    }
                    else {
                        var newRecord = new models.Building_Energy_Monthly({
                            Building_ID: building._id,
                            Description: req.body.description,
                            E_Consume : req.body.consume,
                            E_Consume_Metro : req.body.consume_metro,
                            E_Consume_Person : req.body.consume_person,
                            E_Consume_Degree_Day : req.body.consume_degree,
                            E_Consume_Cost : req.body.consume_cost,
                            E_Consume_Heating : req.body.consume_heating,
                            E_Consume_Heating_Metro : req.body.consume_heating_metro,
                            E_Consume_Heating_Person : req.body.consume_heating_person,
                            E_Consume_Heating_Metro_Degree_Day : req.body.consume_heating_degree,
                            E_Consume_Heating_Cost : req.body.consume_heating_cost,
                            E_Consume_Ilumination : req.body.consume_ilumination,
                            E_Consume_Ilumination_Metro : req.body.consume_ilumination_metro,
                            E_Consume_Ilumination_Person : req.body.consume_ilumination_person,
                            E_Consume_Ilumination_Cost : req.body.consume_ilumination_cost,
                            E_Consume_Ilumination_Exterior : req.body.consume_ilumination_ext,
                            E_Consume_Ilumination_Exterior_Cost : req.body.consume_ilumination_ext_cost,
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


app.post('/api/building/building_security/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Area API] Add Building Security.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Building.findOne({Name: req.body.building_name}, function (err, building) {
                    if (building == null) {
                        console.log("Building does not exist");
                        res.json({
                            message: 'Building does not exist'
                        })
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
});


app.post('/api/building/interested_persons_buildings_week/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Area API] Add Building Interest Week.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Building.findOne({Name: req.body.building_name}, function (err, building) {
                    if (building == null) {
                        console.log("Building does not exist");
                        res.json({
                            message: 'Building does not exist'
                        })
                    }
                    else {




                        models.Panel.findOne({Name: req.body.panel_name}, function (err, panel) {
                            if (panel == null) {
                                console.log("Building does not exist");
                                res.json({
                                    message: 'Building does not exist'
                                })
                            }
                            else {
                                var newRecord = new models.Interested_Persons_Buildings_Week({
                                    Building_ID: building._id,
                                    Selected_Panel_ID : panel._id,
                                    Traffic_Area : req.body.traffic,
                                    Number_Tickets : req.body.tickets,
                                    Week : req.body.week,
                                    Month : req.body.month,
                                    Year : req.body.year
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


app.post('/api/building/interested_persons_buildings_month/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Area API] Add Building Interest Month.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Building.findOne({Name: req.body.building_name}, function (err, building) {
                    if (building == null) {
                        console.log("Building does not exist");
                        res.json({
                            message: 'Building does not exist'
                        })
                    }
                    else {




                        models.Panel.findOne({Name: req.body.panel_name}, function (err, panel) {
                            if (panel == null) {
                                console.log("Building does not exist");
                                res.json({
                                    message: 'Building does not exist'
                                })
                            }
                            else {
                                var newRecord = new models.Interested_Persons_Buildings_Month({
                                    Building_ID: building._id,
                                    Selected_Panel_ID : panel._id,
                                    Traffic_Area : req.body.traffic,
                                    Number_Tickets : req.body.tickets,
                                    Month : req.body.month,
                                    Year : req.body.year
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


app.post('/api/building/interested_persons_buildings_year/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Area API] Add Building Interest Year.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Building.findOne({Name: req.body.building_name}, function (err, building) {
                    if (building == null) {
                        console.log("Building does not exist");
                        res.json({
                            message: 'Building does not exist'
                        })
                    }
                    else {




                        models.Panel.findOne({Name: req.body.panel_name}, function (err, panel) {
                            if (panel == null) {
                                console.log("Building does not exist");
                                res.json({
                                    message: 'Building does not exist'
                                })
                            }
                            else {
                                var newRecord = new models.Interested_Persons_Buildings_Year({
                                    Building_ID: building._id,
                                    Selected_Panel_ID : panel._id,
                                    Traffic_Area : req.body.traffic,
                                    Number_Tickets : req.body.tickets,
                                    Year : req.body.year
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


app.post('/api/building/data_regist_building_month/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Building Node API] Add Data Month.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Building.findOne({Name: req.body.building_name}, function (err, building) {
                    if (building == null) {
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
});


app.post('/api/building/data_regist_building_year/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Building Node API] Add Data Year.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Building.findOne({Name: req.body.building_name}, function (err, building) {
                    if (building == null) {
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
});


app.post('/api/building/data_regist_building/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Building Node API] Add Data.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Building.findOne({Name: req.body.building_name}, function (err, building) {
                    if (building == null) {
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
});


app.post('/api/building/building_daily_persons/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Area API] Add Building Daily Persons.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Building.findOne({Name: req.body.building_name}, function (err, building) {
                    if (building == null) {
                        console.log("Building does not exist");
                        res.json({
                            message: 'Building does not exist'
                        })
                    }
                    else {
                        var newRecord = new models.Building_Daily_Persons({
                            Building_ID: building._id,
                            Value: req.body.type_incident,
                            Day : req.body.day,
                            Week : req.body.week,
                            Month : req.body.month,
                            Year : req.body.year
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


app.post('/api/building/building_week_persons/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Area API] Add Building Week Persons.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Building.findOne({Name: req.body.building_name}, function (err, building) {
                    if (building == null) {
                        console.log("Building does not exist");
                        res.json({
                            message: 'Building does not exist'
                        })
                    }
                    else {
                        var newRecord = new models.Building_Week_Persons({
                            Building_ID: building._id,
                            Value: req.body.type_incident,
                            Week : req.body.week,
                            Month : req.body.month,
                            Year : req.body.year
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


app.post('/api/building/building_month_persons/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Area API] Add Building Month Persons.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Building.findOne({Name: req.body.building_name}, function (err, building) {
                    if (building == null) {
                        console.log("Building does not exist");
                        res.json({
                            message: 'Building does not exist'
                        })
                    }
                    else {
                        var newRecord = new models.Building_Month_Persons({
                            Building_ID: building._id,
                            Value: req.body.value,
                            Month : req.body.month,
                            Year : req.body.year
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


app.post('/api/building/building_year_persons/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Area API] Add Building Year Persons.');
    models.Producer.findOne({Username: req.body.username, Token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Building.findOne({Name: req.body.building_name}, function (err, building) {
                    if (building == null) {
                        console.log("Building does not exist");
                        res.json({
                            message: 'Building does not exist'
                        })
                    }
                    else {
                        var newRecord = new models.Building_Year_Persons({
                            Building_ID: building._id,
                            Value: req.body.value,
                            Year : req.body.year
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