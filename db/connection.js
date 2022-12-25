const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_NAME,
    password: process.env.DB_USER,
    database: process.env.DB_PASSWORD,
});

connection.connect(function (err) {
    if (err) throw err;
  });
  
  module.exports = db; 
  //index.js line 5 or should it be connection? cause of line 4 on this file?

  