const express = require("express");
const router = express.Router();
const controller = require("../controllers/racun.controller");

router.get("/getRacuni", controller.getRacuni);
router.get("/getRacun/:id", controller.getRacun);
router.post("/postRacun", controller.postRacun);
router.get("/getStavkeRacuna/:id", controller.getStavkeZaRacun);
router.delete("/deleteRacun/:id", controller.deleteRacun);
router.post("/deleteStavkaRacuna", controller.deleteStavkaRacuna);
router.put("/updateStavkaRacuna/:id", controller.updateStavkaRacuna);
router.put("/updateRacun/:id", controller.updateRacun);

module.exports = router;