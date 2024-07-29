const sequelize = require("sequelize");
const Database = require("../config/dbconfig");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Becrypt = require("bcrypt");
const dotenv = require("dotenv").config();
const userController = {
  userLogin: (req, res) => {
    if (
      req.body.email == null ||
      req.body.email == undefined ||
      req.body.password == null ||
      req.body.password == undefined
    ) {
      return res.status(401).send({
        message: "Please enter the valid details",
        success: false,
      });
    }
    User.findOne({
      raw: true,
      where: {
        email: req.body.email,
      },
    })
      .then((data) => {
        if (data?.length == 0 || data == null) {
          return res.status(200).send({
            message: "User not found",
            sucess: false,
          });
        }
        if (Becrypt.compareSync(req.body.password, data.password)) {
          let token = jwt.sign(data, process.env.SECRET_KEY);
          return res.status(200).send({
            message: "login success",
            sucess: true,
            token: token,
          });
        }
        return res.status(401).send({
            message: "password didn match",
            suceess: false
        })
      })
      .catch((err) => {
        console.log(err);
        return res.status(401).send({
          message: "Something went wrong",
          success: false,
        });
      });
  },

  userRegistration: (req, res) => {
    if (
      req.body.email == null ||
      req.body.email == undefined ||
      req.body.password == null ||
      req.body.password == undefined ||
      req.body.name == null ||
      req.body.name == undefined ||
      req.body.address == undefined ||
      req.body.address == null
    ) {
      return res.status(401).send({
        message: "Please enter the valid details",
        success: false,
      });
    }
    User.findOne({
      raw: true,
      where: {
        email: req.body.email,
      },
    })
      .then((data) => {
        console.log(data);
        if (data != null) {
          console.log("user already found", data);
          return res.status(200).send({
            message: `User with ${req.body.email} already exist!`,
            success: false,
          });
        }
        let id = Math.round(Date.now() / 1000);
        const hashPassword = Becrypt.hashSync(req.body.password, 10);
        User.create({
          id: id,
          name: req.body.name,
          address: req.body.address,
          password: hashPassword,
          email: req.body.email,
          address: req.body.address,
        })
          .then((data) => {
            return res.status(200).send({
              message: "User resgistration success",
              status: true,
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(401).send({
              message: "Something went wrong",
              success: false,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        return res.status(401).send({
          message: "Something Went wrong",
          Success: false,
        });
      });
  },
};
module.exports = userController;
