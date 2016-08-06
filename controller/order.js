/**
 * Created by akash on 8/7/16.
 */
var pool = require('../lib/pool').pool;
var mysql = require('mysql');
var async = require('async');

var order = {
    addOrder (order, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                cb(err, null);
                return;
            }

            var query = mysql.format('INSERT INTO user_order_details SET ?', order);
            console.log('Query is',query);
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
            console.log('Query is',query);
            conn.query(query, (err, result) => {
                conn.release();
                cb(err);
            });
        });
    },
    createOrder (orderDetails, cb) {
        async.waterfall([
            (cb) => {
                this.addOrder({
                    user_id: orderDetails.userId
                }, cb)
            },
            (uorderId, cb) => {
                async.each(orderDetails.orders, (order, cb) => {
                    this.addProduct({
                        uorder_id: uorderId,
                        product_id: order.product_id,
                        vendor_id: order.vendor_id,
                        state_id: 0//0 is sth at start
                    }, cb)
                }, cb)
            }
        ], cb)
    }
};

module.exports = order;