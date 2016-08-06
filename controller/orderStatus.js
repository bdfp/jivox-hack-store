/**
 * Created by akash on 8/7/16.
 */
var pool = require('../lib/pool').pool;
var mysql = require('mysql');

var orderStatus = {
    add(name, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                cb(err);
                return;
            }
        
            var query = mysql.format('INSERT INTO order_status_details SET ?', {
                name: name
            });
            console.log('Query is',query);
            conn.query(query, (err, result) => {
                conn.release();
                cb(err);
            });
        });
    },
    get(cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                cb(err, null);
                return;
            }
            
            conn.query('SELECT * FROM order_status_details', (err, sDetails) => {
              if (err) {
                  cb(err, null);
              } else {
                  conn.release();
                  cb(err, sDetails);
              }
            });
        });
    }
};

module.exports = orderStatus;