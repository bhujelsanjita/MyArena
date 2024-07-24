const dotenv = require("dotenv");
const Sequelize = require("sequelize");
const database = require("../config/dbconfig");
const jwt = require("jsonwebtoken");

const Auth = {
    userAuth: (req,res)=>{
        if(
            req.headers.authorization == null ||
            req.headers.authorization == "" ||
            req.headers.authorization == undefined

        ){
            return res.status(401).send({
                message: "Unauthorised",
                success: false
            });

        }
        
    },

    adminAuth: (req,res)=>{
        if(
            req.headers.authorization == null ||
            req.headers.authorization == "" ||
            req.headers.authorization == undefined

        ){
            return res.status(401).send({
                message: "Unauthorised",
                success: false
            });

        }
    },  
    
    veneueOwnerAuth: (req,res)=>{
        if(
            req.headers.authorization == null ||
            req.headers.authorization == "" ||
            req.headers.authorization == undefined

        ){
            return res.status(401).send({
                message: "Unauthorised",
                success: false
            });

        }
    },
    
    };


module.exports = Auth;