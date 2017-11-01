var app = module.exports = require('express')();
var models = require('../database/models.js');
var moment = require('moment');
var jwt = require('express-jwt');
var config = require('../config');
var jsonwebtoken = require('jsonwebtoken');
var async = require('async');

console.log('[Producer API] Ready.');


function token_true(name, token_received) {

    models.Producer.findOne({username: name, token: token_received}, function (err, Producer) {

        if (Producer == Null) {
            return true;
        }
        else
            return false;

    });
};


/* Registers a new producer */
app.post('/api/producer/register', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Producer API] Register a new producer.');
    models.Producer.findOne({username: req.body.username}, function (err, Producer) {


        if (err) {
            console.error("Server error creating user!");
            res.send(501, "Server error!");
        } else {

            var token = jsonwebtoken.sign({
                username: req.body.username,
                role: 1,
            }, config.token.secret, { // get secret from config
                expiresIn: config.token.expired // expires in 1 day
            })

            if (Producer == null) {
                var newRecord = new models.Producer({
                    name: req.body.name,
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password,
                    date_registered: moment().locale('pt').format('l') + '    ' + moment().locale('pt').format('LT'),
                    token: token,
                });


                newRecord.save(function (err) {
                    if (err) {
                        console.error("Error on saving new record");
                        console.error(err); // log error to Terminal
                        res.send({message: 'Error 404'});
                    } else {
                        console.log("Created a new record!");
                        //recordCreated(newRecord);
                        res.send({message: 'Producer register'});
                    }

                });
                //moment.locale('pt'); //PT
                /*var newActivity = new models.User_history({
                 username : req.body.username,
                 activity : 'Registered on the website',
                 time : moment().locale('pt').format('l')+ '    ' + moment().locale('pt').format('LT'),
                 });

                 newActivity.save(function(err){
                 if (err) {
                 console.error("Error on saving activity");
                 console.error(err); // log error to Terminal

                 } else {
                 console.log("History updated");
                 //recordCreated(newRecord);

                 }

                 });*/

                //res.redirect('/viewRecords');
                //redirects client to request the /viewRecords url
            } else {
                res.send({message: 'Problem regist'});
                //res.redirect('/viewMessage');
            }
        }
    });

});

/* Adds a new product model */
app.post('/api/producer/productmodel/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Producer API] Add a new product model.')

    models.Producer.findOne({name: req.body.username, token: req.body.token}, function (err, ProducerModel) {

        if (err) {
            console.error("Server error creating user!");
            res.json({
                message: 'Error 404',
            });
        } else {
            if (ProducerModel.device_models.indexOf(req.body.name_model) == -1) {
                ProducerModel.device_models.set(ProducerModel.device_models.length, req.body.name_model);
                ProducerModel.save(function (err) {
                    if (err) {
                        console.error("Error on saving new record");
                        console.error(err); // log error to Terminal
                        res.send({message: 'Error 404'});
                    } else {
                        console.log("Created a new device model!");
                        //recordCreated(newRecord);

                        var newRecord = new models.ProductModel({
                            id_product_models: req.body.referencia,
                            name: req.body.name_model,
                            stock: req.body.stock,
                            sells: '0',
                        });


                        newRecord.save(function (err) {
                            if (err) {
                                console.error("Error on saving new record");
                                console.error(err); // log error to Terminal
                                res.send({message: 'Error 404'});
                            } else {
                                console.log("Created a new stock!");
                                //recordCreated(newRecord);
                            }

                        });


                        res.json({
                            message: 'ok',
                        });
                    }

                });

            }

            else {
                res.json({
                    message: 'Error 404',
                });
            }
        }
    });
});

/* Adds a new device type */
app.post('/api/producer/devicetype/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Producer API] Add a new product model.')

    models.Producer.findOne({name: req.body.username, token: req.body.token}, function (err, ProducerType) {

        if (err) {
            console.error("Server error creating user!");
            res.json({
                message: 'Error 404',
            });
        } else {
            if (ProducerType.device_types.indexOf(req.body.name_type) == -1) {
                ProducerType.device_types.set(ProducerType.device_types.length, req.body.name_type);
                ProducerType.save(function (err) {
                    if (err) {
                        console.error("Error on saving new record");
                        console.error(err); // log error to Terminal
                        res.send({message: 'Error 404'});
                    } else {
                        console.log("Created a new device type!");
                        //recordCreated(newRecord);
                        res.json({
                            message: 'ok',
                        });
                    }

                });

            }

            else {
                res.json({
                    message: 'Error 404',
                });
            }
        }
    });
});

