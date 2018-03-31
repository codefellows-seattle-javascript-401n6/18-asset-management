
'use strict';
require('dotenv').config();

//mongoose connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

//express
const express = require('express');
const app = express();
app.use(express.static('static'));

//html connection
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(process.env.PORT, () => {
  console.log('http://localhost:' + process.env.PORT);
});