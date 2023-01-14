const productModel = require("../database/models/product.model")
const categoryModel = require("../database/models/category.model")
const {requestCounter, number_products_per_category} = require('../../metrics')
const {logger} = require('../../logger')

class Product{
    static getAllProducts = async(req, res)=>{ //localhost:3000/product/
        try {
            requestCounter.inc({'route': '/product', 'path':'', 'status': 200, 'method': 'get'})
            const data = await productModel
            .find()
            .populate('categoryId')
            res.status(200).send({apiStatus: true, message: "all products fetched", data})
            logger.info(`get all products`,{ client_ip: req.ip, request_id: req.requestId, route: '/product'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/product', 'path':'', 'status': 400, 'method': 'get'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
            logger.error(`error while getting all products`,{ client_ip: req.ip, request_id: req.requestId, route: '/product'});
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
            logger.info(`add a product`,{ client_ip: req.ip, request_id: req.requestId, route: '/product'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/product', 'path':'/add', 'status': 400, 'method': 'post'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
            logger.error(`error while adding a product`,{ client_ip: req.ip, request_id: req.requestId, route: '/product'});

        }
    }
    static singleProduct = async(req, res)=>{
        try {
            requestCounter.inc({'route': '/product', 'path':'/single/:id', 'status': 200, 'method': 'get'})
            const data = await productModel.findById(req.params.id).populate("categoryId")
            res.status(200).send({apiStatus: true, message: "single Product", data})
            logger.info(`get a product`,{ client_ip: req.ip, request_id: req.requestId, route: '/product'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/product', 'path':'/single/:id', 'status': 400, 'method': 'get'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
            logger.error(`error while getting a product`,{ client_ip: req.ip, request_id: req.requestId, route: '/product'});
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
            logger.info(`edit a product`,{ client_ip: req.ip, request_id: req.requestId, route: '/product'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/product', 'path':'/single/:id', 'status': 400, 'method': 'patch'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
            logger.error(`error while editing a product`,{ client_ip: req.ip, request_id: req.requestId, route: '/product'});
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
            logger.info(`Delete a product`,{ client_ip: req.ip, request_id: req.requestId, route: '/product'});
        } 
        catch (e) {
            logger.error(`error while deleting a product`,{ client_ip: req.ip, request_id: req.requestId, route: '/product'});
            requestCounter.inc({'route': '/product', 'path':'/single/:id', 'status': 400, 'method': 'delete'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
        }
    }
    static getMyProducts = async(req,res)=>{
        try {
            requestCounter.inc({'route': '/product', 'path':'/myproducts', 'status': 200, 'method': 'get'})
            const data = await productModel.find({userId:req.user._id}).populate("categoryId")
            res.status(200).send({apiStatus: true, message: "My products fetched", data})
            logger.info(`Get my products`,{ client_ip: req.ip, request_id: req.requestId, route: '/product'});
        } 
        catch (e) {
            logger.error(`error while getting my products`,{ client_ip: req.ip, request_id: req.requestId, route: '/product'});
            requestCounter.inc({'route': '/product', 'path':'/myproducts', 'status': 400, 'method': 'get'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
        }

    }    
    static myProducts = async(req,res)=>{
        try {
            requestCounter.inc({'route': '/product', 'path':'/myproducts', 'status': 200, 'method': 'get'})
            await req.user.populate("myProducts")
            res.status(200).send({apiStatus: true, message: "My products fetched", data: req.user.myProducts})
            logger.info(`get my product`,{ client_ip: req.ip, request_id: req.requestId, route: '/product'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/product', 'path':'/myproducts', 'status': 400, 'method': 'get'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
            logger.error(`error while getting my products`,{ client_ip: req.ip, request_id: req.requestId, route: '/product'});
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
            logger.info(`Image uploaded successfully`,{ client_ip: req.ip, request_id: req.requestId, route: '/product'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/product', 'path':'/productImg/:id', 'status': 400, 'method': 'post'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
            logger.error(`Uploading image failed`,{ client_ip: req.ip, request_id: req.requestId, route: '/product'});
        }
    }
}

module.exports = Product