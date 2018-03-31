'use strict';

const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
    title: String,
    date: {type: Date, default: Date.now},
    content: String,
    imageUrl: String
});

const Picture = mongoose.model('Picture', pictureSchema);

module.exports = Picture;