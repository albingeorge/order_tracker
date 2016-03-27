drive = require("../models/drive")

var list = function(req, res) {
    var html = "";
    drive.list(req.query.q, function(out) {
        for(var i in out.files) {
            if (out.files.hasOwnProperty(i)) {
                html += "<br>";
                html += out.files[i].name;
            }
        }
        res.status(200).send(html);
    });

    // var html = "<br>"

}

var add = function(req, res) {
    res.status(200).send("success");
}

module.exports = {
    "list": list
};