/**
 * Created by akash on 8/6/16.
 */
var jwt = require('jsonwebtoken');

var config = require('../config');

module.exports = {
    jwtMiddleware: (req, res, next, vendor) => {
        var token = req.header("Authorization");
        jwt.verify(token, config.jwt.secret, (err, decoded) => {
            if (err) {
                res.status(403).json({
                    err: err
                });
            } else {
                if (vendor) {
                    req.body.vendor_id = decoded.vendor_id;
                    console.log('decoded vendor id', decoded);
                } else {
                    req.body.user_id = decoded.user_id;
                    console.log('decoded consumer id', decoded);
                }
                next();
            }
        });
    }
};