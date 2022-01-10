const express = require("express");
const router = express.Router();
const controller = require("../controllers/racun.controller");

router.get("/getRacuni", controller.getRacuni);
router.post("/postRacun", controller.postRacun);
router.get("/getStavkeRacuna/:id", controller.getStavkeZaRacun);
router.delete("/deleteRacun/:id", controller.deleteRacun);
router.post("/deleteStavkaRacuna", controller.deleteStavkaRacuna);

module.exports = router;