/**
 * Created by raghav on 06/08/16.
 */

var pool = require('../lib/pool').pool;
var mysql = require('mysql');
var async = require('async');

var ratings = {
      getRatingsByProductId (params, cb) {
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
              if (err) {
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
      },
    getTotalRatings (params, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                cb(err, null);
            } else {
                var query = mysql.format("SELECT sum(rating) AS sum, count(rating) AS co FROM rating_details " +
                    "WHERE product_id = ?", params.product_id);
                conn.query(query, (err, rows) => {
                    conn.release();
                    console.log("Sum" ,rows);
                    cb(err, rows[0], params);
                })
            }
        });
    },
    updateRating (rating, params, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                cb(err);
            } else {
                var avg = parseFloat(rating.sum) / parseFloat(rating.co);
                var query = mysql.format("UPDATE product_details SET cum_rating = ? where product_id = ?",
                    [avg, params.product_id]);
                conn.query(query, (err, rows) => {
                    conn.release();
                        cb(err);

                })
            }
        });
    },

    setRatings (param, cb) {
        async.waterfall ([
            (cb) => this.addRatingsByProductId(param, cb),
            (row, cb) => this.getTotalRatings(param, cb),
            (row, param, cb) => this.updateRating(row, param, cb)
        ], cb);
    }
};

module.exports = ratings;