/**
 * Created by raghav on 06/08/16.
 */
var express = require('express');
var router = express.Router();

var catgCtrl = require('../../controller/category');

router.get('/', (req, res) => {
    catgCtrl.getAllCategories((err, catgList) => {
        if (err) {
            res.json({
                err:err
            });
            return;
        }
        res.json({
            msg : "list retrieved",
            catgList : catgList
        });
    });
});

module.exports = router;
