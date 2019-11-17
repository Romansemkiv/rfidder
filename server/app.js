const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require("./api/routes")
const broker = require("./Broker.js");

mongoose.connect(require('./keys').database);

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.disable('etag');

app.use('/api', apiRoutes);

module.exports =  app;