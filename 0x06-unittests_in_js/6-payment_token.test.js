const assert = require('assert');
const getPaymentTokenFromAPI = require('./6-payment_token');

describe('getPaymentTokenFromAPI', function () {
  it('should return a successful response when success is true', function (done) {
    // Call the function with success = true
    getPaymentTokenFromAPI(true)
      .then(response => {
        // Assert that the data is what we expect
        assert.strictEqual(response.data, 'Successful response from the API');
        done(); // Call done to signal the completion of the test
      })
      .catch(done); // If there's an error, the test will fail
  });

  it('should return an empty response when success is false', function (done) {
    // Call the function with success = false
    getPaymentTokenFromAPI(false)
      .then(response => {
        // Assert that the data is empty
        assert.deepStrictEqual(response, {});
        done(); // Call done to signal the completion of the test
      })
      .catch(done); // If there's an error, the test will fail
  });
});
