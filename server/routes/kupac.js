const express = require("express");
const router = express.Router();
const controller = require("../controllers/kupac.controller");

router.get("/getKupci", controller.getKupci);
router.post("/postKupac", controller.postKupac);


module.exports = router;