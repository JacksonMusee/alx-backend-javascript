const calculateNumber = require("./0-calcul.js")
const assert = require("assert")

describe("calculateNumber", function () {
  it("Should return 4 fo (1, 3)", function () {
    assert.strictEqual(calculateNumber(1,3), 4);
  });

  it("Should return 5 for (1, 3.7)", function () {
    assert.strictEqual(calculateNumber(1, 3.7), 5);
  });

  it("Should return 5 for (1.2, 3.7)", function () {
    assert.strictEqual(calculateNumber(1.2, 3.7), 5);
  });

  it("Should return 6 for (1.5, 3.7)", function () {
    assert.strictEqual(calculateNumber(1.5, 3.7), 6);
  });

  it("Should return 0 for (0, 0)", function () {
    assert.strictEqual(calculateNumber(0, 0), 0);
  });

  it("Should return -6 for (-1.5, -3.7)", function () {
    assert.strictEqual(calculateNumber(-1.6, -3.7), -6);
  });

});



