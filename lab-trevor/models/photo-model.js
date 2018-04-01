'use strict';



const mongoose = require('mongoose');

module.exports = mongoose.model('picture', new mongoose.Schema({
  url: String,
}));