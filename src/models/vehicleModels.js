
module.exports=(sequelize,Sequelize)=>{
    const VehicleSchema=sequelize.define('vehicle_models',{
        model_name:{type:Sequelize.STRING},
        vehicle_type_id:{type:Sequelize.INTEGER},
        is_active:{type:Sequelize.INTEGER,defaultValue:1},
    },
    {
        underscored:true,
    }
    );
    VehicleSchema.associate = (models)=>{
        VehicleSchema.belongsTo(models.vehicle_types,{
            foreignKey: 'vehicle_type_id'
        });
        
    }
    return VehicleSchema;
}