var app = require('express')();
var db = require('./database/index.js');
var user = require('./user/index.js');
var producer = require('./producer/index.js');
var area = require('./areas/index.js');
var area_building = require('./areas and buildings/index.js');
var building = require('./buildings/index.js');
var data_type = require('./data type/index.js');
var gate = require('./gates/index.js');
var mobile_node = require('./mobile nodes/index.js');
var panel = require('./panels/index.js');
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
app.use(area);
app.use(area_building);
app.use(building);
app.use(data_type);
app.use(gate);
app.use(mobile_node);
app.use(panel);


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