'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const upload = multer({
  dest: './uploads/'
});

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const Photo = require('../models/photo.js');

const router = new express.Router();

router.route('/photos')
  .get((req, res) => {
    Photo.find()
      .then(photos => res.send(photos))
      .catch(err => res.send(err.message));
  });

router.route('/photo')
  .post(upload.single('photo'), (req, res, next) => {
    let ext = path.extname(req.file.originalname);
    console.log('ext:', ext);
    let params = {
      ACL: 'public-read',
      Bucket: process.env.AWS_BUCKET,
      Key: `${req.file.filename}${ext}`,
      Body: fs.createReadStream(req.file.path)
    };

    s3.upload(params, (err, s3Data) => {
      if (err) {
        res.status(500).send(err);
      }
      Photo.create({
        url: s3Data.Location
      })
        .then(photo => res.send(photo))
        .catch(err => res.send(err));
    });
  })

  .delete((req, res) => {
    Photo.findByIdAndRemove(req.params._id)
      .then(photo => {
        let imageUrl = photo.url.split('/').slice(-1)[0];
        let params = {
          Bucket: process.env.AWS_BUCKET,
          Key: imageUrl
        };
        s3.deleteMedia(params, (err, data) => {
          if (err) {
            res.send(err);
          }
          res.status(204).send('Image deleted!');
        });
      })
      .catch(err => res.send(err.message));
  });

module.exports = router;
