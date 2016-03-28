var hbs = require("hbs");

hbs.registerPartials(__dirname + '/../views/partials');

hbs.registerHelper('block', function(name) {
    return name + " test";
});

hbs.registerHelper('get_class', function(title, val) {
    return title === val ? "active" : "";
});

module.exports = hbs;