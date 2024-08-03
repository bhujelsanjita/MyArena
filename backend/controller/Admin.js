const Sequelize = require("sequelize");
const Database = require("../config/dbconfig");
const jwt = require("jsonwebtoken");
const Becrypt = require("bcrypt");
const dotenv = require("dotenv").config();
// const Venue_owner = require("../models/venue_owner");
// const Venue = require("../models/venue");
const { Venue_Owner, Venue, User } = require("../models/relationship");
const Booking = require("../models/Booking");

const adminController = {
  adminLogin: (req, res) => {
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
    Venue_Owner.findOne({
      raw: true,
      where: {
        email: req.body.email,
      },
    })
      .then((data) => {
        console.log(data);
        if ( data == null) {
          
          return res.status(401).send({
            message: `User with ${req.body.email} not found`,
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
        return res.status(200).send({
          message: `${req.body.email} with this password didn match`,
          success: false,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(401).send({
          message: "somethong went wrong",
          success: false,
        });
      });
  },
  adminRegistration: (req, res) => {
    if (
      req.body.name == null ||
      req.body.name == undefined ||
      req.body.email == null ||
      req.body.email == undefined ||
      req.body.password == null ||
      req.body.password == undefined
    ) {
      return res.status(401).send({
        message: "please enter the valid details",
        success: false,
      });
    }
    Venue_Owner.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((data) => {
        console.log(data);
        if (data != null) {
          return res.status(200).send({
            message: "User already exists",
            success: false,
          });
        }

        let id = Math.round(Date.now() / 1000);
        let hashPassword = Becrypt.hashSync(req.body.password, 10);
        Venue_Owner.create({
          id: id,
          owner_name: req.body.name,
          owner_address: req.body.address,
          contactNo: req.body.contactNo,
          email: req.body.email,
          password: hashPassword,
        })
          .then((data) => {
            return res.status(200).send({
              message: "Admin registered sucessfully",
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
          message: "something went wrong",
          success: false,
        });
      });
  },
  addVenue: (req, res) => {
    let ownerId = req.owner.id;
    let venueId = Math.round(Date.now() / 1000);
    let imageName = `${req.protocol}://${req.get('host')}/${req.file.path}`;
    console.log(req.file);
    Venue.create({
      id: venueId,
      name: req.body.name,
      address: req.body.address,
      type: req.body.type,
      image: imageName,
      price: req.body.price,
      description: req.body.description,
      slug:req.body.slug,
      status: req.body.status,
      ownerId: ownerId,
    })
      .then((data) => {
        return res.status(200).send({
          message: "Venue added succesfully",
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
  },
  listVenue: (req,res)=>{
    Venue.findAll({
      raw:true,
      
    }).then((data)=>{
      console.log(data);
      return res.status(200).send({
        message:"Venue fetched successfully",
        success: true,
        data: data
      });
     
    })
  },
  getVenueDetails: (req,res) =>{
    Venue.findOne({
      raw: true,
      where:{
        slug: req.body.slug
      }
    }).then((data)=>{
      if(
        data == null
        
      ){
        return res.status(200).send({
          message: "Venue not found",
          success: false
        });
      }
      return res.status(200).send({
        message: "Venue details fetched successfully",
        success: true,
        data: data
      });
    }).catch((err)=>{
      return re.status(401).send({
        message:"Something went wrong",
        success: false
      });
    })
  },
  listBooking: (req,res)=>{
    Booking.findAll({
      raw:true,
      include:[{
        model: Venue
      },{
        model: User
      }
    ]

    }).then((data)=>{
      return res.status(200).send({
        message: "Booking details fetched successfully",
        success: true,
        data: data
      });
    }).catch((err)=>{
      return res.status(401).send({
        message: "Something went wrong",
        success: false,
      });
    })
  },
  editVenue: async (req, res) => {
    const { id } = req.params;
    const { name, address, type, status, ownerId } = req.body;
    let imageUrl;
  
    // Handle file upload if a new image is provided
    if (req.file) {
      const imagePath = req.file.path;
      imageUrl = `${req.protocol}://${req.get('host')}/${imagePath}`;
    }
  
    try {
      // Find the venue by ID
      const venue = await Venue.findByPk(id);
      if (!venue) {
        return res.status(404).send({
          message: 'Venue not found',
          success: false,
        });
      }
  
      // Update the venue details
      await Venue.update(
        {
          name,
          address,
          type,
          status,
          ownerId,
          image: imageUrl || venue.image, // Use new image URL if provided, otherwise keep the old one
        },
        { where: { id } }
      );
  
      return res.status(200).send({
        message: 'Venue updated successfully',
        success: true,
      });
    } catch (error) {
      console.error('Error updating venue:', error);
      return res.status(500).send({
        message: 'Something went wrong',
        success: false,
      });
    }
  },
  deleteVenue:async (req, res) => {
    const { slug } = req.params;
  
    try {
      // Find the venue by slug
      const venue = await Venue.findOne({ where: { slug } });
      if (!venue) {
        return res.status(404).send({
          message: 'Venue not found',
          success: false,
        });
      }
  
      // Delete the venue
      await Venue.destroy({ where: { slug } });
  
      return res.status(200).send({
        message: 'Venue deleted successfully',
        success: true,
      });
    } catch (error) {
      console.error('Error deleting venue:', error);
      return res.status(500).send({
        message: 'Something went wrong',
        success: false,
      });
    }
  }
};
module.exports = adminController;
