const db = require("../db/index");

async function getPonude(req, res, next) {
  const parameter = req.query.year ? `_${req.query.year}` : '1';
  console.log(parameter)
  try {
    const result = await db.query(
      `
        select p.ponuda_id, p.opis, p.datum, k.naziv, k.pib, k.mb, k.telefon, m.naziv_mesta, m.postanski_broj, u.naziv_ulice, a.broj 
        from ponuda${parameter} p 
        join kupac k on p.kupac_id = k.kupac_id
        join adresa a on k.adresa_id = a.adresa_id
        join ulica u on a.ulica_id = u.ulica_id
        join mesto m on u.mesto_id = m.mesto_id
    `,
      []
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    if(error.message.includes('relation') &&  error.message.includes('does not exist')){
      res.json({ message: 'Particija tabele za unetu godinu ne postoji' });
    }else{
      res.json({ message: error.message });
    }
  }
}

async function postPonuda(req, res, next) {
  try {
    const result = await db.query(
        `INSERT INTO ponuda1(datum, kupac_id, opis)
        VALUES ($1, $2, $3);`,
        [req.body.datum, +req.body.klijent, req.body.opis]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

module.exports = { getPonude, postPonuda };
