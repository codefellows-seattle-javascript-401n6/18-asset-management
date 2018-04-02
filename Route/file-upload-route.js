'use strict';

const express = require('express');
const router = new express.Router();

const multer = require('multer');
const upload = multer({dest:'uploads/'});

router.post('/upload', upload.single('picture'), function(req, res, next){
  res.send(req.file);
});

module.exports = router; 