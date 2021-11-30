'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST || "172.16.252.13",
  user: process.env.DB_USER || "YoungBirds",
  password: process.env.DB_PASS || "admin",
  database: process.env.DB_NAME || "school",
  port: process.env.DB_PORT||3306
});
db.connect(function (err) {
  if (!err) {
    console.log("Connected");
  } else {
    console.log("Connection Failed");
  }
});
module.exports = db