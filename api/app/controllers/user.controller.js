const userModel = require("../database/models/user.model")
const {requestCounter} = require('../../metrics')
const {logger} = require('../../logger')

class User{
    static getAllUsers = async(req, res)=>{ //localhost:3000/user/
        try {
            requestCounter.inc({'route': '/user', 'path': '/', 'status': 200, 'method': 'get'})            
            const data = await userModel.find()
            res.status(200).send({apiStatus: true, message: "all users fetched", data})
            logger.info(`get all users`,{ client_ip: req.ip, request_id: req.requestId, route: '/user'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/user', 'path': '/', 'status': 400, 'method': 'get'})
            res.status(500).send({apiStatus: false, message: e.message, data: e})
            logger.error(`Error while getting all users`,{ client_ip: req.ip, request_id: req.requestId, route: '/user'});
        }
    }
    static register = async(req, res)=>{
        try {
            requestCounter.inc({'route': '/user', 'path': '/register', 'status': 200, 'method': 'post'}) 
            const userData = new userModel(req.body)
            await userData.save()
            res.status(200).send({apiStatus: true, message: "user registered", data: userData})
            logger.info(`Add a user`,{ client_ip: req.ip, request_id: req.requestId, route: '/user'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/user', 'path': '/register', 'status': 400, 'method': 'post'}) 
            res.status(400).send({apiStatus: false, message: e.message, data: e})
            logger.error(`Error while registring`,{ client_ip: req.ip, request_id: req.requestId, route: '/user'});
        }
    }
    static singleUser = async(req, res)=>{
        try {
            requestCounter.inc({'route': '/user','path': '/single/:id', 'status': 200, 'method': 'get'}) 
            const data = await userModel.findById(req.params.id)
            res.status(200).send({apiStatus: true, message: "single user", data})            
            logger.info(`GET a user`,{ client_ip: req.ip, request_id: req.requestId, route: '/user'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/user', 'path': '/single/:id', 'status': 400, 'method': 'get'}) 
            res.status(500).send({apiStatus: false, message: e.message, data: e})

            logger.error(`Error while getting a user`,{ client_ip: req.ip, request_id: req.requestId, route: '/user'});
        }
    }
    static editUser = async(req, res)=>{
        try {
            requestCounter.inc({'route': '/user', 'path': '/single/:id', 'status': 200, 'method': 'patch'}) 
            const data = await userModel.findByIdAndUpdate(
                req.params.id,
                req.body, 
                {runValidator:true})
            res.status(200).send({apiStatus: true, message: "user edited", data})
            logger.info(`Edit a user`,{ client_ip: req.ip, request_id: req.requestId, route: '/user'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/user', 'path': '/single/:id', 'status': 400, 'method': 'patch'}) 
            res.status(500).send({apiStatus: false, message: e.message, data: e})
            logger.error(`Error while editing a user`,{ client_ip: req.ip, request_id: req.requestId, route: '/user'});
        }
    }
    static delUser = async(req, res)=>{
        try {
            requestCounter.inc({'route': '/user', 'path': '/single/:id', 'status': 200, 'method': 'delete'}) 
            const data = await userModel.findByIdAndDelete(req.params.id)
            res.status(200).send({apiStatus: true, message: "user deleted", data})
            logger.info(`Delete a user`,{ client_ip: req.ip, request_id: req.requestId, route: '/user'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/user', 'path': '/single/:id', 'status': 400, 'method': 'delete'}) 
            res.status(500).send({apiStatus: false, message: e.message, data: e})

            logger.error(`Error while deleting a user`,{ client_ip: req.ip, request_id: req.requestId, route: '/user'});
        }
    }
    static login = async(req, res)=>{
        try {
            requestCounter.inc({'route': '/user', 'path':'/login', 'status': 200, 'method': 'post'}) 
            const userData = await userModel.login(req.body.email, req.body.password)
            const token = await userData.generateToken()
            res.status(200).send({apiStatus: true, message: "user logged in", data: {userData, token}})
            logger.info(`login`,{ client_ip: req.ip, request_id: req.requestId, route: '/user'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/user', 'path':'/login', 'status': 400, 'method': 'post'}) 
            res.status(400).send({apiStatus: false, message: e.message, data: e})
            logger.error(`Error while loging in`,{ client_ip: req.ip, request_id: req.requestId, route: '/user'});
        }
    }
    static profile = async(req, res)=>{
        try {
            requestCounter.inc({'route': '/user', 'path': '/profile', 'status': 200, 'method': 'post'}) 
            res.status(200).send({apiStatus: true, message: "user profile", data: req.user})
            logger.info(`user's profile`,{ client_ip: req.ip, request_id: req.requestId, route: '/user'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/user', 'path': '/profile', 'status': 400, 'method': 'post'}) 
            res.status(500).send({apiStatus: false, message: e.message, data: e})
            logger.error(`Error while editing a profile`,{ client_ip: req.ip, request_id: req.requestId, route: '/user'});
        }
    }
    static logout = async(req, res)=>{
        try {
            requestCounter.inc({'route': '/user','path': '/logout', 'status': 200, 'method': 'post'}) 
            req.user.tokens = req.user.tokens.filter(t => t.token != req.token)
            await req.user.save()
            res.status(200).send({apiStatus: true, message: "user logged out", data:req.user})
            logger.info(`Logout`,{ client_ip: req.ip, request_id: req.requestId, route: '/user'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/user', 'path': '/logout', 'status': 400, 'method': 'post'}) 
            res.status(500).send({apiStatus: false, message: e.message, data: e})
            logger.error(`Error while logging out`,{ client_ip: req.ip, request_id: req.requestId, route: '/user'});
        }
    }
    static logoutAll = async(req, res)=>{
        try {
            requestCounter.inc({'route': '/user', 'path': '/logoutAll','status': 200, 'method': 'post'}) 
            req.user.tokens = []
            await req.user.save()
            res.status(200).send({apiStatus: true, message: "user logged out from all sessions", data: req.user})
            logger.info(`Logout from all sessions`,{ client_ip: req.ip, request_id: req.requestId, route: '/user'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/user', 'path': '/logoutAll','status': 400, 'method': 'post'}) 
            res.status(500).send({apiStatus: false, message: e.message, data: e})
            logger.error(`Error while logging out`,{ client_ip: req.ip, request_id: req.requestId, route: '/user'});
        }
    }
    static editMyProfile = async(req, res)=>{
        try {
            requestCounter.inc({'route': '/user', 'path': '/profile','status': 200, 'method': 'patch'}) 
            for(let prop in req.body){
                req.user[prop] = req.body[prop]
            }
            await req.user.save()
            res.status(200).send({apiStatus: true, message: "Profile edited", data: req.user})
            logger.info(`Edit a user`,{ client_ip: req.ip, request_id: req.requestId, route: '/user'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/user', 'path': '/profile','status': 400, 'method': 'patch'}) 
            res.status(500).send({apiStatus: false, message: e.message, data: e})
            logger.error(`Error while editing a user`,{ client_ip: req.ip, request_id: req.requestId, route: '/user'});
        }
    }

    static uploadImg = async(req, res)=>{
        try {
            requestCounter.inc({'route': '/user', 'path': '/imgUpload', 'status': 200, 'method': 'post'}) 
            req.user.userImg = req.file.filename
            await req.user.save()
            res.status(200).send({apiStatus: true, message: "Image uploaded", data: req.user})
            logger.info(`Upload an image`,{ client_ip: req.ip, request_id: req.requestId, route: '/user'});
        } 
        catch (e) {
            requestCounter.inc({'route': '/user', 'path': '/imgUpload', 'status': 400, 'method': 'post'}) 
            res.status(500).send({apiStatus: false, message: e.message, data: e})
            logger.error(`Error while uploading`,{ client_ip: req.ip, request_id: req.requestId, route: '/user'});
        }
    }
}

module.exports = User