'use strict';
require('dotenv').config();

const agent = require('superagent');
const photo = require('../router/photoRoute');

describe('Photo uploads', () => {
    it.skip('checks if the upload worked and a resource object is returned', (done) => {
            let imageLocation = './uploads/download.png';
            let uploadUrl = 'http://localhost:3000/photos/upload';
        
            agent.post(uploadUrl)
            .attach('picture', imageLocation)
            .end((err, res) => {
              let amazonUrl = process.env.AWS_BUCKET + '.s3.amazonaws.com';
              let isAmazonUrl = req.body.url.includes(amazonUrl);
              expect(isAmazonUrl).toBe(true);
              done();
        });
    });
})