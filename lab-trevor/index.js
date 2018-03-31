'use strict';
//server
//npm install express multer dotenv aws

const express = require('express');
require('dotenv').config();
const multer = require('multer');

const app = express();

app.use(express.static('static')); //where your index file is

app.get('/', (req, res) => {
  res.send('index.html');
});



app.listen(process.env.PORT, () => {
  console.log('listening on ' + process.env.PORT);  
});


//routes
const AWS = req('aws-sdk');
const s3 = new AWS.S3();

//const express = re
//const router = new express.Router();
//const multer
//const upload = multer({ dest: 'uploads/' });

router.get('/', (req, res) => {
  
})

router.post('/photos/upload', upload.single('picture'), (req, res) => {
  console.log('GOT', req.file);
  let params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_BUCKET,
    Key: req.file.originalname,
    Body: fs.createReadStream(req.file.path)
  };
  s3.upload(params, (err, s3Data) => {

    res.send(s3Data);
  });
});

module.exports = router;
//models
const mongoose

module.exports = mongoose.model('picture', new mongoose.Schema({
  url: String,
}));
//modules