/**
 * Created by raghav on 06/08/16.
 */

var pool = require('../lib/pool').pool;
var mysql = require('mysql');

var ratings = {
      getRatingsByProductId (params, cb) {
          if (!params.productId) {
              return cb("Parameter missing");
          }
          pool.getConnection((err, conn) => {
             if (err) {
                 cb (err);
             }  else {
                 var query = mysql.format("SELECT rating.rating_details,name.user_details from rating_details " +
                                         "INNER JOIN user_details WHERE user_id.user_details = user_id.rating_details " +
                                          "AND product_details.rating_details = ?", params.productId);
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
        if (!params.productId || !params.userId) {
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