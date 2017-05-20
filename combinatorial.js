var Combinatorics = require('js-combinatorics');
var data = require('./data');

var exports = module.exports = {};

exports.getPermutations = function(array){
	var cmb = Combinatorics.permutation(array);
	return cmb.toArray();
}

exports.getWeight = function(source, destination, edges){
	if (!edges){
		edges = data.edges();
	}
	let edge = edges.filter(function(e){
		return e.source === source && e.destination === destination;
	});

	if (edge.length === 1){
		return edge[0].weight;
	} else {
        if (edge.length === 0){
            return new Error("There is no information about edge between " + source + ' and ' + destination)
        } else {
            return new Error("There are more than one price for " + source + ' and ' + destination)
        }
	}
}

exports.getPonderedPaths = function(){
    let paths = exports.getPermutations(data.nodes());
	
    let ponderedPaths = [];
	let weight = 0;

	for (let i = 0; i < paths.length; i++) {
		weight = exports.getWeight('BCN',paths[i][0]);
		for (let j = 1; j < paths[i].length; j++){
			weight = weight + exports.getWeight(paths[i][j-1],paths[i][j]);
		}
		weight += exports.getWeight(paths[i][paths[i].length-1], 'BCN');
		ponderedPaths[i] = {path:paths[i], weight:weight};
		weight = 0;
	}
	console.log('----------------------------------------------------- ');
	console.log(ponderedPaths);
	console.log('----------------------------------------------------- ');
	return ponderedPaths;
}

exports.getMinPath = function() {
	let ponderedPaths = exports.getPonderedPaths();	

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

// exports.getMinPath();