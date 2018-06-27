'use strict';

require('dotenv').config();

const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.s3();
const express = require('express');
const router = new express.Router();
const path = require('path');
const multer = require('multer');
const upload = multer({
  dest: 'uploads/'
});
const Post = require('../models/post');

router.get('/', (request, response) => {
  if (request.query.id) {
    Post.findOne({
      id: request.query.id
    }, (error, post) => {
      response.send(post);
    });
  } else {
    Post.find()
      .then((posts) => {
        response.send(posts);
      });
  }
});

router.post('/upload', upload.single('picture'), function(request, response, next) {
  let ext = path.extname(request.file.originalname);
  let params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_BUCKET,
    Key: request.file.originalname,
    Body: fs.createReadStream(request.file.path),
  };
  s3.upload(params, (error, s3Data) => {
    let post = new Post({
      title: request.body.title,
      content: request.body.content,
      imageUrl: s3Data.Location,
    });
    post.save()
      .then((post) => {
        response.send(post);
      });
  });
});

module.exports = router;