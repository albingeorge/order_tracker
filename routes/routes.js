var express = require('express');
var router = express.Router();
var orderHandles = require('../handlers/order')

router.get("/order/list", orderHandles.list);

module.exports = router;