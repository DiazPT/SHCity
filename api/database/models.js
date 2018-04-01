var mongoose = require('mongoose');

/* MongoDB State's model */
var State = mongoose.model('states', {
    id_state: String,
    name: String
});

/* MongoDB System's Errors' model */
var SystemError = mongoose.model('system_errors', {
    id_system_error: String,
    name: String
});

/* MongoDB History' model */
var History = mongoose.model('history', {
    Name: String,
    Producer_ID: String,
    Description: String,
    Date: String
});

/*
TYPE OF USERS
 */

/* MongoDB Manager' model */
var Manager = mongoose.model('manager', {
    Name: String,
    Description: String,
    Username: String,
    Password: String,
    Email: String,
    Token: String,
    Last_Login: String,
});

/* MongoDB Users' model */
var User = mongoose.model('users', {
    Name: String,
    Description: String,
    Username: String,
    Password: String,
    Email: String,
    Token: String,
    Last_Login: String,
    Date_Registered: String,
});

/* MongoDB Producers' model */
var Producer = mongoose.model('producers', {
    Name: String,
    Description: String,
    Username: String,
    Password: String,
    Email: String,
    Token: String,
    Last_Login: String,
    Date_Registered: String,
});

/*
BUILDINGS
 */

var Building = mongoose.model('building', {
    Name: String,
    Description: String,
    Date_Build: String,
    Location: String,
    Visiting_Time: String,
    Id_2D: String,
    Id_3D: String
});

var Zone = mongoose.model('zone', {
    Name: String,
    Description: String,
    Location: String,
    Area_ID: String,
    Building_ID: String
});


/* MongoDB Building_Energy_Monthly' model */
var Building_Energy_Monthly = mongoose.model('building_energy_monthly', {
    Building_ID: String,
    Description: String,
    E_Consume: String,
    E_Consume_Cost: String,
    E_Consume_Heating: String,
    E_Consume_Heating_Cost: String,
    E_Consume_Ilumination: String,
    E_Consume_Ilumination_Cost: String,
    E_Consume_Ilumination_Exterior: String,
    E_Consume_Ilumination_Exterior_Cost: String,
    Month: String,
    Year: String
});

/* MongoDB Building_Energy_Anual' model */
var Building_Energy_Anual = mongoose.model('building_energy_anual', {
    Building_ID: String,
    Description: String,
    E_Consume: String,
    E_Consume_Metro: String,
    E_Consume_Person: String,
    E_Consume_Degree_Day: String,
    E_Consume_Cost: String,
    E_Consume_Heating: String,
    E_Consume_Heating_Metro: String,
    E_Consume_Heating_Person: String,
    E_Consume_Heating_Metro_Degree_Day: String,
    E_Consume_Heating_Cost: String,
    E_Consume_Ilumination: String,
    E_Consume_Ilumination_Metro: String,
    E_Consume_Ilumination_Person: String,
    E_Consume_Ilumination_Cost: String,
    E_Consume_Ilumination_Exterior: String,
    E_Consume_Ilumination_Exterior_Cost: String,
    Year: String
});

var Building_Security = mongoose.model('building_security', {
    Building_ID: String,
    Type_Incident: String,
    Description: String,
    Analyzed: String,
    Date: String
});

var Interested_Persons_Buildings_Week = mongoose.model('interested_persons_buildings_week', {
    Building_ID: String,
    Selected_Panel_ID: String,
    Traffic_Area: String,
    Number_Tickets: String,
    Week: String,
    Month: String,
    Year: String
});

var Interested_Persons_Buildings_Month = mongoose.model('interested_persons_buildings_month', {
    Building_ID: String,
    Selected_Panel_ID: String,
    Traffic_Area: String,
    Number_Tickets: String,
    Month: String,
    Year: String
});

var Interested_Persons_Buildings_Year = mongoose.model('interested_persons_buildings_year', {
    Building_ID: String,
    Selected_Panel_ID: String,
    Traffic_Area: String,
    Number_Tickets: String,
    Year: String
});

