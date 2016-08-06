/**
 * Created by akash on 8/7/16.
 */
var express = require('express');
var router = express.Router();

var orderCtrl = require('../../controller/order');

/**
 * {
 * "orders": [{
 *      product_id: '',
 *      vendor_id: ''
 * }]
 * }
 */
router.post('/', (req, res) => {
    var orderDetails = {
        userId: req.body.user_id,
        orders: req.body.orders
    };
    
    orderCtrl.createOrder(orderDetails, (err) => {
        if (err) {
            res.json({
                err: err
            });
        } else {
            res.json({
                msg: "Order placed successfully"
            });
        }
    })
});

router.get("/", (req, res) => {
    orderCtrl.getOrder(req.body.user_id, (err, rows)=> {
        if(err) {
            res.json({
                err: err
            })
        } else {
            res.json({
                msg: "Orders retrieved",
                orders: rows
            })
        }
    })
});

module.exports = router;