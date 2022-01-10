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
        [req.body.mesto_izdavanja, req.body.datum, req.body.tekuci_racun, req.body.oznaka]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

module.exports = { getOtpremnice, postOtpremnica };
