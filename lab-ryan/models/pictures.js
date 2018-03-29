'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model('Picture', new mongoose.Schema({
    url: String,
}));