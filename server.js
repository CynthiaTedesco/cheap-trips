// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
// var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
// var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var combinatorial = require('./combinatorial.js');

// configuration =================

// mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
// views is directory for all template files
app.set('views', __dirname + '/views');
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
// app.use(methodOverride());
app.set('view engine', 'ejs');

// listen (start app with node server.js) ======================================
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

// routes ======================================================================
app.get('/', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

var cities = ['BCN', 'MIL'];

app.get('/paths', function(req, res) {
    var locals = {
        cities: cities
    }
    res.render('./paths.ejs', locals);
    // res.send(combinatorial.getFirstMinPaths());
});

app.get('/add-city', function(req, res){
    newCity = req.query.name.toUpperCase();
    console.log(cities);
    console.log(req.query.name);
    console.log(cities.indexOf(newCity));
    if (cities.indexOf(newCity) === -1){
        cities.push(newCity);
    }
    
    res.redirect('/paths');
})

app.get('/remove-city', function(req, res){
    console.log('removing');
    cities.splice(cities.indexOf(req.query.name),1);
    res.redirect('/paths');
})