
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const express = require('express');
const app = express();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging.js')();
require('./startup/config.js')();



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));