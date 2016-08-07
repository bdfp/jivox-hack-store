/**
 * Created by raghav on 07/08/16.
 */

var pool = require('../lib/pool').pool;
var mysql = require('mysql');

var address = {
    /*
       get the address of user by id
     */
    getAddressByUserId (params, cb) {
        if(!params.user_id){
            return cb("unauthorized");
        }
        pool.getConnection((err, conn) => {
           if (err) {
               return cb(err);
           }
           var query = mysql.format("SELECT * FROM address_details WHERE user_id = ?", params.user_id);
            conn.query(query, (err, rows) => {
                conn.release();
                if (err) {
                    cb(err, null);
                } else {
                    cb(null, rows);
                }
            });
        });
    },

    /*
    add the address of user by the id
     */
    addAddressByUserId (params, cb) {
        if(!params.user_id) {
            return cb("Unauthorized");
        }
        pool.getConnection((err, conn) => {
            if (err) {
                cb(err);
            } else {
                var query = mysql.format("INSERT INTO address_details SET ?", params);
                conn.query(query, (err) => {
                    conn.release();
                    cb(err);
                });
            }
        });
    }
};

module.exports = address;