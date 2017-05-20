var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var assert = chai.assert;
var combinatorial  = require('../combinatorial');

describe('combinatorial', function() {
  describe('permutations', function(){
  	it('getPermutations() should return six permutations if are passed an array of three elements', function() {
	    var nodes = ['A', 'B', 'C'];
	    expect(combinatorial.getPermutations(nodes).length).to.equal(6);
	  });
  });

  describe('weights', function(){
  	it('if the edge wanted has been pased, it returns the right weight',function(){
  		var edges = [{source:'BCN', destination:'MIL', weight:92.1},{source:'BCN', destination:'ROM', weight:56.4}];
  		expect(combinatorial.getWeight('BCN', 'MIL', edges)).to.equal(92.1);
  	});
  	it('if more than one entries for the same pair of cities has been pased, it returns an error',function(){
  		var edges = [{source:'BCN', destination:'MIL', weight:92.1},{source:'BCN', destination:'MIL', weight:56.4}];
  		expect(combinatorial.getWeight('BCN', 'MIL', edges)).to.be.an.instanceof(Error);
  		expect(combinatorial.getWeight('BCN', 'MIL', edges).message).to.equal('There are more than one price for BCN and MIL');
  	});
  	it('if has not been passed the wanted edge, it returns an error',function(){
  		var edges = [{source:'BCN', destination:'MIL', weight:92.1},{source:'BCN', destination:'ROM', weight:56.4}];
  		expect(combinatorial.getWeight('ROM', 'MIL', edges)).to.be.an.instanceof(Error);
  		expect(combinatorial.getWeight('ROM', 'MIL', edges).message).to.equal('There is no information about edge between ROM and MIL');
  	});
  });
  
});