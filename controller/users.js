var pool = require('../lib/pool').pool;
var bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');

var user = {
    addUser (user, cb) {
      if (!user.email || !user.password) {
        return cb("Params missing");
      }

      user.password = bcrypt.hashSync(user.password);

      this.getUser(user.email, (err, users) => {
        if(err || users.length > 0) {
         cb(err || "User already exists");
        } else if (users.length === 0) {
          pool.getConnection((err, conn) => {
            if (err) {
              cb(err);
            } else {
              var query = mysql.format('INSERT INTO user_details SET ?', user);
              console.log('Query is',query);
              conn.query(query, (err, result) => {
                conn.release();
                cb(err);
              });
            }
          });
        }
      });

    },

    getUser (email, cb)  {
      pool.getConnection((err, conn) => {
        if (err) {
          cb(err, null);
        } else {
          var query = mysql.format('SELECT * FROM user_details WHERE email = ?', email);
          console.log(query) ;
          conn.query(query , (err, rows) => {
              conn.release();
              cb(err, rows);
          });
        }
      });

    },

    getAllUsers (cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                cb(err, null);
                return;
            }

            conn.query('SELECT id, name, email, phone FROM user_details', (err, rows) => {
                conn.release();
                if (err) {
                    return cb(err, null);
                }

                cb(err, rows);
            });
        });
    },

    verifyUser (user, cb) {
      this.getUser(user.email, (err, users) => {
        if(err) {
          cb(err, null);
        } else if(users.length > 0) {
          var userFromDb = users[0];

          if(bcrypt.compareSync(user.password, userFromDb.password)) {
            cb(null, userFromDb);
          } else {
            console.log('Paa', user.password, userFromDb.password);
            cb("Wrong Password", null);
          }
        } else {
          cb("No User found", null);
        }
      });
    }
};

module.exports = user;
