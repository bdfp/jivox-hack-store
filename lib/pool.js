var mysql = require('mysql'),
	config = require('../config').database,
	pool;

console.log('The config is', config);

pool = mysql.createPool(config);

exports.pool = pool;
