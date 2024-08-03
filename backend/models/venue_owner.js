const Sequelize = require("sequelize");
const Database = require("../config/dbconfig");

const Venue_owner = Database.define("venueowner",{
    id:{
        type: Sequelize.STRING,
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
    },
    contactNo:{
        type: Sequelize.STRING,
        allowNull: false
    }
})
module.exports = Venue_owner;