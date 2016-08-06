/**
 * Created by raghav on 06/08/16.
 */
var express = require('express');
var router = express.Router();

var catgCtrl = require('../../controller/category');

router.post ('/', (req, res) => {
    var categoryDetails = {
        catgName : req.body.name,
        vendorId : req.body.vendorId
    };

    catgCtrl.addCategory (categoryDetails, (err) => {
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