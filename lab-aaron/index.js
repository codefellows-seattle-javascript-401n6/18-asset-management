'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
// const fs = require('fs');


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

// const songRoutes = require('./routes/song-route.js');
// app.use('/', songRoutes);
app.use(express.static('static'));

const postRouter = require('./routers/post.js');
app.use('/api/posts', postsRouter);

app.get('/', (request, response) => {
  response.sendFile('index.html');
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});