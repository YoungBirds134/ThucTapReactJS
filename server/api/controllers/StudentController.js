"use strict";
var moment = require("moment");
const util = require("util");
const mysql = require("mysql");
const db = require("./../db");

module.exports = {
  get: (req, res) => {
    let sql = "select * from students ORDER BY students.id desc";
    db.query(sql, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  detail: (req, res) => {
    let sql = "SELECT * FROM students WHERE id = ?";
    db.query(sql, [req.params.id], (err, response) => {
      if (err) throw err;
      res.json(response[0]);
    });
  },
  update: (req, res) => {
    let data = req.body;
    let id = req.params.id;
    let sql = `UPDATE students SET nameStudent='${
      data.nameStudent
    }',phoneStudent='${data.phoneStudent}',dateOfBirth='${moment(
      data.dateOfBirth
    ).format("YYYY-MM-DD")}',scoreStudent='${data.scoreStudent}' WHERE id = '${
      req.params.id
    }'`;
    db.query(sql, [data, id], (err, response) => {
      if (err) throw err;
      res.json({ message: "Update success!" });
    });
  },
  store: (req, res) => {
    const data = req.body;
  
    for (let i = 0; i < data.length; i++) {
    console.log("Taken Data: " + JSON.stringify(data));

      if (data[i].type === "insert") {
        let sql = `INSERT INTO students(id,nameStudent,phoneStudent,dateOfBirth,scoreStudent) 
      VALUES(0,'${data[i].key.nameStudent}','${
          data[i].key.phoneStudent
        }','${moment(data[i].key.dateOfBirth).format("YYYY-MM-DD")}','${
          data[i].key.scoreStudent
        }')`;
        db.query(sql, [data], (err, response) => {
          if (err) throw err;
        return  res.json({ message: "Insert success!" });
        });

        console.log("INSERT");
      } else if (data[i].type === "update") {
        console.log("Taken Data: " + JSON.stringify(data[i]));
        let sql = `UPDATE students SET nameStudent='${
          data[i].key.nameStudent
        }',phoneStudent='${data[i].key.phoneStudent}',dateOfBirth='${moment(
          data[i].key.dateOfBirth
        ).format("YYYY-MM-DD")}',scoreStudent='${
          data[i].key.scoreStudent
        }' WHERE id = '${data[i].key.id}'`;
        db.query(sql, (err, response) => {
          if (err) throw err;
      return    res.json({ message: "Update success!" });
        });

        console.log("UPDATE");
      } else if (data[i].type === "remove") {
        let sql = `DELETE FROM students WHERE id =${data[i].key.id} `;
        db.query(sql,[data], (err, response) => {
          if (err) throw err;
        return  res.json({ message: "Delete success!" });
        });
        console.log("REMOVE");
      } else {
        let sql = `INSERT INTO students(id,nameStudent,phoneStudent,dateOfBirth,scoreStudent) 
          VALUES(0,'${data[i].nameStudent}','${data[i].phoneStudent}','${moment(
          data[i].dateOfBirth
        ).format("YYYY-MM-DD")}','${data[i].scoreStudent}')`;
        db.query(sql, [data], (err, response) => {
          if (err) throw err;
      return    res.json({ message: "Insert success!" });
        });
      }
    }
  },
  delete: (req, res) => {
    let sql = "DELETE FROM students WHERE id = ?";
    db.query(sql, [req.params.id], (err, response) => {
      if (err) throw err;
      res.json({ message: "Delete success!" });
    });
  },
  totalsStudents: (req, res) => {
    let sql = "SELECT COUNT(id) as totalItemPage  FROM students";
    db.query(sql, (err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  pagingStudents: (req, res) => {
    let limit = req.params.limit;
    let numPage = req.params.numPage;
    let currentPage = (numPage - 1) * limit;
    let sql = `SELECT * FROM students ORDER BY students.id asc Limit ${currentPage},${limit}`;
    db.query(sql, (err, response) => {
      if (err) throw err;

      res.json(response);
    });
  },
};
