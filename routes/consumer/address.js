/**
 * Created by raghav on 07/08/16.
 */

var express = require('express');
var router = express.Router();


var addrCtrl = require('../../controller/address');

router.post('/', (req, res) => {
    var addrDetails = {
        line1 : req.body.line1,
        line2 : req.body.line2,
         city : req.body.city,
         country : req.body.country,
         pin_code : req.body.pin_code,
        user_id : req.body.user_id
    };

    addrCtrl.addAddressByUserId(addrDetails, (err) => {
        if (err) {
            res.json({
                err : err
            })
        } else {
            res.json({
                msg : "address added"
            });
        }
    });
});

router.get('/', (req, res) => {
   var addrDetails = {
       user_id : req.body.user_id
   };
   addrCtrl.getAddressByUserId(addrDetails, (err, addrList) => {
      if (err) {
          res.json({
              err : err
          });
      } else {
          res.json({
              msg : "address List is retrieved",
              addrList : addrList
          });
      }
   });
});
module.exports = router;