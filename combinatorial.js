var Combinatorics = require('js-combinatorics');
var data = require('./data');

var defaultOrigin = {name:'BCN', isOrigin:true};
var defaultDestination = {name:'BCN', isDestination:true};
var origin = defaultOrigin;
var destination = defaultDestination;

var innerCities = [];

var exports = module.exports = {};

// returns all possible paths between inner nodes
exports.getPermutations = function(nodes){
	if (nodes.length < 2){
		innerCities = [];
		return [];
	}

	innerCities = [];
	origin = defaultOrigin;
	destination = defaultDestination;
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i].isOrigin || nodes[i].isDestination){
			if (nodes[i].isOrigin){
				origin = nodes[i];
			}
			if (nodes[i].isDestination) {
				destination = nodes[i];
			}
		} else {
			innerCities.push(nodes[i]);
		}
	}

	var cmb = Combinatorics.permutation(innerCities);
	return cmb.toArray();
}

// returns an array with edges between inner cities and origin/destination
exports.completeEdges = function(){
	var morePermutations = [];
	for (var i = 0; i < innerCities.length; i++){
		morePermutations.push(getEmptyEdgeObj(getOrigin().name, innerCities[i].name));
		morePermutations.push(getEmptyEdgeObj(innerCities[i].name, getDestinationName()));
	}
	return morePermutations;
}

var getEmptyEdgeObj = function(from, to) {
	return {from: from, to: to, operator: '', duration: '', weight: null};
}

exports.getEdge = function(origin, destination, edges){
    if (!edges){
        edges = data.edges;
    }
    
    let edge = edges.filter(function(e){
		return e.from === origin.name && e.to === destination.name;
	});

	if (edge.length === 1){
		return edge[0];
	} else {
        if (edge.length === 0){
            throw new Error("There is no information about edge between " + origin.name + ' and ' + destination.name)
        } else {
            throw new Error("There are more than one weight for " + origin.name + ' and ' + destination.name)
        }
	}
}

exports.getPonderedPaths = function(nodes, edges){
	if (!nodes){
		nodes = data.nodes;
	}

    let paths = exports.getPermutations(nodes);
	
    let ponderedPaths = [];
	let weight = 0;
    let operators = new Set();
    let duration = 0;

	for (let i = 0; i < paths.length; i++) {
        var edge = exports.getEdge(getOrigin(),paths[i][0],edges);
		weight = edge.weight;
        duration = edge.duration;
        operators.add(edge.operator);
        
		for (let j = 1; j < paths[i].length; j++){
            edge = exports.getEdge(paths[i][j-1],paths[i][j],edges);
			weight += edge.weight;
            duration += edge.duration;
            operators.add(edge.operator);
		}
        
        edge = exports.getEdge(paths[i][paths[i].length-1], destination,edges);
		weight += edge.weight;
        duration += edge.duration;
        operators.add(edge.operator);
		ponderedPaths[i] = {path:paths[i], weight:weight, operators:operators, duration:duration};

		weight = 0;
        duration = 0;
        operators = new Set();
	}
//	console.log('----------------------------------------------------- ');
//    console.log(ponderedPaths);
//	console.log('----------------------------------------------------- ');
	return ponderedPaths;
}

var getDestinationName = function(){
	if (destination){
		return destination.name;
	}

	return 'BCN';
}

var getOrigin = function(){
	if (origin){
		return origin;
	}

	return defaultOrigin;
}

exports.getMinPaths = function(nodes, edges) {
	let ponderedPaths = exports.getPonderedPaths(nodes,edges);

	let MIN = 99999999;
    let min_paths = [];
	for(let i=0;i<ponderedPaths.length; i++){
		let path = ponderedPaths[i];
		if (path.weight < MIN){
            min_paths = [];
            min_paths.push(path);
			MIN = path.weight;
		} else if (path.weight === MIN){
            min_paths.push(path);
        }
	}

	// console.log(min_paths);
	return min_paths;
}

exports.getFirstMinPaths = function(nodes, edges){
	let ponderedPaths = exports.getPonderedPaths(nodes,edges);
    var paths_quantity = 15;

	ponderedPaths.sort(function(a, b){
	    var w1 = a.weight,
	        w2 = b.weight;
	    // Compare the 2 dates
	    if(w1 < w2) return -1;
	    if(w1 > w2) return 1;
	    return 0;
	});

    if (ponderedPaths.length > paths_quantity){
        var firstPaths = [];
        for(var i = 0; i<paths_quantity;i++){
            firstPaths.push(ponderedPaths[i]);
            console.log(ponderedPaths[i]);
        }
        return firstPaths;
    }
    
    return ponderedPaths;
}

// exports.getMinPaths();
// exports.getFirstMinPaths();
