const userController=require("../controllers/userController");
const validationController=require("../controllers/validationController");
module.exports=(app)=>{
  var router = require('express').Router();
  router.post('/userData',[validationController.validateUserData,userController.userData]);
  app.use('/',router);
}