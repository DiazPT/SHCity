var app = module.exports = require('express')();
var models = require('../database/models.js');
var moment = require('moment');
require('fetch-everywhere');
require('./manager.js');
var async = require('async');

console.log('[Device API] Ready.');


/* Registers a new device */
app.post('/api/device/add', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Device API] TO DO: Register a new device.');
    models.User.findOne({username: req.body.username, token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("nao da");
            res.json({
                message: 'Invalid session'
            })
        }
        else {


            models.Device.findOne({name: req.body.device_name}, function (err, device) {

                models.ProductModel.findOne({name: req.body.device_model}, function (err, stock) {
                    if(stock.stock != '0'){
                        stock.stock = parseInt(stock.stock) -1;
                        stock.sells = parseInt(stock.sells) +1;
                        stock.save(function (err) {
                            if (err) {
                                console.error("Error on saving stock");
                                console.error(err); // log error to Terminal

                            } else {
                                console.log("Stock updated");
                                //recordCreated(newRecord);

                            }

                        });
                        if (device === null) {

                            var newRecord = new models.Device({
                                name: req.body.device_name,
                                current_state: 'on',
                                model: req.body.device_model,
                                device_type: req.body.device_type,
                                producer: req.body.producer,
                                date_registered: moment().locale('pt').format('l') + '    ' + moment().locale('pt').format('LT'),
                                user: req.body.username,
                                usage_history: ''
                            });


                            newRecord.usage_history.set(newRecord.usage_history.length - 1, 'Registered on the website - ' + moment().locale('pt').format('l') + '    ' + moment().locale('pt').format('LT'));
                            User.devices.set(User.devices.length, req.body.device_name);

                            console.log(User);

                            User.save(function (err) {
                                if (err) {
                                    console.error("Error on saving new record");
                                    console.error(err); // log error to Terminal
                                }
                                else {
                                    console.log("User updated");
                                }
                            });

                            newRecord.save(function (err) {
                                if (err) {
                                    console.error("Error on saving new record");
                                    console.error(err); // log error to Terminal


                                } else {
                                    console.log("Created a new record!");
                                    //recordCreated(newRecord);

                                    models.Device.findOne({
                                        name: req.body.device_name,
                                        user: req.body.username
                                    }, function (err, device) {

                                        models.Producer.findOne({name: req.body.producer}, function (err, producer_device) {


                                            if (producer_device.device_types.indexOf(req.body.device_type) == -1)
                                                producer_device.device_types.set(producer_device.device_types.length, req.body.device_type);
                                            if (producer_device.device_models.indexOf(req.body.device_model) == -1)
                                                producer_device.device_models.set(producer_device.device_models.length, req.body.device_model);
                                            if (producer_device.devices.indexOf(req.body.device_name) == -1)
                                                producer_device.devices.set(producer_device.devices.length, req.body.device_name);

                                            producer_device.save(function (err) {
                                                if (err) {
                                                    console.error("Error on updating producer");
                                                    console.error(err); // log error to Terminal

                                                } else {
                                                    console.log("Producer updated");
                                                    //recordCreated(newRecord);

                                                }
                                            });

                                        });


                                        fetch('http://localhost:8182/api/device/add', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/x-www-form-urlencoded'
                                            },
                                            body: '_id=' + device._id + '&current_state=on' + '&device_name=' + req.body.device_name,
                                        })
                                            .then(response => response.json())
                                            .then(json => {
                                                /*if(json.message === 'result, 0'){

                                                 }
                                                 else{

                                                 }*/
                                                if (json.result === '0') {
                                                    console.log("device added");
                                                    res.json({
                                                        message: 'device added'
                                                    });

                                                    //moment.locale('pt');

                                                    var newActivity = new models.User_history({
                                                        username: req.body.username,
                                                        activity: 'Added the device: ' + req.body.device_name,
                                                        time: moment().locale('pt').format('l') + '    ' + moment().locale('pt').format('LT'),
                                                    });

                                                    newActivity.save(function (err) {
                                                        if (err) {
                                                            console.error("Error on saving activity");
                                                            console.error(err); // log error to Terminal

                                                        } else {
                                                            console.log("History updated");
                                                            //recordCreated(newRecord);

                                                        }

                                                    });


                                                }
                                                else {
                                                    res.json({
                                                        message: 'device not added'
                                                    })
                                                }
                                            }).catch(error => {
                                            console.error(error);
                                        });


                                    });


                                }
                            });

                        }

                        else {
                            res.json({
                                message: 'Device already added'
                            })

                        }
                    }
                    else{
                        res.json({
                            message: 'Device not on stock'
                        })
                    }
                });




            });


        }
    });
});


