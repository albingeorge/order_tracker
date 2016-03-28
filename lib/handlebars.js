var hbs = require("hbs");

hbs.registerPartials(__dirname + '/../views/partials');

hbs.registerHelper('block', function(name) {
    return name + " test";
});

module.exports = hbs;