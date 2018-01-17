'use strict';

var SwaggerExpress = require('swagger-express-mw');
var db = require('./api/database/index.js');
var app = require('express')();

var swaggerTools = require('swagger-tools');
var YAML = require('yamljs');
var swaggerDoc = YAML.load('./api/swagger/swagger.yaml');
/*var db = require('./database/index.js');
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
var moment = require('moment');*/




var config = {
  appRoot: __dirname // required config
};

//app.use(db);
/*app.use(user);
app.use(producer);
app.use(area);
app.use(area_building);
app.use(building);
app.use(data_type);
app.use(gate);
app.use(mobile_node);
app.use(panel);*/


SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);
  console.log('[Monitoring API] Ready.');
    swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
        // Serve the Swagger documents and Swagger UI
        app.use(middleware.swaggerUi());
    });


});

module.exports = app; // for testing