const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/user");
const { userAuth } = require("../auth/auth");


userRouter.post("/registration",userController.userRegistration);
userRouter.post("/login",userController.userLogin);
userRouter.post("/booknow",userAuth,userController.bookNow);
userRouter.patch("/change-bookingstatus",userController.changeBookingStatus);
userRouter.get('/statistics', userController.getStatistics);
userRouter.get('/mybookings',userAuth, userController.getMyBookings);
userRouter.post('/changepassword',userAuth, userController.changePassword);
userRouter.post("/sendEmail",userController.sendMail);

module.exports = userRouter;