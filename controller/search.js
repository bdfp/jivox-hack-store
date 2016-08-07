/**
 * Created by raghav on 07/08/16.
 */
var pool = require('../lib/pool').pool;
var mysql = require('mysql');
var async = require('async');


var productsCtrl = require('./product');
var category = require('./category');


var search = {
    searchQuery (param, cb) {
        if (!param.search_query) {
            return cb("Paramete missing");
        }
        this.getCategory((err, catgList) => {
            if (err) {
                return cb(err);
            }
            //extracting all category names
            var catList = [];

            for(var i = 0;i < catgList.length; i++){
                catList.push({name : catgList[i]["name"], id : catgList[i]["category_id"]});
            }

            var regexArray = [];// array containing regex of all categories
            for (var k = 0;k < catList.length; k++){
                var regex = new RegExp(catList[k].name, 'g') ;
                regexArray.push(regex);
            }

            //spliting search params by space
            var searchList = param.search_query.split(' ');

            var catgFound = [];
            for(var g = 0; g < regexArray.length; g++){
                for(var j = 0; j < searchList.length; j++){
                    if (searchList[j].match(regexArray[g])) {
                        catgFound.push(catList[g]);
                    }
                }
            }
            var catdIdList = [];
            for(var h = 0; h < catgFound.length; h++) {
                catdIdList.push(catgFound[h]["id"]);
            }

                async.map(catdIdList, this.getProductDetails, (err, products) => {
                        if (err) {
                            cb(err,null);
                        } else {
                            var prodId;
                            prodId = products.map((obj) => {
                                return obj.product_id;
                            });

                            async.map(products, (prod, cb) => {
                                productsCtrl.getPhotoUrl(prod, null, cb)
                            }, cb);

                            //cb(null,products);
                        }
                });
        });
    },

    getProductDetails(result, cb) {
        pool.getConnection((err, conn) => {
           if (err) {
               cb(err, null);
           } else {
               var query = mysql.format('SELECT * FROM product_details where category_id = ?', result);
               conn.query(query, (err, rows) => {
                        if (err) {
                            cb(err, null);
                        } else {
                            console.log("Rows", rows);
                            cb(err, rows[0]);
                        }
               });
           }
        });
    },


    getCategory (cb) {
        pool.getConnection((err, conn) => {
           if (err) {
               cb(err);
           } else {
               conn.query("SELECT * FROM category_details", (err, rows) => {
                   conn.release();
                  if (err) {
                      console.log(err);
                      cb(err, null);
                  } else {
                      cb(null, rows);
                  }
               });
           }
        });
    }
};

module.exports = search;