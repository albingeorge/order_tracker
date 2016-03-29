// Imports
var express = require('express')
var app = express();
var body_parser = require('body-parser');


// var readline = require('readline');

var db = require("./db.js")();
var hbs = require('./lib/handlebars');
var api_routes = require('./routes/api_routes');
var web_routes = require('./routes/web_routes');
// var config = require("./config");
var basic_auth = require("./lib/basic_auth");

// Basic authentication
app.use(basic_auth);


app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.static(__dirname + '/public'));



// Used to manage inputs in requests
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());


// Routes
app.use('/api', api_routes);
app.use('/', web_routes);

// Listen to port 3000
app.listen(3000);