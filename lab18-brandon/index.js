'use strict';
require('dotenv').config();

const express = require('express');
const multer = require('multer');
const PORT = process.env.PORT;
const photoRouter = require('./routes/photo.js');

const app = express();

app.use(express.static('static'));
app.use('/api/photos', photoRouter);

const server = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});