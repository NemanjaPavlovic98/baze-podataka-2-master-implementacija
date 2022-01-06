const express = require("express");
const router = express.Router();
const controller = require("../controllers/zaposleni.controller");

router.get("/getZaposleni", controller.getZaposleni);
router.post("/postZaposleni", controller.postZaposleni);

module.exports = router;