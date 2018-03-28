'use strict';
require('dotenv').config();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI); 

const express = require('express');
const app = express();
app.use(express.static('lib'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// const router = require('./route/photos.js');
// app.use('/api/photos', router);

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.post('/', upload.single('picture'), (req, res) => {
  console.log('GOT', req.file);
  res.send(req.file);
});

app.listen(process.env.PORT, () => {
  console.log('http://localhost:' + process.env.PORT);
});

// PHASE 1: upload to my computer/server
// PHASE 2: upload to AWS
