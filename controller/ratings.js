/**
 * Created by raghav on 06/08/16.
 */

var pool = require('../lib/pool').pool;
var mysql = require('mysql');

var ratings = {
      getRatingsByProductId (params, cb) {
          console.log(params.product_id)
          if (!params.product_id) {
              return cb("Parameter missing");
          }
          pool.getConnection((err, conn) => {
             if (err) {
                 cb (err);
             }  else {
                 var query = mysql.format("SELECT rating_details.rating,user_details.name from rating_details " +
                                         "INNER JOIN user_details WHERE user_details.user_id = rating_details.user_id " +
                                          "AND rating_details.product_id = ?", params.product_id);
                 conn.query(query, (err, rows) => {
                     conn.release();
                    if (err) {
                        cb(err, null);
                    } else {
                        cb(null, rows);
                    }
                 });
             }
          });
      },

    addRatingsByProductId (params, cb) {
        if (!params.product_id || !params.user_id) {
            return cb("Parameter missing or unauthorized");
        }
        pool.getConnection((err, conn) => {
           if (err){
               cb(err);
           } else {
               var query = mysql.format("INSERT INTO rating_details SET ?", params);
               conn.query(query, (err, rows) => {
                   conn.release();
                   if (err) {
                       cb(err);
                   } else {
                       cb(null, rows);
                   }
               })
           }
        });
    }
};

module.exports = ratings;