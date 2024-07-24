const Sequelize = require("sequelize");
const Database = require("../config/dbconfig");

const Venue_owner = database.define("venueownwe",{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true

    },
    owner_name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    owner_address:{
        type:Sequelize.STRING,
        allowNull: false   
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    }
})
module.exports = Venue_owner;