var Data_Regist_Building_Month = mongoose.model('data_regist_building_month', {
    Building_ID: String,
    Data_Type_ID: String,
    Value: String,
    Month: String,
    Year: String
});

var Data_Regist_Building_Year = mongoose.model('data_regist_building_year', {
    Building_ID: String,
    Data_Type_ID: String,
    Value: String,
    Year: String
});

var Data_Regist_Building = mongoose.model('data_regist_building', {
    Building_ID: String,
    Data_Type_ID: String,
    Value: String,
    Date: String
});

var Building_Daily_Persons = mongoose.model('building_daily_persons', {
    Building_ID: String,
    Value: String,
    Day: String,
    Week: String,
    Month: String,
    Year: String
});

var Building_Week_Persons = mongoose.model('building_week_persons', {
    Building_ID: String,
    Value: String,
    Week: String,
    Month: String,
    Year: String
});


var Building_Month_Persons = mongoose.model('building_month_persons', {
    Building_ID: String,
    Value: String,
    Month: String,
    Year: String
});


var Building_Year_Persons = mongoose.model('building_year_persons', {
    Building_ID: String,
    Value: String,
    Year: String
});


/*
AREAS
 */

var Area = mongoose.model('area', {
    Area_Name: String,
    Description: String
});


var Area_Visitors_Week = mongoose.model('area_visitors_week', {
    Area_ID: String,
    Description: String,
    Percent_Person_Area: String,
    Week: String,
    Month: String,
    Year: String
});

var Area_Visitors_Month = mongoose.model('area_visitors_month', {
    Area_ID: String,
    Description: String,
    Percent_Person_Area: String,
    Month: String,
    Year: String
});

var Area_Visitors_Year = mongoose.model('area_visitors_year', {
    Area_ID: String,
    Description: String,
    Percent_Person_Area: String,
    Year: String
});

var Area_Traffic_Week = mongoose.model('area_traffic_week', {
    Area1_ID: String,
    Area2_ID: String,
    Flow_Persons: String,
    Week: String,
    Month: String,
    Year: String
});

var Area_Traffic_Month = mongoose.model('area_traffic_month', {
    Area1_ID: String,
    Area2_ID: String,
    Flow_Persons: String,
    Month: String,
    Year: String
});

var Area_Traffic_Year = mongoose.model('area_traffic_year', {
    Area1_ID: String,
    Area2_ID: String,
    Flow_Persons: String,
    Year: String
});

var Area_Security = mongoose.model('area_security', {
    Area_ID: String,
    Type_Incident: String,
    Description: String,
    Analyzed: String,
    Date: String
});

/*
AREAS AND BUILDINGS
 */

var Top_Visits = mongoose.model('top_visits', {
    Top: String,
    Building_ID: String,
    Area_ID: String
});

var Level_Occupation = mongoose.model('level_occupation', {
    Building_ID: String,
    Area_ID: String,
    Occupation: String,
    Average_Waiting_Time: String,
    Date: String
});

var Level_Occupation_Schedule = mongoose.model('level_occupation_schedule', {
    Building_ID: String,
    Area_ID: String,
    Occupation: String,
    Schedule: String,
    Date: String
});

/*
PANELS
 */

/* MongoDB Panel' model */
var Panel = mongoose.model('panel', {
    Name: String,
    Description: String,
    Location: String
});

/* MongoDB Panel_Visitors_Week' model */
var Panel_Visitors_Week = mongoose.model('panel_visitors_week', {
    Panel_ID: String,
    Visitors: String,
    Week: String,
    Month: String,
    Year: String
});

/* MongoDB Panel_Visitors_Month' model */
var Panel_Visitors_Month = mongoose.model('panel_visitors_month', {
    Panel_ID: String,
    Visitors: String,
    Month: String,
    Year: String
});

/* MongoDB Panel_Visitors_Year' model */
var Panel_Visitors_Year = mongoose.model('panel_visitors_year', {
    Panel_ID: String,
    Visitors: String,
    Year: String
});

/*
MOBILE NODES
 */

