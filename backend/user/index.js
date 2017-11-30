var app = module.exports = require('express')();
var models = require('../database/models.js');
var moment = require('moment');
var jwt = require('express-jwt');
var config = require('../config');
var jsonwebtoken = require('jsonwebtoken');
var async = require('async');

function token_true(name, token_received) {

    models.User.findOne({username: name, token: token_received}, function (err, User) {

        if (User == Null) {
            return true;
        }
        else
            return false;

    });
};


console.log('[User API] Ready.');

/* Registers a new user */
app.post('/api/user/register', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[User API] TO DO: Register a new user.');
    models.User.findOne({username: req.body.username}, function (err, User) {


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

            if (User == null) {
                var newRecord = new models.User({
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
                        res.send({message: 'Well register'});
                    }

                });


                //res.redirect('/viewRecords');
                //redirects client to request the /viewRecords url
            } else {
                res.send({message: 'Problem regist'});
                //res.redirect('/viewMessage');
            }
        }
    });

});


/* Logs a user in */
app.post('/api/user/login', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[Monitoring API] TO DO: Log a user in.');
    recordmodel.User.findOne({username: req.body.username, password: req.body.password}, function (err, Producer) {
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


        }
    });
});

app.post('/api/user/logout', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log('[User API] User\'s logout.');
    res.json({
        message: 'ok',
    });


});


