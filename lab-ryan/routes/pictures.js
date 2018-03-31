'use strict';

require('dotenv').config();

const fs = require('fs');

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const express = require('express');
const router = new express.Router();

const path = require('path');

const multer = require('multer');
const upload = multer({ dest: 'uploads/'});

const Picture = require('../models/picture.js')

router.get('/', (req, res) => {
    if(req.query.id){
        Picture.findOne({_id: req.query.id}, (err, picture) => {
            res.send(picture);
        });
    } else {
        Picture.find()
        .then(picture => {
            res.send(picture);
        });
    }
});

router.post('/upload', upload.single('picture'), (req, res, next) => {
   console.log('GOT', req.file);
   let ext = path.extname(req.file.originalname);

   let params = {
       // access control list
       ACL: 'public-read',
       Bucket: process.env.AWS_BUCKET,
       Key: req.file.originalname,
       Body: fs.createReadStream(req.file.path)
   };
   console.log('uploading...');
   s3.upload(params, (err, s3Data) => {
       console.log('uploaded', s3Data);
       let pic = new Picture({
           title: req.body.title,
           content: req.body.content,
           imageUrl: s3Data.Location
       });
       pic.save()
       .then((pic) => {
           console.log('saved', pic);
           res.send(pic);
       });
   });                                                                                                                                          
});

module.exports = router;