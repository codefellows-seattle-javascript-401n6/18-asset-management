'use strict'

require('dotenv').config();
const express = require('express');
const router = require('./routes/route.js');

const app = express();

app.use(express.status('./public'));
app.use('/images', router);

const port = process.env.PORT;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});