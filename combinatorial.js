var Combinatorics = require('js-combinatorics');

let nodes = ['MIL','ROM'];
let edges = [
	{source:'BCN', destination:'MIL', weight:2},
	{source:'BCN', destination:'ROM', weight:1},
	{source:'ROM', destination:'MIL', weight:5},
	{source:'ROM', destination:'BCN', weight:2},
	{source:'MIL', destination:'ROM', weight:3},
	{source:'MIL', destination:'BCN', weight:4}];

var getWeight = function(source, destination){
	let edge = edges.filter(function(e){
		return e.source === source && e.destination === destination;
	});

	if (edge.length === 1){
		return edge[0].weight;
	} else {
		return new Error("There are more than one price")
	}
}

var getPermutations = function(array){
	var cmb = Combinatorics.permutation(array);
	// console.log(cmb.toArray());
	return cmb.toArray();
}

var getPonderedPaths = function(){
	let paths = getPermutations(nodes);
	let ponderedPaths = [];
	let weight = 0;

	for (let i = 0; i < paths.length; i++) {
		weight = getWeight('BCN',paths[i][0]);
		for (let j = 1; j < paths[i].length; j++){
			weight = weight + getWeight(paths[i][j-1],paths[i][j]);
		}
		weight += getWeight(paths[i][paths[i].length-1], 'BCN');
		ponderedPaths[i] = {path:paths[i], weight:weight};
		weight = 0;
	}
	console.log('----------------------------------------------------- ');
	console.log(ponderedPaths);
	console.log('----------------------------------------------------- ');
	return ponderedPaths;
}

var getMinPath = function() {
	let ponderedPaths = getPonderedPaths();	

	let MIN = 99999999;
	var min_path;
	for(let i=0;i<ponderedPaths.length; i++){
		let path = ponderedPaths[i];
		if (path.weight < MIN){
			min_path = path;
			MIN = path.weight;
		}
	}

	console.log(min_path);
	return min_path;
}

getMinPath();
