const mongoose = require("mongoose")
const validator = require("validator")

mongoose.connect(process.env.connection-string)