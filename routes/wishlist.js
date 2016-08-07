/**
 * Created by akash on 8/6/16.
 */
var express = require('express');
var router = express.Router();

var wishlistCtrl = require('../controller/wishlist');

router.get('/', (req, res) => {
    console.log(req.body.user_id);
    
    wishlistCtrl.getWishlist(req.body.user_id, (err, wlist) => {
       if (err) {
           res.json({
               err: err
           });
            return 
       }
        
       res.json({
           msg: "Wishlist retrieved",
           wishlist: wlist
       });
    });
});

router.post('/', (req, res) => {
    var wishlist = {
        user_id: req.body.userId,
        product_id: req.body.product_id
    };
    
    wishlistCtrl.addWishlist(wishlist, (err) => {
        if (err) {
            res.json({
                err: err
            });
            return
        }
        
        res.json({
            msg: "Wishlist added"
        });
    }) 
});

module.exports = router;