const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, callBack){
        callBack(null, "app/images")
    },
    filename: function(req, file, callBack){
        const myName = Date.now() + path.extname(file.originalname)
        callBack(null, myName)
    }
})

const upload = multer({
    storage,
    limits: {fileSize: 20000000} // validations
})

module.exports = upload