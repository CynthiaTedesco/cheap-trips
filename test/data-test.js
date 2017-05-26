exports.nodes = [{name:'MIL'},{name:'ROM'}];
exports.edges = [
        {source:'BCN', destination:'MIL', weight:5.1, conveyance: 'plane', operator: 'Ryanair', duration:105},
        {source:'BCN', destination:'ROM', weight:5.4, conveyance: 'plane', operator: 'Vueling', duration:110},
        {source:'ROM', destination:'MIL', weight:3.3, conveyance: 'train', operator: 'Trenitalia', duration:195},
        {source:'ROM', destination:'BCN', weight:2.2, conveyance: 'plane', operator: 'Ryanair', duration:115},
        {source:'MIL', destination:'ROM', weight:1.43, conveyance: 'plane', operator: 'Alitalia', duration:70},
        {source:'MIL', destination:'BCN', weight:2, conveyance: 'plane', operator: 'Vueling', duration:104},
        {source:'MIL', destination:'VEN', weight:3, conveyance: 'bus', operator: 'BusCenter', duration:245}];
exports.noEdge = [
        {source:'BCN', destination:'MIL', weight:92.1, conveyance: 'plane', operator: 'Ryanair', duration:105}, 
        {source:'BCN', destination:'ROM', weight:56.4, conveyance: 'plane', operator: 'Vueling', duration:110}];
exports.moreThanOneEdges = [
        {source:'BCN', destination:'MIL', weight:92.1, conveyance: 'plane', operator: 'Ryanair', duration:105}, 
        {source:'BCN', destination:'MIL', weight:56.4, conveyance: 'plane', operator: 'Ryanair', duration:105}];
exports.paths_quantity = 15;