/* MongoDB Mobile_Node' model */
var Mobile_Node = mongoose.model('mobile_node', {
    Name: String,
    Description: String,
    Location: String,
    Building_ID: String,
    Area_ID: String,
    Zone_ID: String
});

/* MongoDB Data_Type' model */
var Data_Type = mongoose.model('data_type', {
    Name: String,
    Description: String,
    Unit: String
});

/* MongoDB Data_Regist_Mobile_Month' model */
var Data_Regist_Mobile_Month = mongoose.model('data_regist_mobile_month', {
    Data_Type_ID: String,
    Mobile_Node_ID: String,
    Value: String,
    Month: String,
    Year: String
});

/* MongoDB Data_Regist_Mobile_Year' model */
var Data_Regist_Mobile_Year = mongoose.model('data_regist_mobile_year', {
    Data_Type_ID: String,
    Mobile_Node_ID: String,
    Value: String,
    Year: String
});

var Data_Regist_Mobile = mongoose.model('data_regist_mobile', {
    Data_Type_ID: String,
    Mobile_Node_ID: String,
    Value: String,
    Date: String
});

/*
GATES
 */

var Gate = mongoose.model('gate', {
    Name: String,
    Description: String
});

var Vehicle_Affluence = mongoose.model('vehicle_affluence', {
    Gate_ID: String,
    Schedule: String,
    Flow_Cars: String,
    Date: String
});

module.exports.State = State;
module.exports.SystemError = SystemError;
module.exports.User = User;
module.exports.Producer = Producer;
module.exports.Building_Energy_Monthly = Building_Energy_Monthly;
module.exports.History = History;
module.exports.Manager = Manager;
module.exports.Building_Energy_Anual = Building_Energy_Anual;
module.exports.Building = Building;
module.exports.Building_Security = Building_Security;
module.exports.Interested_Persons_Buildings_Week = Interested_Persons_Buildings_Week;
module.exports.Interested_Persons_Buildings_Month = Interested_Persons_Buildings_Month;
module.exports.Interested_Persons_Buildings_Year = Interested_Persons_Buildings_Year;
module.exports.Data_Regist_Building_Month = Data_Regist_Building_Month;
module.exports.Data_Regist_Building_Year = Data_Regist_Building_Year;
module.exports.Data_Regist_Building = Data_Regist_Building;
module.exports.Building_Daily_Persons = Building_Daily_Persons;
module.exports.Building_Week_Persons = Building_Week_Persons;
module.exports.Building_Month_Persons = Building_Month_Persons;
module.exports.Building_Year_Persons = Building_Year_Persons;
module.exports.Area = Area;
module.exports.Area_Visitors_Week = Area_Visitors_Week;
module.exports.Area_Visitors_Month = Area_Visitors_Month;
module.exports.Area_Visitors_Year = Area_Visitors_Year;
module.exports.Area_Traffic_Week = Area_Traffic_Week;
module.exports.Area_Traffic_Month = Area_Traffic_Month;
module.exports.Area_Traffic_Year = Area_Traffic_Year;
module.exports.Area_Security = Area_Security;
module.exports.Top_Visits = Top_Visits;
module.exports.Level_Occupation = Level_Occupation;
module.exports.Level_Occupation_Schedule = Level_Occupation_Schedule;
module.exports.Panel = Panel;
module.exports.Panel_Visitors_Week = Panel_Visitors_Week;
module.exports.Panel_Visitors_Month = Panel_Visitors_Month;
module.exports.Panel_Visitors_Year = Panel_Visitors_Year
module.exports.Mobile_Node = Mobile_Node;
module.exports.Data_Type = Data_Type;
module.exports.Data_Regist_Mobile_Month = Data_Regist_Mobile_Month;
module.exports.Data_Regist_Mobile_Year = Data_Regist_Mobile_Year;
module.exports.Data_Regist_Mobile = Data_Regist_Mobile;
module.exports.Gate = Gate;
module.exports.Vehicle_Affluence = Vehicle_Affluence;
module.exports.mongoose = mongoose;
