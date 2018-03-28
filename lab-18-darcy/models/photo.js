'use strict';

const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  Name: String,
  URL: String
});

const Photo = new mongoose.Model('Photo', photoSchema);
module.exports = Photo;
