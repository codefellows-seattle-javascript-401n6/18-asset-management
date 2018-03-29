'use strict';

const fs = require('fs');
// Creates .env file with defaults if it does not exist.
let env = '.env';
if (!fs.existsSync(env)) {
  console.log('.env does not exist! Creating it.');
  fs.writeFileSync('.env', fs.readFileSync('.env.tmp'));
};

require('dotenv').config();
require('mongoose').connect(process.env.MONGODB_URI);

const express = require('express');
const app = express();
app.use(express.static('static'));

const photosRouter = require('./routers/photos.js');
app.use('/api', photosRouter);

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(process.env.PORT, () => {
  console.log(`Lisening on port: ${process.env.PORT} Use CTRL+C to close.`);
});