'use strict';

const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const express = require('express');
const multer = require('multer');
const uploads = multer({dest: 'uploads/'});

const router = require();

const router = new express.Router();