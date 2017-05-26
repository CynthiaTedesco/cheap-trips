var Combinatorics = require('js-combinatorics');
var data = require('./data');

var exports = module.exports = {};

exports.getPermutations = function(array){
	var cmb = Combinatorics.permutation(array);
	console.log(cmb.toArray());
	return cmb.toArray();
}

exports.getEdge = function(source, destination, edges){
    if (!edges){
        edges = data.edges;
    }
    
    let edge = edges.filter(function(e){
		return e.source === source && e.destination === destination;
	});

	if (edge.length === 1){
		return edge[0];
	} else {
        if (edge.length === 0){
            throw new Error("There is no information about edge between " + source + ' and ' + destination)
        } else {
            throw new Error("There are more than one price for " + source + ' and ' + destination)
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
        var edge = exports.getEdge('BCN',paths[i][0],edges);
		weight = edge.weight;
        duration = edge.duration;
        operators.add(edge.operator);
        
		for (let j = 1; j < paths[i].length; j++){
            edge = exports.getEdge(paths[i][j-1],paths[i][j],edges);
			weight += edge.weight;
            duration += edge.duration;
            operators.add(edge.operator);
		}
        
        edge = exports.getEdge(paths[i][paths[i].length-1], 'BCN',edges);
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

	console.log(min_paths);
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
