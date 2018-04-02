'use strict';

const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  Name: String,
  URL: String
});

// console.log('photoSchema= ', photoSchema);

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
