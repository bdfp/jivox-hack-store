/**
 * Created by akash on 8/7/16.
 */
var express = require('express');
var router = express.Router();

var orderCtrl = require('../../controller/order');

router.get('/', (req, res) => {
    orderCtrl.getVendorOrder(req.body.vendor_id, (err, orders) => {
        if (err) {
            res.json({
                err: err
            })
        } else {
            res.json({
                msg: "orders retrieved",
                orders: orders
            });
        }
    })
});

module.exports = router;