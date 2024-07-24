const Sequelize = require("sequelize");
const Database = require("../config/dbconfig");

const Admin = Database.define("admin",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
    
});
module.exports = Admin;