const express = require("express");
const router = express.Router();
const controller = require("../controllers/racun.controller");

router.get("/getRacuni", controller.getRacuni);
router.post("/postRacun", controller.postRacun);

module.exports = router;