
module.exports=(sequelize,Sequelize)=>{
    const Users=sequelize.define('users',{
        first_name:{type:Sequelize.STRING},
        last_name:{type:Sequelize.STRING},
    },{
        timestamps:true,
        underscore:true,
    }
    );
    Users.associate=(models)=>{
        // console.log(models,"=======models=======");
        Users.hasMany(models.vehicle_bookings,{
            foreignKey:'user_id'
        }) 
    }
return Users;
}