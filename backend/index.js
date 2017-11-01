var app = require('express')();
var db = require('./database/index.js');
var user = require('./user/index.js');
var device = require('./device/index.js');
var producer = require('./producer/index.js');
var recordmodel = require('./database/models.js');
var jwt = require('express-jwt');
var config = require('./config');
var jsonwebtoken  = require('jsonwebtoken');
var moment = require('moment');


/* CORS handling. */
app.use(require('body-parser').urlencoded({
  extended: true
}));

/* Logs a user/producer in */
app.post('/api/login', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log('[Monitoring API] TO DO: Log a user/producer in.');
    recordmodel.User.findOne({username:req.body.username, password:req.body.password}, function(err,User){
        if (err) {
            console.error(err);
            res.send({message : 'Error 404'})
        } else { // sucess send the array of online users
            console.log(User);

            if(User == null){
                recordmodel.Producer.findOne({username:req.body.username, password:req.body.password}, function(err,Producer){
                    if(Producer ==null){
                        res.send({message : 'Username or Password wrong'});

                    }

                    else{
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

                        recordmodel.Producer.findOne({username: req.body.username}, function(err, contact) {

                            contact.token = token;
                            contact.save(function(err) {
                                if(!err) {
                                    console.log("contact " + contact.username + " created at " + contact.date_registered + " updated");
                                }
                                else {
                                    console.log("Error: could not save contact " + contact.username);
                                }
                            });

                        });

                        var newActivity = new recordmodel.User_history({
                            username : req.body.username,
                            activity : 'Logged on the website',
                            time : moment().locale('pt').format('l') + '    ' + moment().locale('pt').format('LT'),
                        });

                        newActivity.save(function(err){
                            if (err) {
                                console.error("Error on saving activity");
                                console.error(err); // log error to Terminal

                            } else {
                                console.log("History updated");
                                //recordCreated(newRecord);

                            }

                        });
                    }

                    //res.send({message : 'Login user'});
                });


            }

            else{

                var token = jsonwebtoken.sign({
                    username: req.body.username,
                    role: 1,
                }, config.token.secret, { // get secret from config
                    expiresIn: config.token.expired // expires in 1 day
                })

                recordmodel.Producer.distinct('name', function(err, all_producers){

                    if (err) {
                        console.error(err);
                        res.send({message : 'Error 404'})}

                    if(all_producers == 'null'){
                        console.log(all_producers);
                        console.log('Producer=' + all_producers.name);
                    }

                    console.log(all_producers);
                    console.log('Producer=' + all_producers.name);

                    res.json({
                        token: token,
                        message: 'Login ok',
                        producers: all_producers
                    })

                });







                recordmodel.User.findOne({username: req.body.username}, function(err, contact) {

                        contact.token = token;
                        contact.save(function(err) {
                            if(!err) {
                                console.log("contact " + contact.username + " created at " + contact.date_registered + " updated");
                            }
                            else {
                                console.log("Error: could not save contact " + contact.username);
                            }
                        });

                });

                //moment.locale('pt') // PT

                console.log(moment().locale('pt').format('l') + '    ' + moment().locale('pt').format('LT'));

                var newActivity = new recordmodel.User_history({
                    username : req.body.username,
                    activity : 'Logged on the website',
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

                });
                //res.send({message : 'Login user'});
            }


        }
    });


});







app.use(user);
app.use(device);
app.use(producer);

app.listen(3000, function () {
  console.log('[Monitoring API] Ready.');
});

/*const http = require('http');
const port = '3000'
app.set('port', port);
const server = http.createServer(app);
*/
/*
const io = require('socket.io')(server); //creates the websocket
//const io = require('socket.io')(server);
// call the function in routes that awaits connections in the websocket.
console.log();
routes.connect(io);

server.listen(port, () => console.log(`API running on localhost:${port}`));
*/