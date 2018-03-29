'use strict';

const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});
const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const router = express.Router();

router.post('/', upload.single('picture'), function (req, res, next) {
   console.log(req.file);

   let ext = path.extname(req.file.originalname);

   let params = {
       // access control list
       ACL: 'public-read',
       Bucket: process.env.AWS_BUCKET,
       Key: `${req.file.filename}${ext}`,
       Body: fs.createReadStream(req.file.path)
   }

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

// router.post('/', express.urlencoded({extended: true}), (req, res) => {
//     res.send('body' + req.body);
// });

module.exports = router;