var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var Combinatorial  = require('../combinatorial');

// tests/part1/cart-summary-test.js
var CartSummary = require('../cart-summary');

describe('CartSummary', function() {
  it('getSubtotal() should return 0 if no items are passed in', function() {
    var cartSummary = new CartSummary([]);
    expect(cartSummary.getSubtotal()).to.equal(0);
  });
});

describe('permutations', function() {
  it('getPermutations() should return six permutations if are passed an array of three elements', function() {
    var nodes = ['A', 'B', 'C'];
    var combinatorial = new Combinatorial();
    expect(combinatorial.getPermutations(nodes).length).to.equal(6);
  });
});