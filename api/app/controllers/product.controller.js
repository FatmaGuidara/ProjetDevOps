const productModel = require("../database/models/product.model")
const categoryModel = require("../database/models/category.model")
const {requestCounter, number_products_per_category} = require('../../metrics')


class Product{
    static getAllProducts = async(req, res)=>{ //localhost:3000/product/
        try {
            requestCounter.inc({'route': '/product', 'path':'', 'status': 200, 'method': 'get'})
            const data = await productModel
            .find()
            .populate('categoryId')
            res.status(200).send({apiStatus: true, message: "all products fetched", data})
        } 
        catch (e) {
            requestCounter.inc({'route': '/product', 'path':'', 'status': 400, 'method': 'get'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
        }
    }
    static addProduct = async(req, res)=>{
        try {
            requestCounter.inc({'route': '/product', 'path':'/add', 'status': 200, 'method': 'post'})
            const productData = new productModel({
                userId: req.user._id,
                ...req.body
            })
            
            await productData.save()
            res.status(200).send({apiStatus: true, message: "product added", data: productData})
            number_products_per_category.inc({ 'category': `${req.body.categoryId.name}` })
        } 
        catch (e) {
            requestCounter.inc({'route': '/product', 'path':'/add', 'status': 400, 'method': 'post'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
        }
    }
    static singleProduct = async(req, res)=>{
        try {
            requestCounter.inc({'route': '/product', 'path':'/single/:id', 'status': 200, 'method': 'get'})
            const data = await productModel.findById(req.params.id).populate("categoryId")
            res.status(200).send({apiStatus: true, message: "single Product", data})
        } 
        catch (e) {
            requestCounter.inc({'route': '/product', 'path':'/single/:id', 'status': 400, 'method': 'get'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
        }
    }
    static editProduct = async(req, res)=>{
        try {
            requestCounter.inc({'route': '/product', 'path':'/single/:id', 'status': 200, 'method': 'patch'})
            await productModel.findByIdAndUpdate(
                req.params.id,
                req.body, 
                {runValidator:true})
            const data = await productModel.findById(req.params.id).populate("categoryId")
            res.status(200).send({apiStatus: true, message: "Product edited", data})
        } 
        catch (e) {
            requestCounter.inc({'route': '/product', 'path':'/single/:id', 'status': 400, 'method': 'patch'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
        }
    }
    static delProduct = async(req, res)=>{
        try {
            requestCounter.inc({'route': '/product', 'path':'/single/:id', 'status': 200, 'method': 'delete'})
            const product = await productModel.findById(req.params.id)
            const category = await categoryModel.findById(product.categoryId)
            const data = await productModel.findByIdAndDelete(req.params.id)
            res.status(200).send({apiStatus: true, message: "Product deleted", data})
            number_products_per_category.dec({ 'category': `${category.name}`})
        } 
        catch (e) {
            requestCounter.inc({'route': '/product', 'path':'/single/:id', 'status': 400, 'method': 'delete'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
        }
    }
    static getMyProducts = async(req,res)=>{
        try {
            requestCounter.inc({'route': '/product', 'path':'/myproducts', 'status': 200, 'method': 'get'})
            const data = await productModel.find({userId:req.user._id}).populate("categoryId")
            res.status(200).send({apiStatus: true, message: "My products fetched", data})
        } 
        catch (e) {
            requestCounter.inc({'route': '/product', 'path':'/myproducts', 'status': 400, 'method': 'get'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
        }

    }    
    static myProducts = async(req,res)=>{
        try {
            requestCounter.inc({'route': '/product', 'path':'/myproducts', 'status': 200, 'method': 'get'})
            await req.user.populate("myProducts")
            res.status(200).send({apiStatus: true, message: "My products fetched", data: req.user.myProducts})
        } 
        catch (e) {
            requestCounter.inc({'route': '/product', 'path':'/myproducts', 'status': 400, 'method': 'get'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
        }

    }    
    static uploadImg = async(req, res)=>{
        try {
            requestCounter.inc({'route': '/product', 'path':'/productImg/:id', 'status': 200, 'method': 'post'})
            let productImg = req.file.filename
            await productModel.findByIdAndUpdate(
                req.params.id,
                { productImg },
            )
            const data = await productModel.findById(req.params.id).populate("categoryId")
            res.status(200).send({apiStatus: true, message: "Image uploaded", data})
        } 
        catch (e) {
            requestCounter.inc({'route': '/product', 'path':'/productImg/:id', 'status': 400, 'method': 'post'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
        }
    }
}

module.exports = Product