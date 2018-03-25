var models = require('../database/models.js');
var moment = require('moment');
var config = require('../../config');
var jsonwebtoken = require('jsonwebtoken');



console.log('[Panel API] Ready.');

module.exports = {
    panel_add: panel_add,
    panel_panel_visitors_week_add: panel_panel_visitors_week_add,
    panel_panel_visitors_month_add: panel_panel_visitors_month_add,
    panel_panel_visitors_year_add: panel_panel_visitors_year_add,
    panel_get: panel_get,
    panel_panel_visitors_week_get: panel_panel_visitors_week_get,
    panel_panel_visitors_month_get: panel_panel_visitors_month_get,
    panel_panel_visitors_year_get: panel_panel_visitors_year_get
};

function panel_add(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Panel API] Create Panel.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        }
        else {
            models.Panel.findOne({ Name: req.body.panel_name }, function (err, panel) {
                if (panel == null) {
                    var newRecord = new models.Panel({
                        Name: req.body.panel_name,
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
                    console.log("Panel already registered");
                    res.status(503).json("Object already created")
                }
            }
            );
        }

    });
};

function panel_get(req, res) {
    models.Panel.find(function (err, panels) {
        if (panels != null) {
            res.status(200).send(panels);
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

function panel_panel_visitors_week_add(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Panel API] Add Visitors Week.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        }
        else {
            models.Panel.findOne({ Name: req.body.panel_name }, function (err, panel) {
                if (panel == null) {
                    console.log("Panel does not exist");
                    res.status(503).json("Panel does not exist")
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
};

function panel_panel_visitors_week_get(req, res) {
    models.Panel.findOne({ Panel_Name: req.get("panel_name") }, function (err, panel) {
        if (Panel == null) {
            console.log("Panel does not exist");
            res.status(503).json("Panel does not exist")
        }
        else {
            //ano primeiro, de seguida mes e depois dia
            if (req.get("date") == null) {
                date_search = "1980/01/01";
            }
            else {
                date_search = req.get("date");
            }
            models.Panel_Visitors_Week.find({ Panel_ID: area._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, visitors) {
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

function panel_panel_visitors_month_add(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Panel API] Add Visitors Month.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        }
        else {
            models.Panel.findOne({ Name: req.body.panel_name }, function (err, panel) {
                if (panel == null) {
                    console.log("Panel does not exist");
                    res.status(503).json("Panel does not exist")
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
};

function panel_panel_visitors_month_get(req, res) {
    models.Panel.findOne({ Panel_Name: req.get("panel_name") }, function (err, panel) {
        if (Panel == null) {
            console.log("Panel does not exist");
            res.status(503).json("Panel does not exist")
        }
        else {
            //ano primeiro, de seguida mes e depois dia
            if (req.get("date") == null) {
                date_search = "1980/01/01";
            }
            else {
                date_search = req.get("date");
            }
            models.Panel_Visitors_Month.find({ Panel_ID: area._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, visitors) {
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


function panel_panel_visitors_year_add(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Panel API] Add Visitors Year.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        }
        else {
            models.Panel.findOne({ Name: req.body.panel_name }, function (err, panel) {
                if (panel == null) {
                    console.log("Panel does not exist");
                    res.status(503).json("Panel does not exist")
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
};

function panel_panel_visitors_year_get(req, res) {
    models.Panel.findOne({ Panel_Name: req.get("panel_name") }, function (err, panel) {
        if (Panel == null) {
            console.log("Panel does not exist");
            res.status(503).json("Panel does not exist")
        }
        else {
            //ano primeiro, de seguida mes e depois dia
            if (req.get("date") == null) {
                date_search = "1980/01/01";
            }
            else {
                date_search = req.get("date");
            }
            models.Panel_Visitors_Year.find({ Panel_ID: area._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, visitors) {
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