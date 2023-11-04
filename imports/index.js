
const db = require("../src/models");
const VehicleTypes = db.vehicletypes;
const VehicleModels = db.vehiclemodels;
const Users = db.user;
const VehicleBookings = db.vehiclebookings;
module.exports={
    VehicleTypes,VehicleModels,Users,VehicleBookings
}