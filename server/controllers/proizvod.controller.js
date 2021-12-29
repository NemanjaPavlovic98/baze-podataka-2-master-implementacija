const db = require("../db/index");

async function getProizvodi(req, res, next) {
  try {
    const result = await db.query("select * from proizvod", []);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ succes: false, message: error });
  }
}

module.exports = { getProizvodi };
