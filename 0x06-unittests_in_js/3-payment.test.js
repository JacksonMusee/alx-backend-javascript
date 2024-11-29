const sinon = require('sinon');
const assert = require('assert');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./3-payment');

describe('sendPaymentRequestToApi', function () {
  it('should call Utils.calculateNumber with correct arguments', function () {
    // Create a spy for calculateNumber
    const spy = sinon.spy(Utils, 'calculateNumber');

    // Call the function to test
    sendPaymentRequestToApi(100, 20);

    // Validate that the spy was called with the correct arguments
    assert(spy.calledWithExactly('SUM', 100, 20));

    // Restore the spy to its original state after the test
    spy.restore();
  });
});
