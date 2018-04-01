'use strict';
const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const router = require('./routes/routes');

mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.send('index.html');
});

app.use('/api', router);


app.listen(process.env.PORT, () => {
  console.log('listening on ' + process.env.PORT);  
});
