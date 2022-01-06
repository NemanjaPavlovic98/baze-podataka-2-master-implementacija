const db = require("../db/index");

async function getProizvodi(req, res, next) {
  try {
    const result = await db.query("select * from proizvod", []);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ succes: false, message: error });
  }
}

async function postProizvod(req, res, next) {
  try {
    const result = await db.query(
      `INSERT INTO proizvod (naziv, sifra_jm, pdv_id, p_info)
        VALUES ($1, $2, $3, ($4, $5, $6));`,
      [
        req.body.naziv,
        req.body.jedinica,
        req.body.pdv_id,
        req.body.opis,
        +req.body.jacina,
        req.body.lab,
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

module.exports = { getProizvodi, postProizvod };
