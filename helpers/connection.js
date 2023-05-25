var mysql = require('mysql');
const dbConfig = require("../configs/database.js");

var conn = mysql.createConnection({
	host: dbConfig.host,
	user: dbConfig.user,
	password: dbConfig.password,
	database: dbConfig.database,
	port: dbConfig.port
}); 
 
conn.connect(function(err) {
	if (err) throw err;
	console.log('Database is connected successfully !');
});
module.exports = conn;