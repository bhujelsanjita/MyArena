const Sequelize = require("sequelize");
const Database = require("../config/dbconfig");
const { all } = require("../routes/route");

const User = Database.define("user",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull:false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
module.exports = User;