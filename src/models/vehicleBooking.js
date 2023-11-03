
module.exports = (sequelize, Sequelize) => {
  const VehicleBookings = sequelize.define(
    "vehicle_bookings",
    {
      user_id: {type: Sequelize.INTEGER },
      wheels: {type: Sequelize.INTEGER },
      vehicle_type_id:{type:Sequelize.INTEGER},
      vehicle_type_name: {type: Sequelize.STRING },
      model_id:{type:Sequelize.INTEGER},
      model_name: {type: Sequelize.STRING },
      start_date: { type: Sequelize.DATEONLY },
      end_date: { type: Sequelize.DATEONLY },
      booking_status:{type:Sequelize.BOOLEAN,defaultValue:false},
    },
    {
        underscored:true,
    }
  );
  VehicleBookings.associate=(models)=>{
    VehicleBookings.belongsTo(models.users,{
      foreignKey:'user_id'
    });
  }
  return VehicleBookings;
};
