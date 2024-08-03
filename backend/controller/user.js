const sequelize = require("sequelize");
const Database = require("../config/dbconfig");
const jwt = require("jsonwebtoken");
// const User = require("../models/user");
const Becrypt = require("bcrypt");
const { sendEmail } = require("../middleware/nodemailer");
const { Booking, User, Venue } = require("../models/relationship");

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
            success: false,
          });
        }
        if (Becrypt.compareSync(req.body.password, data.password)) {
          let token = jwt.sign(data, process.env.SECRET_KEY);
          return res.status(200).send({
            message: "login success",
            success: true,
            token: token,
          });
        }
        return res.status(401).send({
          message: "password didn't match",
          suceess: false,
        });
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
              success: true,
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
  bookNow: (req, res) => {
    if (
      req.body.name == null ||
      req.body.name == undefined ||
      req.body.email == null ||
      req.body.email == undefined ||
      req.body.contactNo == null ||
      req.body.contactNo == undefined ||
      req.body.alternativeContactno == null ||
      req.body.alternativeContactno == undefined ||
      req.body.date == null ||
      req.body.date == undefined ||
      req.body.time == null ||
      req.body.time == undefined ||
      req.body.slug == null ||
      req.body.slug == undefined
    ) {
      return res.status(401).send({
        message: "Please enter the details correctly",
        success: false,
      });
    }

    Venue.findOne({
      raw: true,
      where: {
        slug: req.body.slug,
      },
    })
      .then((data) => {
        if (data == null) {
          return res.status(200).send({
            message: "Venue not found",
            success: false,
          });
        }
        let id = Math.round(Date.now() / 1000);
        let venueId = data.id;
        let userId = req.user.id;
        let venuename = data.name;
        Booking.create({
          id: id,
          name: req.body.name,
          teamName: req.body.teamname,
          email: req.body.email,
          contactNo: req.body.contactNo,
          alternativeContactNo: req.body.alternativeContactno,
          numberofPlayers: req.body.numberofPlayers,
          date: req.body.date,
          time: req.body.time,
          status: req.body.status,
          venueId: venueId,
          userId: userId,
        })
          .then((data) => {
            return res.status(200).send({
              message: "Booking created successfully",
              success: true,
              venuename: venuename,
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
          message: "Something went wrong",
          success: false,
        });
      });
  },
  // listBooking: (req,res)=>{
  //   Booking.findAll({
  //     raw:true,

  //   }).then((data)=>{
  //     return res.status(200).send({
  //       message: "Booking details fetched successfully",
  //       success: true,
  //       data: data
  //     });
  //   }).catch((err)=>{
  //     return res.status(401).send({
  //       message: "Something went wrong",
  //       success: false,
  //     });
  //   })
  // },

  changeBookingStatus: (req, res) => {
    if (req.body.bookingId == null || req.body.bookingId == undefined) {
      return res.status(401).send({
        message: "Provide Booking Id",
        success: false,
      });
    }
    Booking.update(
      {
        status: req.body.newstatus,
      },
      {
        where: {
          id: req.body.bookingId,
        },
      }
    )
      .then((update) => {
        return res.status(200).send({
          message: "Updated Successfully",
          success: true,
        });
      })
      .catch((err) => {
        return res.status(401).send({
          message: "something went wrong",
          success: false,
        });
      });
  },
  getStatistics: async (req, res) => {
    try {
      // Get total number of users
      const totalUsers = await User.count();

      // Get total number of bookings
      const totalBookings = await Booking.count(
        {
          where: {
            
            venueId: {
              [sequelize.Op.ne]: null
            }
          },
        }
      );

      // Get total number of venues
      const totalVenues = await Venue.count(
        
      );

      return res.status(200).send({
        message: "Statistics fetched successfully",
        success: true,
        data: {
          totalUsers,
          totalBookings,
          totalVenues,
        },
      });
    } catch (error) {
      console.error("Error fetching statistics:", error);
      return res.status(500).send({
        message: "Something went wrong",
        success: false,
      });
    }
  },
  getMyBookings: (req, res) => {
    let id = req.user.id;
    console.log("userid", id);
    Booking.findAll({
      raw: true,
      where: {
        userId: id,
        venueId: {
          [sequelize.Op.ne]: null
        }
      },
      include: [
        {
          model: Venue,
        },
        {
          model: User,
        },
      ],
    })
      .then((data) => {
        if (data == null) {
          return res.status(200).send({
            message: "Data not found",
            success: false,
          });
        }
        return res.status(200).send({
          message: "fetched my bookings successfully",
          success: true,
          data: data,
        });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Something went wrong",
          success: false,
        });
      });
  },
  changePassword: async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).send({
        message: "Current password and new password are required.",
        success: false,
      });
    }

    try {
      // Get the user from the token (assuming req.user contains the authenticated user's info)
      const userId = req.user.id;

      // Find the user by ID
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).send({
          message: "User not found.",
          success: false,
        });
      }

      // Check if the current password matches
      const isMatch = await Becrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        return res.status(401).send({
          message: "Current password is incorrect.",
          success: false,
        });
      }

      // Hash the new password
      const salt = await Becrypt.genSalt(10);
      const hashedPassword = await Becrypt.hash(newPassword, salt);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      return res.status(200).send({
        message: "Password changed successfully.",
        success: true,
      });
    } catch (error) {
      console.error("Error changing password:", error);
      return res.status(500).send({
        message: "Something went wrong. Please try again later.",
        success: false,
      });
    }
  },
  sendMail: (req, res) => {
    const emailTo = req.body.to;
    const from = req.body.from;
    const subject = req.body.subject;
    const emailBody = req.body.emailbody;
    sendEmail(from, emailTo, subject, emailBody)
      .then((success) => {
        console.log(success);
        return res.send({
          message: "Email sent succesfully",
          success: true,
        });
      })
      .catch((err) => {
        return res.status(401).send({
          message: "Something went wrong while sending email",
          success: false,
        });
      });
  },
};
module.exports = userController;