/* Removes a device */
app.post('/api/device/remove', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Device API] TO DO: Remove a device.');
    models.User.findOne({username: req.body.username, token: req.body.token}, function (err, User) {
        if (User === null) {
            console.log("nao da");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Device.findOne({name: req.body.device}, function (err, device_to_remove) {

                fetch('http://localhost:8182/api/device/remove', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: '_id=' + device_to_remove._id,
                })
                    .then(response => response.json())
                    .then(json => {
                        /*if(json.message === 'result, 0'){

                         }
                         else{

                         }*/
                        if (json.result === '0') {
                            console.log("device removed");

                        }
                    });



                var producer_removing = device_to_remove.producer;

                models.Device.remove({name: req.body.device}, function (err, removed) {
                    console.log(removed + ' device removed.');
                    User.devices.pull(req.body.device);
                    User.save(function (err) {
                        if (err) {
                            console.error("Error on saving new record");
                            console.error(err); // log error to Terminal


                        } else {
                            models.Producer.findOne({name: producer_removing}, function (err, producer_device_removed) {
                                producer_device_removed.devices.pull(req.body.device);
                                producer_device_removed.save(function (err) {
                                    if (err) {
                                        console.error("Error on saving new record");
                                        console.error(err); // log error to Terminal


                                    } else {
                                        res.json({
                                            message: 'Device removed'
                                        })
                                        var newActivity = new models.User_history({
                                            username: req.body.username,
                                            activity: 'Removed the device: ' + req.body.device,
                                            time: moment().locale('pt').format('l') + '    ' + moment().locale('pt').format('LT'),
                                        });

                                        newActivity.save(function (err) {
                                            if (err) {
                                                console.error("Error on saving activity");
                                                console.error(err); // log error to Terminal

                                            } else {
                                                console.log("History updated");
                                                //recordCreated(newRecord);

                                            }

                                        });
                                    }
                                });
                            })
                                ;
                            }
                        }
                        );

                });
            });

        }
    });

});

/* All devices from a user */
app.post('/api/device/all', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Device API] Devices from a user.');
    models.User.findOne({username: req.body.username, token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("nao da");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            var all_devices = [];
            for (i = 0; i < User.devices.length; i++) {
                all_devices.push({
                    label: User.devices[i],
                    value: User.devices[i],
                })
            }
            console.log('All devices done.');
            res.json({
                message: 'ok',
                devices_all: all_devices
            })
        }
    });
});


/* Consults history of a given device */
app.post('/api/device/history', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Device API] Consult a device\'s history.');
    var all_devices = [];
    var number_devices = 0;
    sent = 0;
    p = 0;
    models.User.findOne({username: req.body.username, token: req.body.token}, function (err, User) {


        if (User === null) {
            console.log("nao da");
            res.json({
                message: 'Invalid session'
            })
        }
        else {


            //for (i = 0; i < User.devices.length; i++) {


            async.forEach(User.devices, function (Device_user, callback1) {


                models.Device.findOne({name: Device_user}, function (err, Device_added) {


                    async.forEach(Device_added.usage_history, function (history, callback2) {
                        p++;
                        all_devices.push({
                            id: p,
                            activity: history,
                            device: Device_added.name,
                        });

                    });


                });
            });
            if (User.devices.length === 0) {
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

app.post('/api/device/value_history', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Device API] Consult device\'s values.');
    var all_devices = [];
    var number_devices = 0;
    sent = 0;
    p = 0;
    number = 0;
    models.User.findOne({username: req.body.username, token: req.body.token}, function (err, User) {


        if (User === null) {
            console.log("nao da");
            res.json({
                message: 'Invalid session'
            })
        }
        else {


            //for (i = 0; i < User.devices.length; i++) {


            async.forEach(User.devices, function (Device_user, callback1) {


                models.Device.findOne({name: Device_user}, function (err, Device_added) {


                    async.forEach(Device_added.readings, function (read, callback2) {

                        var value_string = read.substring(read.indexOf(':') + 3, read.indexOf(',') - 1);

                        //console.log(read);
                        var type_string = read.substring(read.indexOf('type: ') + 7, read.indexOf('timestamp') - 5);
                        var timestamp_string = read.substring(read.indexOf('timestamp: ') + 12, read.indexOf('_id') - 5);
                        //console.log(value_string);

                        //console.log(type_string);
                        //console.log(timestamp);
                        //console.log(read);
                        all_devices.push({
                            id: p,
                            value: value_string,
                            type: type_string,
                            timestamp: timestamp_string,
                            device: Device_added.name,
                        });
                        number++;
                        //console.log(all_devices[p]);

                        p++;
                    });
                    p = 0;

                });
            });
            if (User.devices.length === 0) {
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
                        number_rows: number,
                    });
                }, 100);

            }

        }


    });
});


