const productModel = require("../database/models/product.model")

class Product{
    static getAllProducts = async(req, res)=>{ //localhost:3000/product/
        try {
            // const data = await productModel.find()
            const data = await productModel
            .find()
            .populate('categoryId')
            // console.log(data)
            res.status(200).send({apiStatus: true, message: "all products fetched", data})
        } 
        catch (e) {
            res.status(500).send({apiStatus: false, message: e.message, data: e})
        }
    }
    static addProduct = async(req, res)=>{
        try {
            const productData = new productModel({
                userId: req.user._id,
                ...req.body
            })
            await productData.save()
            res.status(200).send({apiStatus: true, message: "product added", data: productData})
        } 
        catch (e) {
            res.status(500).send({apiStatus: false, message: e.message, data: e})
        }
    }
    static singleProduct = async(req, res)=>{
        try {
            const data = await productModel.findById(req.params.id).populate("categoryId")
            res.status(200).send({apiStatus: true, message: "single Product", data})
        } 
        catch (e) {
            res.status(500).send({apiStatus: false, message: e.message, data: e})
        }
    }
    static editProduct = async(req, res)=>{
        try {
            await productModel.findByIdAndUpdate(
                req.params.id,
                req.body, 
                {runValidator:true})
            const data = await productModel.findById(req.params.id).populate("categoryId")
            res.status(200).send({apiStatus: true, message: "Product edited", data})
        } 
        catch (e) {
            res.status(500).send({apiStatus: false, message: e.message, data: e})
        }
    }
    static delProduct = async(req, res)=>{
        try {
            const data = await productModel.findByIdAndDelete(req.params.id)
            res.status(200).send({apiStatus: true, message: "Product deleted", data})
        } 
        catch (e) {
            res.status(500).send({apiStatus: false, message: e.message, data: e})
        }
    }
    static getMyProducts = async(req,res)=>{
        try {
            const data = await productModel.find({userId:req.user._id}).populate("categoryId")
            res.status(200).send({apiStatus: true, message: "My products fetched", data})
        } 
        catch (e) {
            res.status(500).send({apiStatus: false, message: e.message, data: e})
        }

    }    
    static myProducts = async(req,res)=>{
        try {
            await req.user.populate("myProducts")
            res.status(200).send({apiStatus: true, message: "My products fetched", data: req.user.myProducts})
        } 
        catch (e) {
            res.status(500).send({apiStatus: false, message: e.message, data: e})
        }

    }    
    static uploadImg = async(req, res)=>{
        try {
            let productImg = req.file.filename
            await productModel.findByIdAndUpdate(
                req.params.id,
                { productImg },
            )
            const data = await productModel.findById(req.params.id).populate("categoryId")
            res.status(200).send({apiStatus: true, message: "Image uploaded", data})
        } 
        catch (e) {
            res.status(500).send({apiStatus: false, message: e.message, data: e})
        }
    }
}

module.exports = Product