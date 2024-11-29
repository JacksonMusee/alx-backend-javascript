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

// New test suite for /available_payments endpoint
describe('Available payments', function () {
  it('should return status code 200', function (done) {
    request.get('http://localhost:7865/available_payments', function (err, res, body) {
      expect(res.statusCode).to.equal(200);
    });
  });

  it('should return the correct payment methods object', function (done) {
    request.get('http://localhost:7865/available_payments', function (err, res, body) {
      const expectedResponse = {
        payment_methods: {
          credit_cards: true,
          paypal: false
        }
      };
      expect(JSON.parse(body)).to.deep.equal(expectedResponse);
      done();
    });
  });
});

// New test suite for /login endpoint
describe('Login', function () {
  it('should return status code 200 with the correct message', function (done) {
    request.post(
      {
        url: 'http://localhost:7865/login',
        json: { userName: 'Betty' }
      },
      function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(body).to.equal('Welcome Betty');
        done();
      }
    );
  });

  it('should return status code 400 if no userName is provided', function (done) {
    request.post(
      {
        url: 'http://localhost:7865/login',
        json: {}
      },
      function (err, res, body) {
        expect(res.statusCode).to.equal(400);
        expect(body).to.equal('Username is required');
        done();
      }
    );
  });
});
