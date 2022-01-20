const db = require("../db/index");

async function getJedinicaMere(req, res, next) {
  try {
    const result = await db.query("SELECT * FROM jedinica_mere", []);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ succes: false, message: error });
  }
}

async function postJedinicaMere(req, res, next) {
  try {
    const result = await db.query(
        `INSERT INTO jedinica_mere(naziv_jm) VALUES($1)`,
        [req.body.naziv]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

async function updateJedinicaMere(req, res, next) {
  try {
    const result = await db.query(
        `UPDATE jedinica_mere SET naziv_jm=$1 WHERE sifra_jm = $2`,
        [req.body.naziv, req.params.id]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

async function deleteJedinicaMere(req, res, next) {
  try {
    const result = await db.query(
      "DELETE FROM jedinica_mere WHERE sifra_jm = $1",
      [+req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

module.exports = { getJedinicaMere, postJedinicaMere, deleteJedinicaMere, updateJedinicaMere };
