/**
 * Created by akash on 8/6/16.
 */
var pool = require('../lib/pool').pool;
var mysql = require('mysql');
var async = require('async');

var product = {
    add (product, cb) {
       pool.getConnection((err, conn) => {
           if (err) {
               cb(err, null);
               return;
           }

           var query = mysql.format('INSERT INTO product_details SET ?', product);
           console.log('Query is',query);
           conn.query(query, (err, result) => {
               if (err) {
                   cb(err, null);
               } else {
                   conn.release();
                   cb(err, result.insertId);
               }
           });
       });
    },

    getCategory (categoryId, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                cb(err, null);
                return;
            }

            async.waterfall([
                (cb) => {
                    var query = mysql.format('SELECT * FROM product_details AS p ' +
                        'WHERE p.category_id = ?', categoryId);
                    console.log('Query is',query);
                    conn.query(query, (err, rows) => {
                        cb(err, rows);
                    });
                },
                (rows, cb) => {
                    async.map(rows, (row, cb) => this.getPhotoUrl(row, conn, cb), cb)
                }
            ], (err, res) => {
                if (err) {
                    cb(err, null);
                } else {
                    conn.release();
                    cb(err, res);
                }
            });
        });
    },

    getPhotoUrl (product, conn, cb) {
        var query = mysql.format('SELECT url FROM photo_details ' +
            'WHERE product_id = ?', product.product_id);
        console.log('Query is',query);
        conn.query(query, (err, purls) => {
            product.photos = purls;
            cb(err, product);
        });
    },

    getRatings (product, conn, cb) {
        var query = mysql.format('SELECT * FROM rating_details ' +
            'WHERE product_id = ?', product.product_id);
        console.log('Query is',query);
        conn.query(query, (err, ratings) => {
            product.ratings = ratings;
            cb(err, product);
        });
    },

    getDetails (productId, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                cb(err, null);
                return;
            }

            async.waterfall([
                (cb) => {
                    var query = mysql.format(
                        'SELECT * FROM product_details AS p ' +
                        'WHERE p.product_id = ? LIMIT 1', productId);
                    console.log('Query is',query);
                    conn.query(query, (err, rows) => {
                        cb(err, rows[0]);
                    });
                },
                (row, cb) => {
                    this.getPhotoUrl(row, conn, cb);
                },
                (row, cb) => {
                    this.getRatings(row, conn, cb);
                }
            ], (err, res) => {
                if (err) {
                    cb(err, null);
                } else {
                    conn.release();
                    cb(err, res);
                }
            });
        });
    }
};

module.exports = product;