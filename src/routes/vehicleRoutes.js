const vehicleController=require("../controllers/vehicleController");
const validationController=require("../controllers/validationController");
module.exports=(app)=>{
  var router = require('express').Router();
  router.get('/getwheels',[vehicleController.getWheels]);
  router.post('/getvehicleTypes',[validationController.validategetVehilces,vehicleController.getvehicleTypes]);
  router.post('/getModels',[validationController.validategetModels,vehicleController.getModels]);
  app.use('/',router);
}