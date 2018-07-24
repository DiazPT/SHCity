var models = require('../database/models.js');
var moment = require('moment');
var config = require('../../config');
var ObjectId = require('mongodb').ObjectID;
var jsonwebtoken = require('jsonwebtoken');



console.log('[Mobile Node API] Ready.');


module.exports = {
    mobile_node_add: mobile_node_add,
    mobile_node_data_regist_mobile_month_add: mobile_node_data_regist_mobile_month_add,
    mobile_node_data_regist_mobile_year_add: mobile_node_data_regist_mobile_year_add,
    mobile_node_data_regist_mobile_add: mobile_node_data_regist_mobile_add,
    mobile_node_get: mobile_node_get,
    mobile_node_data_regist_mobile_month_get: mobile_node_data_regist_mobile_month_get,
    mobile_node_data_regist_mobile_year_get: mobile_node_data_regist_mobile_year_get,
    mobile_node_data_regist_mobile_get: mobile_node_data_regist_mobile_get,
    mobile_node_update: mobile_node_update
};





function mobile_node_update(req, res) {
    var objForUpdate = {};

    if (req.body.id_node) objForUpdate.ID_node = req.body.id_node;
    if (req.body.description) objForUpdate.Description = req.body.description;
    if (req.body.mobile_node_name) objForUpdate.Name = req.body.mobile_node_name;
    if (req.body.type_sensor) objForUpdate.Type_Sensor = req.body.type_sensor;
    if (req.body.location) objForUpdate.Location = req.body.location;
    if (req.body.building_id_2d) objForUpdate.Building_ID_2D = req.body.building_id_2d;
    if (req.body.building_id_3d) objForUpdate.Building_ID_3D = req.body.building_id_3d;

    //var setObj = { $set: objForUpdate };

    models.Mobile_Node.update({ ID_node: req.body.id_node }, {$set: objForUpdate}, function (err, result) {
        if (err) { console.log("database error" + err); res.status(500).json("DB Error"); }
        else {
            res.json({
                message: 'Object Updated'
            })
        }
    });

};



