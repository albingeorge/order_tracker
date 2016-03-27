var google = require('googleapis');
var config = require('../config')

var fs = require('fs');
var readline = require('readline');
var googleAuth = require('google-auth-library');


var SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
var TOKEN_DIR = 'credentials/';
var TOKEN_PATH = TOKEN_DIR + config.token_file_name;

function getAuth2Client(callback) {
  fs.readFile(TOKEN_DIR + config.client_secret_file_name, function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      return;
    }
    // Authorize a client with the loaded credentials, then call the
    // Drive API.
    authorize(JSON.parse(content), callback);
  });
}



function authorize(credentials, callback) {
  var clientSecret = credentials.web.client_secret;
  var clientId = credentials.web.client_id;
  var redirectUrl = credentials.web.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}


function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}


function list(title, callback) {
  getAuth2Client(function(oauth2Client) {
    var service = google.drive('v3');
    var req = service.files.list({ auth: oauth2Client, q: "name contains '" + title + "' and sharedWithMe" }, function(err, resp) {
        callback(resp);
    });
  });


};

module.exports = {"list": list};