/**
 * Created by akash on 8/6/16.
 */
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var adminCtrl = require('../controller/admin');
var config = require('../config');

router.post('/login', (req, res) => {
    var adminDetails = {
        email: req.body.email,
        password: req.body.password
    };

    adminCtrl.verifyAdmin(adminDetails, (err, admin) => {
        if (err) {
            res.json({
                err: err
            });
            return
        }

        delete admin.password;

        var token = jwt.sign({
            vendor_id: admin.vendor_id
        }, config.jwt.secret);

        res.json({
            msg: "login successful",
            admin: admin,
            token: token
        })
    })
});

router.post('/signup', (req, res) => {
    var adminDetails = {
        email: req.body.email,
        password: req.body.password
    };

    adminCtrl.addAdmin(adminDetails, (err) => {
        if (err) {
            res.status(403).json({
                err: err
            });
        } else {
            res.json({
                msg: "admin signed up"
            });
        }
    })
});

module.exports = router;

