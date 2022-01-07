const express = require("express");
const router = express.Router();
const controller = require("../controllers/proizvod.controller");

router.get("/getProizvodi", controller.getProizvodi);
router.post("/postProizvod", controller.postProizvod);
router.get("/getCenaZaProizvod/:id", controller.getCeneZaProizvod);
router.post("/postCenaZaProizvod", controller.postCeneZaProizvod);


module.exports = router;