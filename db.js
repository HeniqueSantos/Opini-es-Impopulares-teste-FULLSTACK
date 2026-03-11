const mysql = require('mysql2');

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"opiniao_site"
});

module.exports = db;
