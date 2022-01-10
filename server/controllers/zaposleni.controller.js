const db = require("../db/index");

async function getZaposleni(req, res, next) {
  try {
    const result = await db.query("SELECT * FROM zaposleni", []);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

async function postZaposleni(req, res, next) {
  try {
    const result = await db.query(
      `INSERT INTO zaposleni(ime, prezime) VALUES($1, $2)`,
      [req.body.ime, req.body.prezime]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

async function updateZaposleni(req, res, next) {
  console.log(req.body)
  console.log(req.params)
  try {
    const result = await db.query(
      `UPDATE zaposleni SET ime = $1, prezime = $2 WHERE zaposleni_id = $3`,
      [req.body.ime, req.body.prezime, +req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

async function deleteZaposleni(req, res, next) {
  try {
    const result = await db.query(
      "DELETE FROM zaposleni WHERE zaposleni_id = $1",
      [+req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

module.exports = { getZaposleni, postZaposleni, deleteZaposleni, updateZaposleni };
