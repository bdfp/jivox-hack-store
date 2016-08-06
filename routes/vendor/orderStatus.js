/**
 * Created by akash on 8/7/16.
 */
var express = require('express');
var router = express.Router();

var orderStatusCtrl = require('../../controller/orderStatus');

/**
 * {
 * "name": "Statua"
 * }
 */
router.post('/', (req, res, next) => {
    if (!req.body.vendor_id) {
        res.status(403).json({
            err: "Not authorized"
        });
        return;
    }

    orderStatusCtrl.add(req.body.name, (err) => {
        if(err) {
            res.json({
                err: err
            });
        } else {
            res.json({
                msg: "new orderFunc status added"
            });
        }
    });
});

router.get('/', (req, res, next) => {
    orderStatusCtrl.get((err, statusList) => {
        if(err) {
            res.json({
                err: err
            });
        } else {
            res.json({
                msg: "orderFunc status retrieved",
                status: statusList
            });
        }
    })
});

module.exports = router;