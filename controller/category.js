/**
 * Created by raghav on 06/08/16.
 */

var pool = require('../lib/pool').pool;
var mysql = require('mysql');


var category = {

    addCategory (category, cb) {
        if (!category.name || !category.vendor_id) {
            return cb("Parameter missing or unauthorized");
        }
        this.getCategory (category.name, (err, categories) => {
            if (err || categories.length > 0) {
                cb(err || "category already exists");
            } else {
                pool.getConnection((err, conn) => {
                    if (err) {
                        cb(err, null);
                    } else {
                        var query = mysql.format('INSERT INTO category_details SET ?',category);
                        conn.query(query, (err, result) => {
                            conn.release();
                            cb(err);
                        })
                    }
                });
            }
        });

    },
    
    getCategory (name, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                cb(err, null);
            } else {
                var query = mysql.format('SELECT * FROM category_details WHERE name = ?', name );
                conn.query(query, (err, rows) => {
                    conn.release();
                    cb(err, rows);
                });
            }
        });
    },

    getAllCategories(cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                cb(err, null);
            } else {
                conn.query('SELECT * FROM category_details', (err, rows) => {
                    conn.release();
                    if (err) {
                        return cb(err,null);
                    }
                    cb(err,rows);
                })
            }
        });
    }
};

module.exports = category;