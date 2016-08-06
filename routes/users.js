var express = require('express');
var router = express.Router();

var user = require('../controller/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', (req, res) => {
    user.verifyUser(req.body.user, (err, user) => {
        delete user.password;
        res.json({
            msg: "login successful",
            user: user
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
