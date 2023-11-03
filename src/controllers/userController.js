const constants = require("../../constants/index");
const db = require("../models");
exports.userData = async (req, res) => {
  try {
    const reqBody = req.body;
    await db.users.create(reqBody).then(async (result) => {
      result = constants._copy(result);
      if (result) {
        let userData = await db.vehicle_bookings.findOrCreate({
          where: { user_id: result.id },
          defaults: { user_id: result.id },
        });
        userData = constants._copy(userData);
        return res.json({
          result: constants.responseObj(
            true,
            200,
            constants.messages.userDataAdded,
            false,
            result
          ),
        });
      } else {
        return res.json({
          result: constants.responseObj(true, 204, "Failed to add user data"),
        });
      }
    });
  } catch (error) {
    console.log(error, "=====error====");
    return res.json({
      result: constants.responseObj(
        false,
        500,
        constants.messages.somethingWentWrong,
        false
      ),
    });
  }
};
