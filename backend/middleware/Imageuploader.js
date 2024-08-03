const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,"./uploads/");
    },
    filename: function(req,file,cb){
        return cb(null,`${(Date.now())}-${file.originalname}`);

    }

})
const uploads = multer({
    storage: storage,
    limits: {
        fileSize: 5*1024*1024,
        fileFilter: function(req,file,cb){
            if(
                file.mimetype == "image/jpeg" ||
                file.mimetype == "image/jpg" ||
                file.mimetype == "image/png" ||
                file.mimetype == "image/webp" 
            ){
                return cb(null,true);
            }
            else{
                return cb("Unsupported file",false);
            }
        }
    }
})
module.exports = uploads;