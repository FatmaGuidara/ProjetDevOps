const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
require("./database/connect") //connect to database

app.use(express.json()) // deal with json data
app.use(express.urlencoded({extended:true})) // to read post form, deal with imgs

const staticDir = `${__dirname}/images`
app.use(express.static(staticDir))

const userRoutes = require("./routes/user.routes")
const productRoutes = require("./routes/product.routes")
const categoryRoutes = require("./routes/category.routes")
app.use("/user", userRoutes)
app.use("/product", productRoutes)
app.use("/category", categoryRoutes)

module.exports = app
