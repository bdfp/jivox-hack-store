/**
 * Created by akash on 8/6/16.
 */
var express = require('express');
var router = express.Router();
var async = require('async');

var productCtrl = require('../../controller/product'),
    photoCtrl = require('../../controller/photo');

router.get('/category/:categoryId', (req, res) => {
    productCtrl.getCategory(req.param('categoryId'), (err, products) => {
        if (err) {
            res.json({
                err:err
            });
        } else {
            res.json({
                msg: "Products retrieved",
                products: products
            });
        }
    });
});

router.get('/:productId', (req, res) => {
    productCtrl.getDetails(req.param('productId'), (err, products) => {
        if (err) {
            res.json({
                err:err
            });
        } else {
            res.json({
                msg: "Products retrieved",
                products: products
            });
        }       
    })
});

module.exports = router;