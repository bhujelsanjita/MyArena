const Sequelize = require("sequelize");
const Database = require("../config/dbconfig");
const { toDefaultValue } = require("sequelize/lib/utils");
const Booking = Database.define("booknow",{
    id:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    teamName:{
        type: Sequelize.STRING,
        allowNull: true
    },
    email:{
        type: Sequelize.STRING,
        allowNull:false
    },
    contactNo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    alternativeContactNo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    numberofPLayers:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    date:{
        type: Sequelize.DATE,
        allowNull: false
    },
    time:{
        type: Sequelize.TIME,
        allowNull: false
    },
    status:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "PENDING",
    },
    venueId:{
        type:Sequelize.STRING,
        allowNull: true
    },
    userId:{
        type:Sequelize.STRING,
        allowNull: true
    },
});
module.exports = Booking;