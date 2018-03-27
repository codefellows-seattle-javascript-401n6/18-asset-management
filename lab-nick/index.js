'use strict';

require('dotenv').config();

const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});

const app = express();
app.use(express.static('static'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.post('/photos/upload', upload.single('polaroid'), (req, res) => {
  console.log('GOT', req.file);
  res.send(req.file);
});

app.listen(process.env.PORT, () => {
    console.log(`Lisening on port: ${process.env.PORT} Use CTRL+C to close.`);
});