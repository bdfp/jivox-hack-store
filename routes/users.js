var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var user = require('../controller/users');
var config = require('../config');

/* GET users listing. */
router.post('/', function(req, res) {
  user.getUser(req.body.email, (err, users) => {
      if (err) {
          res.json({
              err: err
          });
          return
      }

      res.json({
          users: users,
          msg: "users retrieved"
      });
  });
});

router.post('/login', (req, res) => {
    var userDetails = {
        email: req.body.email,
        password: req.body.password
    };

    user.verifyUser(userDetails, (err, user) => {
        if (err) {
            res.status(403).json({
                err: err
            });
            return
        }

        delete user.password;
        
        var token = jwt.sign({
            user_id: user.user_id
        }, config.jwt.secret);

        res.json({
            msg: "login successful",
            user: user,
            token: token
        })
    })
});

router.post('/signup', (req, res) => {
  var userDetails = {
      email: req.body.email,
      password: req.body.password
  };

  user.addUser(userDetails, (err) => {
      if (err) {
          res.status(403).json({
              err: err
          });
      } else {
          res.json({
              msg: "user signed up"
          });
      }
  })
});

module.exports = router;
