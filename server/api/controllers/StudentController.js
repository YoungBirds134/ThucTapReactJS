"use strict";

const util = require("util");
const mysql = require("mysql");
const db = require("./../db");

module.exports = {
  get: (req, res) => {
    let sql = "select * from students";
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
    let sql = "UPDATE students SET ? WHERE id = ?";
    db.query(sql, [data, id], (err, response) => {
      if (err) throw err;
      res.json({ message: "Update success!" });
    });
  },
  store: (req, res) => {
    console.log(req)
    const data = req.body;
   
    // let sql = `INSERT INTO students(nameStudent,phoneStudent,dateOfBirth,scoreStudent)
    //  Value('${data.nameStudent}',${data.phoneStudent},${data.dateOfBirth},${data.scoreStudent})`;


    let sql = `INSERT INTO students(id,nameStudent,phoneStudent,dateOfBirth,scoreStudent) 
    VALUES(0,'${data.nameStudent}','${data.phoneStudent}','${data.dateOfBirth}','${data.scoreStudent}')`;
    db.query(sql, [data], (err, response) => {
      if (err) throw err;
      res.json({ message: "Insert success!" });
    });
  },
  delete: (req, res) => {
    let sql = "DELETE FROM students WHERE id = ?";
    db.query(sql, [req.params.id], (err, response) => {
      if (err) throw err;
      res.json({ message: "Delete success!" });
    });
  },
};
