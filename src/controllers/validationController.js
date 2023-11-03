const { validations, response, validateHeaders, _copy } = require("../../constants");
const db = require("../models");

exports.validateUserData = async (req, res, next) => {
  const reqBody = req.body;
  const schema = ["first_name", "last_name"];
  validations(reqBody, schema, (err, resp) => {
    if (err) {
      res.json(response(false, 400, false, err));
    } else {
        if(reqBody.first_name.trim() === ''||reqBody.last_name.trim() === '') {
            res.json(response(false, 400, false, "Names Should not be empty"));
        }else{
            next();
        }
    }
  });
};
exports.validategetVehilces=async(req,res,next)=>{
  let reqBody=req.body;
  let reqHeaders=req.headers;
  let schema = ["wheels"];
  let headerSchema=["userid"];
  validateHeaders(reqHeaders,headerSchema,(err,resp)=>{
    if(err){
      res.json(response(false, 400, false, err));
    }else{
      validations(reqBody,schema,(err,resp)=>{
        if(err){
          res.json(response(false, 400, false, err));
        }else{
          if(reqBody.wheels!==4&&reqBody.wheels!==2){
            res.json(response(false, 400, false, "Invalid Number Of wheels"));
          }else{
            next();
          }
        }
      })
    }
  })
};
exports.validategetModels=async(req,res,next)=>{
  let reqBody=req.body;
  let reqHeaders=req.headers;
  let schema=["vehicle_type","vehicle_type_id"];
  let headerSchema=["userid"];
  validateHeaders(reqHeaders,headerSchema,async (err,resp)=>{
    if(err){
      res.json(response(false, 400, false, err));
    }else{
      validations(reqBody,schema,async(err,resp)=>{
        if(err){
          res.json(response(false, 400, false, err));
        }else{
         let vehiclesTypes= await db.vehicle_types.findOne({where:{name:reqBody.vehicle_type,id:reqBody.vehicle_type_id}});
         vehiclesTypes=_copy(vehiclesTypes);
         console.log(vehiclesTypes,"=====vehiclesTypes")
         if(vehiclesTypes==null){
          res.json(response(false, 400, false, "No Vehicle Types found"));
         }else{
           next();
         }
        }
      })
    }
  })
};
exports.valiDateBookingData=async(req,res,next)=>{
  let reqBody=req.body;
  let reqHeaders=req.headers;
  let schema=["model_name","start_date","end_date","model_id"];
  let headerSchema=["userid"];
  validateHeaders(reqHeaders,headerSchema,(err,resp)=>{
    if(err){
      res.json(response(false, 400, false, err));
    }else{
      validations(reqBody,schema,async(err,resp)=>{
        if(err){
          res.json(response(false, 400, false, err));
        }else{
          const startDate = new Date(reqBody.start_date);
          const endDate = new Date(reqBody.end_date);
          if (startDate >= endDate) {
            res.json(response(false, 400, false, "Start date must be before the end date"));
          }else{
            let modelsTypes= await db.vehicle_models.findOne({where:{model_name:reqBody.model_name.toLowerCase(),id:reqBody.model_id,is_active:1}});
            modelsTypes=_copy(modelsTypes);
            console.log(modelsTypes,"=====modelsTypes");
            if(modelsTypes==null){
              res.json(response(false, 400, false, "No Vehicle found"));
            }else{
              next();
            }
          }
        }
      })
    }
  })
}