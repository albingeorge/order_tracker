var express = require('express');
var router = express.Router();
var orderHandles = require('../handlers/order')
var Order = require("../models/order");

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
    console.log(req.body);
    var order = new Order(req.body);
    var status = "";
    order.save(function(err) {
        if(err) {
            status = "Failed :: " + err.message;
            throw err;
        }
        status = "Order saved";
    });
    console.log(status);
    res.redirect("/");

});

module.exports = router;