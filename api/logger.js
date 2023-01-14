const  { createLogger, format, transports } = require ('winston') 
const { DataDog } = require('winston-datadog-logger');

// // configure the DataDog transport
// const options = {
//     apiKey: 'your_datadog_api_key',
//     appKey: 'your_datadog_app_key',
//     host: 'your_datadog_host'
// };
// const logger = new Winston.Logger({
//     transports: [new DataDog(options)]
// });


const logger = createLogger({
    level: 'info',
    exitOnError: false,
    format: format.combine(
        format.timestamp(),
        format.json(),
    ),
    transports: [
      new transports.File({ filename: './logs/logs.log' }),
      new transports.Console(),
    ],
});

module.exports = {logger}