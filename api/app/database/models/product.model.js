const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true
    },
    desc:{
        type: String,
        required: true,
        trim: true,
    },
    price:{
        type: Number,
        required: true,
        // min: 100,
        // max: 1000,
        default: 150
    },
    productImg:{
        type: String,
        default: "defaultProduct.png"
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User" // relation to user model
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    },
},{
    timestamps: true
})

const Product = mongoose.model("Product", productSchema)
module.exports = Product