require('dotenv').config()
const PORT = process.env.PORT || 3000
const app = require("./app/app")

// const client = require('prom-client');
// const register = new client.Registry();
// const collectDefaultMetrics = client.collectDefaultMetrics;
// collectDefaultMetrics({ register });

// // Counter of number of requests 
// const numberOfRequestsCounter = new client.Counter({
//     name: 'number_of_requests',
//     help: 'counts the number of requests that the fact endpoint recieved',
//     labelNames: ['status', 'route'],
// });
// register.registerMetric(numberOfRequestsCounter)


const client = require('prom-client');
const {requestCounter} = require('./metrics')

app.get('/metrics', async (req, res) => {
    try{
        return res.status(200).send(await client.register.metrics())
    }
    catch(err){

    }
})

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