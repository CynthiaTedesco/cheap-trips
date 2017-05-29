exports.nodes = [{name:'MIL'},{name:'ROM'}];
exports.edges = [
        {from:'BCN', to:'MIL', weight:5.1, conveyance: 'plane', operator: 'Ryanair', duration:105},
        {from:'BCN', to:'ROM', weight:5.4, conveyance: 'plane', operator: 'Vueling', duration:110},
        {from:'ROM', to:'MIL', weight:3.3, conveyance: 'train', operator: 'Trenitalia', duration:195},
        {from:'ROM', to:'BCN', weight:2.2, conveyance: 'plane', operator: 'Ryanair', duration:115},
        {from:'MIL', to:'ROM', weight:1.43, conveyance: 'plane', operator: 'Alitalia', duration:70},
        {from:'MIL', to:'BCN', weight:2, conveyance: 'plane', operator: 'Vueling', duration:104},
        {from:'MIL', to:'VEN', weight:3, conveyance: 'bus', operator: 'BusCenter', duration:245}];
exports.noEdge = [
        {from:'BCN', to:'MIL', weight:92.1, conveyance: 'plane', operator: 'Ryanair', duration:105}, 
        {from:'BCN', to:'ROM', weight:56.4, conveyance: 'plane', operator: 'Vueling', duration:110}];
exports.moreThanOneEdges = [
        {from:'BCN', to:'MIL', weight:92.1, conveyance: 'plane', operator: 'Ryanair', duration:105}, 
        {from:'BCN', to:'MIL', weight:56.4, conveyance: 'plane', operator: 'Ryanair', duration:105}];
exports.paths_quantity = 15;
exports.BCN = {name:'BCN'};
exports.MIL = {name:'MIL'};
exports.ROM = {name:'ROM'};
