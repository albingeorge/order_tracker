// Imports
var app = require('express')();
var body_parser = require('body-parser');
var mongoose = require("mongoose");
var hbs = require('hbs');
var fs = require('fs');
// var readline = require('readline');

var api_routes = require('./routes/api_routes');
var web_routes = require('./routes/web_routes');
var config = require("./config");

// Authentication
app.use(function(req, res, next) {
    var auth;

    // check whether an autorization header was send
    if (req.headers.authorization) {
      // only accepting basic auth, so:
      // * cut the starting "Basic " from the header
      // * decode the base64 encoded username:password
      // * split the string at the colon
      // -> should result in an array
      auth = new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':');

    }

    // checks if:
    // * auth array exists
    // * first value matches the expected user
    // * second value the expected password
    if (!auth) {
        // any of the tests failed
        // send an Basic Auth request (HTTP Code: 401 Unauthorized)
        res.statusCode = 401;
        // MyRealmName can be changed to anything, will be prompted to the user
        res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
        // this will displayed in the browser when authorization is cancelled
        res.end('Unauthorized');
    } else {
        fs.readFile("credentials/auth.json", function(err, token) {
            var auth_values;
            if (err) {
                auth_values = {
                    "username": "test",
                    "password": "test"
                };
            } else {
                  auth_values = JSON.parse(token);
            }

            console.log(auth_values);
            console.log(auth);
            if(auth_values["username"] == auth[0] && auth_values["password"] == auth[1]) {
                console.log("Auth success");
                next();
            } else {
                console.log("Auth failed");
                res.statusCode = 401;
                // MyRealmName can be changed to anything, will be prompted to the user
                res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
                // this will displayed in the browser when authorization is cancelled
                res.end('Unauthorized');
            }

        });
    }
});

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