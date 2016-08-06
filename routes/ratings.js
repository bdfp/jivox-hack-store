/**
 * Created by raghav on 06/08/16.
 */

var express = require('express');
var router = express.Router();

var ratingCtrl = require('../controller/ratings');

router.get('/:productId', (req, res) => {
    var ratingDetails = {
        productId : req.params.productId
    };
    ratingCtrl.getRatingsByProductId(ratingDetails, (err, ratingList) => {
        if (err) {
            res.json({
                err:err
            });
        } else {
            res.json({
                msg:"List retrieved",
                ratingList:ratingList
            });
        }
    });
});

module.exports = router;