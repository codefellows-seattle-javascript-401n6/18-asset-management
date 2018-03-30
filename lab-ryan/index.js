'use strict';

require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.static('static'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const pictureRouter = require('./routes/photos.js');
app.use('/api/pictures', pictureRouter);

app.get('/', (req, res) => { 
    res.sendFile('index.html');
});

app.listen(process.env.PORT, () => {
    console.log(`listening on http://localhost:${process.env.PORT}`);
});
