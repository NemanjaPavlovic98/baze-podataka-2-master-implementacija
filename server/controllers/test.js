const db = require("../db/index");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { ExtractJwt } = require("passport-jwt");

function getAll(req, res, next) {
  db.query("SELECT * FROM test", [], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
}

function get(req, res, next) {
    db.query("SELECT * FROM test WHERE id = $1", [req.params.id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  }

module.exports = { getAll, get };
