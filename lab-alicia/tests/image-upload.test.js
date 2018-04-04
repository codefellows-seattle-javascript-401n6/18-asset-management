'use strict';

require('dotenv').config();

const request = require('superagent');

describe('Test AWS S3 Photo uploads', () => {

  it('Should return 200 status and a list of all resources that have been uploaded', (done) => {
    let imageLocation = '../assets/keiths_hut.jpg';
    let uploadUrl = 'http://localhost:3000/api/photos';

    request.get(uploadUrl)
      .attach('photo', imageLocation)
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('Should return 200 status and info on one resource that has been uploaded', (done) => {
    let imageLocation = '../assets/keiths_hut.jpg';
    let uploadUrl = 'http://localhost:3000/api/photos/:id';

    request.get(uploadUrl)
      .attach('photo', imageLocation)
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('Should return 200 status that the upload worked and a resource object is returned', (done) => {
    let imageLocation = '../assets/keiths_hut.jpg';
    let uploadUrl = 'http://localhost:3000/api/photo';

    request.post(uploadUrl)
      .attach('photo', imageLocation)
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('Should return 204 when image object is successfuly deleted from mongoDB and AWS S3 bucket', done => {
    let imageLocation = '../assets/keiths_hut.jpg';
    let uploadUrl = 'http://localhost:3000/api/photos/:id';

    request.post(uploadUrl)
      .attach('photo', imageLocation)
      .end((err, res) => {
        let imageId = res.body._id;
        request.delete(uploadUrl + imageId)
          .end((err, res) => {
            expect(res.status).toBe(204);
            done();
          });
      });
  });

});
