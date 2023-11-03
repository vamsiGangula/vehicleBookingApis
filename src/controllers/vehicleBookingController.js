const constants = require("../../constants/index");
const db = require("../models");
exports.bookingData = async (req, res) => {
  try {
    let reqBody = req.body;
    let reqObj = {
      model_name: reqBody.vehicle_name,
      start_date: reqBody.start_date,
      end_date: reqBody.end_date,
    };
    await db.vehicle_bookings
      .update(
        reqObj,
        {
            where:{user_id:req.headers.userid}
        }
      )
      .then(async (result) => {
        result = constants._copy(result);
        console.log(result, "====res ultimately");
        if (result[0] == 1) {
          await db.vehicle_bookings
            .findOne({ where:{user_id: req.headers.userid },attributes:["user_id","wheels","vehicle_type","model_name","start_date","end_date"]})
            .then(async (result) => {
              result = constants._copy(result);
              console.log(result, "====res");
              return res.json({
                result: constants.responseObj(
                  true,
                  200,
                  constants.messages.bookedSuccesfully,
                  false,
                  result
                ),
              });
            });
        } else {
          return res.json({
            result: constants.responseObj(
              true,
              204,
              constants.messages.noDataFound
            ),
          });
        }
      });
  } catch (error) {
    console.log(error, "=====>errrors====");
    return res.json({
      result: constants.responseObj(
        false,
        500,
        constants.messages.somethingWentWrong,
        false,
        error
      ),
    });
  }
};
