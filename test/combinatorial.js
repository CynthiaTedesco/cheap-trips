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
            expect(combinatorial.getWeight('BCN', 'MIL', data.edges)).to.equal(5.1);
        });
        it('if more than one entries for the same pair of cities has been pased, it returns an error', function () {
            assert.throws(function () {
                combinatorial.getWeight('BCN', 'MIL', data.moreThanOneEdges);
            }, Error, 'There are more than one price for BCN and MIL');
        });
        it('if has not been passed the wanted edge, it returns an error', function () {
            assert.throws(function () {
                combinatorial.getWeight('ROM', 'MIL', data.noEdge);
            }, Error, 'There is no information about edge between ROM and MIL');
        });
    });

    describe('edges', function () {
        it('must be return the wanted edged', function(){
            expect(combinatorial.getEdge('BCN', 'MIL', data.edges).destination).to.equals('MIL');
            expect(combinatorial.getEdge('BCN', 'MIL', data.edges).source).to.equals('BCN');
        });
        it('must failed in order to wanted edge is no present', function(){
            assert.throws(function(){
                combinatorial.getWeight('ROM', 'MIL', data.noEdge);
            }, Error, 'There is no information about edge between ROM and MIL');
        });
        it('must failed in order to t   here is more than one entries for the same pair of cities', function () {
            assert.throws(function () {
                combinatorial.getEdge('BCN', 'MIL', data.moreThanOneEdges);
            }, Error, 'There are more than one price for BCN and MIL');
        });
        
    });
    
    describe('companies', function () {
        it('if the edge wanted has been pased, it returns the right company', function () {
            expect(combinatorial.getOperator('BCN', 'MIL', data.edges)).to.equal('Ryanair');
        });
        it('if more than one entries for the same pair of cities has been pased, it returns an error', function () {
            assert.throws(function () {
                combinatorial.getOperator('BCN', 'MIL', data.moreThanOneEdges);
            }, Error, 'There are more than one price for BCN and MIL');
        });
        it('if has not been passed the wanted edge, it returns an error', function () {
            assert.throws(function () {
                combinatorial.getOperator('ROM', 'MIL', data.noEdge);
            }, Error, 'There is no information about edge between ROM and MIL');
        });
    });
    
    describe('times', function () {
        it('if the edge wanted has been pased, it returns the right duration', function () {
            expect(combinatorial.getDuration('BCN', 'MIL', data.edges)).to.equal(105);
        });
        it('if more than one entries for the same pair of cities has been pased, it returns an error', function () {
            assert.throws(function () {
                combinatorial.getDuration('BCN', 'MIL', data.moreThanOneEdges);
            }, Error, 'There are more than one price for BCN and MIL');
        });
        it('if has not been passed the wanted edge, it returns an error', function () {
            assert.throws(function () {
                combinatorial.getDuration('ROM', 'MIL', data.noEdge);
            }, Error, 'There is no information about edge between ROM and MIL');
        });
    });

    describe('paths', function () {
        describe('pondered paths', function () {
            it('it must return an array of pondered paths (pondered means that they have weights)', function () {
                expect(combinatorial.getPonderedPaths(data.nodes, data.edges).length).to.eql(2);
                expect(combinatorial.getPonderedPaths(data.nodes, data.edges)[0].weight).to.not.be.undefined;
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
