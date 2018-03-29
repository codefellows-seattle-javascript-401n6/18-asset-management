'use strict';

require('dotenv').config();

const fs = require('fs');

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const express = require('express');
const router = new express.Router();

const path = require('path');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const Post = require('../models/post.js');

router.get('/', (req, res) => {
  if (req.query.id) {
    Post.findOne({_id: req.query.id}, (err, post) => {
      res.send(post);
    });
  } else {
    Post.find()
      .then(posts => {
        res.send(posts);
      });
  }
});

router.post('/upload', upload.single('picture'), function (req, res, next) {
  let ext = path.extname(req.file.originalname);
  let params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_BUCKET,
    Key: req.file.originalname,
    Body: fs.createReadStream(req.file.path)
  };
  s3.upload(params, (err, s3Data) => {
    let post = new Post({
      title: req.body.title,
      content: req.body.content,
      imageUrl: s3Data.Location
    });
    post.save()
      .then(post => {
        res.send(post);
      });
  });
});

module.exports = router;