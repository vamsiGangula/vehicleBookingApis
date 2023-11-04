const constants = require("../../constants/index");
const { VehicleTypes, VehicleBookings, VehicleModels } = require("../../imports");
const db = require("../models");
exports.getWheels = async (req, res) => {
  try {
    let wheels = [];
    await VehicleTypes
      .findAll({
        attributes: [[db.Sequelize.literal("DISTINCT wheels"), "wheels"]],
      })
      .then(async (result) => {
        result = constants._copy(result);
        result.forEach((element) => {
          wheels.push(element.wheels);
        });
        console.log(wheels, "=====wheels");
        if (wheels.length > 0) {
          return res.json({
            result: constants.responseObj(
              true,
              200,
              constants.messages.wheelsFetched,
              false,
              { wheels: wheels }
            ),
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
exports.getvehicleTypes = async (req, res) => {
  try {
    let reqBody = req.body;
    let reqHeaders = req.headers;
    if (reqBody.wheels === 4 || reqBody.wheels === 2) {
      await VehicleTypes
        .findAll({
          where: { wheels: reqBody.wheels },
          attributes: ["name", "id", "wheels"],
        })
        .then(async (result) => {
          result = constants._copy(result);
          if (result.length > 0) {
            let wheelsAdded = await VehicleBookings.update(
              { wheels: reqBody.wheels },
              {
                where: {
                  user_id: reqHeaders.userid,
                  booking_status: false,
                },
              }
            );
            wheelsAdded = constants._copy(wheelsAdded);
            if (wheelsAdded[0] == 1) {
              return res.json({
                result: constants.responseObj(
                  true,
                  200,
                  constants.messages.bikeDataFound,
                  false,
                  result
                ),
              });
            } else {
              return res.json({
                result: constants.responseObj(
                  true,
                  204,
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
        })
        .catch((err) => {
          return res.json({
            result: constants.responseObj(
              false,
              500,
              constants.messages.somethingWentWrong,
              false,
              err
            ),
          });
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
exports.getModels = async (req, res) => {
  try {
    let reqBody = req.body;
    let reqHeaders = req.headers;
    await VehicleModels
      .findAll({
        where: { vehicle_type_id: reqBody.vehicle_type_id, is_active: 1 },
        attributes: ["model_name", "id"],
      })
      .then(async (result) => {
        result = constants._copy(result);
        if (result.length > 0) {
          let vehiclesData = await VehicleBookings.update(
            {
              vehicle_type_name: reqBody.vehicle_type,
              vehicle_type_id: reqBody.vehicle_type_id,
            },
            {
              where: { user_id: reqHeaders.userid, booking_status: false },
            }
          );
          vehiclesData = constants._copy(vehiclesData);
          if (vehiclesData[0] == 1) {
            return res.json({
              result: constants.responseObj(
                true,
                200,
                constants.messages.ModelsFound,
                false,
                result
              ),
            });
          } else {
            return res.json({
              result: constants.responseObj(
                true,
                204,
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
      })
      .catch((err) => {
        return res.json({
          result: constants.responseObj(
            false,
            500,
            constants.messages.somethingWentWrong,
            false,
            err
          ),
        });
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
