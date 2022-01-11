const db = require("../db/index");

async function getOtpremnice(req, res, next) {
  try {
    const result = await db.query(
      `
      select o.*, k.izdanje from otpremnica o
      join knjigatocenjaosnovno k
      on o.oznaka = k.oznaka
    `,
      []
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ succes: false, message: error });
  }
}

async function postOtpremnica(req, res, next) {
  try {
    const result = await db.query(
      `INSERT INTO otpremnica (mesto_izdavanja, datum, tekuci_racun, oznaka)
        VALUES ($1, $2, $3, $4)`,
      [
        req.body.mesto_izdavanja,
        req.body.datum,
        req.body.tekuci_racun,
        req.body.oznaka,
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

async function deleteOtpremnica(req, res, next) {
  try {
    const result = await db.query(
      "DELETE FROM otpremnica WHERE broj_otpremnice = $1",
      [+req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

async function updateOtpremnica(req, res, next) {
  try {
    const result = await db.query(
      `UPDATE otpremnica SET mesto_izdavanja = $1, datum = $2, tekuci_racun = $3, oznaka = $4 WHERE broj_otpremnice = $5`,
      [req.body.mesto_izdavanja, req.body.datum, req.body.tekuci_racun, req.body.oznaka, +req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

module.exports = {
  getOtpremnice,
  postOtpremnica,
  updateOtpremnica,
  deleteOtpremnica,
};
