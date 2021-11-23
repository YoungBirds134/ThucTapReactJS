var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", function (req, res) {
  return res.send({ error: true, message: "hello" });
});
var dbConn = mysql.createConnection({
  host: '172.16.252.13',
  user: "YoungBirds",
  password: "admin",
  database: "school",
  port:3306
});

dbConn.connect(function (err) {
  if (!err) {
    console.log("Connected");
  } else {
    console.log("Connection Failed");
  }
});
app.get("/users", function (req, res) {
 
  try {
 
    dbConn.query("SELECT * FROM students", function (error, results, fields) {
        console.log("NOW");
      if (error) throw error;
      return res.send({ error: false, data: results, message: "users list." });
    });
  } catch (err) {
    console.log("Err Connect:" + err);
  }
});

app.listen(8003, function () {
  console.log("Node app is running on port 8003");
});
module.exports = app;
