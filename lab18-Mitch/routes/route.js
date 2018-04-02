'use strict';

const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const s3 = new AWS.S3()

const fs = require('fs')
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });

const Image = require('../models/images.js');

router.route('/upload')
  .post(upload.single('image'), (req, res, next) => {
    let ext = path.extname(req.file.originalname);
    let params = {
      ACL: 'public-read',
      Bucket: process.env.AWS_BUCKET,
      Key: `${req.file.filename}${ext}`,
      Body: fs.createReadStream(req.file.path)
    };
    s3.upload(params, (err, s3Data) => {
      if (err) {
        res.send(err);
      }
      Image.create({ url: s3Data.Location })
        .then(image => {
          res.send(image);
        })
        .catch(err => res.send(err.message))
    });
  });

router.route('/uploads')
  .get((req, res) => {
    Image.find()
      .then(images => {
        res.send(images);
      })
      .catch(err => res.send(err.message));
  });

router.route('/upload/:_id')
  .delete((req, res) => {
    Image.findByIdAndRemove(req.params._id)
      .then(image => {
        let imageUrl = image.url.split('/').slice(-1)[0];
        let params = {
          Bucket: process.env.AWS_BUCKET,
          key: imageURL
        };
        s3.deleteObject(params, (err, data) => {
          if (err) {
            console.log(err);
          }
          res.status(204).send('Image successfully deleted.' + data);
        });
      })
      .catch(err => res.send(err.message));
  });

module.exports = router;