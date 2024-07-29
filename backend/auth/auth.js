const dotenv = require("dotenv").config();
const Sequelize = require("sequelize");
const database = require("../config/dbconfig");
const jwt = require("jsonwebtoken");
const Users = require("../models/user");
const Admin = require("../models/Admin");
const Auth = {
  userAuth: (req, res) => {
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
            id: req.body.id,
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
        return res.status(400).send({
            message: "something went wrong",
            success: false
        });
    });

  },

  adminAuth: (req, res) => {
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
    Admin.findOne({
        where:{
            id: req.body.id,
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
        return res.status(400).send({
            message: "something went wrong",
            success: false
        });
    });

  },

  veneueOwnerAuth: (req, res) => {
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
  },
};

module.exports = Auth;
