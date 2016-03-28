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

module.exports = router;