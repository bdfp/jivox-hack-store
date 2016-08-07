/**
 * Created by raghav on 07/08/16.
 */

var express = require('express');
var router = express.Router();

var searchCtrl = require('../controller/search');

router.post('/', (req, res) => {
    var searchQuery = {
        search_query : req.body.search_query
    };

    searchCtrl.searchQuery(searchQuery, (err, prodList) => {
        if (err) {
            res.json({
                err : err
            });
        } else {
            res.json({
                productList : prodList
            });
        }
    })
});

module.exports = router;