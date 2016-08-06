/**
 * Created by akash on 8/6/16.
 */
var pool = require('../lib/pool').pool;
var mysql = require('mysql');

var product = {
    add (product, cb) {
       pool.getConnection((err, conn) => {
           if (err) {
               cb(err);
               return;
           }

           var query = mysql.format('INSERT INTO product_details SET ?', product);
           console.log('Query is',query);
           conn.query(query, (err, result) => {
             cb(err);
           });
       });
    },

    getCategory (categoryId, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                cb(err, null);
                return;
            }

            var query = mysql.format('SELECT * FROM product_details AS p ' +
                'INNER JOIN photo_details AS pd ON pd.product_id = p.product_id ' +
                'WHERE p.category_id = ?', categoryId);
            console.log('Query is',query);
            conn.query(query, (err, rows) => {
              cb(err, rows);
            });
        });
    },

    getDetails (productId, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                cb(err, null);
                return;
            }

            var query = mysql.format(
                'SELECT * FROM product_details AS p ' +
                'INNER JOIN photo_details AS pd ON pd.product_id = p.product_id ' +    
                'INNER JOIN rating_details AS r ON p.product_id = r.product_id ' +
                'WHERE product_id = ?', productId);
            console.log('Query is',query);
            conn.query(query, (err, rows) => {
              cb(err, rows);
            });
        });
    }
};

module.exports = product;