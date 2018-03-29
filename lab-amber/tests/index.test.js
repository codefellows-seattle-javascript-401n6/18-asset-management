'use strict';

require('dotenv').config();

const superagent = require('superagent');

describe('s2 uplaods', () => {

  function seed() {
    let imageLocation = './data/photo1.jpg';
    let uploadUrl = 'http://localhost:3000/api/posts/upload';
    superagent.post(uploadUrl)
      .attach('picture', imageLocation)
      .end((err, res) => {
        let amazonUrl = process.env.AWS_BUCKET + '.s3-us-west-2.amazonaws.com';
        let isAmazonUrl = res.body.imageUrl.includes(amazonUrl);
        expect(isAmazonUrl).toBe(true);
        expect(res.status).toBe(200);
        done();
      });
  }

  it('should return 200 for uploading a photo', done => {
    let imageLocation = './data/photo1.jpg';
    let uploadUrl = 'http://localhost:3000/api/posts/upload';
    superagent.post(uploadUrl)
      .attach('picture', imageLocation)
      .end((err, res) => {
        let amazonUrl = process.env.AWS_BUCKET + '.s3-us-west-2.amazonaws.com';
        let isAmazonUrl = res.body.imageUrl.includes(amazonUrl);
        expect(isAmazonUrl).toBe(true);
        expect(res.status).toBe(200);
        done();
      });
  });

  it('should return 200 for GET requests on api/posts', done => {
    seed();
    let restUrl = 'http://localhost:3000/api/posts';
    superagent.get(restUrl)
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('should return 200 for get request on api/posts with an id as a query', done => {
    seed();
    let restUrl = 'http://localhost:3000/api/posts';
    let id;
    superagent.get(restUrl)
      .end((err, res) => {
        id = res.body[0]._id;
        superagent.get(`${restUrl}?id=${id}`)
          .end((err, res) => {
            expect(res.status).toBe(200);
            done();
          });
      });
  });

});