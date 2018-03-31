'use strict'
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: String,
    description: String,
    url: String,
});
const Upload = mongoose.model('Upload', photoSchema);

module.exports = Upload;