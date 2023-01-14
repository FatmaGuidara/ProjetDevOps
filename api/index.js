require('dotenv').config()
const PORT = process.env.PORT || 5000
const app = require("./app/app")
const uuid = require('uuid');

const client = require('prom-client');
const {requestCounter} = require('./metrics')

const {logger} = require('./logger')


app.get('/metrics', async (req, res) => {
    try{
        return res.status(200).send(await client.register.metrics())
    }
    catch(err){

    }
})


// middleware to log the user's IP address and request ID
app.use((req, res, next) => {
    logger.info(`server Checked`,{ client_ip: `${req.ip}`, request_id: uuid.v4(), route: '/'});
    next();
});


app.get('/', (req, res) => {
    try{
        requestCounter.inc({'route': '/', 'path': '', 'status': 200, 'method': 'get'})
        res.send('Server running');
    }catch(err){
        requestCounter.inc({'route': '/', 'path': '', 'status': 400, 'method': 'get'})
        return res.status(400).send({ "error": "Server cannot launch" })
    }
})



app.listen(PORT, ()=>console.log(`http://localhost:${PORT}`))   