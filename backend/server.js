const express = require("express");
const sequelize = require("sequelize");
const dotenv = require("dotenv").config();
const DB = require("./config/dbconfig");
const router = require("./routes/route");




const app = express();
app.use(router);
const PORT = process.env.APP_PORT;
DB.sync({alter:true}).then(()=>{
    console.log("Database Connection established");
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
      })
})

