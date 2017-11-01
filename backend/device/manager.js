var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http,{'pingInterval': 2500, 'pingTimeout': 10000});
var models = require('../database/models.js');
var moment = require('moment');

/* Registers a new client in the socket engine. */
io.use(function(socket, next) {
  return next();
});



/* Handles the connection of a device */
io.on('connection', (device) => {
    console.log("Connected");
    device.on('value', function(data)  {
        models.Device.findOne({name: data.name}, function (err, Device_added) {

            console.log(data);
            var newRecord = new models.Reading({
                value : data.value,
                type : data.type,
                timestamp : moment().locale('pt').format('l') + '    ' + moment().locale('pt').format('LT'),
            });


            Device_added.readings.set(Device_added.readings.length, newRecord);
            Device_added.save(function (err) {
                if (err) {
                    console.error("Error on saving new record");
                    console.error(err); // log error to Terminal


                } else {
                    console.log("Device " + Device_added.name + " updated");
                }

            });
        });

    });

});

http.listen(8080, function() {
  console.log(`[Device Manager API] Ready.`);
});

module.exports = this;
