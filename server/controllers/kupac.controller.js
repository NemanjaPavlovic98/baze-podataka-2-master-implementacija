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
      const insertAdresaText = `insert into adresa (ulica_id, mesto_id, broj) values ($1, $2, $3) returning adresa_id`;
      const insertAdresaValues = [
        req.body.ulica,
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
        req.body.ulica,
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

async function deleteKupac(req, res, next) {
  try {
    const result = await db.query("DELETE FROM kupac WHERE kupac_id = $1", [
      +req.params.id,
    ]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}
async function updateKupac(req, res, next) {
  console.log(req.body)
  const pool = db.pool;
  (async () => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const insertAdresaText = `insert into adresa (ulica_id, mesto_id, broj) values ($1, $2, $3) returning adresa_id`;
      const insertAdresaValue = [
        req.body.ulica,
        req.body.mesto,
        req.body.broj,
      ];
      const adresaId = await client.query(insertAdresaText, insertAdresaValue);

      const updateKupacText = `UPDATE kupac SET naziv = $1, pib = $2, mb = $3, telefon = $4,
      adresa_id = $5, ulica_id = $6, mesto_id=$7
      WHERE kupac_id = $8 AND adresa_id = $9 AND ulica_id = $10 AND mesto_id=$11`;
      const updateKupacValues = [
        req.body.naziv,
        req.body.pib,
        req.body.mb,
        req.body.telefon,
        adresaId.rows[0].adresa_id,
        req.body.ulica,
        req.body.mesto,
        req.params.id,
        req.body.adresa_id,
        req.body.ulica_id,
        req.body.mesto_id,
      ];
      await client.query(updateKupacText, updateKupacValues);

      const deleteUpdateAdresaText = `DELETE FROM adresa WHERE mesto_id = $1 and ulica_id = $2 and adresa_id=$3`;
      const deleteUpdateAdresaValues = [
        req.body.mesto_id,
        req.body.ulica_id,
        req.body.adresa_id,
      ];
      await client.query(deleteUpdateAdresaText, deleteUpdateAdresaValues);

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

module.exports = { getKupci, postKupac, deleteKupac, updateKupac };
