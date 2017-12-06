var app = require('express')();
var db = require('./database/index.js');
var user = require('./user/index.js');
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








app.use(user);
app.use(producer);

app.listen(80, function () {
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