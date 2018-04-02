
'use strict';
require('dotenv').config();

//express
const express = require('express');
const app = express();
app.use(express.static('static'));

//multer
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

//mongoose connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const photoRouter = require('./router/photoRoute');
app.use('/photos', photoRouter);

//html connection
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(process.env.PORT, () => {
  console.log('http://localhost:' + process.env.PORT);
});