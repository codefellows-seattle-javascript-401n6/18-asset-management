'use strict';

const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');

const Picture = require('../models/pictures.js');

const router = new express.Router();

router.get('/', (req, res) => {
  if (req.query.id) {
    Picture.findOne({_id: req.query.id}, (err, pic) => {
      res.send(pic);
    });
  } else {
    Picture.find()
      .then(pics => {
        res.send(pics);
      });
  }
});

router.post('/', upload.single('picture'), function (req, res) {
  let ext = path.extname(req.file.originalname);
  let params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_BUCKET,
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path)
  };
  s3.upload(params, (err, s3Data) => {
    let pic = new Picture({url: s3Data.Location});
    pic.save()
      .then((pic) => {
        res.send(pic);
      });
  });
});

module.exports = router;