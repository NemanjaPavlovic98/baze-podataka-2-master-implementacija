// const db = require('../db')
// app.get('/:id', (req, res, next) => {
//   db.query('SELECT * FROM test', [req.params.id], (err, result) => {
//     if (err) {
//       return next(err)
//     }
//     res.send(result.rows[0])
//   })
// })


const express = require("express");
const router = express.Router();
const controller = require("../controllers/test");
// const authenticated = require("../middleware/authenticated");

router.get("/get", controller.getAll);
router.get("/get/:id", controller.get);

module.exports = router;
