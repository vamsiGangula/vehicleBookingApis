const vehicleBookingController=require("../controllers/vehicleBookingController");
const validationController=require("../controllers/validationController");
module.exports=(app)=>{
  var router = require('express').Router();
  router.post('/bookingData',[validationController.valiDateBookingData,vehicleBookingController.bookingData]);
  app.use('/',router);
}