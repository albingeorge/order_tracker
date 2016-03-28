// Imports
var app = require('express')();
var body_parser = require('body-parser');
var mongoose = require("mongoose");
var hbs = require('hbs');

// var readline = require('readline');

var api_routes = require('./routes/api_routes');
var web_routes = require('./routes/web_routes');
var config = require("./config");
var basic_auth = require("./lib/basic_auth");

// Basic authentication
app.use(basic_auth);

app.set('view engine', 'html');
app.engine('html', hbs.__express);

// Connect to mongodb
// var connection = mongoose.createConnection(config.db_URL);
// connection.on('error', console.error.bind(console,
//     'Connection error:'));
// connection.once('open', function () {
//     console.info('Connected to database')
// });

// Used to manage inputs in requests
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());


// Routes
app.use('/api', api_routes);
app.use('/', web_routes);

// Listen to port 3000
app.listen(3000);