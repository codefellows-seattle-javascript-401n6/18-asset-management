'use strict';
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});
app.post('/photos/upload', upload.single('drawings'), (req, res) => {
  console.log('worked', req.file);
  res.send(req.file);
});


app.listen(process.env.PORT, () => {
  console.log('http://localhost:' + process.env.PORT);
});