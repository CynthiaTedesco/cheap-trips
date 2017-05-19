var Combinatorics = require('js-combinatorics');
var data = require('./data');

function Combinatorial() {}

Combinatorial.prototype.getPermutations = function(array) {
  var cmb = Combinatorics.permutation(array);
	// console.log(cmb.toArray());
	return cmb.toArray();
};

module.exports = Combinatorial;

var getWeight = function(source, destination){
	let edge = data.edges().filter(function(e){
		return e.source === source && e.destination === destination;
	});

	if (edge.length === 1){
		return edge[0].weight;
	} else {
        if (edge.length === 0){
            return new Error("There are no information about edge between " + source + ' and ' + destination)
        } else {
            return new Error("There are more than one price for " + source + ' and ' + destination)
        }
	}
}

var getPermutations = function(array){
	var cmb = Combinatorics.permutation(array);
	// console.log(cmb.toArray());
	return cmb.toArray();
}

var getPonderedPaths = function(){
//	let paths = getPermutations(data.nodes());

    var comb = new Combinatorial();
    let paths = comb.getPermutations(data.nodes());
	
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

function CartSummary() {}

CartSummary.prototype.getSubtotal = function() {
  return 0;
};

module.exports = CartSummary

getMinPath();

