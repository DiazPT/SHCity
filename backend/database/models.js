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

/* MongoDB History' model */
var History = mongoose.model('history', {
    Name : String,
    Producer_ID : Double,
    Description : String,
    Date : String
});

/*
TYPE OF USERS
 */

/* MongoDB Manager' model */
var Manager = mongoose.model('manager', {
    Name : String,
    Description : String,
    Username : String,
    Password : String,
    Email : String,
    Token : String,
    Last_Login : String,
});

/* MongoDB Users' model */
var User = mongoose.model('users', {
    Name : String,
    Description : String,
    Username : String,
    Password : String,
    Email : String,
    Token : String,
    Last_Login : String,
    Date_Registered : String,
});

/* MongoDB Producers' model */
var Producer = mongoose.model('producers', {
  Name : String,
  Description : String,
  Username : String,
  Password : String,
  Email : String,
  Token : String,
  Last_Login : String,
  Date_Registered : String,
});

/*
BUILDINGS
 */

/* MongoDB Building_Energy_Monthly' model */
var Building_Energy_Monthly = mongoose.model('building_energy_monthly', {
    Building_ID : Double,
    Description : String,
    E_Consume : Double,
    E_Consume_Cost : Double,
    E_Consume_Heating : Double,
    E_Consume_Heating_Cost : Double,
    E_Consume_Ilumination : Double,
    E_Consume_Ilumination_Cost : Double,
    E_Consume_Ilumination_Exterior : Double,
    E_Consume_Ilumination_Exterior_Cost : Double,
    Month : Double,
    Year : Double
});

/* MongoDB Building_Energy_Anual' model */
var Building_Energy_Anual = mongoose.model('building_energy_anual', {
    Building_ID : Double,
    Description : String,
    E_Consume : Double,
    E_Consume_Metro : Double,
    E_Consume_Person : Double,
    E_Consume_Degree_Day : Double,
    E_Consume_Cost : Double,
    E_Consume_Heating : Double,
    E_Consume_Heating_Metro : Double,
    E_Consume_Heating_Person : Double,
    E_Consume_Heating_Metro_Degree_Day : Double,
    E_Consume_Heating_Cost : Double,
    E_Consume_Ilumination : Double,
    E_Consume_Ilumination_Metro : Double,
    E_Consume_Ilumination_Person : Double,
    E_Consume_Ilumination_Cost : Double,
    E_Consume_Ilumination_Exterior : Double,
    E_Consume_Ilumination_Exterior_Cost : Double,
    Year : Double
});

/*
PANELS
 */

/* MongoDB Panel_Visitors_Month' model */
var Panel_Visitors_Month = mongoose.model('panel_visitors_month', {
    Name : String,
    Panel_ID : Double,
    Visitors : Double,
    Month : Double,
    Year : Double
});

/* MongoDB Panel' model */
var Panel = mongoose.model('panel', {
    Name : String,
    Description : String,
    Location : String
});

/* MongoDB Panel_Visitors_Week' model */
var Panel_Visitors_Week = mongoose.model('panel_visitors_week', {
    Name : String,
    Panel_ID : Double,
    Visitors : Double,
    Week : Double,
    Month : Double,
    Year : Double
});

/* MongoDB Panel_Visitors_Year' model */
var Panel_Visitors_Year = mongoose.model('panel_visitors_year', {
    Name : String,
    Panel_ID : Double,
    Visitors : Double,
    Year : Double
});

/*
MOBILE NODES
 */

/* MongoDB Mobile_Node' model */
var Mobile_Node = mongoose.model('mobile_node', {
    Name : String,
    Description : String,
    Location : String
});

/* MongoDB Data_Type' model */
var Data_Type = mongoose.model('data_type', {
    Name : String,
    Description : String,
    Unit : String
});

/* MongoDB Data_Regist_Mobile_Month' model */
var Data_Regist_Mobile_Month = mongoose.model('data_regist_mobile_month', {
    Data_Type : Double,
    Panel_ID : Double,
    Value : Double,
    Month : Double,
    Year : Double
});

/* MongoDB Data_Regist_Mobile_Year' model */
var Data_Regist_Mobile_Year = mongoose.model('data_regist_mobile_year', {
    Data_Type : Double,
    Panel_ID : Double,
    Value : Double,
    Year : Double
});

module.exports.State = State;
module.exports.SystemError = SystemError;
module.exports.User = User;
module.exports.Producer = Producer;
module.exports.mongoose = mongoose;
