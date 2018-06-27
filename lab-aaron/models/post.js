'use strict';

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  data: {type: new Date(), default: Date.now},
  content: String,
  imgeUrl: String,
});

const Post = mongoose.model('Post', postSchema);

module.exports Post;