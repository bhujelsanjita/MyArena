const sequelize = require("sequelize");
const Database = require("../config/dbconfig");
const jwt = require("jsonwebtoken");

const userController = {
    userLogin: (req,res)=>{
        if(
            req.headers.authorization == null ||
            req.headers.authorization == "" ||
            req.headers.authorization == undefined
        ){
            return res.status.send({
                message: "Unauthorised login",
                success: false
            });

        }
        if(
            req.body.email ==  null ||
            req.body.email == undefined ||
            req.body.password == null ||
            req.body.password == undefined
        ){
            return res.status(401).send({
                message: "Please enter the valid details",
                success: false
            });
        }
    }
}
