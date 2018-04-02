'use strict'
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: String,
    description: String,
    url: String
});
const FileUpload = mongoose.model('FileUpload', photoSchema);

module.exports = FileUpload;