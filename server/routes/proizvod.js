const express = require("express");
const router = express.Router();
const controller = require("../controllers/proizvod.controller");

router.get("/getProizvodi", controller.getProizvodi);
router.post("/postProizvod", controller.postProizvod);


module.exports = router;