const { expect } = require('chai');
const request = require('request');

describe('Index page', function () {
  // Prevent the server from starting multiple times by only starting it once

  it('should return status code 200', function (done) {
    request.get('http://localhost:7865', function (err, res, body) {
      expect(res.statusCode).to.equal(200);
      done();  // Call done when the test is complete
    });
  });

  it('should return the correct result', function (done) {
    request.get('http://localhost:7865', function (err, res, body) {
      expect(body).to.equal('Welcome to the payment system');
      done();  // Call done when the test is complete
    });
  });
});
