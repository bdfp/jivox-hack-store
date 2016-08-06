var pool = require('../lib/pool').pool;
var bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');

var admin = {
    addAdmin (admin, cb) {
      if (!admin.email || !admin.password) {
        return cb("Params missing");
      }

      admin.password = bcrypt.hashSync(admin.password);

      this.getAdmin(admin.email, (err, admins) => {
        if(err || admins.length > 0) {
         cb(err || "admin already exists");
        } else if (admins.length === 0) {
          pool.getConnection((err, conn) => {
            if (err) {
              cb(err);
            } else {
              var query = mysql.format('INSERT INTO vendor_details SET ?', admin);
              console.log('Query is',query);
              conn.query(query, (err, result) => {
                
                cb(err);
              });
            }
          });
        }
      });

    },

    getAdmin (email, cb)  {
      pool.getConnection((err, conn) => {
        if (err) {
          conn.release();
          cb(err, null);
        } else {
          var query = mysql.format('SELECT * FROM vendor_details WHERE email = ?',[email]);
          console.log(query) ;
          conn.query(query , (err, rows) => {
              conn.release();
              cb(err, rows);
          });
        }
      });

    },

    getAllAdmins (cb) {
        pool.getConnection((err, conn) => {
            if (err) {
              conn.release();
                cb(err, null);
                return;
            }

            conn.query('SELECT id, name, email, phone FROM vendor_details', (err, rows) => {
                conn.release();
                if (err) {
                    return cb(err, null);
                }

                cb(err, rows);
            });
        });
    },

    verifyAdmin (admin, cb) {
      this.getAdmin(admin.email, (err, admins) => {
        if(err) {
          cb(err, null);
        } else if(admins.length > 0) {
          var adminFromDb = admins[0];

          if(bcrypt.compareSync(admin.password, adminFromDb.password)) {
            cb(null, adminFromDb);
          } else {
            console.log('Paa', admin.password, adminFromDb.password);
            cb("Wrong Password", null);
          }
        } else {
          cb("No admin found", null);
        }
      });
    }
};

module.exports = admin;