/* Removes a product model */
app.post('/api/producer/productmodel/remove', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Producer API] TO DO: Remove a product model.');
    models.Producer.findOne({name: req.body.username, token: req.body.token}, function (err, ProducerModel) {

        if (err) {
            console.error("Server error finding user!");
            res.json({
                message: 'Error 404',
            });
        } else {
            console.log(req.body.name_model);
            if (ProducerModel.device_models.indexOf(req.body.name_model) != -1) {
                ProducerModel.device_models.pull(req.body.name_model);
                ProducerModel.save(function (err) {
                    if (err) {
                        console.error("Error removing");
                        console.error(err); // log error to Terminal
                        res.send({message: 'Error 404'});
                    } else {
                        console.log("Removed model");
                        //recordCreated(newRecord);
                        res.json({
                            message: 'ok',
                        });
                    }

                });

            }

            else {
                res.json({
                    message: 'Error 404',
                });
            }
        }
    });
});


/* Removes a device type */
app.post('/api/producer/devicetype/remove', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Producer API] TO DO: Remove a device type.');
    models.Producer.findOne({name: req.body.username, token: req.body.token}, function (err, ProducerModel) {

        if (err) {
            console.error("Server error finding user!");
            res.json({
                message: 'Error 404',
            });
        } else {
            console.log(req.body.name_type);
            if (ProducerModel.device_types.indexOf(req.body.name_type) != -1) {
                ProducerModel.device_types.pull(req.body.name_type);
                ProducerModel.save(function (err) {
                    if (err) {
                        console.error("Error removing");
                        console.error(err); // log error to Terminal
                        res.send({message: 'Error 404'});
                    } else {
                        console.log("Removed type");
                        //recordCreated(newRecord);
                        res.json({
                            message: 'ok',
                        });
                    }

                });

            }

            else {
                res.json({
                    message: 'Error 404',
                });
            }
        }
    });
});

/* Checks history of a given device type history */
app.post('/api/producer/devicetype/history', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Device API] Consult a device type history.');
    var all_devices = [];
    var number_devices = 0;
    sent = 0;
    p = 0;
    models.Producer.findOne({username: req.body.username, token: req.body.token}, function (err, User) {


        if (User === null) {
            console.log("nao da");
            res.json({
                message: 'Invalid session'
            })
        }
        else {


            //for (i = 0; i < User.devices.length; i++) {


            models.Device.find({}, function (err, Device_type) {

                Device_type.forEach(function (Device_type) {
                    if (Device_type.device_type === req.body.value_type) {
                        for (i = 0; i < Device_type.usage_history.length; i++) {
                            all_devices.push({
                                id: p,
                                username: Device_type.user,
                                activity: Device_type.usage_history[i],
                                device: Device_type.name
                            })
                            p++;
                        }
                    }

                });
            });
            if (User.device_types.length === 0) {
                console.log("problem");
                res.json({
                    message: 'Devices empty'
                })
            }
            else if (sent === 0) {
                sent++;
                setTimeout(function () {
                    res.json({
                        message: 'ok',
                        rows: all_devices,
                        number_rows: p,
                    });
                }, 100);

            }


        }
    });
});

app.post('/api/producer/devicemodel/history', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Device API] Consult a device type history.');
    var all_devices = [];
    var number_devices = 0;
    sent = 0;
    p = 0;
    models.Producer.findOne({username: req.body.username, token: req.body.token}, function (err, User) {


        if (User === null) {
            console.log("nao da");
            res.json({
                message: 'Invalid session'
            })
        }
        else {

            models.ProductModel.findOne({name: req.body.value_model}, function (err, Model) {
                all_devices.push({
                    reference: Model.id_product_models,
                    name: Model.name,
                    stock: Model.stock,
                    sells: Model.sells
                })
                p++;
            });

        }

    });
    if (sent === 0) {
        sent++;
        setTimeout(function () {
            res.json({
                message: 'ok',
                rows: all_devices,
                number_rows: p,
            });
        }, 50);

    }


});


