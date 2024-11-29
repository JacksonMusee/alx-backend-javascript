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

describe('Cart page', function () {
  it('should return status code 200 for valid cart id', function (done) {
    request.get('http://localhost:7865/cart/123', function (err, res, body) {
      expect(res.statusCode).to.equal(200);
      expect(body).to.equal('Payment methods for cart 123');
      done();
    });
  });

  it('should return status code 404 for invalid cart id (non-numeric)', function (done) {
    request.get('http://localhost:7865/cart/abc', function (err, res, body) {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });

  it('should return status code 404 when cart id is missing', function (done) {
    request.get('http://localhost:7865/cart/', function (err, res, body) {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });

  it('should return status code 404 for negative cart id', function (done) {
    request.get('http://localhost:7865/cart/-1', function (err, res, body) {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
});

