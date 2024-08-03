const Sequelize = require("sequelize");
const Database = require("../config/dbconfig");

const Venue = Database.define("venue",{
    id:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    address:{
        type: Sequelize.STRING,
        allowNull: false
    },
    type:{
        type: Sequelize.ENUM("Futsal","Cricksal"),
        allowNull: false
    },
    image:{
        type:Sequelize.STRING,
        allowNull: false
    },
    price:{
        type: Sequelize.INTEGER,
        allownull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    status:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allownull: false
    },
    ownerId:{
        type: Sequelize.STRING,
        allowNull:true,
        
    }
})
module.exports = Venue;