const Sequelize = require("sequelize");
const Database = require("../config/dbconfig");
const Venue = require("../models/venue");
const Venue_Owner = require("../models/venue_owner");
const Booking= require("../models/Booking");
const User = require("../models/user");


Venue_Owner.hasMany(Venue, { foreignKey: "ownerId" });
Venue.belongsTo(Venue_Owner,{ foreignKey: "ownerId"});

Venue.hasMany(Booking,{foreignKey:"venueId"});
Booking.belongsTo(Venue,{foreignKey: "venueId"});

User.hasMany(Booking,{foreignKey: "userId"});
Booking.belongsTo(User,{foreignKey:"userId"});


module.exports =  {
    Venue,
    Venue_Owner,
    User,
    Booking
}

