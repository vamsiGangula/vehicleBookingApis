const { Client } = require('pg');
const dbConfig = require('../config/config.json'); // Import the database configuration
const client = new Client(dbConfig);
const db=require('../src/models');
const { _copy } = require('../constants');
const vehicleTypesData = [
  { name: 'Hatchback',wheels:4},
  { name: 'SUV',wheels:4},
  { name: 'Sedan',wheels:4},
  { name: 'Cruiser',wheels:2},
  { name: 'Sports',wheels:2},
];
const vehicleModelsData = [
    { model_name: 'i10', vehicle_type_id:1,is_active:1}, 
    { model_name: 'i20', vehicle_type_id:1,is_active:1 }, 
    { model_name: 'xuv 300', vehicle_type_id:2,is_active:1 }, 
    { model_name: 'xuv 500', vehicle_type_id:2,is_active:1 }, 
    { model_name: 'swift', vehicle_type_id:3,is_active:1}, 
    { model_name: 'baleno', vehicle_type_id:3,is_active:1}, 
    { model_name: ' ktm 300', vehicle_type_id: 4,is_active:1}, 
    { model_name: 'ktm 290', vehicle_type_id: 4,is_active:1}, 
    { model_name: 'pulsar 220', vehicle_type_id: 5,is_active:1}, 
    { model_name: 'pulsar 150', vehicle_type_id: 5,is_active:1}, 
  ];
async function seedData() {
  try {
    console.log("Seeding")
      let vehicleTypesDatas= await db.vehicle_types.bulkCreate(vehicleTypesData);
      vehicleTypesDatas= _copy(vehicleTypesDatas)
      let vehicleModelsDatas=await db.vehicle_models.bulkCreate(vehicleModelsData);
      vehicleModelsDatas= _copy(vehicleModelsDatas)
      console.log(vehicleModelsDatas,"====vehicleModelsDatas")
      console.log(vehicleTypesDatas,"====vehicleTypesDatas")
    console.log('Data seeded successfully');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    client.end(); 
  }
}

seedData();