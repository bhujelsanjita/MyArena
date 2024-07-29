const express = require("express");
const userRouter = require("./user");
const adminRouter = require("./admin");
const router = express.Router();

router.get("/",(req,res)=>{
    return res.send(`<h1>This is homepage</h1>`);
})
router.use("/admin",adminRouter);
router.use("/user",userRouter);
module.exports = router;