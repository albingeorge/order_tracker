var google = require('googleapis');
var google_auth = require('../lib/google_auth');



function list(title, callback) {
  google_auth.getAuth2Client(function(oauth2Client) {
    var service = google.drive('v3');
    var req = service.files.list({ auth: oauth2Client, q: "name contains '" + title + "' and sharedWithMe" }, function(err, resp) {
        callback(resp);
    });
  });


};

module.exports = {"list": list};