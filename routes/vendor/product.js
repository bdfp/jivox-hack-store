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

    var photos = req.body.photos;
    delete req.body.photos;

    async.waterfall([
        (cb) => {
            productCtrl.add(req.body, cb)
        },
        (prodId, cb) => {
            async.each(photos, (photoUrl, cb) => {
                photoCtrl.add({
                    url: photoUrl,
                    product_id: prodId
                }, cb)
            }, cb)
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