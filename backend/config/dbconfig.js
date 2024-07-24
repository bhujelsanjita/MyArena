const Sequelize = require("sequelize");
const dotenv = require("dotenv");

const DB_Host = process.env.DB_HOST;
const DB_Name = process.env.DB_NAME;
const DB_Password = process.env.DB_PASSWORD;
const DB_User = process.env.DB_USER;
const DB = new Sequelize(DB_Name,DB_User,DB_Password,{
            host:DB_Host,
            dialect: "mysql"

})

module.exports = DB;