var pool = require('../lib/pool').pool;
var mysql = require('mysql');

var wishlist = {
  addWishlist (wishlist, cb) {
    pool.getConnection((err, conn) => {
        if (err) {
            cb(err);
            return;
        }

        var query = mysql.format('INSERT INTO wishlist_details SET ?', wishlist);
        console.log('Query is',query);
        conn.query(query, (err, result) => {
            if (!err) {
                conn.release();
            }
            
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

        var query = mysql.format('SELECT * FROM wishlist_details WHERE user_id = ?', userId);
        console.log('Query is',query);
        conn.query(query, (err, rows) => {
            if (!err) {
                conn.release();
            }
            cb(err, rows);
        });
    });
  }
};

module.exports = wishlist;
