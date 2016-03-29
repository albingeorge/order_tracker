var express = require('express');
var router = express.Router();
var orderHandles = require('../handlers/order')
var Order = require("../models/order");
// var Order = require("mongoose").model("Orders");

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
    var status = "Blah",
        order = new Order(req.body);

    console.log(order);

    order.save(function(err) {
        if(err) {
            status = "Failed :: " + err.message;
            throw err;
        }
        status = "Order saved";
        console.log(status);
    });
    res.redirect("/");
});

module.exports = router;