/* Changes the state of a device */
app.post('/api/device/state', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Device API] Change the state of a device.');
    models.User.findOne({username: req.body.username, token: req.body.token}, function (err, User) {
        if (User === null) {
            console.log("nao da");
            res.json({
                message: 'Invalid session'
            })
        }
        else {
            models.Device.findOne({name: req.body.device}, function (err, Device_added) {
                console.log(req.body.current_state);
                if (Device_added === null) {
                    console.log("not working");
                    res.json({
                        message: 'Device not found'
                    })
                }
                else {
                    Device_added.state = req.body.state;


                    Device_added.save(function (err) {
                        if (err) {
                            console.error("Error on saving new record");
                            console.error(err); // log error to Terminal


                        } else {
                            console.log("Device " + Device_added.name + " updated");
                            fetch('http://localhost:8182/api/device/state', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                body: '_id=' + Device_added._id + '&current_state=' + req.body.current_state,
                            })
                                .then(response => response.json())
                                .then(json => {
                                    if (json.result === '0') {
                                        console.log("Changed state");
                                        res.json({
                                            message: 'Device changed'
                                        });
                                        Device_added.usage_history.set(Device_added.usage_history.length, 'The device was turned on -' + req.body.current_state + ' - ' + moment().locale('pt').format('l') + '    ' + moment().locale('pt').format('LT'));
                                        Device_added.save(function (err) {
                                            if (err) {
                                                console.error("Error on saving new record");
                                                console.error(err); // log error to Terminal


                                            } else {
                                                console.log("Device " + Device_added.name + " updated");
                                                var newActivity = new models.User_history({
                                                    username: req.body.username,
                                                    activity: 'Changed the state of the device:' + Device_added.name + ' to - ' + req.body.current_state,
                                                    time: moment().locale('pt').format('l') + '    ' + moment().locale('pt').format('LT'),
                                                });

                                                newActivity.save(function (err) {
                                                    if (err) {
                                                        console.error("Error on saving activity");
                                                        console.error(err); // log error to Terminal

                                                    } else {
                                                        console.log("History updated");
                                                        //recordCreated(newRecord);

                                                    }

                                                });
                                            }

                                        });

                                    }
                                    else {
                                        console.log("Problem changing");
                                        res.json({
                                            message: 'Device problem'
                                        });
                                    }
                                });
                        }
                    });
                }
            });

        }
    });
});


/* Initial devices */
app.post('/api/device/initial', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Device API] Recovering devices.');

    models.User.findOne({username: req.body.username, token: req.body.token}, function (err, User) {

        if (User === null) {
            console.log("nao da");
            res.json({
                message: 'Invalid session'
            })
        }
        else {

            for (i = 0; i < User.devices.length; i++) {

                models.Device.findOne({name: User.devices[i]}, function (err, Device_added) {

                    if (Device_added === null) {
                        console.log("nao da");
                        res.json({
                            message: 'Error 404'
                        })
                    }
                    else {

                        fetch('http://localhost:8182/api/device/add', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            body: '_id=' + Device_added._id + '&current_state=unmonitored' + '&device_name=' + Device_added.name,
                        })
                            .then(response => response.json())
                            .then(json => {
                                if (json.result === '0') {
                                    console.log("Added old device");
                                }
                                else
                                    console.log("Not added old device");

                            });
                        Device_added.usage_history.set(Device_added.usage_history.length, 'The device was turned on - unmonitored - ' + moment().locale('pt').format('l') + '    ' + moment().locale('pt').format('LT'));
                        Device_added.save(function (err) {
                            if (err) {
                                console.error("Error on saving new record");
                                console.error(err); // log error to Terminal


                            } else {
                                console.log("Device " + Device_added.name + " updated on");
                            }

                        });
                    }
                });
            }
        }
    });
});
