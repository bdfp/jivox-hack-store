var pool = require('../lib/pool').pool;
var mysql = require('mysql');

var wishlist = {
  addWishlist (wishlist, cb) {
    pool.getConnection((err, conn) => {
        if (err) {
            cb(err);
            return;
        }

        var query = mysql.format('INSERT INTO wishlist SET ?', wishlist);
        console.log('Query is',query);
        conn.query(query, (err, result) => {
          cb(err);
        });
    });
  },

  getWishlist (userId, cb) {
    pool.getConnection((err, conn) => {
        if (err) {
          
            cb(err, null);
            return;
        }

        var query = mysql.format('SELECT * FROM wishlist WHERE user_id = ?', userId);
        console.log('Query is',query);
        conn.query(query, (err, rows) => {
          
          cb(err, rows);
        });
    });
  }
}

module.exports = wishlist;
