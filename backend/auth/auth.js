const dotenv = require("dotenv").config();
const Sequelize = require("sequelize");
const database = require("../config/dbconfig");
const jwt = require("jsonwebtoken");
const Users = require("../models/user");
// const Admin = require("../models/Admin");
const { Venue_Owner } = require("../models/relationship");
const Auth = {
  userAuth: (req, res, next) => {
    if (
      req.headers.authorization == null ||
      req.headers.authorization == "" ||
      req.headers.authorization == undefined
    ) {
      return res.status(401).send({
        message: "Unauthorised",
        success: false,
      });
    }
    var secretKey = process.env.SECRET_KEY;
    try {
      let token = req.headers.authorization.split(" ")[1];
      var decodedToken = jwt.verify(token, secretKey);
    } catch (err) {
      return res.status(401).send({
        message: "Unauthorised",
        success: false,
      });
    }
    Users.findOne({
        where:{
            id: decodedToken.id
        },
    }).then((data)=>{
        if(
            data == null ||
            data.length == 0
        ){
            return res.status(200).send({
                message: "User not found",
                success: false,
            });
        }
        req.user = data;
        next();
    }).catch((err)=>{
      console.log(err)
        return res.status(400).send({
            message: "something went wrong",
            success: false
        });
    });

  },

  veneueOwnerAuth: (req, res,next) => {
    if (
      req.headers.authorization == null ||
      req.headers.authorization == "" ||
      req.headers.authorization == undefined
    ) {
      return res.status(401).send({
        message: "Unauthorised",
        success: false,
      });
    }
    var secretKey = process.env.SECRET_KEY;
    try {
      let token = req.headers.authorization.split(" ")[1];
      var decodedToken = jwt.verify(token, secretKey);
    } catch (err) {
      return res.status(401).send({
        message: "Unauthorised",
        success: false,
      });
    }
    Venue_Owner.findOne({
        raw: true,
        where:{
            id: decodedToken.id,
        },
    }).then((data)=>{
        if(
            data == null ||
            data.length == 0
        ){
            return res.status(200).send({
                message: "User not found",
                success: false,
            });
        }
        req.owner = data;
        next();
    }).catch((err)=>{
      console.log(err);
        return res.status(400).send({
            message: "something went wrong",
            success: false
        });
    });

  },


   
};

module.exports = Auth;
