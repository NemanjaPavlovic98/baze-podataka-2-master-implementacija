const db = require("../db/index");

async function getZaposleni(req, res, next) {
  try {
    const result = await db.query("SELECT * FROM zaposleni", []);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ succes: false, message: error });
  }
}

async function postZaposleni(req, res, next) {
  try {
    const result = await db.query(
        `INSERT INTO zaposleni(ime, prezime) VALUES($1, $2)`,
        [req.body.ime, req.body.prezime]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

module.exports = { getZaposleni, postZaposleni };
