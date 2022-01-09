const db = require("../db/index");

async function getOtpremnice(req, res, next) {
  try {
    const result = await db.query(
      `
        select o.broj_otpremnice, o.mesto_izdavanja, o.datum, o.tekuci_racun, o.oznaka, k.izdanje
        from otpremnica o 
        inner join knjigatocenjaosnovno k
        on o.oznaka = k.oznaka
    `,
      []
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ succes: false, message: error });
  }
}

// async function postJedinicaMere(req, res, next) {
//   try {
//     const result = await db.query(
//         `INSERT INTO jedinica_mere(naziv_jm) VALUES($1)`,
//         [req.body.naziv]);
//     res.status(200).json(result.rows);
//   } catch (error) {
//     res.status(error.status || 500);
//     res.json({ message: error.message });
//   }
// }

module.exports = { getOtpremnice };
