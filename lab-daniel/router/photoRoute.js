'use strict';
const express = require('express');
const router = new express.Router();
const fs = require('fs');

const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const AWS = require('aws-sdk');
const s3 = new AWS.S3()

router.post('/upload', upload.single('information'), (req, res, next) => {
    let params = {
        ACL: 'public-read',
        Bucket: process.env.AWS_BUCKET,
        Key: req.file.originalname,
        Body: fs.createReadStream(req.file.path)
    };

    console.log('uploding.....');
    s3.upload(params, (err, s3Data) => {
        console.log('uploaded!');
        res.send(s3Data);
    })
})


module.exports = router