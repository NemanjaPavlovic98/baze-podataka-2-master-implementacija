const db = require("../db/index");

async function getRacuni(req, res, next) {
  try {
    const result = await db.query(
      `
      select r.broj_racuna, r.mesto_izdavanja, r.datum, r.poziv_na_broj, r.broj_otpremnice, r.ukupan_iznos, o.tekuci_racun, o.oznaka
      from racun r join otpremnica o
      on r.broj_otpremnice = o.broj_otpremnice
    `,
      []
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

async function getRacun(req, res, next) {
  try {
    const result = await db.query(`select * from racun where broj_racuna=$1`, [
      +req.params.id,
    ]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

async function postRacun(req, res, next) {
  const pool = db.pool;
  (async () => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const insertRacunText = `INSERT INTO racun (mesto_izdavanja, datum, poziv_na_broj, broj_otpremnice)
        VALUES ($1, $2, $3, $4) RETURNING broj_racuna`;
      const insertRacunValues = [
        req.body.mesto_izdavanja,
        req.body.datum,
        req.body.poziv_na_broj,
        req.body.otpremnica_id,
      ];
      const racun = await client.query(insertRacunText, insertRacunValues);

      if (req.body.stavke_racuna.length <= 0) {
        throw { status: 500, message: "Niste dodali stavke racuna" };
      }

      req.body.stavke_racuna.forEach(async (stavkaRacuna) => {
        const insertStavkaText = `INSERT INTO stavka_racuna(broj_racuna, kolicina, iznos, proizvod_id)
        VALUES ($1, $2, $3, $4)`;
        await client.query(insertStavkaText, [
          racun.rows[0].broj_racuna,
          stavkaRacuna.kolicina,
          stavkaRacuna.iznos,
          stavkaRacuna.proizvod_id,
        ]);
      });

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

async function updateRacun(req, res, next) {
  const pool = db.pool;
  (async () => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      if (req.body.stavke_racuna.length <= 0) {
        throw { status: 500, message: "Niste dodali stavke racuna" };
      }

      const deleteStavkeZaRacunText = `DELETE FROM stavka_racuna WHERE broj_racuna=$1`;
      await client.query(deleteStavkeZaRacunText, [+req.params.id]);

      req.body.stavke_racuna.forEach(async (stavkaRacuna) => {
        const insertStavkaText = `INSERT INTO stavka_racuna(broj_racuna, kolicina, iznos, proizvod_id)
        VALUES ($1, $2, $3, $4)`;
        await client.query(insertStavkaText, [
          +req.params.id,
          stavkaRacuna.kolicina,
          stavkaRacuna.iznos,
          stavkaRacuna.proizvod_id,
        ]);
      });

      const insertRacunText = `UPDATE racun SET mesto_izdavanja = $1, datum = $2, poziv_na_broj = $3, broj_otpremnice = $4
        WHERE broj_racuna=$5`;
      const insertRacunValues = [
        req.body.mesto_izdavanja,
        req.body.datum,
        req.body.poziv_na_broj,
        req.body.otpremnica_id,
        +req.params.id,
      ];
      await client.query(insertRacunText, insertRacunValues);

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

async function getStavkeZaRacun(req, res, next) {
  try {
    const result = await db.query(
      `select sr.*, p.naziv
      from stavka_racuna sr
      join proizvod p on sr.proizvod_id = p.proizvod_id
      where sr.broj_racuna = $1
      `,
      [req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ succes: false, message: error });
  }
}

async function deleteRacun(req, res, next) {
  const pool = db.pool;
  (async () => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const deleteStavkeRacunaText = `DELETE FROM stavka_racuna WHERE broj_racuna=$1`;
      await client.query(deleteStavkeRacunaText, [+req.params.id]);

      const deleteRacunText = `DELETE FROM racun WHERE broj_racuna=$1`;
      await client.query(deleteRacunText, [+req.params.id]);

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

async function deleteStavkaRacuna(req, res, next) {
  try {
    const result = await db.query(
      "DELETE FROM stavka_racuna WHERE broj_racuna = $1 and sifra_stavke = $2",
      [+req.body.broj_racuna, +req.body.sifra_stavke]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

async function updateStavkaRacuna(req, res, next) {
  try {
    const result = await db.query(
      "UPDATE stavka_racuna SET kolicina=$1, iznos=$2, proizvod_id=$3 where sifra_stavke=$4 and broj_racuna=$5",
      [
        req.body.kolicina,
        req.body.iznos,
        req.body.proizvod,
        +req.params.id,
        +req.body.broj_racuna,
      ]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

module.exports = {
  getRacuni,
  postRacun,
  getStavkeZaRacun,
  deleteRacun,
  deleteStavkaRacuna,
  updateStavkaRacuna,
  getRacun,
  updateRacun,
};
