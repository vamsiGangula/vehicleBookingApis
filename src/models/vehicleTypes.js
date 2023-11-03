module.exports = (sequelize, Sequelize) => {
  const VehicleTypes = sequelize.define(
    "vehicle_types",
    {
      name: { type: Sequelize.STRING },
      wheels: { type: Sequelize.INTEGER },
      is_active: { type: Sequelize.INTEGER, defaultValue: 1 },
    },
    {
      underscored: true,
    }
  );
  VehicleTypes.associate = (models) => {
    VehicleTypes.hasMany(models.vehicle_models, {
      foreignKey: "vehicle_type_id",
    });
  };
  return VehicleTypes;
};
