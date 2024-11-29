const sinon = require('sinon');
const assert = require('assert');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./4-payment');

describe('sendPaymentRequestToApi', function () {
  it('should call Utils.calculateNumber with correct arguments and stub the result', function () {
    // Stub the calculateNumber function to always return 10
    const stub = sinon.stub(Utils, 'calculateNumber').returns(10);

    // Spy on console.log to check the output
    const logSpy = sinon.spy(console, 'log');

    // Call the function to test
    sendPaymentRequestToApi(100, 20);

    // Validate that the stub was called with the correct arguments
    assert(stub.calledWithExactly('SUM', 100, 20));

    // Verify that the spy on console.log is called with the expected message
    assert(logSpy.calledWith('The total is: 10'));

    // Restore the stub and spy
    stub.restore();
    logSpy.restore();
  });
});
