'use strict';

require('dotenv').config;

const superagent = require('superagent');

describe('uploads', () => {

  function seed() {
    let imageLocation = './data/s-l300.jpg';
    let uploadUrl = 'http://localhost:3000/api/posts/upload';
    superagent.post(uploadUrl)
      .attach('picture', imageLocation)
      .end((error, response) => {
        let amazonUrl = process.env.AWS_BUCKET + 's3-us-west-2.amazonaws.com';
        let isAmazonUrl = response.body.imageUrl.includes(amazonUrl);
        expect(isAmazonUrl).toBe(true);
        expect(response.status).toBe(200);
      });
  };

  it ('should return 200 when correctly uploading an image', () => {
    let imageLocation = './data/s-l300.jpg';
    let uploadUrl = 'http://localhost:3000/api/posts/upload';
    superagent.post(uploadUrl)
      .attach('picture', imageLocation)
      .end((error, response) => {
        let amazonUrl = process.env.AWS_BUCKET + 's3-us-west-2.amazonaws.com';
        let isAmazonUrl = response.body.imageUrl.includes(amazonUrl);
        expect(isAmazonUrl).toBe(true);
        expect(response.status).toBe(200);
      });
  });

  it ('should return 200 on GET requests', () => {
    seed();
    let restUrl = 'http://localhost:3000/api/posts';
    superagent().get(restUrl)
      .end((error, response) => {
        expect(response.status).toBe(200);
      });
  });


});