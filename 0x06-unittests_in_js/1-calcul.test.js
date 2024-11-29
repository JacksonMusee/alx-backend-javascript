const assert = require('assert');
const calculateNumber = require('./1-calcul.js');

describe('calculateNumber', function () {
  describe('SUM', function () {
    it('should return the sum of rounded numbers', function () {
      assert.strictEqual(calculateNumber('SUM', 1.4, 4.5), 6);
      assert.strictEqual(calculateNumber('SUM', 1.2, 3.7), 5);
    });
  });

  describe('SUBTRACT', function () {
    it('should return the result of subtracting b from a after rounding', function () {
      assert.strictEqual(calculateNumber('SUBTRACT', 1.4, 4.5), -4);
      assert.strictEqual(calculateNumber('SUBTRACT', 3.2, 1.7), 1);
    });
  });

  describe('DIVIDE', function () {
    it('should return the result of dividing a by b after rounding', function () {
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, 4.5), 0.2);
      assert.strictEqual(calculateNumber('DIVIDE', 1.5, 3.7), 0.5);
    });

    it('should return "Error" if division by 0', function () {
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, 0), 'Error');
      assert.strictEqual(calculateNumber('DIVIDE', 0, 0), 'Error');
    });
  });
});
