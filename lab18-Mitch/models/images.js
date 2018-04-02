'use strict';

const mongoose = require('mongoose');
mongoose.connect(precess.env.MONGODB_URI);

const imageSchema = new mongoose.Schema({
  url: {type: String, required: true}
}, {timestamps: {createdAt: 'created_at'}});

module.exports = mongoose.model('Image', imageSchema);