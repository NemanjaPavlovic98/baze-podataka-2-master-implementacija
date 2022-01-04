const db = require("../db/index");

async function getJedinicaMere(req, res, next) {
  try {
    const result = await db.query("SELECT * FROM jedinica_mere", []);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ succes: false, message: error });
  }
}

module.exports = { getJedinicaMere };
