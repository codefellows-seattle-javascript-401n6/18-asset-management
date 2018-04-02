'use strict';

require('dotenv').config();
const express = require('express');
const router = require('./routes/route');

const app = express();

app.use(express.static('./public'));
app.use('/photos', router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`i am groot on port ${PORT}`);
});