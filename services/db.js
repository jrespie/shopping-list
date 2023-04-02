const mysql = require('mysql');
const conn = mysql.createConnection({
 host: "localhost",
 user: "db_user",
 password: "password",
 database: "shoppinglist",
 port: 3307
});

conn.connect();

module.exports = conn;