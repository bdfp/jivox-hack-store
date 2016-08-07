/**
 * Created by raghav on 06/08/16.
 */

var express = require('express');
var router = express.Router();

var ratingCtrl = require('../../controller/ratings');

router.post('/:productId', (req, res) => {
    var ratingDetails = {
        product_id : req.params.productId,
        user_id : req.body.user_id,
        vendor_id : req.body.vendor_id,
        rating : req.body.rating,
        review : req.body.review
    };
    ratingCtrl.setRatings(ratingDetails, (err) => {
        if (err) {
            res.json({
                err:err
            })
        } else {
            res.json({
                msg : "ratings added"
            });
        }
    });
});

module.exports = router;