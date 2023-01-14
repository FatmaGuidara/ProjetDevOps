const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    categoryImg:{
        type: String,
        default: "defaultProduct.png"
    },
})

// relation with products model with categoryId
categorySchema.virtual("products", {
    ref: "Product", // name of the related model
    localField: "_id",
    foreignField: "categoryId"
})

const Category = mongoose.model("Category", categorySchema)
module.exports = Category