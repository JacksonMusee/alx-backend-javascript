const { expect } = require('chai');
const request = require('request');

describe('Index page', function () {

  it('should return status code 200', function (done) {
    request.get('http://localhost:7865', function (err, res, body) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('should return the correct result', function (done) {
    request.get('http://localhost:7865', function (err, res, body) {
      expect(body).to.equal('Welcome to the payment system');
      done();
    });
  });
});
