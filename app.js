const express = require('express');
const sequelize = require('sequelize');
const db=require('./src/models');
const app = express();
const router = require("express").Router();
const fs=require('fs');
app.use(express.json());
// db.sequelize.sync();
// db.sequelize.sync({alter: true});
// const seedData=require('./seeders/seed')
fs.readdirSync(__dirname + "/src/routes").forEach(function (file) {
    if (file === "app.js" || file.substr(file.lastIndexOf(".") + 1) !== "js")
      return;
    var name = file.substr(0, file.indexOf("."));
    console.log(name,"====name")
    require('./src/routes/' + name)(app,router);
  });

app.listen(2000,()=>{
    console.log('listening on port 2000');
})