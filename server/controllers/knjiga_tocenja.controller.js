const db = require("../db/index");

async function getKnjigaTocenja(req, res, next) {
  try {
    const knjiga_tocenja = await db.query(
      "select DISTINCT ktp.oznaka, ktp.izdanje, ktp.datum, p.ponuda_id, p.opis, z.ime as izdao_ime, z.prezime as izdao_prezime, z1.ime as primio_ime, z1.prezime as primio_prezime from knjiga_tocenja_pregled ktp join ponuda1 p on ktp.ponuda_id = p.ponuda_id join zaposleni z on ktp.nalog_izdao = z.zaposleni_id join zaposleni z1 on ktp.nalog_primio = z1.zaposleni_id",
      []
    );
    res.status(200).json(knjiga_tocenja.rows);
  } catch (error) {
    res.status(404).json({ succes: false, message: error });
  }
}

async function getKnjigaTocenjaOsnovno(req, res, next) {
  try {
    const knjiga_tocenja = await db.query(
      "select * from knjigatocenjaosnovno",
      []
    );
    res.status(200).json(knjiga_tocenja.rows);
  } catch (error) {
    res.status(404).json({ succes: false, message: error });
  }
}

async function postKnjigaTocenja(req, res, next) {
  try {
    const result = await db.query(
        `INSERT INTO knjiga_tocenja_pregled 
        VALUES ($1, $2, $3, $4, $5, $6);`,
        [+req.body.oznaka, req.body.izdanje, req.body.datum, +req.body.nalog_izdao, +req.body.nalog_primio, +req.body.ponuda]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

async function deleteKnjigaTocenja(req, res, next) {
  try {
    const result = await db.query(
      "DELETE FROM knjiga_tocenja_pregled WHERE oznaka = $1",
      [+req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(error.status || 500);
    res.json({ message: error.message });
  }
}

module.exports = { getKnjigaTocenja, postKnjigaTocenja, getKnjigaTocenjaOsnovno, deleteKnjigaTocenja };
