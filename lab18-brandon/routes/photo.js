'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

router.post('/', upload.single('photo'), function (req, res) {
  let ext = path.extname(req.file.originalname);
  let params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_BUCKET,
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path)
  };
    
  s3.upload(params, (err, s3Data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.send(s3Data);
    }
  });
});

module.exports = router;