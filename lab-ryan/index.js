'use strict';

const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const app = express();
app.use(express.static('static'));

const photosRouter = require('./router/photos.js');
app.use()

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.post('/photos/uploads', upload.single('picture'), (req, res) => {
    console.log('GOT', req.file);
    res.send(req.file);
});


app.listen(PORT, () => console.log('listening on: http://localhost', PORT));
