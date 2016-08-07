/**
 * Created by akash on 8/7/16.
 */
var pool = require('../lib/pool').pool;
var mysql = require('mysql');
var async = require('async');

var productCtrl = require('./product');

var orderFunc = {
    addOrder (order, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                cb(err, null);
                return;
            }

            var query = mysql.format('INSERT INTO user_order_details SET ?', order);
            console.log('Query is', query);
            conn.query(query, (err, result) => {
                if (err) {
                    cb(err, result);
                    return;
                }

                conn.release();
                cb(err, result.insertId);
            });
        });
    },
    addProduct (product, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                cb(err);
                return;
            }

            var query = mysql.format('INSERT INTO order_details SET ?', product);
            console.log('Query is', query);
            conn.query(query, (err, result) => {
                conn.release();
                cb(err);
            });
        });
    },
    getUserOrder (userId, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                cb(err, null);
                return;
            }
        
            var query = mysql.format('SELECT * FROM user_order_details WHERE ' +
                'user_id = ?', userId);
            console.log('Query is',query);
            conn.query(query, (err, orders) => {
                if (!err) {
                    conn.release();
                }
                cb(err, orders);
            });
        });
    },
    getOrderDetails (uorderId, order, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                cb(err, order);
                return;
            }
        
            var query = mysql.format('SELECT * FROM order_details AS o ' +
                'INNER JOIN product_details AS p ON o.product_id = p.product_id ' +
                'INNER JOIN order_status_details AS osd ON osd.state_id = o.state_id ' +
                'WHERE uorder_id = ?', uorderId);
            console.log('Query is',query);
            conn.query(query, (err, products) => {
                if (err) {
                    cb(err, order);
                    return;
                }
                console.log("Products", products);
                conn.release();
                order.products = products;
                cb(null, order);
            });
        });
    }
};

module.exports = {
    createOrder (orderDetails, cb) {
        async.waterfall([
            (cb) => {
                orderFunc.addOrder({
                    user_id: orderDetails.userId
                }, cb)
            },
            (uorderId, cb) => {
                async.each(orderDetails.orders, (order, cb) => {
                    order.addProduct({
                        uorder_id: uorderId,
                        product_id: order.product_id,
                        vendor_id: order.vendor_id,
                        state_id: 1//1 is sth at start
                    }, cb)
                }, cb)
            }
        ], cb)
    },
    getOrder (userId, cb) {
        async.waterfall([
            (cb) => {
                orderFunc.getUserOrder(userId, cb);
            },
            (orders, cb) => {
                async.map(orders, (order, cb) => {
                    orderFunc.getOrderDetails(order.uorder_id, order, cb)
                }, cb)
            }
        ], cb)
    },
    getVendorOrder (vendor_id, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                cb(err, null);
                return;
            }

            var query = mysql.format('SELECT * FROM order_details AS o ' +
                'INNER JOIN product_details AS p ON o.product_id = p.product_id ' +
                'WHERE o.vendor_id = ?', vendor_id);
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
