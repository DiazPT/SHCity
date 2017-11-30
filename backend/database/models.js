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

var Building = mongoose.model('building', {
    ID : Double,
    Name : String,
    Description : String,
    Date_Build : String,
    Location : String
});

var Building_Security = mongoose.model('building_security', {
    ID : Double,
    Building_ID : Double,
    Type_Incident : String,
    Description : String,
    Analyzed : Double,
    Date : String
});

var Interested_Persons_Buildings_Week = mongoose.model('interested_persons_buildings_week', {
    ID : Double,
    Building_ID : Double,
    Selected_Panel_ID : Double,
    Traffic_Area : Double,
    Number_Tickets : Double,
    Week : Double,
    Month : Double,
    Year : Double
});

var Interested_Persons_Buildings_Month = mongoose.model('interested_persons_buildings_month', {
    ID : Double,
    Building_ID : Double,
    Selected_Panel_ID : Double,
    Traffic_Area : Double,
    Number_Tickets : Double,
    Month : Double,
    Year : Double
});

var Interested_Persons_Buildings_Year = mongoose.model('interested_persons_buildings_year', {
    ID : Double,
    Building_ID : Double,
    Selected_Panel_ID : Double,
    Traffic_Area : Double,
    Number_Tickets : Double,
    Year : Double
});

var Data_Regist_Building_Month = mongoose.model('data_regist_building_month', {
    ID : Double,
    Building_ID : Double,
    Data_Type_ID : Double,
    Value : Double,
    Month : Double,
    Year : Double
});

var Data_Regist_Building_Year = mongoose.model('data_regist_building_year', {
    ID : Double,
    Building_ID : Double,
    Data_Type_ID : Double,
    Value : Double,
    Year : Double
});

var Building_Daily_Persons = mongoose.model('building_daily_persons', {
    ID : Double,
    Building_ID : Double,
    Data_Type_ID : Double,
    Value : Double,
    Day : Double,
    Week : Double,
    Month : Double,
    Year : Double
});

var Building_Week_Persons = mongoose.model('building_week_persons', {
    ID : Double,
    Building_ID : Double,
    Value : Double,
    Week : Double,
    Month : Double,
    Year : Double
});

var Data_Regist_Building_Month = mongoose.model('building_month_persons', {
    ID : Double,
    Building_ID : Double,
    Value : Double,
    Month : Double,
    Year : Double
});

var Data_Regist_Building_Year = mongoose.model('building_year_persons', {
    ID : Double,
    Building_ID : Double,
    Value : Double,
    Year : Double
});

var Data_Regist_Building = mongoose.model('building_month_persons', {
    ID : Double,
    Building_ID : Double,
    Value : Double,
    Date : String
});

/*
AREAS
 */

var Area = mongoose.model('area', {
    ID: Double,
    Area_Name: String,
    Description: String
});

var Area = mongoose.model('area', {
    ID: Double,
    Area_Name: String,
    Description: String
});

var Area_Visitors_Week = mongoose.model('area_visitors_week', {
    ID: Double,
    Area_ID: Double,
    Description: String,
    Percent_Person_Area: Double,
    Week: Double,
    Month: Double,
    Year: Double
});

var Area_Visitors_Month = mongoose.model('area_visitors_month', {
    ID: Double,
    Area_ID: Double,
    Description: String,
    Percent_Person_Area: Double,
    Month: Double,
    Year: Double
});

var Area_Visitors_Year = mongoose.model('area_visitors_year', {
    ID: Double,
    Area_ID: Double,
    Description: String,
    Percent_Person_Area: Double,
    Year: Double
});

var Area_Traffic_Week = mongoose.model('area_traffic_week', {
    ID: Double,
    Area1_ID: Double,
    Area2_ID: Double,
    Flow_Persons: Double,
    Week: Double,
    Month: Double,
    Year: Double
});

var Area_Traffic_Month = mongoose.model('area_traffic_month', {
    ID: Double,
    Area1_ID: Double,
    Area2_ID: Double,
    Flow_Persons: Double,
    Month: Double,
    Year: Double
});

var Area_Traffic_Year = mongoose.model('area_traffic_year', {
    ID: Double,
    Area1_ID: Double,
    Area2_ID: Double,
    Flow_Persons: Double,
    Year: Double
});

var Area_Security = mongoose.model('area_security', {
    ID : Double,
    Area_ID : Double,
    Type_Incident : String,
    Description : String,
    Analyzed : Double,
    Date : String
});

/*
AREAS AND BUILDINGS
 */

var Top_Visits = mongoose.model('top_visits', {
    ID: Double,
    Top: Double,
    Building_ID: Double,
    Area_ID: Double
});

var Level_Occupation = mongoose.model('level_occupation', {
    ID: Double,
    Building_ID: Double,
    Area_ID: Double,
    Occupation: Double,
    Date : String
});

var Level_Occupation_Schedule = mongoose.model('level_occupation_schedule', {
    ID: Double,
    Building_ID: Double,
    Area_ID: Double,
    Occupation: Double,
    Schedule : String,
    Date : String
});

/*
PANELS
 */

/* MongoDB Panel' model */
var Panel = mongoose.model('panel', {
    ID : Double,
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

/* MongoDB Panel_Visitors_Month' model */
var Panel_Visitors_Month = mongoose.model('panel_visitors_month', {
    Name : String,
    Panel_ID : Double,
    Visitors : Double,
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

var Data_Regist_Mobile = mongoose.model('data_regist_mobile', {
    Data_Type : Double,
    Panel_ID : Double,
    Value : Double,
    Date : String
});

/*
GATES
 */

var Gate = mongoose.model('gate', {
    ID : Double,
    Name : String,
    Description : String
});

var Vehicle_Affluence = mongoose.model('vehicle_affluence', {
    ID: Double,
    Gate_ID: Double,
    Schedule: String,
    Flow_Cars: Double,
    Date: String
});

module.exports.State = State;
module.exports.SystemError = SystemError;
module.exports.User = User;
module.exports.Producer = Producer;
module.exports.mongoose = mongoose;
