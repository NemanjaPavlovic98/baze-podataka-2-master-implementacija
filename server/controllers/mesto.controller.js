const db = require("../db/index");

async function getMesta(req, res, next) {
  try {
    const result = await db.query("SELECT * FROM mesto", []);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}

async function postMesto(req, res, next) {
  try {
    const result = await db.query(
        `INSERT INTO mesto(postanski_broj, naziv_mesta) VALUES($1, $2)`,
        [req.body.postanski_broj, req.body.naziv_mesta]);
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

module.exports = { getMesta, postMesto, getUlica, getAdresa, getAllSum };
