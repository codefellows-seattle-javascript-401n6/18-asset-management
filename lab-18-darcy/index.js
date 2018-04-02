'use strict';

require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;

const router = require('./routes/router.js');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const app = express();
app.use(express.static('static'));
app.use('/api', router);

const server = app.listen(PORT, () => {
  console.log('Listening on http://localhost: ' + PORT);
});
server.isRunning = true;

