var chai = require('chai');
var data = require('../test/data-test');
var expect = chai.expect; // we are using the 'expect' style of Chai
var assert = chai.assert;
var combinatorial = require('../combinatorial');

describe('combinatorial', function () {
    describe('permutations', function () {
        it('should return six permutations if are passed an array of three elements', function () {
            var nodes = ['A', 'B', 'C'];
            expect(combinatorial.getPermutations(nodes).length).to.equal(6);
        });
    });

    describe('weights', function () {
        it('if the edge wanted has been pased, it returns the right weight', function () {
            expect(combinatorial.getEdge(data.BCN, data.MIL, data.edges).weight).to.equal(5.1);
        });
    });

    describe('edges', function () {
        it('must be return the wanted edged', function(){
            expect(combinatorial.getEdge(data.BCN, data.MIL, data.edges).to).to.equals(data.MIL.name);
            expect(combinatorial.getEdge(data.BCN, data.MIL, data.edges).from).to.equals(data.BCN.name);
        });
        it('must failed in order to wanted edge is no present', function(){
            assert.throws(function(){
                combinatorial.getEdge(data.ROM, data.MIL, data.noEdge);
            }, Error, 'There is no information about edge between ROM and MIL');
        });
        it('must failed in order to t   here is more than one entries for the same pair of cities', function () {
            assert.throws(function () {
                combinatorial.getEdge(data.BCN, data.MIL, data.moreThanOneEdges);
            }, Error, 'There are more than one weight for BCN and MIL');
        });
        
    });
    
    describe('operators', function () {
        it('if the edge wanted has been pased, it returns the right operator', function () {
            expect(combinatorial.getEdge(data.BCN, data.MIL, data.edges).operator).to.equal('Ryanair');
        });
    });
    
    describe('durations', function () {
        it('if the edge wanted has been pased, it returns the right duration', function () {
            expect(combinatorial.getEdge(data.BCN, data.MIL, data.edges).duration).to.equal(105);
        });
    });

    describe('paths', function () {
        describe('pondered paths', function () {
            it('it must return an array of pondered paths (pondered means that they have weights)', function () {
                expect(combinatorial.getPonderedPaths(data.nodes, data.edges).length).to.eql(2);
                expect(combinatorial.getPonderedPaths(data.nodes, data.edges)[0].weight).to.not.be.undefined;
            });
            it('it must return an array of pondered paths with their respectives operators', function () {
                expect(combinatorial.getPonderedPaths(data.nodes, data.edges)[0].operators).to.not.be.undefined;
                expect(combinatorial.getPonderedPaths(data.nodes, data.edges)[0].operators).to.be.a('Set');
            });
            it('it must return an array of pondered paths with their total duration', function () {
                expect(combinatorial.getPonderedPaths(data.nodes, data.edges)[0].duration).to.not.be.undefined;
                expect(combinatorial.getPonderedPaths(data.nodes, data.edges)[0].duration).to.be.a('number');
            });
        });

        describe('minimal paths', function () {
            it('it must return the path that weights 8.73', function () {
                expect(combinatorial.getMinPaths(data.nodes, data.edges)).to.have.lengthOf(1);
                expect(combinatorial.getMinPaths(data.nodes, data.edges)[0].weight).to.eql(8.73);
            });
        });
        
        describe('first 15 minimal paths', function(){
            it('must return an array of two elements', function(){
                expect(combinatorial.getFirstMinPaths(data.nodes, data.edges)).to.have.length.of.at.most(15);
                expect(combinatorial.getFirstMinPaths(data.nodes, data.edges)).to.have.lengthOf(2);
            });
        });
    });
});
