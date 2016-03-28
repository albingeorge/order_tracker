var express = require('express');
var router = express.Router();
var orderHandles = require('../handlers/order')

router.get("/", function(req, res) {
    res.render('index');
});

module.exports = router;