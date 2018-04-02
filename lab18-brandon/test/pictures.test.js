'use strict';

require('dotenv').config();

const superagent = require('superagent');
const Picture = require('../models/pictures.js');

// POST - /api/resource
// Test: POST - 200 - test that the upload worked and a resource object is returned
describe('S3 Uploads', () => {
  it('should be able to upload images', (done) => {
    let imageLocation = `${__dirname}/IMG_6068.jpg`;
    let uploadUrl = 'http://localhost:3000/api/photos';
  
    superagent.post(uploadUrl)
      .attach('picture', imageLocation)
      .end((err, res) => {
        let amazonUrl = process.env.AWS_BUCKET + '.s3.amazonaws.com';
        let isAmazonUrl = res.body.url.includes(amazonUrl);
        expect(isAmazonUrl).toBe(true);
        done();
      });
  });
});


// GET - /api/resource
// Test: GET - 200 - returns a list of all resources that have been uploaded


// GET - /api/resource?id
// Test: GET - 200 - returns info on one resource that's been uploaded