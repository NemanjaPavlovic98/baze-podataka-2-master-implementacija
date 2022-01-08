const db = require("../db/index");

async function getKupci(req, res, next) {
  try {
    const kupac = await db.query(
      `select k.kupac_id, k.naziv, k.pib, k.mb, k.telefon,
      k.adresa_id, k.ulica_id, k.mesto_id, a.broj, m.naziv_mesta, u.naziv_ulice, m.postanski_broj
      from kupac k 
      join adresa a on k.adresa_id = a.adresa_id
      join ulica u on a.ulica_id = u.ulica_id
      join mesto m on u.mesto_id = m.mesto_id`,
      []
    );
    res.status(200).json(kupac.rows);
  } catch (error) {
    res.status(404).json({ succes: false, message: error });
  }
}

async function postKupac(req, res, next) {
  const pool = db.pool;
  (async () => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const insertUlicaText = `insert into ulica(mesto_id, naziv_ulice) values($1, $2) returning ulica_id`;
      const ulicaId = await client.query(insertUlicaText, [
        req.body.mesto,
        req.body.ulica,
      ]);

      console.log(ulicaId.rows[0].ulica_id);

      const insertAdresaText = `insert into adresa (ulica_id, mesto_id, broj) values ($1, $2, $3) returning adresa_id`;
      const insertAdresaValues = [
        ulicaId.rows[0].ulica_id,
        req.body.mesto,
        req.body.broj,
      ];
      const adresaId = await client.query(insertAdresaText, insertAdresaValues);

      const insertKupacText = `INSERT INTO kupac(naziv, pib, mb, telefon, adresa_id, ulica_id, mesto_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`;
      const insertKupacValues = [
        req.body.naziv,
        req.body.pib,
        req.body.mb,
        req.body.telefon,
        adresaId.rows[0].adresa_id,
        ulicaId.rows[0].ulica_id,
        req.body.mesto,
      ];
      await client.query(insertKupacText, insertKupacValues);

      await client.query("COMMIT");
      res.status(200).json({ succes: true });
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  })().catch((e) => {
    console.error(e.stack);
    res.status(e.status || 500);
    res.json({ message: e.message });
  });
}

module.exports = { getKupci, postKupac };
