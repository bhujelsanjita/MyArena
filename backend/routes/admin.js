const express = require("express");
const adminController = require("../controller/Admin");
const adminRouter = express.Router();
const Auth = require("../auth/auth");
const uploads = require("../middleware/Imageuploader");

adminRouter.post('/register',adminController.adminRegistration);
adminRouter.post('/login',adminController.adminLogin);

adminRouter.post("/addvenue",Auth.veneueOwnerAuth,uploads.single("image"),adminController.addVenue);
adminRouter.get("/list-venue",adminController.listVenue);
adminRouter.post("/venue-details",adminController.getVenueDetails);
adminRouter.get("/booking-lists",adminController.listBooking);
adminRouter.patch('/venues/:id', uploads.single('image'), adminController.editVenue);
adminRouter.delete('/venues/:slug',adminController.deleteVenue); // Add this line for delete route


module.exports = adminRouter;
