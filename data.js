//let nodes = ['MIL','ROM'];
//let edges = [
//	{source:'BCN', destination:'MIL', weight:2},
//	{source:'BCN', destination:'ROM', weight:1},
//	{source:'ROM', destination:'MIL', weight:5},
//	{source:'ROM', destination:'BCN', weight:2},//	{source:'MIL', destination:'ROM', weight:3},
//	{source:'MIL', destination:'BCN', weight:4}]
// CHEAPEST: BCN -MIL - ROM - BCN

var nodes = ['MIL','ROM', 'VEN'];
var edges = [
        {source:'BCN', destination:'MIL', weight:5.1},
        {source:'BCN', destination:'ROM', weight:5.4},
        {source:'BCN', destination:'VEN', weight:1.56},
        {source:'ROM', destination:'MIL', weight:3.3},
        {source:'ROM', destination:'BCN', weight:2.2},
        {source:'ROM', destination:'VEN', weight:3.2},
        {source:'MIL', destination:'ROM', weight:1.43},
        {source:'MIL', destination:'BCN', weight:2},
        {source:'MIL', destination:'VEN', weight:3},
        {source:'VEN', destination:'ROM', weight:2.9},
        {source:'VEN', destination:'BCN', weight:2.85},
        {source:'VEN', destination:'MIL', weight:1}]; 

module.exports = {
    nodes: function(){
        return nodes;
    },
    edges: function(){
        return edges;
    }
}
//CHEAPEST: BCN - VEN - MIL -ROM - BCN