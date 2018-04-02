'use strict';
// Server Endpoint
// POST - /api/resource
// Test: POST - 200 - test that the upload worked and a resource object is returned
// GET - /api/resource
// Test: GET - 200 - returns a list of all resources that have been uploaded
// GET - /api/resource?id
// Test: GET - 200 - returns info on one resource that's been uploaded

require('dotenv').config();
const request = require('superagent');
// const Photo = require('../models/photo.js');

describe('S3 Uploads', () => {
  it('should return 200 when an image is uploaded', (done) => {
    let imageLocation = './assets/cafe.jpg';
    let uploadUrl = 'http://localhost:3000/api/photos';

    request.post(uploadUrl)
      .attach('photo', imageLocation)
      .end((err, res) => {
        if (err) res.send(err);
        let amazonUrl = process.env.AWS_BUCKET + '.s3.amazonaws.com';
      
        let isAmazonUrl = res.body.URL.includes(amazonUrl);
        expect(isAmazonUrl).toBe(true);
        done();
      });
  });

  it('should return 200 when ALL images are requested', (done) => {
    let uploadUrl = 'http://localhost:3000/api/photos';

    request.get(uploadUrl)
      .end((err, res) => {
        if (err) res.send(err);
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        done();
      });
  }); 
  
  it('should return 200 when ONE image is requested', (done) => {
    let uploadUrl = 'http://localhost:3000/api/photos/5ac031df36928c5729ebd52c';

    request.get(uploadUrl)
      .end((err, res) => {
        console.log('inside 3rd test');
        if (err) res.send(err);
        expect(res.status).toBe(200);
        console.log('res.body= ', res.body);
        let expected = '5ac031df36928c5729ebd52c';
        expect(res.body._id).toBe(expected);
        done();
      });
  }); 
});