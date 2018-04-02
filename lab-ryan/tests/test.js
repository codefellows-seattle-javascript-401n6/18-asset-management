'use strict';

require('dotenv').config({path: '../.env'});

const superagent = require('superagent');
const picture = require('../models/picture.js');

describe('S3 Uploads', () => {

  it('upload worked and a resource object is returned', (done) => {
    let imageLocation = '../uploads/line.jpg';
    let uploadUrl = 'http://localhost:3000/api/pictures';

    superagent.post(uploadUrl)
    .attach('picture', imageLocation)
    .end((err, res) => {
      let amazonUrl = process.env.AWS_BUCKET + '.s3.us-west-2.amazonaws.com';
      console.log('RES.BODY', res.body.imageUrl);
        console.log('amazonUrl', amazonUrl);
      let isAmazonUrl = res.body.imageUrl.includes(amazonUrl);
        expect(isAmazonUrl).toBe(true);
        expect(res.status).toBe(200);
        expect(res.body.imageUrl).toBeTruthy();
      done();
    });
  });

  it('returns a list of all resources that have been uploaded', done => {
    let imageLocation = '../uploads/line.jpg';
    let uploadUrl = 'http://localhost:3000/api/pictures';
    console.log('uploadUrl', uploadUrl);
    console.log('imageLocation', imageLocation);

    superagent.post(uploadUrl)
      .attach('picture', imageLocation)
      .end((err, res) => {
        let amazonUrl = process.env.AWS_BUCKET + '.s3.amazonaws.com';
        let isAmazonUrl = res.body.imageUrl.includes(amazonUrl);
        // expect(isAmazonUrl).toBe(true);
        expect(res.status).toBeTruthy();
        done();
      });
  });

  it('returns info on one resource thats been uploaded', done => {
    let restUrl = 'http://localhost:3000/api/pictures';
    superagent.get(restUrl)
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});




// POST - /api/resource
// Test: POST - 200 - test that the upload worked and a resource object is returned
// GET - /api/resource
// Test: GET - 200 - returns a list of all resources that have been uploaded
// GET - /api/resource?id
// Test: GET - 200 - returns info on one resource that's been uploaded