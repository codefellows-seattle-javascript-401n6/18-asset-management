'use strict';
require('dotenv').config();
const express = require('express');
const router = new express.Router();
const fs = require('fs');
const FileUpload = require('../models/photoSchema')

const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const AWS = require('aws-sdk');
const s3 = new AWS.S3()

//GET ROUTE
router.get('/', (req, res) => {
    if (req.query.id) {
        FileUpload.findOne({_id: req.query.id}, (err, data) => {
            res.send(data);
        })
      } else{
        FileUpload.find()
            .then(data => {
                res.send(data);
        });
    };
});


//POST ROUTE
router.post('/upload', upload.single('information'), (req, res, next) => {
    let params = {
        ACL: 'public-read',
        Key: req.file.originalname,
        Bucket: process.env.AWS_BUCKET,
        Body: fs.createReadStream(req.file.path)
    }

    s3.upload(params, (err, s3Data) => {
        let fileUpload = new FileUpload({ 
            name: req.body.name,
            description: req.body.description,
            url: req.body.url 
        })
        fileUpload.save()
        .then(s3Data => {
            res.send(s3Data);
        });
    });
});


module.exports = router;