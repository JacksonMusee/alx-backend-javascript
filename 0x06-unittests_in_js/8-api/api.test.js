const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);  // Using the chai-http plugin to make HTTP requests in tests

describe('Index page', () => {
  let server;

  // Before each test, start the server
  before((done) => {
    server = require('./api');  // Import the api.js file which will start the server
    done();
  });

  // After all tests, close the server
  after((done) => {
    server.close();
    done();
  });

  // Test 1: Correct status code
  it('should return status code 200', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  // Test 2: Correct result (response body)
  it('should return the correct result', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res.text).to.equal('Welcome to the payment system');
        done();
      });
  });
});
