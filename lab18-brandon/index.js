'use strict';
require('dotenv').config();

require('mongoose').connect(process.env.MONGODB_URI);

const express = require('express');
const PORT = process.env.PORT;

const app = express();
app.use(express.static('static'));

const photoRouter = require('./routes/photo.js');
app.use('/api/photos', photoRouter);

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

const server = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});