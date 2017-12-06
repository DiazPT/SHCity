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


/* Logs a producer in */
app.post('/api/producer/login', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Monitoring API] TO DO: Log a user/producer in.');
    recordmodel.Producer.findOne({Username: req.body.username, Password: req.body.password}, function (err, Producer) {
        if (Producer == null) {
            res.send({message: 'Username or Password wrong'});

        }

        else {
            var token = jsonwebtoken.sign({
                username: req.body.username,
                role: 2,
            }, config.token.secret, { // get secret from config
                expiresIn: config.token.expired // expires in 1 day
            })

            res.json({
                token: token,
                message: 'Login producer'
            })

            models.Producer.findOne({Username: req.body.username}, function(err, contact) {

                contact.Token = token;
                contact.save(function(err) {
                    if(!err) {
                        console.log("contact " + contact.Username + " created at " + contact.Date_Registered + " updated");
                    }
                    else {
                        console.log("Error: could not save contact " + contact.Username);
                    }
                });

            });


        }
    });
});


/* Registers a new producer */
app.post('/api/producer/register', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Producer API] Register a new producer.');
    models.Producer.findOne({Username: req.body.username}, function (err, Producer) {


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

                if(req.body.name!=null && req.body.email!=null && req.body.username!=null && req.body.password!=null){
                    var newRecord = new models.Producer({
                        Name: req.body.name,
                        Description: req.body.description,
                        Email: req.body.email,
                        Username: req.body.username,
                        Password: req.body.password,
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
                }

                else{
                    res.send({message: 'Problem regist'});
                }
            } else {
                res.send({message: 'Problem regist'});
                //res.redirect('/viewMessage');
            }
        }
    });

});




