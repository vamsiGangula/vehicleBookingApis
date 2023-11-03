const constants = require("../../constants/index");
const db = require("../models");
exports.bookingData = async (req, res) => {
  try {
    let reqBody = req.body;
    let reqObj = {
      model_name: reqBody.model_name,
      start_date: reqBody.start_date,
      end_date: reqBody.end_date,
      model_id: reqBody.model_id,
      booking_status: true,
    };
    let reqHeaders = req.headers;
    let userData = await db.vehicle_bookings.findOne({
      where: { user_id: reqHeaders.userid, booking_status: false },
    });
    if (userData != null) {
      let result = await db.vehicle_bookings.update(reqObj, {
        where: { user_id: req.headers.userid, booking_status: false },
      });
      result = constants._copy(result);
      if (result[0] == 1) {
        await db.vehicle_models.update(
          { is_active: 0 },
          {
            where: {
              model_name: reqBody.model_name.toLowerCase(),
              id: reqBody.model_id,
            },
          }
        );
        await db.vehicle_bookings
          .findOne({
            where: { user_id: req.headers.userid },
            attributes: [
              "user_id",
              "wheels",
              "vehicle_type_name",
              "model_name",
              "start_date",
              "end_date",
            ],
          })
          .then(async (result) => {
            result = constants._copy(result);
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
            false,
            500,
            constants.messages.noUpdate
          ),
        });
      }
    } else {
      return res.json({
        result: constants.responseObj(
          true,
          204,
          constants.messages.noDataFound
        ),
      });
    }
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
