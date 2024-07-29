const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/user")


userRouter.post("/registration",userController.userRegistration);
userRouter.post("/login",userController.userLogin);

module.exports = userRouter;