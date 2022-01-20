const db = require("../db/index");

async function getMesta(req, res, next) {
  try {
    let queryText = `SELECT * FROM mesto`;
    if(req.query.naziv){
      queryText += ` WHERE naziv_mesta LIKE '%${req.query.naziv}%'`
    }
    const result = await db.query(queryText, []);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}

async function postMesto(req, res, next) {
  try {
    const result = await db.query(
      `INSERT INTO mesto(postanski_broj, naziv_mesta) VALUES($1, $2)`,
      [req.body.postanski_broj, req.body.naziv_mesta]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

async function getUlica(req, res, next) {
  try {
    const result = await db.query("SELECT * FROM ulica", []);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ succes: false, message: error });
  }
}

async function getUlicaZaMesto(req, res, next) {
  try {
    const result = await db.query("SELECT * FROM ulica WHERE mesto_id=$1", [+req.params.id]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ succes: false, message: error });
  }
}

async function postUlica(req, res, next) {
  try {
    const result = await db.query(
      `INSERT INTO ulica(mesto_id, naziv_ulice) VALUES($1, $2)`,
      [req.body.mesto, req.body.naziv_ulice]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

async function getAdresa(req, res, next) {
  try {
    const result = await db.query("SELECT * FROM adresa", []);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ succes: false, message: error });
  }
}

async function getAllSum(req, res, nest) {
  try {
    const result = await db.query(
      `
        SELECT me.postanski_broj, ul.naziv_mesta, ul.naziv_ulice, ad.broj 
        FROM mesto me 
        INNER JOIN ulica ul ON me.mesto_id = ul.mesto_id
        INNER JOIN adresa ad ON ul.ulica_id = ad.ulica_id and ul.mesto_id = ad.mesto_id
        `,
      []
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ succes: false, message: error });
  }
}

async function deleteMesto(req, res, next) {
  try {
    const result = await db.query("DELETE FROM mesto WHERE mesto_id = $1", [
      +req.params.id,
    ]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

async function updateMesto(req, res, next) {
  try {
    const result = await db.query(
      `UPDATE mesto SET postanski_broj = $1, naziv_mesta = $2 WHERE mesto_id = $3`,
      [req.body.postanski_broj, req.body.naziv_mesta, +req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

async function updateUlica(req, res, next) {
  console.log(req.body)
  try {
    const result = await db.query(
      `UPDATE ulica SET mesto_id=$1, naziv_ulice = $2, naziv_mesta=$5 WHERE mesto_id = $3 and ulica_id = $4`,
      [req.body.ulica.mesto, req.body.ulica.naziv_ulice, req.body.mesto, +req.params.id, req.body.ulica.naziv_mesta]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

async function deleteUlica(req, res, next) {
  try {
    const result = await db.query("DELETE FROM ulica WHERE mesto_id = $1 and ulica_id = $2", [
      req.body.mesto, +req.params.id,
    ]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

module.exports = {
  getMesta,
  postMesto,
  getUlica,
  getAdresa,
  getAllSum,
  deleteMesto,
  updateMesto,
  postUlica,
  updateUlica,
  deleteUlica,
  getUlicaZaMesto
};
