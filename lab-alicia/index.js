'use strict';
require('dotenv').config();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI); 

const express = require('express');
const app = express();
app.use(express.static('lib'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const router = require('./route/photos.js');
app.use('/api', router);

app.listen(process.env.PORT, () => {
  console.log('http://localhost:' + process.env.PORT);
});
