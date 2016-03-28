var fs = require('fs');

module.exports = function(req, res, next) {
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

            if(auth_values["username"] == auth[0] && auth_values["password"] == auth[1]) {
                next();
            } else {
                res.statusCode = 401;
                // MyRealmName can be changed to anything, will be prompted to the user
                res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
                // this will displayed in the browser when authorization is cancelled
                res.end('Unauthorized');
            }

        });
    }
}