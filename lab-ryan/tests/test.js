'use strict';

require('dotenv').config();

const superagent = require('superagent');

const picture = require('../router/pictures.js');

describe('picture route', () => {
    it('test that the upload worked and a resource object is returned', (done) => {
            let pictureParams = params();
        
            superagent.post(SIGNUP_URL)
            .set('Content-Type', 'application/json')
            .send(pictureParams)
            .then(res => {
              expect(res.status).toEqual(200);
              done();
            });
          });

    it('returns all the resources that have been uploaded', (done) => {
        
    })

    it('returns info on one resource that\'s been uploaded', (done) => {
        
    });
});



// POST - /api/resource
// Test: POST - 200 - test that the upload worked and a resource object is returned
// GET - /api/resource
// Test: GET - 200 - returns a list of all resources that have been uploaded
// GET - /api/resource?id
// Test: GET - 200 - returns info on one resource that's been uploaded