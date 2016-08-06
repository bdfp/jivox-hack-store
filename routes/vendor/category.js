/**
 * Created by raghav on 06/08/16.
 */
var express = require('express');
var router = express.Router();

var catgCtrl = require('../../controller/category');

router.post ('/', (req, res) => {
    var categoryDetails = {
        name : req.body.name,
        vendor_id : req.body.vendor_id
    };
    console.log(categoryDetails);

    catgCtrl.addCategory(categoryDetails, (err) => {
        if (err) {
            res.json({
                err:err
            });
            return;
        }
        res.json ({
            msg : "category added"
        });
    });
});
module.exports = router;