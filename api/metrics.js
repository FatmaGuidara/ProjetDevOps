const client = require('prom-client');

const register = new client.Registry();
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register });

const requestCounter = new client.Counter({
    name: 'requests_total',
    help: 'The total number of requests handled by the server',
    labelNames: ['route', 'path','status','method']
});

const number_products_per_category = new client.Gauge({
    name: 'number_products_per_category',
    help: 'Total number of products per category',
    labelNames: ['category']
  });

module.exports = {requestCounter, number_products_per_category}