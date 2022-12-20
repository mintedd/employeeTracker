const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  })

db.connect((err) => {
  if (err) {
    throw err
  }
  else {
    console.log("Connected to the employees_db database")
  }
});

module.exports = db;
