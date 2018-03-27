'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.static('static'));

const photosRouter = require('./routers/photos.js');
app.use('/photos', photosRouter);

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen(process.env.PORT, () => {
    console.log(`Lisening on port: ${process.env.PORT} Use CTRL+C to close.`);
});