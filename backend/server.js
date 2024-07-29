const express = require("express");
const sequelize = require("sequelize");
const dotenv = require("dotenv").config();
const DB = require("./config/dbconfig");
const router = require("./routes/route");
const bodyparser = require("body-parser");
const cors = require("cors");


const app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors());
app.use(router);


const PORT = process.env.APP_PORT;
DB.sync({alter:true}).then(()=>{
    console.log("Database Connection established");
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
      })
})

