/**
 * Created by raghav on 06/08/16.
 */

var pool = require('../lib/pool').pool;
var mysql = require('mysql');


var labels = {

    addLabel(label,cb) {
        if (!label.name) {
            return cb("Parameter missing");
        }
        this.getLabel(label.name, (err, labels) => {
            if(err || labels.length > 0){
                cb(err || "label already exists");
            } else {
                pool.getConnection((err, conn) => {
                   if (err) {
                       cb(err, null);
                   } else {
                       var query = mysql.format('INSERT INTO labels_details SET ?',label);
                       conn.query(query, (err, result) => {
                          conn.release();
                           cb(err);
                       })
                   }
                });
            }
        });

    },
    getLabel(name,cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                cb(err, null);
            } else {
                var query = mysql.format('SELECT * FROM labels_details WHERE name = ?', name );
                conn.query(query, (err, rows) => {
                   conn.release();
                    cb(err,rows);
                });
            }
        });
    },

    getAllLabels(cb) {
        pool.getConnection((err, conn) => {
           if (err) {
               cb(err, null);
           } else {

           }
        });
    }
};

module.exports = label;