/**
 * Created by akash on 8/6/16.
 */
var express = require('express');
var router = express.Router();
var async = require('async');

var productCtrl = require('../../controller/product'),
    photoCtrl = require('../../controller/photo');

/**
 * {
 *  "photos": ["url1", "url2],
 *  "category_id": catId,
 *  "vendor_id": from header
 *  "cost": 123,
 *  "name": "Product name",
 *  "description": "Hello"
 * }
 */
router.post('/', (req, res) => {
    if (!req.body.vendor_id) {
        res.status(403).json({
            err: "Not authorized"
        });
        return
    }

    async.parallel([
        (cb) => {
            async.each(req.body.photos, (photoUrl, cb) => {
                photoCtrl.add({
                    url: photoUrl,
                    product_id: req.body.product_id
                }, cb)
            }, cb)
        },
        (cb) => {
            delete req.body.photos;
            productCtrl.add(req.body, cb)
        }
    ], (err) => {
        if (err) {
            res.json({
                err: err
            });
        } else {
            res.json({
                msg: "Product added"
            })
        }
    });
});

module.exports = router;