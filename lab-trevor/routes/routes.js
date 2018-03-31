'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const express = require('express');
const router = new express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

// router.get('/', (req, res) => {
  
// });

router.post('/upload', upload.single('picture'), (req, res) => {
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