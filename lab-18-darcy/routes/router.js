'use strict';

const express = require('express');
const router = express.Router();

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');
const fs = require('fs');

const Photo = require('../models/photo.js');

router.get('/photos', (req, res) => {
  Photo.find()
    .then(results => {
      res.send(results);
    })
    .catch((err) => {
      res.sendStatus(err.message);
    });
});

router.get('/photos/:_id', (req, res) => {
  Photo.findById(req.params._id)
    .then(results => {
      res.send(results);
    })
    .catch((err) => {
      res.sendStatus(err.message);
    });
});

router.post('/photos', upload.single('photo'), (req, res) => {
  console.log('inside POST route:');
  let ext = path.extname(req.file.originalname);
  let params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_BUCKET,
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path)
  };

  s3.upload(params, (err, s3Data) => {
    console.log('s3', s3Data);
    if(err) {
      console.log('err', err);
      res.send(err);
    } 
    Photo.create({ 
      Name: req.file.originalname,
      URL: s3Data.Location 
    })
      .then(results => {
        console.log('results', results);
        res.send(results);
      })
      .catch((err) => {
        res.sendStatus(err.message);
      });
  });
});

module.exports = router;