app.post('/api/producer/deviceselected/history', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Device API] Consult a device\'s history.');
    var all_devices = [];
    var number_devices = 0;
    sent = 0;
    p = 0;
    models.Producer.findOne({username: req.body.username, token: req.body.token}, function (err, User) {


        if (User === null) {
            console.log("nao da");
            res.json({
                message: 'Invalid session'
            })
        }
        else {


            //for (i = 0; i < User.devices.length; i++) {


            models.Device.findOne({name: req.body.value_device}, function (err, Device_get) {
                for (i = 0; i < Device_get.usage_history.length; i++) {
                    all_devices.push({
                        id: p,
                        username: Device_get.user,
                        activity: Device_get.usage_history[i],
                        device: Device_get.name
                    })
                    p++;
                }

            });
            if (sent === 0) {
                sent++;
                console.log(all_devices);
                setTimeout(function () {
                    res.json({
                        message: 'ok',
                        rows: all_devices,
                        number_rows: p,
                    });
                }, 500);

            }


        }
    });
});

app.post('/api/producer/device/models', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var all_devices = [];
    models.Producer.findOne({username: req.body.username, token: req.body.token}, function (err, Prod) {
        if (err) {
            res.json({
                message: 'Invalid session'
            })
        } else {
            if (Prod === null) {
                console.log(req.body.username + '' + req.body.token);
                console.log("nao da");
                res.json({
                    message: 'Invalid session'
                })
            }
            else {
                for (i = 0; i < Prod.device_models.length; i++) {
                    all_devices.push({
                        label: Prod.device_models[i],
                        value: Prod.device_models[i],
                    })

                }
                res.json({
                    message: 'ok',
                    models: all_devices
                });
            }
        }

    });
});

app.post('/api/producer/device/models/all', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var all_devices = [];
    models.Producer.findOne({username: req.body.username, token: req.body.token}, function (err, Prod) {
        if (err) {
            res.json({
                message: 'Invalid session'
            })
        } else {
            if (Prod === null) {
                console.log(req.body.username + '' + req.body.token);
                console.log("nao da");
                res.json({
                    message: 'Invalid session'
                })
            }
            else {
                for (i = 0; i < Prod.device_models.length; i++) {
                    all_devices.push({
                        label: Prod.device_models[i],
                        value: Prod.device_models[i],
                    })

                }
                res.json({
                    message: 'ok',
                    models: all_devices
                });
            }
        }

    });
});

app.post('/api/producer/device/devices_all', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var all_devices = [];
    models.Producer.findOne({username: req.body.username, token: req.body.token}, function (err, Prod) {
        if (err) {
            res.json({
                message: 'Invalid session'
            })
        } else {
            if (Prod === null) {
                console.log(req.body.username + '' + req.body.token);
                console.log("nao da");
                res.json({
                    message: 'Invalid session'
                })
            }
            else {
                for (i = 0; i < Prod.devices.length; i++) {
                    all_devices.push({
                        label: Prod.devices[i],
                        value: Prod.devices[i],
                    })

                }

                res.json({
                    message: 'ok',
                    devices: all_devices
                });
            }
        }

    });
});


app.post('/api/producer/device/types', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var all_devices = [];
    models.Producer.findOne({username: req.body.username, token: req.body.token}, function (err, Prod) {
        if (err) {
            res.json({
                message: 'Invalid session'
            })
        } else {
            if (Prod === null) {
                console.log(req.body.username + '' + req.body.token);
                console.log("nao da");
                res.json({
                    message: 'Invalid session'
                })
            }
            else {
                for (i = 0; i < Prod.device_types.length; i++) {
                    all_devices.push({
                        label: Prod.device_types[i],
                        value: Prod.device_types[i],
                    })

                }
                res.json({
                    message: 'ok',
                    models: all_devices
                });
            }
        }

    });
});

