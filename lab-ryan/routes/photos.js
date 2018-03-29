'use strict';

const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});

const router = new express.Router();

router.post('/upload', upload.single('picture'), (req, res) => {
   console.log(req.file);

   let params = {
       // access control list
       ACL: 'public-read',
       Bucket: process.env.AWS_BUCKET,
       Key: req.file.origionalname,
       Body: fs.createReadStream(req.file.path)
   };

   console.log('uploading...');
   s3.upload(params, (err, s3Data) => {
       let pic = new Picture({url: s3Data.Location});
       pic.save()
       .then((pic) => {
           console.log('uploaded:', s3Data);
           res.send(pic);
       });
   });
});

module.exports = router;