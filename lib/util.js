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
                res.json({
                    err: err
                });
                next();
            } else {
                if (vendor) {
                    req.body.vendorId = decoded.vendorId;
                } else {
                    req.body.userId = decoded.userId;
                }
                next();
            }
        });
    }
};