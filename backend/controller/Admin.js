const Sequelize = require("sequelize");
const Database = require("../config/dbconfig");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

const adminController = {
    adminLogin: (req,res)=>{
       if(
        req.body.email == null  ||
        req.body.email == undefined ||
        req.body.password == null ||
        req.body.password == undefined

       ){
        return res.status(401).send({
            message: "Please enter the valid details",
            success: false
        });
       }

    },
    adminRegistration: (req,res)=>{
        if(
            req.body.name == null ||
            req.body.name == undefined ||
            req.body.email == null ||
            req.body.email == undefined ||
            req.body.password == null ||
            req.body.password == undefined
        ){
            return res.status(401).send({
                message: "please enter the valid details",
                success: false
            });
        }
        Admin.findOne({
            where:{
                email:req.body.email
            }
        }).then((data)=>{
            if(
                
            )
        })
    }
}