/**
 * Created by raghav on 06/08/16.
 */

var express = require('express');
var router = express.Router();

var ratingCtrl = require('../../controller/ratings');

router.post('/:productId', (req, res) => {
    var ratingDetails = {
      productId : req.params.productId,
      userId : req.body.userId,
        vendorId : req.body.vendorId
    };
    ratingCtrl.addRatingsByProductId(ratingDetails, (err) => {
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