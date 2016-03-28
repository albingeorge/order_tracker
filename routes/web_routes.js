var express = require('express');
var router = express.Router();
var orderHandles = require('../handlers/order')

router.get("/", function(req, res) {
    res.render('index', {
            "title": "Home"
        }
    );
});

router.get("/order/add", function(req, res) {
    res.render('add_order', {
            "title": "Add Order"
        }
    );
});

router.get("/order/pending", function(req, res) {
    res.render('pending_orders', {
            "title": "Pending Orders"
        }
    );
});

router.post("/order/add", function(req, res) {
    console.log(req.param("country"));
    console.log(req.params);
    res.redirect("/");

});

module.exports = router;