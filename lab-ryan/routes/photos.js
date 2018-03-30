'use strict';

require('dotenv').config();
const fs = require('fs');

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const express = require('express');
const router = express.Router();

const path = require('path');

const multer = require('multer');
const upload = multer({ dest: 'uploads/'});

const Picture = require('../models/pictures.js')

router.get('/', (req, res) => {
    if(req.query.id){
        Post.findOne({_id: req.query.id}, (err, Picture) => {
           res.send(picture);
        });
    } else {
        Picture.find()
        .then(picture => {
            res.send(picture);
        });
    }
    // Picture.find({})
    // .then((pic) => {
    //     res.send(pic);
    // });
});

router.post('/upload', upload.single('picture'), function (req, res, next) {
   console.log(req.file);

   let ext = path.extname(req.file.originalname);

   let params = {
       // access control list
       ACL: 'public-read',
       Bucket: process.env.AWS_BUCKET,
       Key: req.file.originalname,
       Body: fs.createReadStream(req.file.path)
   };
   s3.upload(params, (err, s3Data) => {
       let pic = new Picture({
           title: req.body.title,
           content: req.body.content,
           imageUrl: s3Data.Location
       });
       pic.save()
       .then((pic) => {
           res.send(pic);
       });
   });                                                                                                                                          
});

module.exports = router;