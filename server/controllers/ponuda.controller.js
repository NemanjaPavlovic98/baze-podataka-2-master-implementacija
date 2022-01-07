const db = require("../db/index");

async function getPonude(req, res, next) {
  try {
    const result = await db.query(
      `
        select p.ponuda_id, p.opis, p.datum, k.naziv, k.pib, k.mb, k.telefon, m.naziv_mesta, m.postanski_broj, u.naziv_ulice, a.broj 
        from ponuda1 p 
        join kupac k on p.kupac_id = k.kupac_id
        join adresa a on k.adresa_id = a.adresa_id
        join ulica u on a.ulica_id = u.ulica_id
        join mesto m on u.mesto_id = m.mesto_id
    `,
      []
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(401).json({ succes: false, message: error });
  }
}

module.exports = { getPonude };
