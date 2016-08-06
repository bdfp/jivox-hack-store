/**
 * Created by akash on 8/6/16.
 */
var pool = require('../lib/pool').pool;
var mysql = require('mysql');

var photo = {
    add(photo, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                cb(err);
                return;
            }
        
            var query = mysql.format('INSERT INTO photo_details SET ?', photo);
            console.log('Query is',query);
            conn.query(query, (err, result) => {
              cb(err);
            });
        });
    },
    
    getProduct(productId, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                cb(err, null);
                return;
            }
        
            var query = mysql.format('SELECT * FROM photo_details WHERE ' +
                'product_id = ?', productId);
            console.log('Query is',query);
            conn.query(query, (err, rows) => {
              cb(err, rows);
            });
        });
    }
};

module.exports = photo;