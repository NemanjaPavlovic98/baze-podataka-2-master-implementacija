const db = require("../db/index");

async function getProizvodi(req, res, next) {
  try {
    const result = await db.query("select * from proizvod", []);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

async function getProizvod(req, res, next) {
  try {
    const result = await db.query(
      "select * from proizvod where proizvod_id = $1",
      [+req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

async function updateProizvod(req, res, next) {
  try {
    const result = await db.query(
      "UPDATE proizvod SET naziv=$1, sifra_jm=$2, pdv_id=1, p_info=($3, $4, $5) WHERE proizvod_id=$6",
      [
        req.body.naziv,
        req.body.jedinica,
        req.body.opis,
        +req.body.jacina,
        req.body.lab,
        +req.params.id,
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

async function postProizvod(req, res, next) {
  try {
    const result = await db.query(
      `INSERT INTO proizvod (naziv, sifra_jm, pdv_id, p_info)
        VALUES ($1, $2, 1, ($3, $4, $5));`,
      [
        req.body.naziv,
        req.body.jedinica,
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

async function getCeneZaProizvod(req, res, next) {
  try {
    const result = await db.query(
      "select c.iznos, c.datum, p.naziv, c.proizvod_id from cena c join proizvod p on c.proizvod_id = p.proizvod_id where c.proizvod_id = $1",
      [req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

async function postCeneZaProizvod(req, res, next) {
  try {
    const result = await db.query(
      `INSERT INTO cena(proizvod_id, datum, iznos) VALUES($1, $2, $3)`,
      [req.body.proizvod_id, req.body.datum, req.body.cena]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

async function deleteProizvod(req, res, next) {
  try {
    const result = await db.query(
      "DELETE FROM proizvod WHERE proizvod_id = $1",
      [+req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

async function deleteCeneZaProizvod(req, res, next) {

  try {
    const result = await db.query(
      "DELETE FROM cena WHERE proizvod_id = $1 and datum = $2",
      [+req.body.proizvod_id, req.body.datum]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

module.exports = {
  getProizvodi,
  postProizvod,
  getCeneZaProizvod,
  postCeneZaProizvod,
  deleteProizvod,
  deleteCeneZaProizvod,
  getProizvod,
  updateProizvod,
};
