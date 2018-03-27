'use strict';

const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});

const router = new express.Router();

router.post('/upload', upload.single('polaroid'), (req, res) => {
    console.log('GOT', req.file);
    res.send(req.file);
  });

module.exports = router;