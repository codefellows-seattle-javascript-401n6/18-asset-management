'use strict';

const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const Polaroid = require('../models/polaroids.js');

const router = new express.Router();

router.get('/', (req, res) => {
  Polaroid.find({})
    .then((polas) => {
      res.send(polas);
    });
});

router.post('/upload', upload.single('polaroid'), (req, res) => {
  console.log('GOT', req.file);

  let ext = path.extname(req.file.originalname);
  let params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_BUCKET,
    Key: `${req.file.originalname}${ext}`,
    Body: fs.createReadStream(req.file.path)
  };

  console.log('uploading....');
  s3.upload(params, (err, s3Data) => {
    if(err) {
      console.error(err);
      res.setStatus(500);
    } else {
      res.send(s3Data);
      // create a photo model and store Location aka url
    };
    console.log('uploaded!');
    let pola = new Polaroid({ url: s3Data.Location });
    pola.save()
      .then((pola) => {
        console.log('saved', pola);
        res.send(pola);
      });
  });

});

// router.post('/', express.urlencoded({extended:true}), req, res) => {
//   res.send('body' + req.body);
// };

module.exports = router;