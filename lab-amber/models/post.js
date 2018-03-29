'use strict';

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  date: {type: Date, default: Date.now},
  content: String,
  imageUrl: String
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;