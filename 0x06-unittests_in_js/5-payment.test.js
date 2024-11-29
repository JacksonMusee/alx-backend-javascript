const sinon = require('sinon');
const assert = require('assert');
const sendPaymentRequestToApi = require('./5-payment');

describe('sendPaymentRequestToApi', function () {
  let logSpy;

  // Run before each test
  beforeEach(function () {
    // Create a spy on console.log
    logSpy = sinon.spy(console, 'log');
  });

  // Run after each test to restore the spy
  afterEach(function () {
    // Restore the original console.log method
    logSpy.restore();
  });

  it('should log the correct message when called with 100 and 20', function () {
    // Call the function with test values
    sendPaymentRequestToApi(100, 20);

    // Verify the console.log output
    assert(logSpy.calledOnce);
    assert(logSpy.calledWith('The total is: 120'));
  });

  it('should log the correct message when called with 10 and 10', function () {
    // Call the function with different test values
    sendPaymentRequestToApi(10, 10);

    // Verify the console.log output
    assert(logSpy.calledOnce);
    assert(logSpy.calledWith('The total is: 20'));
  });
});
