'use strict';

require('dotenv').config();

require('mongoose').connect(process.env.MONGODB_URI);

const express = require('express'); 
const PORT = process.env.PORT;
const app = express();

app.use(express.static('static'));

const photosRouter = require('./routes/photos.js');
app.use('/api/photos', photosRouter);

app.get('/', (req, res) => { 
    res.sendFile('index.html');
});

app.listen(process.env.PORT, () => {
    console.log('http://localhost:' + process.env.PORT)
});
