const categoryModel = require("../database/models/category.model")
const {requestCounter} = require('../../metrics')
const {logger} = require('../../logger')

class Category{
    static getAllCategories = async(req, res)=>{
        try {
            requestCounter.inc({'route': '/category', 'path': '', 'status': 200, 'method': 'get'})
            const data = await categoryModel.find()
            res.status(200).send({apiStatus: true, message: "all categories fetched", data})

            logger.info(`GET all categories`,{ client_ip: req.ip, request_id: req.requestId, route: '/category'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/category', 'path': '','status': 400, 'method': 'get'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
            logger.error(`Error while getting categories`,{ client_ip: req.ip, request_id: req.requestId, route: '/category'});
        }    
    }
    static addCategory = async(req, res)=>{
        try {
            requestCounter.inc({'route': '/category', 'path': '/add','status': 200, 'method': 'post'})
            let data;
            if(req.file){
                let categoryImg = req.file.filename
                data = new categoryModel({categoryImg, ...req.body})
            }
            else{
                data = new categoryModel(req.body)
            }
            console.log(data)
            await data.save()
            res.status(200).send({apiStatus: true, message: "New category added", data})
            logger.info(`add a category`,{ client_ip: req.ip, request_id: req.requestId, route: '/category'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/category', 'path': '/add','status': 400, 'method': 'post'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
            logger.error(`Error while adding categories`,{ client_ip: req.ip, request_id: req.requestId, route: '/category'});
        }    
    }
    static singleCategory = async(req, res)=>{
        try {
            requestCounter.inc({'route': '/category', 'path': '/single/:id','status': 200, 'method': 'get'})
            const data = await categoryModel.findById(req.params.id)
            res.status(200).send({apiStatus: true, message: "Single category fetched", data})
            logger.info(`get a category`,{ client_ip: req.ip, request_id: req.requestId, route: '/category'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/category', 'path': '/single/:id','status': 400, 'method': 'get'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
            logger.error(`Error while getting categories`,{ client_ip: req.ip, request_id: req.requestId, route: '/category'});
        }
    }
    static delCategory = async(req, res)=>{
        try {
            requestCounter.inc({'route': '/category', 'path': '/single/:id','status': 200, 'method': 'delete'})
            const data = await categoryModel.findByIdAndDelete(req.params.id)
            res.status(200).send({apiStatus: true, message: "Category deleted", data})
            logger.info(`delete a category`,{ client_ip: req.ip, request_id: req.requestId, route: '/category'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/category', 'path': '/single/:id','status': 400, 'method': 'delete'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
            logger.error(`Error while deleting categories`,{ client_ip: req.ip, request_id: req.requestId, route: '/category'});
        }
    }
    static editCategory = async(req, res)=>{
        try {
            requestCounter.inc({'route': '/category', 'path': '/single/:id','status': 200, 'method': 'patch'})
            await categoryModel.findByIdAndUpdate(req.params.id, req.body, {runValidators:true})
            const data = await categoryModel.findById(req.params.id)
            res.status(200).send({apiStatus: true, message: "Category updated", data})
            logger.info(`edit a category`,{ client_ip: req.ip, request_id: req.requestId, route: '/category'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/category', 'path': '/single/:id','status': 400, 'method': 'patch'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
            logger.error(`Error while editing categories`,{ client_ip: req.ip, request_id: req.requestId, route: '/category'});
        }
    }
    static categoryProducts = async(req,res)=>{
        try {
            requestCounter.inc({'route': '/category', 'path': '/products/:id','status': 200, 'method': 'get'})
            const category = await categoryModel.findById(req.params.id)
            const data = await category.populate("products")
            res.status(200).send({apiStatus: true, message: "Products fetched", data: data.products})
            logger.info(`fetching products`,{ client_ip: req.ip, request_id: req.requestId, route: '/category'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/category', 'path': '/products/:id','status': 400, 'method': 'get'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
            logger.error(`Error while fetching products`,{ client_ip: req.ip, request_id: req.requestId, route: '/category'});
        }
    }    
    static uploadImg = async(req, res)=>{
        try {
            requestCounter.inc({'route': '/category', 'path': '/categoryImg/:id','status': 200, 'method': 'post'})
            let categoryImg = req.file.filename
            await categoryModel.findByIdAndUpdate(
                req.params.id,
                { categoryImg },
            )
            const data = await categoryModel.findById(req.params.id)
            res.status(200).send({apiStatus: true, message: "Image uploaded", data})
            logger.info(`Uploading image`,{ client_ip: req.ip, request_id: req.requestId, route: '/category'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/category', 'path': '/categoryImg/:id','status': 400, 'method': 'post'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
            logger.error(`Error while uploading image`,{ client_ip: req.ip, request_id: req.requestId, route: '/category'});
        }
    }
}

module.exports = Category