function mobile_node_add(req, res) {
    console.log('[Mobile Node API] Create Mobile Node.');
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
                        if (req.body.zone_name == null) {
                            models.Mobile_Node.findOne({ Name: req.body.name }, function (err, node) {
                                if (node == null) {
                                    var newRecord = new models.Mobile_Node({
                                        Name: req.body.mobile_node_name,
                                        ID_node: req.body.id_node,
                                        Type_Sensor: req.body.type_sensor,
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
                                    console.log("Building already registered");
                                    res.json({
                                        message: 'Object already created'
                                    });
                                }
                            });
                        }
                        else {
                            models.Zone.findOne({ Name: req.body.zone_name }, function (err, zone) {
                                if (zone == null) {
                                    console.log("Zone does not exist");
                                    res.status(503).json("Zone does not exist")
                                }
                                else {
                                    models.Mobile_Node.findOne({ Name: req.body.name }, function (err, node) {
                                        if (node == null) {
                                            var newRecord = new models.Mobile_Node({
                                                Name: req.body.mobile_node_name,
                                                Type_Sensor: req.body.type_sensor,
                                                ID_node: req.body.id_node,
                                                Area_ID: area._id,
                                                Zone_ID: zone._id,
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
                                            console.log("Node already registered");
                                            res.json({
                                                message: 'Object already created'
                                            });
                                        }
                                    });

                                }
                            });
                        }
                    }
                });
            }
            else {
                if (req.body.type == 0) {
                    models.Building.findOne({ Name: req.body.building_name }, function (err, building) {
                        if (building == null) {
                            console.log("Building does not exist");
                            res.status(503).json("Building does not exist")
                        }
                        else {
                            if (req.body.zone_name == null) {
                                models.Mobile_Node.findOne({ Name: req.body.name }, function (err, node) {
                                    if (node == null) {
                                        var newRecord = new models.Mobile_Node({
                                            Name: req.body.mobile_node_name,
                                            ID_node: req.body.id_node,
                                            Type_Sensor: req.body.type_sensor,
                                            Building_ID: building._id,
                                            Building_ID_2D: req.body.building_id_2d,
                                            Building_ID_3D: req.body.building_id_3d,
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
                                        console.log("Node already registered");
                                        res.json({
                                            message: 'Object already created'
                                        });
                                    }
                                });
                            }
                            else {
                                models.Zone.findOne({ Name: req.body.zone_name }, function (err, zone) {
                                    if (zone == null) {
                                        console.log("Zone does not exist");
                                        res.status(503).json("Zone does not exist")
                                    }
                                    else {
                                        models.Mobile_Node.findOne({ Name: req.body.name }, function (err, node) {
                                            if (node == null) {
                                                var newRecord = new models.Mobile_Node({
                                                    Name: req.body.mobile_node_name,
                                                    ID_node: req.body.id_node,
                                                    Type_Sensor: req.body.type_sensor,
                                                    Building_ID: building._id,
                                                    Building_ID_2D: req.body.building_id_2d,
                                                    Building_ID_3D: req.body.building_id_3d,
                                                    Zone_ID: zone._id,
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
                                                console.log("Node already registered");
                                                res.json({
                                                    message: 'Object already created'
                                                });
                                            }
                                        });

                                    }
                                });
                            }
                        }
                    });
                }
                else {
                    console.log("Type error");
                    res.status(503).json("Type is not valid")
                }
            }
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




function mobile_node_get(req, res) {
    models.Mobile_Node.find(function (err, nodes) {
        if (nodes != null) {
            res.status(200).send(nodes);
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
};

function mobile_node_data_regist_mobile_month_add(req, res) {
    console.log('[Mobile Node API] Add Data Month.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session");
        }
        else {
            if (req.body.building_id_2d != null) {
                models.Mobile_Node.findOne({ ID_node: req.body.id_node, Building_ID_2D: req.body.building_id_2d }, function (err, mobile_node) {
                    if (mobile_node == null) {
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
                                var newRecord = new models.Data_Regist_Mobile_Month({
                                    Data_Type_ID: data_type._id,
                                    Mobile_Node_ID_internal: mobile_node._id,
                                    Mobile_Node_ID: req.body.id_node,
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
            else {
                if (req.body.building_id_3d != null) {
                    models.Mobile_Node.findOne({ ID_node: req.body.id_node, Building_ID_3D: req.body.building_id_3d }, function (err, mobile_node) {
                        if (mobile_node == null) {
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
                                    var newRecord = new models.Data_Regist_Mobile_Month({
                                        Data_Type_ID: data_type._id,
                                        Mobile_Node_ID_internal: mobile_node._id,
                                        Mobile_Node_ID: req.body.id_node,
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
                else {
                    if (req.body.area_name != null) {
                        models.Area.findOne({ Area_Name: req.body.area_name }, function (err, area) {
                            models.Mobile_Node.findOne({ ID_node: req.body.id_node, Area_ID: area._id }, function (err, mobile_node) {
                                if (mobile_node == null) {
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
                                            var newRecord = new models.Data_Regist_Mobile_Month({
                                                Data_Type_ID: data_type._id,
                                                Mobile_Node_ID_internal: mobile_node._id,
                                                Mobile_Node_ID: req.body.id_node,
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
                        });
                    }
                    else {

                    }
                }
            }


            
        }
    });
};

function mobile_node_data_regist_mobile_month_get(req, res) {
    if (req.swagger.params.building_id_2d.value != null) {
        models.Mobile_Node.findOne({ ID_node: req.swagger.params.id_node.value, Building_ID_2D: req.swagger.params.building_id_2d.value }, function (err, node) {
            if (node == null) {
                console.log("Node does not exist");
                res.status(503).json("Node does not exist")
            }
            else {
                //ano primeiro, de seguida mes e depois dia
                if (req.swagger.params.date.value == null) {
                    date_search = "1980/01/01";
                }
                else {
                    date_search = req.swagger.params.date.value;
                }
                models.Data_Regist_Mobile_Month.find({ Mobile_Node_ID_internal: node._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, data_event) {
                    if (data_event != null) {
                        res.status(200).send(data_event);

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
    } else {
        if (req.swagger.params.building_id_3d.value != null) {
            models.Mobile_Node.findOne({ ID_node: req.swagger.params.id_node.value, Building_ID_3D: req.swagger.params.building_id_3d.value }, function (err, node) {
                if (node == null) {
                    console.log("Node does not exist");
                    res.status(503).json("Node does not exist")
                }
                else {
                    //ano primeiro, de seguida mes e depois dia
                    if (req.swagger.params.date.value == null) {
                        date_search = "1980/01/01";
                    }
                    else {
                        date_search = req.swagger.params.date.value;
                    }
                    models.Data_Regist_Mobile_Month.find({ Mobile_Node_ID_internal: node._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, data_event) {
                        if (data_event != null) {
                            res.status(200).send(data_event);

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
        } else {
            if (req.swagger.params.area_name.value != null) {
                models.Area.findOne({ Area_Name: req.swagger.params.area_name }, function (err, area) {
                    models.Mobile_Node.findOne({ ID_node: req.swagger.params.id_node.value, Area_ID: area._id }, function (err, node) {
                        if (node == null) {
                            console.log("Node does not exist");
                            res.status(503).json("Node does not exist")
                        }
                        else {
                            //ano primeiro, de seguida mes e depois dia
                            if (req.swagger.params.date.value == null) {
                                date_search = "1980/01/01";
                            }
                            else {
                                date_search = req.swagger.params.date.value;
                            }
                            models.Data_Regist_Mobile_Month.find({ Mobile_Node_ID_internal: node._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, data_event) {
                                if (data_event != null) {
                                    res.status(200).send(data_event);

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
                });

            } else {
                console.log("Request error");
                res.status(500).json("Request error");
            }
        }
    }
};

function mobile_node_data_regist_mobile_year_add(req, res) {
    console.log('[Mobile Node API] Add Data Year.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session");
        }
        else {
            if (req.body.building_id_2d != null) {
                models.Mobile_Node.findOne({ Name: req.body.node_name, Building_ID_2D: req.body.building_id_2d }, function (err, mobile_node) {
                    if (mobile_node == null) {
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
                                var newRecord = new models.Data_Regist_Mobile_Year({
                                    Data_Type_ID: data_type._id,
                                    Mobile_Node_ID_internal: mobile_node._id,
                                    Mobile_Node_ID: req.body.id_node,
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
            else {
                if (req.body.building_id_3d != null) {
                    models.Mobile_Node.findOne({ Name: req.body.node_name, Building_ID_3D: req.body.building_id_3d }, function (err, mobile_node) {
                        if (mobile_node == null) {
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
                                    var newRecord = new models.Data_Regist_Mobile_Year({
                                        Data_Type_ID: data_type._id,
                                        Mobile_Node_ID_internal: mobile_node._id,
                                        Mobile_Node_ID: req.body.id_node,
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
                else {
                    if (req.body.area_name != null) {
                        models.Area.findOne({ Area_Name: req.body.area_name }, function (err, area) {
                            models.Mobile_Node.findOne({ ID_node: req.body.id_node, Area_ID: area._id }, function (err, mobile_node) {
                                if (mobile_node == null) {
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
                                            var newRecord = new models.Data_Regist_Mobile_Year({
                                                Data_Type_ID: data_type._id,
                                                Mobile_Node_ID_internal: mobile_node._id,
                                                Mobile_Node_ID: req.body.id_node,
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
                        });
                    }
                    else {

                    }
                }
            }


            
        }
    });
};

function mobile_node_data_regist_mobile_year_get(req, res) {
    if (req.swagger.params.building_id_2d.value != null) {
        models.Mobile_Node.findOne({ Name: req.swagger.params.node_name.value, Building_ID_2D: req.swagger.params.building_id_2d.value }, function (err, node) {
            if (node == null) {
                console.log("Node does not exist");
                res.status(503).json("Node does not exist")
            }
            else {
                //ano primeiro, de seguida mes e depois dia
                if (req.swagger.params.date.value == null) {
                    date_search = "1980/01/01";
                }
                else {
                    date_search = req.swagger.params.date.value;
                }
                models.Data_Regist_Mobile_Year.find({ Mobile_Node_ID_internal: node._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, data_event) {
                    if (data_event != null) {
                        res.status(200).send(data_event);

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
    } else {
        if (req.swagger.params.building_id_3d.value != null) {
            models.Mobile_Node.findOne({ Name: req.swagger.params.node_name.value, Building_ID_3D: req.swagger.params.building_id_3d.value }, function (err, node) {
                if (node == null) {
                    console.log("Node does not exist");
                    res.status(503).json("Node does not exist")
                }
                else {
                    //ano primeiro, de seguida mes e depois dia
                    if (req.swagger.params.date.value == null) {
                        date_search = "1980/01/01";
                    }
                    else {
                        date_search = req.swagger.params.date.value;
                    }
                    models.Data_Regist_Mobile_Year.find({ Mobile_Node_ID_internal: node._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, data_event) {
                        if (data_event != null) {
                            res.status(200).send(data_event);

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
        } else {
            if (req.swagger.params.area_name.value != null) {
                models.Area.findOne({ Area_Name: req.swagger.params.area_name }, function (err, area) {
                    models.Mobile_Node.findOne({ ID_node: req.swagger.params.id_node.value, Area_ID: area._id }, function (err, node) {
                        if (node == null) {
                            console.log("Node does not exist");
                            res.status(503).json("Node does not exist")
                        }
                        else {
                            //ano primeiro, de seguida mes e depois dia
                            if (req.swagger.params.date.value == null) {
                                date_search = "1980/01/01";
                            }
                            else {
                                date_search = req.swagger.params.date.value;
                            }
                            models.Data_Regist_Mobile_Year.find({ Mobile_Node_ID_internal: node._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, data_event) {
                                if (data_event != null) {
                                    res.status(200).send(data_event);

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
                });

            } else {
                console.log("Request error");
                res.status(500).json("Request error");
            }
        }
    }
};

function mobile_node_data_regist_mobile_add(req, res) {
    console.log('[Mobile Node API] Add Data.');
    models.Producer.findOne({ Username: req.body.username, Token: req.body.token }, function (err, User) {

        if (User === null) {
            console.log("Invalid session");
            res.status(403).json("Invalid session")
        }
        else {
            if (req.body.building_id_2d != null) {
                models.Mobile_Node.findOne({ ID_node: req.body.id_node, Building_ID_2D: req.body.building_id_2d }, function (err, mobile_node) {
                    if (mobile_node == null) {
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
                                var newRecord = new models.Data_Regist_Mobile({
                                    Data_Type_ID: data_type._id,
                                    Mobile_Node_ID_internal: mobile_node._id,
                                    Mobile_Node_ID: req.body.id_node,
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
            else {
                if (req.body.building_id_3d != null) {
                    models.Mobile_Node.findOne({ ID_node: req.body.id_node, Building_ID_3D: req.body.building_id_3d }, function (err, mobile_node) {
                        if (mobile_node == null) {
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
                                    var newRecord = new models.Data_Regist_Mobile({
                                        Data_Type_ID: data_type._id,
                                        Mobile_Node_ID_internal: mobile_node._id,
                                        Mobile_Node_ID: req.body.id_node,
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
                else {
                    if (req.body.area_name != null) {
                        models.Area.findOne({ Area_Name: req.body.area_name }, function (err, area) {
                            models.Mobile_Node.findOne({ ID_node: req.body.id_node, Area_ID: area._id }, function (err, mobile_node) {
                                if (mobile_node == null) {
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
                                            var newRecord = new models.Data_Regist_Mobile({
                                                Data_Type_ID: data_type._id,
                                                Mobile_Node_ID_internal: mobile_node._id,
                                                Mobile_Node_ID: req.body.id_node,
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
                        });
                    }
                    else {

                    }
                }
            }


            
        }
    });
};

function mobile_node_data_regist_mobile_get(req, res) {
    if (req.swagger.params.building_id_2d.value != null) {
        models.Mobile_Node.findOne({ Name: req.swagger.params.node_name.value, Building_ID_2D: req.swagger.params.building_id_2d.value }, function (err, node) {
            if (node == null) {
                console.log("Node does not exist");
                res.status(503).json("Node does not exist")
            }
            else {
                console.log("we are here")
                //ano primeiro, de seguida mes e depois dia
                if (req.swagger.params.date.value == null) {
                    date_search = "1980/01/01";
                    console.log("time is null!")
                }
                else {
                    date_search = req.swagger.params.date.value;
                }
                models.Data_Regist_Mobile.find({ Mobile_Node_ID_internal: node._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, data_event) {
                    if (data_event != null) {
                        res.status(200).send(data_event);

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
    } else {
        if (req.swagger.params.building_id_3d.value != null) {
            models.Mobile_Node.findOne({ Name: req.swagger.params.node_name.value, Building_ID_3D: req.swagger.params.building_id_3d.value }, function (err, node) {
                if (node == null) {
                    console.log("Node does not exist");
                    res.status(503).json("Node does not exist")
                }
                else {
                    //ano primeiro, de seguida mes e depois dia
                    if (req.swagger.params.date.value == null) {
                        date_search = "1980/01/01";
                    }
                    else {
                        date_search = req.swagger.params.date.value;
                    }
                    models.Data_Regist_Mobile.find({ Mobile_Node_ID_internal: node._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, data_event) {
                        if (data_event != null) {
                            res.status(200).send(data_event);

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
        } else {
            if (req.swagger.params.area_name.value != null) {
                models.Area.findOne({ Area_Name: req.swagger.params.area_name }, function (err, area) {
                    models.Mobile_Node.findOne({ ID_node: req.swagger.params.id_node.value, Area_ID: area._id }, function (err, node) {
                        if (node == null) {
                            console.log("Node does not exist");
                            res.status(503).json("Node does not exist")
                        }
                        else {
                            //ano primeiro, de seguida mes e depois dia
                            if (req.swagger.params.date.value == null) {
                                date_search = "1980/01/01";
                            }
                            else {
                                date_search = req.swagger.params.date.value;
                            }
                            models.Data_Regist_Mobile.find({ Mobile_Node_ID_internal: node._id, _id: { $gt: objectIdWithTimestamp(date_search) } }, function (err, data_event) {
                                if (data_event != null) {
                                    res.status(200).send(data_event);

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
                });

            } else {
                console.log("Request error");
                res.status(500).json("Request error");
            }
        }
    }


};