app.post('/api/producer/producers/all', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var all_devices = [];
    models.Producer.find({username: req.body.username, token: req.body.token}, function (err, Prod) {
        if (err) {
            res.json({
                message: 'Invalid session'
            })
        } else {
            models.Producer.distinct('name', function (err, all_producers) {
                if (Prod === null) {
                    console.log(req.body.username + '' + req.body.token);
                    console.log("nao da");
                    res.json({
                        message: 'Invalid session'
                    })
                }
                else {
                    for (i = 0; i < all_producers.length; i++) {
                        all_devices.push({
                            label: all_producers[i],
                            value: all_producers[i],
                        })

                    }

                    res.json({
                        message: 'ok',
                        producers: all_devices
                    });
                }
            });

        }

    });
});

app.post('/api/producers/user_all', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var all_devices = [];
    var names = '';
    models.Producer.findOne({username: req.body.username, token: req.body.token}, function (err, Prod) {
        if (err) {
            res.json({
                message: 'Invalid session'
            })
        } else {
            console.log(Prod.name);
            async.forEach(Prod.devices, function (Device_user, callback1) {
                console.log(Prod.devices);
                models.Device.findOne({name: Device_user}, function (err, Device_prod) {
                    if (names.indexOf(Device_prod.user) === -1) {
                        all_devices.push({
                            label: Device_prod.user,
                            value: Device_prod.user,
                        })
                        names = names + Device_prod.user;
                    }


                });
            });
            setTimeout(function () {
                //console.log(all_devices);
                res.json({
                    message: 'ok',
                    devices: all_devices,
                });
            }, 50);


        }

    });
});

app.post('/api/producer/producers/model', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var all_devices = [];
    models.Producer.find({username: req.body.username, token: req.body.token}, function (err, Prod) {
        if (err) {
            res.json({
                message: 'Invalid session'
            })
        } else {
            models.Producer.distinct('name', function (err, all_producers) {
                if (Prod === null) {
                    console.log(req.body.username + '' + req.body.token);
                    console.log("nao da");
                    res.json({
                        message: 'Invalid session'
                    })
                }
                else {

                    for (i = 0; i < all_producers.length; i++) {
                        models.Producer.findOne({username: all_producers[i]}, function (err, producer_model) {
                            for (i = 0; i < producer_model.device_models.length; i++) {
                                all_devices.push({
                                    label: producer_model.device_models[i],
                                    value: producer_model.device_models[i],
                                })
                            }
                        });


                    }
                    setTimeout(function () {
                        //console.log(all_devices);
                        res.json({
                            message: 'ok',
                            models: all_devices,
                        });
                    }, 2000);

                }
            });

        }

    });
});


app.post('/api/producer/producers/type', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var all_devices = [];
    models.Producer.find({username: req.body.username, token: req.body.token}, function (err, Prod) {
        if (err) {
            res.json({
                message: 'Invalid session'
            })
        } else {
            models.Producer.distinct('name', function (err, all_producers) {
                if (Prod === null) {
                    console.log(req.body.username + '' + req.body.token);
                    console.log("nao da");
                    res.json({
                        message: 'Invalid session'
                    })
                }
                else {

                    for (i = 0; i < all_producers.length; i++) {
                        models.Producer.findOne({username: all_producers[i]}, function (err, producer_model) {
                            for (i = 0; i < producer_model.device_types.length; i++) {
                                all_devices.push({
                                    label: producer_model.device_types[i],
                                    value: producer_model.device_types[i],
                                })
                            }
                        });


                    }
                    setTimeout(function () {
                        //console.log(all_devices);
                        res.json({
                            message: 'ok',
                            types: all_devices,
                        });
                    }, 2000);

                }
            });

        }

    });
});

app.post('/api/producer/device/models/all/ever', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var all_devices = [];
    models.Producer.findOne({username: req.body.username, token: req.body.token}, function (err, Prod) {
        if (err) {
            res.json({
                message: 'Invalid session'
            })
        } else {
            if (Prod === null) {
                console.log(req.body.username + '' + req.body.token);
                console.log("nao da");
                res.json({
                    message: 'Invalid session'
                })
            }
            else {
                models.ProductModel.find({}, function (err, Models) {

                    Models.forEach(function (Model_type) {
                        all_devices.push({
                            label: Model_type.name,
                            value: Model_type.name
                        })


                    });
                });

                setTimeout(function () {
                    //console.log(all_devices);
                    res.json({
                        message: 'ok',
                        models: all_devices,
                    });
                }, 200);
            }
        }

    });
});




