'use strict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const app = express();
app.use(express.static('static'));

// app.get('/', (req, res) => {
//   res.sendFile('index.html');
// });

const server = app.listen(PORT, () => {
  console.log('Listening on http://localhost: ' + PORT);
});
