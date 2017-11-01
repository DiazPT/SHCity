var mongoose = require('mongoose');

/* MongoDB State's model */
var State = mongoose.model('states', {
  id_state : String,
  name : String
});

/* MongoDB System's Errors' model */
var SystemError = mongoose.model('system_errors', {
  id_system_error : String,
  name : String
});

/* MongoDB Devices' Type's model */
var DeviceType = mongoose.model('device_types', {
  id_device_type : String,
  name : String
});

/* MongoDB Products' Model's model */
var ProductModel = mongoose.model('product_models', {
  id_product_models : String,
  name : String,
  stock : String,
  sells: String,
});

/* MongoDB Usage's model */
var Usage = mongoose.model('usages', {
  system_error : String,
  state : String,
  time_interval : String,
  started_timestamp : String,
  ended_timestamp : String
});

/* MongoDB Users' model */
var User = mongoose.model('users', {
  date_registered : String,
  name : String,
  password : String,
  username : String,
  email : String,
  devices : [String],
  token: String
});

/* MongoDB Producers' model */
var Producer = mongoose.model('producers', {
  date_registered : String,
  name : String,
  password : String,
  username : String,
  email : String,
  device_models : [String],
  device_types : [String],
  devices: [String],
  token : String
});

/* MongoDB Device's model */
var Device = mongoose.model('devices', {
  date_registered : String,
  current_state : String,
  system_error : String,
  name : String,
  device_type : String,
  producer : String,
  model : String,
  readings : [String],
  usage_history : [String],
  user : String
});

/* MongoDB Reading's model */
var Reading = mongoose.model('readings', {
    value : String,
    type : String,
    timestamp : String
});

/* MongoDB Reading's model */
var User_history = mongoose.model('user_history', {
    username : String,
    activity : String,
    time : String
});

module.exports.State = State;
module.exports.SystemError = SystemError;
module.exports.DeviceType = DeviceType;
module.exports.ProductModel = ProductModel;
module.exports.Usage = Usage;
module.exports.User = User;
module.exports.Producer = Producer;
module.exports.Device = Device;
module.exports.Reading = Reading;
module.exports.User_history = User_history;
module.exports.mongoose = mongoose;
